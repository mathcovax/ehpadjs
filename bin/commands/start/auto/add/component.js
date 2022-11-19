import { Component, Root } from "vieuxjs";
import { Directories, Files, Models } from "../../../../../directories.js";
import fs from "fs";

export default function component(path){
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.component = path;
    Root.addComponent(new Component(path.replace(Directories.components + "/", "").split(Files.extname.components).slice(0, -1).join(Files.extname.components).replace("/", "."), path));
}