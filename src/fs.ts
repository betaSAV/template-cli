import fs from "fs";
import { execFunction } from "./process";

enum PackageExecutor {
  YARN = "yarn",
  NPM = "npx",
}

export function prettierFormat(project: string) {
  const packageManager = prettierExecutor(project);
  execFunction(`hygen prettier apply --project ${project} --packageManager ${packageManager}`);
}

function prettierExecutor(project: string): PackageExecutor {
  if (pathExists(`./${project}/yarn.lock`)) {
    return PackageExecutor.YARN;
  } 
  return PackageExecutor.NPM;
}

export function pathExists(path: string): boolean {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
}
