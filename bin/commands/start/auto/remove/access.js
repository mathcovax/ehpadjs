import { Root } from "vieuxjs";
import { Directories, Files } from "../../../../../directories.js";

export default function access(path){
    path = path.split("/");
    let end = path.pop();
    if(end.startsWith("page>"))var type = "page";
    if(end.startsWith("method>"))var type = "method";
    path.push(type === undefined? end : end.replace(type + ">", ""));
    path = path.join("/");
    if(type === "page" || type === undefined){
        Root.removeAccess(path.replace(Directories.accesses, "").split(Files.extname.accesses).slice(0, -1).join(Files.extname.accesses), "page");
    }
    if(type === "method" || type === undefined){
        Root.removeAccess(path.replace(Directories.accesses, "").split(Files.extname.accesses).slice(0, -1).join(Files.extname.accesses), "method");
    }
}