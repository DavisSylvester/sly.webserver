import { series, parallel, task } from "gulp";
import { createUmdBundle } from "./tools/gulp/tasks/umd";
import { cleanBundleFolder, cleanDistFolder } from "./tools/gulp/tasks/cleanBuildFolders";

task('umd', series(cleanBundleFolder, cleanDistFolder, createUmdBundle));
