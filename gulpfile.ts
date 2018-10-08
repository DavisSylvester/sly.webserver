import { series, parallel, task } from "gulp";
import { createUmdBundle } from "./tools/gulp/tasks/umd";;

task(createUmdBundle);
