import { exec } from "child_process";
import inquirer from "inquirer";
import { readOutput } from "../utils";
import { newResourceQuestions } from "./questions/resource";

export interface ElmentAnswers {
  elementName: string;
}

export const handleResourceCommand = async (elementName: string) => {
  if (!elementName) {
    const answers = await inquirer.prompt<ElmentAnswers>(newResourceQuestions);
    elementName = answers.elementName;
  }
  const outputNest = exec("nest generate resource " + elementName);
  await readOutput(outputNest);
  const hygen = exec("hygen resource new --name " + elementName);
  await readOutput(hygen);
};
