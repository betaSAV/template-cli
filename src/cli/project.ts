import { IsAlpha, IsBoolean, IsEnum, IsOptional } from "class-validator";
import { OptionsMapping } from "./mapper";
import { validate } from "./validator";
import { NestJSProjectBuilder } from "../project";

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
  const errors = await validate(ProjectChoices, choices);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    return;
  }

  const builder = new NestJSProjectBuilder();
  builder.build(choices);

};
