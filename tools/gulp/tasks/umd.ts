import { src, dest } from "gulp";
import * as source from "../configuration/source";
const umd = require("gulp-umd");
const minify = require('gulp-minify');
const uglify = require('gulp-uglify-es').default;


export function createUmdBundle() {

    const result = src(source.ApplicationConfiguration.BuildRootJavascriptFiles)
        // .pipe(minify())
        .pipe(uglify())        
        .pipe(umd())
        .pipe(dest(source.ApplicationConfiguration.BundleRootDirectory));
        
    return result;
};