import { exec } from "child_process";
import { Command } from "commander";
import inquirer from "inquirer";
import { readOutput } from "../utils";
import { handleProjectCommand } from "./project";
import { handleResourceCommand } from "./resource";

export interface ElmentAnswers {
  nestElement: string;
  elementName: string;
}

export class CLIBuilder {
  private static program: Command;
  static build(): Command {
    this.program = new Command();
    this.initProgram();
    this.addCreateProject();
    this.addGenerateCommand();
    return this.program;
  }

  private static initProgram(): void {
    this.program
      .name("astid-template-cli")
      .description("CLI to make templates for astid projects")
      .version("0.0.2");
  }

  private static addCreateProject(): void {
    this.program
      .command("new")
      .alias("n")
      .description("Makes a default new project")
      .arguments("[projectName] [packageManager]")
      .option("-d, --dry-run", "Run through without making any changes")
      .action(handleProjectCommand);
  }

  private static addGenerateCommand() {
    this.program
      .command("generate")
      .alias("g")
      .description("Generates a Nest element")
      .arguments("[nestElement] [elementName]")
      .option("-d, --dry-run", "Run through without making any changes")
      .action(handleResourceCommand);
  }
}
