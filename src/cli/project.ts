import { exec } from "child_process";
import inquirer from "inquirer";
import { readOutput } from "../utils";
import { newProjectQuestions } from "./questions/project";
import { IsAlpha, IsEnum } from "class-validator";
import { validate } from "./validator";

export enum PackageManager {
  YARN = "yarn",
  NPM = "npm",
}

export class ProjectChoices {
  @IsAlpha()
  name: string;

  @IsEnum(PackageManager)
  packageManager: PackageManager;
}

export const handleProjectCommand = async (
  projectName: string,
  packageManager: PackageManager,
  options: { dryRun: boolean, skipGit: boolean }
) => {
  const choices: ProjectChoices = {
    name: projectName,
    packageManager,
  };
  // if (!(choices.name && choices.packageManager)) {
  //   const answers = await inquirer.prompt<ProjectChoices>(newProjectQuestions);
  //   choices.name = answers.name;
  //   choices.packageManager = answers.packageManager;
  // }
  const errors = await validate(ProjectChoices, choices);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    return;
  }
  const optionString = optionsToArgs(options, optionMap);
  console.log("nest new"+ optionString + choices.name + " -p " + choices.packageManager);
  //const p = exec("nest new"+ optionString + choices.name + " -p " + choices.packageManager);
  //readOutput(p);
};

interface ProjectOptions {
  dryRun: boolean;
  skipGit: boolean;
}

const optionMap: { [key: string]: string } = {
  dryRun: "-d",
  skipGit: "-s",
};

function optionsToArgs(options: ProjectOptions, optionMap: { [key: string]: string }) {
  let optionString = " ";
  for (const option in options) {
      optionString += `${optionMap[option]} `;
  }
  return optionString;
}