const { Command } = require("commander");
const { stdout, stderr } = require("process");
const program = new Command();

program
  .name("astid-template-cli")
  .description("CLI to make templates for astid projects")
  .version("0.0.1");

program
  .command("new")
  .description("Makes a default new project")
  .argument("<projectName>", "name of the project.")
  .option(
    "-p, --package",
    "Package manager to use in the project. <npm, yarn, pnpm>"
  )
  .action((str, options) => {
    var spawn = require("child_process").spawn;
    var p = spawn("nest", ["new", "-d", `${str}`, "-p", `${options.package}`]);

    readOutput(p);
    //readInput(p);
  });

function readInput(p) {
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", function (key) {
    if (key == "\u0003") {
      // ctrl-c
      process.exit();
    } else {
      p.stdin.write(key);
    }
  });
}

function readOutput(p) {
  p.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  p.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  p.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

program.parse();
