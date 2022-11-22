import { Root } from "vieuxjs";
import { Directories, Files } from "../../../../../directories.js";

export default function page(path){
    return Root.removePage(path.replace(Directories.pages, "").split(Files.extname.pages).slice(0, -1).join(Files.extname.pages));
}