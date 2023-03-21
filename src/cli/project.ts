import { IsAlpha, IsBoolean, IsEnum, IsOptional } from "class-validator";
import { exec } from "child_process";
import { OptionsMapping, optionsToArgs } from "./mapper";
import { validate } from "./validator";
import { readOutput } from "../io";

export enum PackageManager {
  YARN = "yarn",
  NPM = "npm",
}

export class ProjectChoices {
  @IsAlpha()
  name: string;

  @IsEnum(PackageManager)
  packageManager: PackageManager;

  options: ProjectOptions;
}

export class ProjectOptions {
  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;

  @IsOptional()
  @IsBoolean()
  skipGit?: boolean;
}

const toNestOptions: OptionsMapping<ProjectOptions> = {
  dryRun: "-d",
  skipGit: "-s",
};

export const handleProjectCommand = async (
  projectName: string,
  packageManager: PackageManager,
  options: ProjectOptions
) => {
  const choices: ProjectChoices = {
    name: projectName,
    packageManager,
    options,
  };
  // if (!(choices.name && choices.packageManager)) {
  //   const answers = await inquirer.prompt<ProjectChoices>(newProjectQuestions);
  //   choices.name = answers.name;
  //   choices.packageManager = answers.packageManager;
  // }
  const errors = await validate(ProjectChoices, choices);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    return;
  }

  const optionString = optionsToArgs(choices.options, toNestOptions);

  const outputNest = exec(
    `nest new ${optionString} ${choices.name} -p ${choices.packageManager}`
  );
  try {
    await readOutput(outputNest);
  } catch (err: any) {
    console.error(`Something was wrong ${err}`);
    return;
  }

  if (choices.options.dryRun) {
    return;
  }

  const outputPackage = exec(
    `hygen dependencies new --project ${choices.name} --packageManager ${choices.packageManager}`
  );
  await readOutput(outputPackage).catch((reason) => {
    console.error(`Something was wrong ${reason}`);
  });

  const hygen = exec(
    `hygen controller new --project ${choices.name} && hygen persistence new --project ${choices.name} && hygen app new --project ${choices.name}`
  );
  await readOutput(hygen).catch((reason) => {
    console.error(`Something was wrong ${reason}`);
  });
};
