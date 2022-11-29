import { Root, Socket } from "vieuxjs";
import { EhpadjsDirectoriesSrc } from "../../../../directories.js";
import fs from "fs";

export default function watch(){
    process.on("SIGINT", (e) => {
        process.exit("restart");
    });

    process.on("exit", (e) => {
        if(Root.isReady)Root.io.emit("restart");
    });

    let socket = Root.addSocket(new Socket("ehpadjs-watch"));
    socket.socketAcces(() => {return true;});
    const script = fs.readFileSync(EhpadjsDirectoriesSrc.scripts + "/watch.js", "utf-8");
    Root.addScriptSrcToVieuxjsIndex.push("/ehpadjs/watch.js");
    
    const interval = setInterval(() => {
        if(Root.isReady){
            clearInterval(interval);
            let [temp] = Root.app._router.stack.splice(-1);
            Root.app.get("/ehpadjs/watch.js", (req, res) => {res.send(script);});
            Root.app.get("/ehpadjs/ping", (req, res) => {res.status(200).send();});
            Root.app._router.stack.push(temp);
        }
    }, 100);
}