import { execFunction } from "./process";
import { optionsToArgs } from "./cli/mapper";
import { ProjectChoices, toNestOptions } from "./cli/project";
import { Logger } from "./logger";

export async function buildNewProject(choices: ProjectChoices) {
  if (!choices.options) {
    choices.options = {};
  }
  const optionString = optionsToArgs(choices.options, toNestOptions);

  await nestProjectGenerate(optionString, choices);
  if (choices.options.dryRun) {
    return;
  }
  await hygenDependencies(choices);
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
  const projectName: string = cammelCaseToKebabCase(choices.name);
  Logger.info(`Creating Hygen depencencies`);
  await execFunction(
    `hygen dependencies new --project ${projectName} --packageManager ${choices.packageManager}`
  );
  Logger.info(`Adding project controller (Generic controller)`);
  await execFunction(`hygen controller new --project ${projectName}`);
  Logger.info(`Adding project persistence (Base Entity)`);
  await execFunction(`hygen persistence new --project ${projectName}`);
  Logger.info(`Adding TypeOrmModule to project module`);
  await execFunction(`hygen app new --project ${projectName}`);
  Logger.info(`Adding Helmet, Cors and Throttler to project module`);
  await execFunction(
    `hygen security apply --project ${projectName} --packageManager ${choices.packageManager}`
  );
  Logger.info(`Adding Authentification to the project (JWT, Passport)`);
  await execFunction(
    `hygen auth new --project ${projectName} --packageManager ${choices.packageManager}`
  );
  Logger.info(`Adding Swagger to the project`);
  await execFunction(`hygen swagger new --project ${projectName}`);
}

function cammelCaseToKebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}
