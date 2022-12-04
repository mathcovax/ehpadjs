import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";
import { args } from "../../spawn.js";

if(args.scss === true)(new watcher(Directories.scss, {ignoreInitial: true, recursive: true}))
.on("change", (path) => {
    if(!path.endsWith(Files.extname.scss))return;
    auto.Launch.scss();
})