"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
const inquirer_1 = __importDefault(require("inquirer"));
program
    .name("astid-template-cli")
    .description("CLI to make templates for astid projects")
    .version("0.0.1");
program
    .command("new")
    .description("Makes a default new project")
    .argument("<projectName>", "name of the project.")
    .option("-p, --package", "Package manager to use in the project. <npm, yarn, pnpm>")
    .action(async () => {
    const answers = await inquirer_1.default.prompt([
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
function readInput(p) {
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.on("data", function (key) {
        if (key.toString() == "\u0003") {
            // ctrl-c
            process.exit();
        }
        else {
            p.stdin.write(key);
        }
    });
}
function readOutput(p) {
    p.stdout.on("data", (data) => {
        console.log(`${data}`);
    });
    p.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    p.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    });
}
program.parse();
