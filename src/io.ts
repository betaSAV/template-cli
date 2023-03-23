import { ChildProcess, exec } from "child_process";
import { logger } from "./logger";

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
  logger.error(`Something was wrong ${err}`);
  throw err;
}
}
