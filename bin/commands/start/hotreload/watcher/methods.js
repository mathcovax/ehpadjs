import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import fs from "fs";

(new watcher(Directories.methods, {ignoreInitial: true, recursive: true, ignore: path=>path.startsWith("tmp-ehpadjs-")}))
.on("add", async (path) => {
    if(!path.endsWith(Files.extname.methods))return;
    await auto.Add.method(path);
    Root.loadAccesses("method");
    path = path.replace(Directories.methods, Directories.handlers).split(Files.extname.methods).slice(0, -1).join(Files.extname.methods);
    if(!fs.existsSync(path))return;
    for(const file of fs.readdirSync(path)){
        if(file.endsWith(Files.extname.handlers) && !fs.lstatSync(path + "/" + file).isDirectory())await auto.Add.handler(path + "/" + file);
    }
})
.on("unlink", async (path) => {
    if(!path.endsWith(Files.extname.methods))return;
    auto.Remove.method(path);
    Root.loadAccesses("method");
    path = path.replace(Directories.methods, Directories.handlers).split(Files.extname.methods).slice(0, -1).join(Files.extname.methods);
    if(!fs.existsSync(path))return;
    for(const file of fs.readdirSync(path)){
        if(file.endsWith(Files.extname.handlers) && !fs.lstatSync(path + "/" + file).isDirectory())await auto.Add.handler(path + "/" + file);
    }
})
.on("change", async (path) => {
    if(!path.endsWith(Files.extname.methods))return;
    auto.Remove.method(path);
    await auto.Add.method(path);
    Root.loadAccesses("method");
    path = path.replace(Directories.methods, Directories.handlers).split(Files.extname.methods).slice(0, -1).join(Files.extname.methods);
    if(!fs.existsSync(path))return;
    for(const file of fs.readdirSync(path)){
        if(file.endsWith(Files.extname.handlers) && !fs.lstatSync(path + "/" + file).isDirectory())await auto.Add.handler(path + "/" + file);
    }
});