import watcher from "watcher";
import { Directories, Files } from "../../../../../directories.js";
import auto from "../../auto/auto.js";

(new watcher(Directories.sockets, {ignoreInitial: true, recursive: true, ignore: path=>!path.endsWith(Files.extname.sockets)}))
.on("add", (path) => {

})
.on("unlink", (path) => {

})
.on("change", (path) => {

});