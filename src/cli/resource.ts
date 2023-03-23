import inquirer from "inquirer";
import fs from "fs";
import { newResourceQuestions } from "./questions/resource";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { IsAlpha, IsBoolean, IsOptional } from "class-validator";
import { nestNewResource } from "../resource";
import { logger } from "../logger";

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

  @IsBoolean()
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

  if (!fs.existsSync(options.project)) {
    console.log(`Project directory '${options.project}' does not exist.`);
    return;
  }
  
  try {
    nestNewResource(choices);
  } catch (err: any) {
    logger.error(`Something was wrong ${err}`);
    process.exitCode = 1;
  }
};
