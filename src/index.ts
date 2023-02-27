import { exec } from "child_process";
import { Command } from "commander";
import inquirer from "inquirer";

import { newProjectQuestions, newNestElements } from "./questions/new-project";
import { readOutput } from "./utils";
const program = new Command();

interface newAnswers {
  projectName: string;
  packageManager: string;
}

interface elmentAnswers {
  nestElement: string;
  elementName: string;
}

program
  .name("astid-template-cli")
  .description("CLI to make templates for astid projects")
  .version("0.0.2");

program
  .command("new")
  .alias("n")
  .description("Makes a default new project")
  /*.argument("[projectName]", "name of the project.")
  .option(
    "-p, --package",
    "Package manager to use in the project. [npm, yarn, pnpm]"
  )*/
  .action(async () => {
    const answers = inquirer
      .prompt<newAnswers>(newProjectQuestions)
      .then((answers) => {
        var p = exec(
          "nest new -d " + answers.projectName + " -p " + answers.packageManager
        );
        console.log(answers);
        readOutput(p);
      });
  });

program
  .command("generate")
  .alias("g")
  .description("Generates a Nest element")
  .action(async () => {
    const answers = inquirer
      .prompt<elmentAnswers>(newNestElements)
      .then((answers) => {
        var p = exec("nest generate -d " + answers.nestElement + " " + answers.elementName);
        console.log(answers);
        readOutput(p);
      });
  });

program.parse();
