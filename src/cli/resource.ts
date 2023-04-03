import inquirer from "inquirer";
import fs from "fs";
import { newResourceQuestions } from "./questions/resource";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { IsAlpha, IsBoolean, IsOptional } from "class-validator";
import { generateNewResource } from "../resource";
import { Logger } from "../logger";
import { prettierFormat, validateAndLogErrors } from "../io";

export interface ElementAnswers {
  resourceName: string;
  project: string;
}

export class ProjectChoices {
  @IsAlpha()
  name: string;

  options: ProjectOptions;
}

export class ProjectOptions {
  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;

  @IsAlpha()
  project: string;
}

export const toNestOptions: OptionsMapping<ProjectOptions> = {
  dryRun: "-d",
  project: "-p",
};

export const handleResourceCommand = async (
  elementName: string,
  options: ProjectOptions
) => {
  const choices: ProjectChoices = {
    name: elementName,
    options,
  };
  const optionString = optionsToArgs(options, toNestOptions);
  if (!elementName) {
    const answers = await inquirer.prompt<ElementAnswers>(newResourceQuestions);
    elementName = answers.resourceName;
    options.project = answers.project;
  }

  try {
    await validateAndLogErrors(ProjectChoices, choices);
    await validateAndLogErrors(ProjectOptions, options);
  } catch (err: any) {
    process.exitCode = 1;
    return;
  }
  

  if (!fs.existsSync(options.project)) {
    Logger.error(`Project directory '${options.project}' does not exist.`);
    return;
  }
  
  try {
    await generateNewResource(choices);
    prettierFormat(options.project);
  } catch (err: any) {
    Logger.error(`Something was wrong ${err}`);
    process.exitCode = 1;
  }
};
