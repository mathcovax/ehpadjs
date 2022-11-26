import { Root } from "vieuxjs";
import { Directories, Models } from "../../../../../directories.js";
import fs from "fs";
import di from "../../../../di.js";

export default async function handler(path){
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.handler = path;
    Root.addHandlerMethod(path.replace(Directories.handlers, "").split("/").slice(0, -1).join("/"), (await di(path)).default);
}