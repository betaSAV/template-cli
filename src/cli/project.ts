import { exec } from "child_process";
import { IsAlpha, IsBoolean, IsEnum, IsOptional } from "class-validator";
import { readOutput } from "../io";
import { OptionsMapping, optionsToArgs } from "./mapper";
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

const projectDependencies = [
  "@nestjs/swagger",
  "@nestjs/typeorm",
  "typeorm",
  "class-transformer",
  "class-validator",
];

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

  if (choices.packageManager === PackageManager.YARN) {
    const outputPackage = exec(`yarn add ${projectDependencies.join(" ")}`);
    await readOutput(outputPackage).catch((reason) => {
      console.error(`Something was wrong ${reason}`);
    });
  } else {
    const outputPackage = exec(
      `npm install --save ${projectDependencies.join(" ")}`
    );
    await readOutput(outputPackage).catch((reason) => {
      console.error(`Something was wrong ${reason}`);
    });
  }
  const hygen = exec(
    "hygen controller new; hygen persistence new; hygen app new"
  );
  await readOutput(hygen).catch((reason) => {
    console.error(`Something was wrong ${reason}`);
  });
};
