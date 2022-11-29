import { Root } from "vieuxjs";
import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";

(new watcher(Directories.accesses, {ignoreInitial: true, recursive: true, ignore: path=>path.startsWith("tmp-ehpadjs-")}))
.on("add", async (path) => {
    if(!path.endsWith(Files.extname.accesses))return;
    await auto.Add.access(path);
    Root.loadAccesses();
})
.on("unlink", (path) => {
    if(!path.endsWith(Files.extname.accesses))return;
    auto.Remove.access(path);
    Root.loadAccesses();
})
.on("change", async (path) => {
    if(!path.endsWith(Files.extname.accesses))return;
    auto.Remove.access(path);
    await auto.Add.access(path);
    Root.loadAccesses();
});