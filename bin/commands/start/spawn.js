import { subProcess } from "../../subProcess/subProcess.js";
import { resolve } from "path";
import { Root, Socket } from "vieuxjs";
import Auto from "./auto/auto.js";
import { execSync } from "child_process";
import fs from "fs";
import { EhpadjsDirectoriesSrc } from "../../../directories.js";

const argv = process.argv;
export const args = JSON.parse(argv[2].substring(1).substring(0, argv[2].length-2));

(async () => {
    if(args.detached){
        for(const po of ["unhandledRejection", "uncaughtException"]){
            process.on(po, (e, f) => {
                subProcess.error.message = e.stack;
                subProcess.error.timespan = Date.now();
                process.exit();
            });
        }
    }

    process.on("exit", (e) => {
        if(Root.isReady)Root.io.emit("restart");
        if(e !== 1)subProcess.pid = "";
    });

    subProcess.pid = process.pid;
    subProcess.isReady = "";
    subProcess.error.timespan = "";
    subProcess.error.message = "";
    if(args.watch){
        let socket = Root.addSocket(new Socket("ehpadjs-watch"));
        socket.socketAcces(() => {return true;});
        const script = fs.readFileSync(EhpadjsDirectoriesSrc.scripts + "/watch.js", "utf-8");
        Root.app.get("/ehpadjs/watch.js", (req, res) => {res.send(script)});
        Root.addScriptSrcToVieuxjsIndex.push("/ehpadjs/watch.js");
    }
    if(args.commands.length){
        for(const cmd of args.commands){
            execSync(cmd, {stdio: "inherit"});
        }
    }
    if(args.import.length){
        for await(const i of args.import){
            if(fs.lstatSync(resolve(i)).isDirectory()){
                await (async function find(path){
                    for(const file of fs.readdirSync(path)){
                        if(fs.lstatSync(path + "/" + file).isDirectory())await find(path + "/" + file);
                        else await import("file:///" + path + "/" + file);
                    }
                })(resolve(i));
            }
            else await import("file:///" + resolve(i));
        }
    }
    if(args.port)Root.port = args.port;
    if(args.callback)Root.callback(eval(args.callback));
    if(args.webSocket)Root.webSocket = args.webSocket;
    if(args.webStore)Root.webStore = args.webStore;
    
    await Auto.init();

    Root.init(undefined, () => {
        subProcess.isReady = Date.now();
    })
})()