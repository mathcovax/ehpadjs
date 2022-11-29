import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import { args } from "../../spawn.js";

if(args.sockets === true)(new watcher(Directories.sockets, {ignoreInitial: true, recursive: true, ignore: path=>path.startsWith("tmp-ehpadjs-")}))
.on("add", (path) => {
    if(!path.endsWith(Files.extname.sockets))return;
    auto.Add.socket(path);
})
.on("unlink", (path) => {
    if(!path.endsWith(Files.extname.sockets))return;
    auto.Remove.socket(path);
})
.on("change", (path) => {
    if(!path.endsWith(Files.extname.sockets))return;
    auto.Remove.socket(path);
    auto.Add.socket(path);
});