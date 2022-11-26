import fs from "fs";
import { Directories, Files, Models } from "../../../../../directories.js";
import { args } from "../../spawn.js";

export default function pson(path){
    path = path.replace(Directories.pages, Directories.psons).split(Files.extname.pages).slice(0, -1).join(Files.extname.pages) + Files.extname.psons;
    if(args.psons !== true && !fs.existsSync(path))return;
    else if(args.psons === true && !fs.existsSync(path))Models.rw.pson = path;

    return JSON.parse(fs.readFileSync(path, "utf-8"));
    
}