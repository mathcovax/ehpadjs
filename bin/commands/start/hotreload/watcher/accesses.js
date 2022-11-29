import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";

(new watcher(Directories.accesses, {ignoreInitial: true, recursive: true, ignore: path=>!path.endsWith(Files.extname.accesses)}))
.on("add", (path) => {

})
.on("unlink", (path) => {

})
.on("change", (path) => {

});