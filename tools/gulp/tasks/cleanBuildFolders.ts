import { src, dest } from "gulp";
import * as source from "../configuration/source";
const del = require("del");



export async function cleanBundleFolder(cb) {

    const folders = [
        source.ApplicationConfiguration.BundleRootDirectory
    ];

    await del(folders);
    cb();
};

export async function cleanDistFolder(cb) {

    const folders = [
        source.ApplicationConfiguration.DistRootDirectory
    ];

    await del(folders);
    cb();
};