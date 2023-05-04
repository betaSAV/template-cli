import inquirer from "inquirer";
import { newResourceQuestions } from "./questions/resource";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { IsAlpha } from "class-validator";
import { generateNewResource } from "../resource";
import { Logger } from "../logger";
import { prettierFormat, pathExists } from "../fs";
import { validateAndLogErrors } from "../validator";
import { Options } from "./options";

export interface ElementAnswers {
  resourceName: string;
  project: string;
}

export class ResourceChoices {
  @IsAlpha()
  name: string;

  options: ResourceOptions;
}

export class ResourceOptions extends Options {
  @IsAlpha()
  project: string;

  json?: string;
}

export const toNestOptions: OptionsMapping<ResourceOptions> = {
  dryRun: "-d",
  project: "-p",
  json: "-j",
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
    if (!pathExists(options.project)) {
      Logger.error(`Project ${options.project} does not exist`);
      return;
    }
    await generateNewResource(choices);
    prettierFormat(options.project);
  } catch (err: any) {
    Logger.error(`Build of resource ${choices.name} failed`);
    process.exitCode = 1;
  }
};