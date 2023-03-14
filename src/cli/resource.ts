import { exec } from "child_process";
import inquirer from "inquirer";
import { readOutput } from "../io";
import { newResourceQuestions } from "./questions/resource";

export interface ElementAnswers {
  elementName: string;
}

export const handleResourceCommand = async (elementName: string) => {
  if (!elementName) {
    const answers = await inquirer.prompt<ElementAnswers>(newResourceQuestions);
    elementName = answers.elementName;
  }
  const outputNest = exec("nest generate -p resource " + elementName);
  await readOutput(outputNest);
  const hygen = exec("hygen resource new --name " + elementName);
  await readOutput(hygen);
};
