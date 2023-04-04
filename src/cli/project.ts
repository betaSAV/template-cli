import { IsAlpha, IsBoolean, IsEnum, IsOptional } from "class-validator";
import { OptionsMapping } from "./mapper";
import { buildNewProject } from "../project";
import { prettierFormat, validateAndLogErrors } from "../io";
import { Logger } from "../logger";

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

export const toNestOptions: OptionsMapping<ProjectOptions> = {
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

  try {
    await validateAndLogErrors(ProjectChoices, choices);
    await validateAndLogErrors(ProjectOptions, options);
    await buildNewProject(choices);
    prettierFormat(choices.name);

  } catch (err: any) {
    Logger.error(`Something was wrong: ${err.message}`);
    process.exitCode = 1;
  }
};
