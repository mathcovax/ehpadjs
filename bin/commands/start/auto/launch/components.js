import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import component from "../add/component.js";

export default function components(){
    if(!fs.existsSync(Directories.components))fs.mkdirSync(Directories.components);
    
    (function find(path){
        for(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())find(resolve(path, file));
            else if(file.endsWith(Files.extname.components))component(resolve(path, file));
            else continue;
        }
    })(Directories.components)
}