import { Root, Socket } from "vieuxjs";
import { Directories, Files, Models } from "../../../../../directories.js";
import fs from "fs";
import di from "../../../../di.js"

export default async function socket(path){
    if(path.split("/").pop().startsWith("tmp-ehpadjs-"))return;
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.socket = path;
    let { access, client, server } = await di(path);
    let socket = Root.addSocket(new Socket(path.replace(Directories.sockets + "/", "").split(Files.extname.sockets).slice(0, -1).join(Files.extname.sockets).replace("/", "_")));
    socket.socketAcces(access);
    socket.socketClient(client);
    socket.socketServer(server);
}