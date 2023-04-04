import fs from "fs";
import { execFunction } from "./process";

enum PackageExecutors {
  YARN = "yarn",
  NPM = "npx",
}

export function prettierFormat(project: string) {
  const packageManager = prettierExecutor(project);
  execFunction(`hygen prettier apply --project ${project} --packageManager ${packageManager}`);
}

function prettierExecutor(project: string): PackageExecutors {
  if (pathExists(`./${project}/yarn.lock`)) {
    return PackageExecutors.YARN;
  } 
  return PackageExecutors.NPM;
}

export function pathExists(path: string): boolean {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
}
