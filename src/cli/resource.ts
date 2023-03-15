import { exec } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import { readOutput } from "../utils";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { newResourceQuestions } from "./questions/resource";

export interface ElementAnswers {
  elementName: string;
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
  options: { dryRun: boolean; project: string; }
) => {
  if (!elementName) {
    const answers = await inquirer.prompt<ElementAnswers>(newResourceQuestions);
    elementName = answers.elementName;
  }
  const optionString = optionsToArgs(options, toNestOptions);

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
