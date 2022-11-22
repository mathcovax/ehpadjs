import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import page from "../add/page.js";


export default function pages(){
    if(!fs.existsSync(Directories.pages))fs.mkdirSync(Directories.pages);
    
    (function find(path){
        for(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())find(resolve(path, file));
            else if(file.endsWith(Files.extname.pages))page(resolve(path, file));
            else continue;
        }
    })(Directories.pages);
}