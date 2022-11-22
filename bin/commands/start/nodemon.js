import watcher from "watcher";
import { Root, Socket } from "vieuxjs";
import { subProcess } from "../../subProcess/subProcess.js";
import { spawnSync, spawn } from "child_process";
import { Directories, EhpadjsDirectoriesSrc } from "../../../directories.js";
import { args } from "./spawn.js";
import fs from "fs";

const listWatcher = [];

export default function nodemon(){
    process.on("exit", (e) => {
        if(e === "restart"){
            Root.destroy();
            for(const watcher of listWatcher)watcher.close();
            console.log("");
            console.log("restarting...");
            console.log("");
            if(args.detached){
                spawn(process.argv.shift(), process.argv, {
                    env: {...process.env},
                    cwd: process.cwd(),
                    detached: true,
                    stdio: "ignore",
                    title:"vieujs",
                });
            }
            else{
                spawnSync(process.argv.shift(), process.argv, {
                    env: {...process.env},
                    cwd: process.cwd(),
                    stdio: "inherit",
                    title:"vieujs",
                });
            }
        }
    });
    
    for(const po of ["unhandledRejection", "uncaughtException"]){
        process.on(po, (e, f) => {
            console.log("");
            console.log("Error :");
            console.error(e);
            
            subProcess.error.message = e.stack;
            subProcess.error.timespan = Date.now();

            listWatcher.push((new watcher(Directories.main, {ignoreInitial: true, recursive: true, ignore: (path)=>(path.indexOf("node_modules")>=0)})).on("all", (event, path) => {
                if(path.split("/").pop().startsWith("tmp-vieujs-")) return;
                process.exit("restart");
            }));
        });
    }

    listWatcher.push((new watcher(Directories.main, {ignoreInitial: true, recursive: true, ignore: (path)=>(path.indexOf("node_modules")>=0)})).on("all", (event, path) => {
        if(path.split("/").pop().startsWith("tmp-vieuxjs-")) return;
        process.exit("restart");
    }));
    /*
    let nodemonScript = fs.readFileSync(EhpadjsDirectoriesSrc.scripts + "/nodemon.js", "utf-8");
    Root.app.use("/ehpadjs/js/nodemon.js", (req, res) => {
        res.send(nodemonScript);
    });
    Root.addScriptSrcToVieuxjsIndex.push("/ehpadjs/js/nodemon.js");
    Root.webSocket = true;
    let socket = Root.addSocket(new Socket("nodemon"));
    socket.socketClient(() => {return true;});
    */
}