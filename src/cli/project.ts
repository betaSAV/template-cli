import { IsAlpha, IsEnum } from "class-validator";
import { validate } from "./validator";

export enum PackageManager {
  YARN = "yarn",
  NPM = "npm",
}

export class ProjectChoices {
  @IsAlpha()
  name: string;

  @IsEnum(PackageManager)
  packageManager: PackageManager;
}

interface ProjectOptions {
  dryRun: boolean;
  skipGit: boolean;
}

type OptionsMapping<T> = {
  [key in keyof T]: string;
};

const toNestOptions: OptionsMapping<ProjectOptions> = {
  dryRun: "-d",
  skipGit: "-s",
};

const optionsToArgs = <T extends {}>(
  options: T,
  optionsMap: OptionsMapping<T>
) =>
  Object.keys(options)
    .map((key: string) =>
      options[key as keyof T] === true ? optionsMap[key as keyof T] : ""
    )
    .join(" ");

export const handleProjectCommand = async (
  projectName: string,
  packageManager: PackageManager,
  options: { dryRun: boolean; skipGit: boolean }
) => {
  const choices: ProjectChoices = {
    name: projectName,
    packageManager,
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
  console.log(options);
  const optionString = optionsToArgs(options, toNestOptions);
  console.log(optionString);
  console.log(
    "nest new " + optionString + choices.name + " -p " + choices.packageManager
  );
  //const p = exec("nest new"+ optionString + choices.name + " -p " + choices.packageManager);
  //readOutput(p);
};
