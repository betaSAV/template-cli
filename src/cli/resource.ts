import { exec } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import { newResourceQuestions } from "./questions/resource";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { readOutput } from "../io";

export interface ElementAnswers {
  resourceName: string;
  project: string;
}

interface ProjectOptions {
  dryRun: boolean;
  project: string;
}

const toNestOptions: OptionsMapping<ProjectOptions> = {
  dryRun: "-d",
  project: "-p",
};

export const handleResourceCommand = async (
  elementName: string,
  options: ProjectOptions
) => {
  const optionString = optionsToArgs(options, toNestOptions);
  if (!elementName) {
    const answers = await inquirer.prompt<ElementAnswers>(newResourceQuestions);
    elementName = answers.resourceName;
    options.project = answers.project;
  }

  if (options.dryRun) {
    return;
  }

  if (!fs.existsSync(options.project)) {
    console.log(`Project directory '${options.project}' does not exist.`);
    return;
  }
  const originalDirectory = process.cwd();

  process.chdir(options.project);
  const outputNest = exec(`nest generate resource ${elementName}`);
  await readOutput(outputNest);

  process.chdir(originalDirectory);
  const hygen = exec(`hygen resource new --name ${elementName} --project ${options.project}`);
  await readOutput(hygen);
};
