import { ChildProcess } from "child_process";


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
  
      p?.stderr?.on("data", (data: any) => {
        console.error(`stderr: ${data}`);
      });
  
      p.on("close", (code: any) => {
        console.log(`child process exited with code ${code}`);
        resolve();
      });
  
      p.on("error", (error: Error) => {
        console.error(`child process error: ${error}`);
        reject(error);
      });
    });
  }