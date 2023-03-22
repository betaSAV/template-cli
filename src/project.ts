import { exec } from "child_process";
import { readOutput } from "./io";
import { optionsToArgs } from "./cli/mapper";
import { ProjectChoices, toNestOptions } from "./cli/project";

export interface ProjectBuilder {
  build(choices: ProjectChoices): Promise<void>;
}

export class NestJSProjectBuilder implements ProjectBuilder {
  async build(choices: ProjectChoices): Promise<void> {

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
  }
}
