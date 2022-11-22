import { Root } from "vieuxjs";
import { Directories, Files } from "../../../../../directories.js";

export default function method(path){
    Root.removeMethod(path.replace(Directories.methods, "").split(Files.extname.methods).slice(0, -1).join(Files.extname.methods));
}