import { execFunction } from "./io";
import { optionsToArgs } from "./cli/mapper";
import { ProjectChoices, toNestOptions } from "./cli/project";
import { logger } from "./logger";

export async function nestNewProject(choices: ProjectChoices) {
  const optionString = optionsToArgs(choices.options, toNestOptions);

  try {
    await nestProjectGenerate(optionString, choices);
    if (choices.options.dryRun) {
      return;
    }
    await hygenDependencies(choices);
  } catch (err: any) {
    logger.error(`Something was wrong ${err}`);
    return;
  }
}

async function nestProjectGenerate(
  optionString: string,
  choices: ProjectChoices
): Promise<void> {
  logger.info(`Creating new nest project`);
  await execFunction(
    `nest new ${optionString} ${choices.name} -p ${choices.packageManager}`
  );
}

async function hygenDependencies(choices: ProjectChoices): Promise<void> {
  logger.info(`Creating Hygen depencencies`);
  await execFunction(
    `hygen dependencies new --project ${choices.name} --packageManager ${choices.packageManager}`
  );
  await execFunction(
    `hygen controller new --project ${choices.name} && hygen persistence new --project ${choices.name} && hygen app new --project ${choices.name}`
  );
}
