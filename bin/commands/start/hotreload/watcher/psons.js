import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files, Models } from "../../../../../directories.js";
import fs from "fs";
import { args } from "../../spawn.js";

if(args.psons === true)(new watcher(Directories.psons, {ignoreInitial: true, recursive: true}))
.on("add", (path) => {
    if(!path.endsWith(Files.extname.psons) || fs.readFileSync(path, "utf-8") !== "")return;
    Models.rw.pson = path;
})
.on("unlink", (path) => {
    if(!path.endsWith(Files.extname.psons))return;
    try{var page = Root.getPage(path.replace(Directories.psons, "").split(Files.extname.psons).slice(0, -1).join(Files.extname.psons));}catch{};
    if(page){
        page.pson = {};
        page.render();
        Root.io.emit("hotreload", [page.id]);
    };
})
.on("change", (path) => {
    if(!path.endsWith(Files.extname.psons))return;
    try{var page = Root.getPage(path.replace(Directories.psons, "").split(Files.extname.psons).slice(0, -1).join(Files.extname.psons));}catch{};
    if(page){
        page.pson = JSON.parse(fs.readFileSync(path, "utf8"));
        page.render();
        Root.io.emit("hotreload", [page.id]);
    }
});