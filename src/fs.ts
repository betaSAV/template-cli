import fs from "fs";
import { Logger } from "./logger";
import { execFunction } from "./process";

enum PackageExecutor {
  YARN = "yarn",
  NPM = "npx",
}

export function prettierFormat(project: string) {
  Logger.info(`Formatting project with prettier`);
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
  return fs.existsSync(path);
}
