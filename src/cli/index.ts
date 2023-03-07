import { Command } from "commander";
import { handleProjectCommand } from "./project";
import { handleResourceCommand } from "./resource";

export class CLIBuilder {
  private static program: Command;
  static build(): Command {
    this.program = new Command();
    this.initProgram();
    this.addCreateProject();
    this.addResourceCommand();
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
      .option(
        "-g, --skip-git",
        "Skip git repository initialization. (default: false)"
      )
      .action(handleProjectCommand);
  }

  private static addResourceCommand() {
    this.program
      .command("resource")
      .alias("res")
      .description("Generates a Nest resource")
      .arguments("[resourceName]")
      .option("-d, --dry-run", "Run through without making any changes")
      .action(handleResourceCommand);
  }
}
