import { ChildProcess, exec } from "child_process";
import { Logger } from "./logger";
import fs from "fs";
import { ClassConstructor } from "class-transformer";
import { validate } from "./cli/validator";

export function readInput(p: ChildProcess) {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", function (key) {
    if (key.toString() == "\u0003") {
      // ctrl-c
      process.exit();
    } else {
      p?.stdin?.write(key);
    }
  });
}

export function readOutput(p: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    p?.stdout?.on("data", (data: any) => {
      console.log(`${data}`);
    });

    // p?.stderr?.on("data", (data: any) => {
    //   console.error(`stderr: ${data}`);
    // });

    p.on("close", (code: number | null) => {
      if (!!code && code > 0) {
        console.log(`child process exited with code ${code}`);
        reject();
      }
      resolve();
    });

    p.on("error", (error: Error) => {
      console.error(`child process error: ${error}`);
      reject(error);
    });
  });
}

export async function execFunction(functionToExecute: string): Promise<void> {
  const funct = exec(functionToExecute);
  await readAndCheckOutput(funct);
}

async function readAndCheckOutput(process: ChildProcess): Promise<void> {
  try {
    await readOutput(process);
  } catch (err: any) {
    Logger.error(`Something was wrong ${err}`);
    throw err;
  }
}

export function prettierFormat(project: string) {
  const packageManager = packageManagerChecker(project);
  execFunction(`hygen prettier apply --project ${project} --packageManager ${packageManager}`);
}

function packageManagerChecker(project: string): string {
  if (fs.existsSync(`./${project}/yarn.lock`)) {
    return "yarn";
  }
  return "npx";
}

export async function validateAndLogErrors<T>(validator: ClassConstructor<object>, value: T): Promise<void> {
  const errors = await validate(validator, value);
  if (errors.length > 0) {
    Logger.warn(`Command validation failed.`);
    Logger.error(`\n\t${errors.join(",\n\t")}`);
    throw new Error();
  }
}