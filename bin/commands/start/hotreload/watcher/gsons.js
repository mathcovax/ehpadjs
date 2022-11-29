import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files, Models } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import fs from "fs";
import { args } from "../../spawn.js";

if(args.gsons === true)(new watcher(Directories.gsons, {ignoreInitial: true, recursive: true}))
.on("add", (path) => {
    if(!path.endsWith(Files.extname.gsons))return;
    Models.rw.gson = path;
})
.on("unlink", (path) => {
    if(!path.endsWith(Files.extname.gsons))return;
    auto.Remove.gson(path);
    Root.makeIndex();
    for(const key in Root.pages){
        Root.pages[key].page.render();
    }
    Root.io.emit("hotreload", ["*"]);
})
.on("change", (path) => {
    if(!path.endsWith(Files.extname.gsons))return;
    Root.gson = JSON.parse(fs.readFileSync(Files.gson, "utf-8"));
    auto.Launch.gsons();
    Root.makeIndex();
    for(const key in Root.pages){
        Root.pages[key].page.render();
    }
    Root.io.emit("hotreload", ["*"]);
});

(new watcher(Files.gson, {ignoreInitial: true}))
.on("unlink", (path) => {
    process.exit(0);
})
.on("change", (path) => {
    Root.gson = JSON.parse(fs.readFileSync(Files.gson, "utf-8"));
    auto.Launch.gsons();
    Root.makeIndex();
    for(const key in Root.pages){
        Root.pages[key].page.render();
    }
    Root.io.emit("hotreload", ["*"]);
});