import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import fs from "fs";

(new watcher(Directories.pages, {ignoreInitial: true, recursive: true}))
.on("add", (path) => {
    if(!path.endsWith(Files.extname.pages))return;
    auto.Add.page(path);
})
.on("unlink", (path) => {
    if(!path.endsWith(Files.extname.pages))return;
    let page = Root.getPage(path.replace(Directories.pages, "").split(Files.extname.pages).slice(0, -1).join(Files.extname.pages));
    auto.Remove.page(path);
    Root.io.emit("hotreload", [page.id]);
})
.on("change", (path) => {
    if(!path.endsWith(Files.extname.pages))return;
    let page = Root.getPage(path.replace(Directories.pages, "").split(Files.extname.pages).slice(0, -1).join(Files.extname.pages));
    page.html = fs.readFileSync(path, "utf-8");
    Root.io.emit("hotreload", [page.id]);
});

(new watcher(Files.index, {ignoreInitial: true}))
.on("unlink", (path) => {
    process.exit(0);
})
.on("change", (path) => {
    Root.makeIndex();
    for(const key in Root.pages){
        Root.pages[key].page.render();
    }
    Root.io.emit("hotreload", "*");
});

(new watcher(Files.loadingOverlay, {ignoreInitial: true}))
.on("unlink", (path) => {
    process.exit(0);
})
.on("change", (path) => {
    Root.makeIndex();
    for(const key in Root.pages){
        Root.pages[key].page.render();
    }
    Root.io.emit("hotreload", "*");
});