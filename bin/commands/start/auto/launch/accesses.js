import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import access from "../add/access.js";

export default async function accesses(){
    if(fs.existsSync(Directories.accesses))fs.mkdirSync(Directories.accesses);

    await (async function find(path){
        for(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())find(resolve(path, file));
            else if(file.endsWith(Files.extname.accesses))await access(resolve(path, file));
            else continue;
        }
    })(Directories.accesses)
}