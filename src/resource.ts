import { execFunction } from "./process";
import { optionsToArgs } from "./cli/mapper";
import { ResourceChoices, ResourceOptions, toNestOptions } from "./cli/resource";
import { Logger } from "./logger";

export async function generateNewResource(choices: ResourceChoices): Promise<void> {
  const optionString = optionsToArgs(choices.options, toNestOptions);

  const originalDirectory = process.cwd();
  process.chdir(choices.options.project);
  try {
    await nestResourceGenerate(optionString, choices);
    if (choices.options.dryRun) {
      return;
    }
    process.chdir(originalDirectory);
    await hygenDependencies(choices.options, choices);
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
  Logger.info(`Creating Hygen depencencies`);
  await execFunction(`hygen resource new --name ${choices.name} --project ${options.project}`);
}


