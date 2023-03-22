import { ChildProcess, exec } from "child_process";
import { readOutput } from "./io";
import { optionsToArgs } from "./cli/mapper";
import { ProjectChoices, toNestOptions } from "./cli/project";
import { logger } from "./logger";

export async function nestNewProject(choices: ProjectChoices) {
  const optionString = optionsToArgs(choices.options, toNestOptions);

  await nestProjectGenerate(optionString, choices);
  if (choices.options.dryRun) {
    return;
  }
  await hygenDependencies(optionString, choices);
}
async function nestProjectGenerate(
  optionString: string,
  choices: ProjectChoices
) {
  logger.info(`Creating new nest project`);
  const outputNest = exec(
    `nest new ${optionString} ${choices.name} -p ${choices.packageManager}`
  );
  await readAndCheckOutput(outputNest);
}

async function hygenDependencies(
  optionString: string,
  choices: ProjectChoices
) {
  logger.info(`Creating Hygen depencencies`);
  const outputPackage = exec(
    `hygen dependencies new --project ${choices.name} --packageManager ${choices.packageManager}`
  );
  await readAndCheckOutput(outputPackage);
}

async function readAndCheckOutput(outputNest: ChildProcess) {
  try {
    await readOutput(outputNest);
  } catch (err: any) {
    logger.error(`Something was wrong ${err}`);
    return;
  }
}
