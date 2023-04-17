import fs from "fs";
import { Logger } from "./logger";
import { execFunction } from "./process";

enum PackageExecutor {
  YARN = "yarn",
  NPM = "npx",
}

interface Entity {
  name: string;
  properties: {
    [key: string]: {
      type: string;
      sqlType: string;
      size?: number;
      default?: string;
    };
  };
}

export function prettierFormat(project: string) {
  Logger.info(`Formatting project with prettier`);
  const packageManager = prettierExecutor(project);
  execFunction(`hygen prettier apply --project ${project} --packageManager ${packageManager}`);
}

function prettierExecutor(project: string): PackageExecutor {
  if (pathExists(`./${project}/yarn.lock`)) {
    return PackageExecutor.YARN;
  } 
  return PackageExecutor.NPM;
}

export function pathExists(path: string): boolean {
  return fs.existsSync(path);
}

export function generateFromJSON(path: string): string {
  const entityJson = fs.readFileSync(path, "utf8");
  const entityObject = JSON.parse(entityJson);

  let propertiesString = Object.keys(entityObject)
    .map((key) => {
      const property = entityObject[key];
      const sizeString = property.size ? `, length: ${property.size}` : '';
      let defaultString = '';
      if (property.default !== undefined) {
        if (typeof property.default === 'string') {
          defaultString = `, default: '${property.default}'`;
        } else {
          defaultString = `, default: ${property.default}`;
        }
      }
      return `@ApiProperty()\n@Column({ type: \'${property.sqlType}\'${sizeString}${defaultString} })\n${key}: ${property.type};\n`;
    })
    .join("\n");
  propertiesString += "\n}";

  return propertiesString;
}
