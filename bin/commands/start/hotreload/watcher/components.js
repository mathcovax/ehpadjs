import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import fs from "fs";

(new watcher(Directories.components, {ignoreInitial: true, recursive: true}))
.on("add", (path) => {
    if(!path.endsWith(Files.extname.components))return;
    auto.Add.component(path);
})
.on("unlink", (path) => {
    if(!path.endsWith(Files.extname.components))return;
    let use = Object.keys(Root.getComponent(path.replace(Directories.components + "/", "").split(Files.extname.components).slice(0, -1).join(Files.extname.components).replace("/", ".")).use);
    auto.Remove.component(path);
    if(use.indexOf("*") >= 0){
        Root.makeImportBody();
        use = "*";
    }
    Root.io.emit("hotreload", use);
})
.on("change", (path) => {
    if(!path.endsWith(Files.extname.components))return;
    let component = Root.getComponent(path.replace(Directories.components + "/", "").split(Files.extname.components).slice(0, -1).join(Files.extname.components).replace("/", "."));
    component.html = fs.readFileSync(path, "utf-8");
    Root.io.emit("hotreload", component.use["*"]?"*":Object.keys(component.use));
});