import { exec } from "child_process";
import { Command } from "commander";
import inquirer from "inquirer";

import { newProjectQuestions, newNestElements } from "./questions/new-project";
import { readOutput } from "./utils";
const program = new Command();

interface NewAnswers {
  projectName: string;
  packageManager: PackageManager;
}

enum PackageManager {
  npm = "npm",
  yarn = "yarn",
  pnpm = "pnpm"
}

interface ElementAnswers {
  elementName: string;
}

interface ResourceOptions {
  dryRun: boolean;
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
  .action(async (projectName: string, packageManager: PackageManager) => {
    if (!(projectName && packageManager)) {
      const answers = await inquirer.prompt<NewAnswers>(newProjectQuestions);
      projectName = answers.projectName;
      packageManager = answers.packageManager;
    }
    const p = exec("nest new -d " + projectName + " -p " + packageManager);
    readOutput(p);
  });

program
  .command("resource")
  .alias("res")
  .description("Generates a Nest resource")
  .arguments("[elementName]")
  .option("-d, --dry-run", "Run through without making any changes")
  .action(async (elementName: string, options: ResourceOptions) => {
    if (!(elementName)) {
      const answers = await inquirer.prompt<ElementAnswers>(newNestElements);
      elementName = answers.elementName;
    }
    console.log("Options: ", options);
    console.log("Options: " + Object.keys(options).join(" "));
    const p = exec("nest generate -d resource " + elementName);
    readOutput(p);
  });

program.parse();
