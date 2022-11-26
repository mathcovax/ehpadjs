import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import handler from "../add/handler.js";
import { args } from "../../spawn.js";

export default async function handlers(){
    if(args.handlers === false)return;
    if(!fs.existsSync(Directories.handlers))fs.mkdirSync(Directories.handlers);

    await (async function find(path){
        for await(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())await find(resolve(path, file));
            else if(file.endsWith(Files.extname.handlers))await handler(resolve(path, file));
            else continue;
        }
    })(Directories.handlers);
}