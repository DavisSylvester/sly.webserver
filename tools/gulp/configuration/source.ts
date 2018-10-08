import { sep, SourceRootDirectory, ApplicationRootDirectory,
    BuildRootDirectory, BundleRootDirectory } from "./globals";


export class ApplicationConfiguration {

    static SourceRootDirectory = `${SourceRootDirectory}`;
    static ApplicationRootDirectory = `${ApplicationRootDirectory}`;
    static DistRootDirectory = `${BuildRootDirectory}${sep}`;
    static BundleRootDirectory = `${BundleRootDirectory}`;
    static BuildRootJavascriptFiles = `${ApplicationConfiguration.DistRootDirectory}/*.js`;
}