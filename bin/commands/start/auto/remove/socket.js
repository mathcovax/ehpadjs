import { Root } from "vieuxjs";
import { Directories, Files } from "../../../../../directories.js";

export default function socket(path){
    Root.removeSocket(path.replace(Directories.sockets + "/", "").split(Files.extname.sockets).slice(0, -1).join(Files.extname.sockets).replace("/", "_"));
}