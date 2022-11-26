import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import gson from "../add/gson.js";
import { args } from "../../spawn.js";

export default function components(){
    if(args.gsons === false)return
    if(!fs.existsSync(Directories.gsons))fs.mkdirSync(Directories.gsons);
    
    (function find(path){
        for(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())find(resolve(path, file));
            else if(file.endsWith(Files.extname.gsons))gson(resolve(path, file));
            else continue;
        }
    })(Directories.gsons);
}