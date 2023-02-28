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
  .arguments("[projectName] [packageManager]")
  .option("-d, --dry-run", "Run through without making any changes")
  .action(async (projectName, packageManager) => {
    if (!(projectName && packageManager)) {
      const answers = await inquirer.prompt<newAnswers>(newProjectQuestions);
      projectName = answers.projectName;
      packageManager = answers.packageManager;
    }
    const p = exec("nest new -d " + projectName + " -p " + packageManager);
    readOutput(p);
  });

program
  .command("generate")
  .alias("g")
  .description("Generates a Nest element")
  .arguments("[nestElement] [elementName]")
  .option("-d, --dry-run", "Run through without making any changes")
  .action(async (nestElement, elementName) => {
    if (!(nestElement && elementName)) {
      const answers = await inquirer.prompt<elmentAnswers>(newNestElements);
      nestElement = answers.nestElement;
      elementName = answers.elementName;
    }
    const p = exec("nest generate -d " + nestElement + " " + elementName);
    readOutput(p);
  });

program.parse();
