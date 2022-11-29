import { Root, Socket } from "vieuxjs";
import { EhpadjsDirectoriesBin, EhpadjsDirectoriesSrc } from "../../../../directories.js";
import fs from "fs";

export default async function hotreload(){
    process.on("SIGINT", (e) => {
        process.exit("restart");
    });
    
    process.on("exit", (e) => {
        if(Root.isReady)Root.io.emit("restart");
    });

    let socket = Root.addSocket(new Socket("ehpadjs-hotreload"));
    socket.socketAcces(() => {return true;});
    const script = fs.readFileSync(EhpadjsDirectoriesSrc.scripts + "/hotreload.js", "utf-8");
    Root.addScriptSrcToVieuxjsIndex.push("/ehpadjs/hotreload.js");
    
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            if(Root.isReady){
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });

    let [temp] = Root.app._router.stack.splice(-1);
    Root.app.get("/ehpadjs/hotreload.js", (req, res) => {res.send(script)});
    Root.app.get("/ehpadjs/ping", (req, res) => {res.status(200).send();});
    Root.app._router.stack.push(temp);

    await import("file:///" + EhpadjsDirectoriesBin.commands + "/start/hotreload/watcher/pages.js");
    await import("file:///" + EhpadjsDirectoriesBin.commands + "/start/hotreload/watcher/components.js");
    await import("file:///" + EhpadjsDirectoriesBin.commands + "/start/hotreload/watcher/psons.js");
    await import("file:///" + EhpadjsDirectoriesBin.commands + "/start/hotreload/watcher/gsons.js");
}