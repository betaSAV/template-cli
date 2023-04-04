import fs from "fs";
import { execFunction } from "./process";

export function prettierFormat(project: string) {
  const packageManager = packageManagerChecker(project);
  execFunction(`hygen prettier apply --project ${project} --packageManager ${packageManager}`);
}

function packageManagerChecker(project: string): string {
  if (pathExists(`./${project}/yarn.lock`)) {
    return "yarn";
  } 
  return "npx";
}

export function pathExists(path: string): boolean {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
}
