import { exec } from "child_process";
import { IsAlpha, IsEnum } from "class-validator";
import { readOutput } from "../utils";
import { OptionsMapping, optionsToArgs } from "./mapper";
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

interface ProjectOptions {
  dryRun: boolean;
  skipGit: boolean;
}

const toNestOptions: OptionsMapping<ProjectOptions> = {
  dryRun: "-d",
  skipGit: "-s",
};

const projectDependencies = [
  "@nestjs/swagger",
  "@nestjs/typeorm",
  "typeorm",
  "class-transformer",
  "class-validator",
];

export const handleProjectCommand = async (
  projectName: string,
  packageManager: PackageManager,
  options: { dryRun: boolean; skipGit: boolean }
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
  const optionString = optionsToArgs(options, toNestOptions);
  const outputNest = exec(
    "nest new" + optionString + choices.name + " -p " + choices.packageManager
  );
  readOutput(outputNest);
  if (choices.packageManager === PackageManager.YARN) {
    const outputPackage = exec(`yarn add ${projectDependencies.join(" ")}`);
    readOutput(outputPackage);
  } else {
    const outputPackage = exec(
      `npm install --save ${projectDependencies.join(" ")}`
    );
    readOutput(outputPackage);
  }
  const hygen = exec("hygen controller new; hygen persistence new; hygen app new");
  readOutput(hygen);
};
