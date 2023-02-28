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
  const p = exec("nest generate -d resource " + elementName);
  readOutput(p);
};
