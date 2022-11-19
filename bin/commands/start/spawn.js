import { subProcess } from "../../subProcess/subProcess.js";
import cmd from "../../bin.js"
import { resolve } from "path";
import { Root } from "vieuxjs";
import Auto from "./auto/auto.js";

const argv = process.argv;
export const args = JSON.parse(argv[2].substring(1).substring(0, argv[2].length-2));

(async () => {
    if(args.detached){
        process.on("exit", (e) => {
            if(e == 1 || e == 0)subProcess.pid = "";
        });
        
        if(!args.nodemon && !args.watcher){
            for(const po of ["unhandledRejection", "uncaughtException"]){
                process.on(po, (e, f) => {
                    subProcess.error.message = e.stack;
                    subProcess.error.timespan = Date.now();
                    process.exit();
                });
            }
        }

        subProcess.pid = process.pid;
        subProcess.isReady = "";
        subProcess.error.timespan = "";
        subProcess.error.message = "";
    }
    else if(subProcess.pid !== ""){
        cmd.command("stop", ["-m"]);
    }
    if(args.commands.length){
        for(const cmd of args.commands){
            spawnSync(cmd.split(" ").shift(), cmd.splice(1, cmd.length), {env: {...process.env}, title:"vieujs", cwd: process.cwd(), stdio: "inherit"});
        }
    }
    if(args.import.length){
        for await(const i of args.import){
            await import("file:///" + resolve(i));
        }
    }
    if(args.port)Root.port = args.port;
    if(args.callback)Root.callback(eval(args.callback));
    if(args.webSocket)Root.webSocket = args.webSocket;
    if(args.webStore)Root.webStore = args.webStore;
    
    await Auto.init();

    Root.init(undefined, () => {
        if(args.detached)subProcess.isReady = Date.now();
    })
})()