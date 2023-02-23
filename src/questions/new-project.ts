export const newProjectQuestions = [
  { "type": "input", "name": "projectName", "message": "What is the name for the new project?" },
  {
    "type": "list",
    "name": "packageManager",
    "message": "What package manager do you want to use?",
    "choices": ["npm", "yarn", "pnpm"]
  }
];
