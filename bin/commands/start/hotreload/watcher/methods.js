import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";

(new watcher(Directories.methods, {ignoreInitial: true, recursive: true, ignore: path=>!path.endsWith(Files.extname.methods)}))
.on("add", (path) => {

})
.on("unlink", (path) => {

})
.on("change", (path) => {

});