export const newProjectQuestions = [
  { "type": "input", "name": "projectName", "message": "What is the name for the new project?" },
  {
    "type": "list",
    "name": "packageManager",
    "message": "What package manager do you want to use?",
    "choices": ["npm", "yarn", "pnpm"]
  }
];

export const newNestElements = [
  {
    "type": "list",
    "name": "nestElement",
    "message": "Which Nest element do you want to generate?",
    "choices": ["application", "class", "configuration", "controller", "decorator", "filter", "gateway", "guard", "interceptor", "interface", "middleware", "module", "pipe", "provider", "resolver", "service", "library", "sub-app", "resource"]
  },
  { "type": "input", "name": "elementName", "message": "What is the name for the new element?" }
];