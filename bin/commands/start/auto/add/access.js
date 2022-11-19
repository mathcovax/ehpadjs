import { Root } from "vieuxjs";
import { Directories, Files, Models } from "../../../../../directories.js";
import fs from "fs";
import di from "../../../../di.js"

export default async function access(path){
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.access = path;
    let fnc = (await di(path)).default;
    path = path.split("/");
    let end = path.pop();
    if(end.startsWith("page>"))var type = "page";
    if(end.startsWith("method>"))var type = "method";
    path.push(type===undefined?end:end.replace(type + ">", ""));
    path = path.join("/");
    Root.addAccess(path.replace(Directories.accesses, "").split(Files.extname.accesses).slice(0, -1).join(Files.extname.accesses), type || "all", fnc);
}