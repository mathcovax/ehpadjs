import fs from "fs";
import { resolve } from "path";
import { Directories, Files } from "../../../../../directories.js";
import method from "../add/method.js";

export default async function methods(){
    if(!fs.existsSync(Directories.methods))fs.mkdirSync(Directories.methods);

    await (async function find(path){
        for await(const file of fs.readdirSync(path)){
            if(fs.lstatSync(resolve(path, file)).isDirectory())await find(resolve(path, file));
            else if(file.endsWith(Files.extname.methods))await method(resolve(path, file));
            else continue;
        }
    })(Directories.methods);
}