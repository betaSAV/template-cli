import inquirer from "inquirer";
import fs from "fs";
import { newResourceQuestions } from "./questions/resource";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { IsAlpha, IsBoolean, IsOptional } from "class-validator";
import { generateNewResource } from "../resource";
import { Logger } from "../logger";
import { prettierFormat, projectExists } from "../io";
import { validateAndLogErrors } from "../validator";

export interface ElementAnswers {
  resourceName: string;
  project: string;
}

export class ResourceChoices {
  @IsAlpha()
  name: string;

  options: ResourceOptions;
}

export class ResourceOptions {
  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;

  @IsAlpha()
  project: string;
}

export const toNestOptions: OptionsMapping<ResourceOptions> = {
  dryRun: "-d",
  project: "-p",
};

export const handleResourceCommand = async (
  elementName: string,
  options: ResourceOptions
) => {
  const choices: ResourceChoices = {
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
    await validateAndLogErrors(ResourceChoices, choices);
    await validateAndLogErrors(ResourceOptions, options);
    projectExists(options.project);
    await generateNewResource(choices);
    prettierFormat(options.project);
  } catch (err: any) {
    Logger.error(`Something was wrong: ${err.message}`);
    process.exitCode = 1;
  }
};


