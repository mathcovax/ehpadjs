import { Root } from "vieuxjs";
import { Directories, Files } from "../../../../../directories.js";

export default function component(path){
    return Root.removeComponent(path.replace(Directories.components + "/", "").split(Files.extname.components).slice(0, -1).join(Files.extname.components).replace("/", "."));
}