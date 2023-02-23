import { Command } from "commander";
import { stdout, stderr } from "process";
const program = new Command();
import inquirer from 'inquirer';

program
  .name("astid-template-cli")
  .description("CLI to make templates for astid projects")
  .version("0.0.1");

program
  .command("new")
  .description("Makes a default new project")
  .argument("<projectName>", "name of the project.")
  .option(
    "-p, --package",
    "Package manager to use in the project. <npm, yarn, pnpm>"
  )
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'question',
        message: 'What is your question?',
      },
      {
        type: 'list',
        name: 'option',
        message: 'Choose from the following options:',
        choices: [
          { name: 'Option 1', value: 'option1' },
          { name: 'Option 2', value: 'option2' },
          { name: 'Option 3', value: 'option3' },
        ],
      },
    ]);

    console.log(`You asked: ${answers.question}`);
    console.log(`You chose option: ${answers.option}`);
    /*(str, options) => {
    var spawn = require("child_process").spawn;
    var p = spawn("nest", ["new", "-d", `${str}`, "-p", `${options.package}`]);

    readOutput(p);
    //readInput(p);*/
  });

function readInput(p: { stdin: { write: (arg0: Buffer) => void; }; }) {
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", function (key) {
    if (key.toString() == "\u0003") {
      // ctrl-c
      process.exit();
    } else {
      p.stdin.write(key);
    }
  });
}

function readOutput(p: { stdout: { on: (arg0: string, arg1: (data: any) => void) => void; }; stderr: { on: (arg0: string, arg1: (data: any) => void) => void; }; on: (arg0: string, arg1: (code: any) => void) => void; }) {
  p.stdout.on("data", (data: any) => {
    console.log(`${data}`);
  });

  p.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
  });

  p.on("close", (code: any) => {
    console.log(`child process exited with code ${code}`);
  });
}

program.parse();
