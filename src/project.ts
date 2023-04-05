import { execFunction } from "./process";
import { optionsToArgs } from "./cli/mapper";
import { ProjectChoices, toNestOptions } from "./cli/project";
import { Logger } from "./logger";

export async function buildNewProject(choices: ProjectChoices) {
  const optionString = optionsToArgs(choices.options, toNestOptions);

  try {
    await nestProjectGenerate(optionString, choices);
    if (choices.options.dryRun) {
      return;
    }
    await hygenDependencies(choices);
  } catch (err: any) {
    Logger.error(`Something was wrong ${err}`);
    return;
  }
}

async function nestProjectGenerate(
  optionString: string,
  choices: ProjectChoices
): Promise<void> {
  Logger.info(`Creating new nest project`);
  await execFunction(
    `nest new ${optionString} ${choices.name} -p ${choices.packageManager}`
  );
}

async function hygenDependencies(choices: ProjectChoices): Promise<void> {
  Logger.info(`Creating Hygen depencencies`);
  await execFunction(
    `hygen dependencies new --project ${choices.name} --packageManager ${choices.packageManager}`
  );
  Logger.info(`Adding project controller (Generic controller)`);
  await execFunction(
    `hygen controller new --project ${choices.name}`
  );
  Logger.info(`Adding project persistence (Base Entity)`);
  await execFunction(
    `hygen persistence new --project ${choices.name}`
  );
  Logger.info(`Adding TypeOrmModule to project module`);
  await execFunction(
    `hygen app new --project ${choices.name}`
  );
  Logger.info(`Adding Helmet, Cors and Throttler to project module`);
  await execFunction(
    `hygen security apply --project ${choices.name} --packageManager ${choices.packageManager}`
  );
  Logger.info(`Adding Authentification to the project (JWT, Passport)`);
  await execFunction(
    `hygen auth new --project ${choices.name} --packageManager ${choices.packageManager}`
  );
  Logger.info(`Adding Swagger to the project`);
  await execFunction(
    `hygen swagger new --project ${choices.name}`
  );
}
