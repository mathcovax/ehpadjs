import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import socket from "../add/socket.js";
import { args } from "../../spawn.js";


export default async function sockets(){
    if(args.webSocket === false)return;
    if(!fs.existsSync(Directories.sockets))fs.mkdirSync(Directories.sockets);

    await (async function find(path){
        for await(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())find(resolve(path, file));
            else if(file.endsWith(Files.extname.sockets))await socket(resolve(path, file));
            else continue;
        }
    })(Directories.sockets);
}