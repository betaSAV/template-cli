import { execFunction } from "./io";
import { optionsToArgs } from "./cli/mapper";
import { ProjectOptions, ProjectChoices, toNestOptions } from "./cli/resource";
import { logger } from "./logger";

export async function nestNewResource(choices: ProjectChoices): Promise<void> {
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
    logger.error(`Something was wrong ${err}`);
    throw err;
  }
}
async function nestResourceGenerate(
  optionString: string,
  choices: ProjectChoices
): Promise<void> {
  logger.info(`Creating new nest resource`);
  await execFunction(`nest generate resource ${optionString} ${choices.name}`);
}

async function hygenDependencies(
  options: ProjectOptions,
  choices: ProjectChoices
): Promise<void> {
  logger.info(`Creating Hygen depencencies`);
  await execFunction(`hygen resource new --name ${choices.name} --project ${options.project}`);
}


