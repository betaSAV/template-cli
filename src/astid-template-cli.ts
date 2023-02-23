import { exec } from 'child_process';
import { Command } from "commander";
import inquirer from 'inquirer';

import questions from "./questions/new-project.json" assert { type: "json" };
import { readOutput } from "./utils.js";
const program = new Command();

interface Answers {
  projectName: string;
  packageManager: string;
}

program
  .name("astid-template-cli")
  .description("CLI to make templates for astid projects")
  .version("0.0.2");

program
  .command("new")
  .description("Makes a default new project")
  /*.argument("[projectName]", "name of the project.")
  .option(
    "-p, --package",
    "Package manager to use in the project. [npm, yarn, pnpm]"
  )*/
  .action(async () => {
    const answers = inquirer.prompt<Answers>(questions).then((answers) => {
      var p = exec("nest new -d " + answers.projectName + " -p " + answers.packageManager);
      console.log(answers);
      readOutput(p);
    });
  });

program.parse();
