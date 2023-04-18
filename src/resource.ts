import { execFunction } from "./process";
import { optionsToArgs } from "./cli/mapper";
import {
  ResourceChoices,
  ResourceOptions,
  toNestOptions,
} from "./cli/resource";
import { Logger } from "./logger";
import { generateFromJSON, pathExists } from "./fs";
import fs from "fs";

export async function generateNewResource(
  choices: ResourceChoices
): Promise<void> {
  const optionString = optionsToArgs(choices.options, toNestOptions);
  let entityContent = "";

  const originalDirectory = process.cwd();
  process.chdir(choices.options.project);

  try {
    await nestResourceGenerate(optionString, choices);
    if (choices.options.dryRun) {
      return;
    }
    process.chdir(originalDirectory);
    await hygenDependencies(choices.options, choices);
    if (choices.options.json) {
      if (pathExists(choices.options.json)) {
        entityContent += generateFromJSON(choices.options.json);
        Logger.debug(`entityContent: ${entityContent}`);
        fs.writeFileSync(
          `./${choices.options.project}/src/${choices.name}/entities/${choices.name}.entity.ts`,
          entityContent,
          { flag: "a" }
        );
        await execFunction(
          `hygen entityContent add --name ${choices.name} --project ${choices.options.project}`
        );
      } else {
        Logger.error(`File ${choices.options.json} does not exist`);
      }
    }
  } catch (err: any) {
    Logger.error(`Something was wrong ${err}`);
    throw err;
  }
}
async function nestResourceGenerate(
  optionString: string,
  choices: ResourceChoices
): Promise<void> {
  Logger.info(`Creating new nest resource`);
  await execFunction(`nest generate resource ${optionString} ${choices.name}`);
}

async function hygenDependencies(
  options: ResourceOptions,
  choices: ResourceChoices
): Promise<void> {
  Logger.info(
    `Adding PersistenceService (Module, Controller, Service, Entity) to the project`
  );
  await execFunction(
    `hygen resource new --name ${choices.name} --project ${options.project}`
  );
}