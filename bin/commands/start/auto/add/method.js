import { Root } from "vieuxjs";
import { Directories, Files, Models } from "../../../../../directories.js";
import fs from "fs";
import di from "../../../../di.js";

export default async function method(path){
    if(path.split("/").pop().startsWith("tmp-ehpadjs-"))return;
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.method = path;
    Root.addMethod(path.replace(Directories.methods, "").split(Files.extname.methods).slice(0, -1).join(Files.extname.methods), (await di(path)).default);
}