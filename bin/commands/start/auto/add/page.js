import { Page, Root } from "vieuxjs";
import { Directories, Files, Models } from "../../../../../directories.js";
import fs from "fs";
import pson from "./pson.js";

export default function page(path){
    if(fs.readFileSync(path, "utf-8") === "")Models.rw.page = path;
    Root.addPage(path.replace(Directories.pages, "").split(Files.extname.pages).slice(0, -1).join(Files.extname.pages), new Page(path, pson(path)));
}