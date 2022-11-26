import { Root } from "vieuxjs";
import { Directories } from "../../../../../directories.js";
import Auto from "../auto.js";
import fs from "fs";

export default function handler(path){
    path = path.split("/").slice(0, -1).join("/");
    Root.removeHandlerMethod(path.replace(Directories.handlers, ""));
    for(const file of fs.readdirSync(path)){
        Auto.Add.handler(path + "/" + file);
    }
}