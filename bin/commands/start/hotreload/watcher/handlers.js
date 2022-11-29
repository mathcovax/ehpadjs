import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import fs from "fs";
import { args } from "../../spawn.js";

if(args.handlers === true)(new watcher(Directories.handlers, {ignoreInitial: true, recursive: true, ignore: path=>path.startsWith("tmp-ehpadjs-")}))
.on("add", async (path) => {
    if(!path.endsWith(Files.extname.handlers))return;
    path = path.split("/").slice(0, -1).join("/");
    Root.removeHandlerMethod(path.replace(Directories.handlers, ""));
    for(const file of fs.readdirSync(path)){
        if(file.endsWith(Files.extname.handlers) && !fs.lstatSync(path + "/" + file).isDirectory())await auto.Add.handler(path + "/" + file);
    }
})
.on("unlink", async (path) => {
    if(!path.endsWith(Files.extname.handlers))return;
    path = path.split("/").slice(0, -1).join("/");
    Root.removeHandlerMethod(path.replace(Directories.handlers, ""));
    for(const file of fs.readdirSync(path)){
        if(file.endsWith(Files.extname.handlers) && !fs.lstatSync(path + "/" + file).isDirectory())await auto.Add.handler(path + "/" + file);
    }
})
.on("change", async (path) => {
    if(!path.endsWith(Files.extname.handlers))return;
    path = path.split("/").slice(0, -1).join("/");
    Root.removeHandlerMethod(path.replace(Directories.handlers, ""));
    for(const file of fs.readdirSync(path)){
        if(file.endsWith(Files.extname.handlers) && !fs.lstatSync(path + "/" + file).isDirectory())await auto.Add.handler(path + "/" + file);
    }
});