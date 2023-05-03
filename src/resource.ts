import { execFunction } from "./process";
import { optionsToArgs } from "./cli/mapper";
import {
  ResourceChoices,
  ResourceOptions,
  toNestOptions,
} from "./cli/resource";
import { Logger } from "./logger";
import { pathExists, ApiProperty, checkJSON } from "./fs";
import fs from "fs";

export async function generateNewResource(
  choices: ResourceChoices
): Promise<void> {
  const optionString = optionsToArgs(choices.options, toNestOptions);

  const originalDirectory = process.cwd();
  process.chdir(choices.options.project);

  await nestResourceGenerate(optionString, choices);
  if (choices.options.dryRun) {
    return;
  }
  process.chdir(originalDirectory);
  await hygenDependencies(choices.options, choices);
  if (choices.options.json) {
    if (pathExists(choices.options.json)) {
      const entityContent = await JSONtoEntity(choices.options.json);
      const createDtoContent = await JSONtoCreate(
        choices.options.json,
        choices.name
      );

      fs.writeFileSync(
        `./${choices.options.project}/src/${choices.name}/entities/${choices.name}.entity.ts`,
        entityContent,
        { flag: "a" }
      );
      fs.writeFileSync(
        `./${choices.options.project}/src/${choices.name}/dto/create-${choices.name}.dto.ts`,
        createDtoContent,
        { flag: "w" }
      );
      await execFunction(
        `hygen entityContent add --name ${choices.name} --project ${choices.options.project}`
      );
    } else {
      Logger.error(`File ${choices.options.json} does not exist`);
    }
  }
}
async function nestResourceGenerate(
  optionString: string,
  choices: ResourceChoices
): Promise<void> {
  Logger.info(`Creating new nest resource`);
  await execFunction(`nest generate resource ${optionString} ${choices.name}`);
}

async function hygenDependencies(
  options: ResourceOptions,
  choices: ResourceChoices
): Promise<void> {
  Logger.info(
    `Adding PersistenceService (Module, Controller, Service, Entity) to the project`
  );
  await execFunction(
    `hygen resource new --name ${choices.name} --project ${options.project}`
  );
}

export async function JSONtoEntity(json: string): Promise<string> {
  let entityObject = await checkJSON(json);
  return (
    Object.entries(entityObject)
      .map(([key, property]) => {
        const sizeString = property.size ? `, length: ${property.size}` : "";
        let defaultString = "";
        if (property.default !== undefined) {
          if (typeof property.default === "string") {
            defaultString = `, default: '${property.default}'`;
          } else {
            defaultString = `, default: ${property.default}`;
          }
        }
        const apiPropertyString = apiPropertyToString(property, "entity");
        return `${apiPropertyString}@Column({ type: '${property.sqlType}'${sizeString}${defaultString} })\n${key}: ${property.type};\n`;
      })
      .join("\n") + "}"
  );
}

export async function JSONtoCreate(
  json: string,
  className: string
): Promise<string> {
  let entityObject = await checkJSON(json);
  const entityName = capitalizeFirstLetter(className);
  return `import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class Create${entityName}Dto {
    ${Object.entries(entityObject)
      .map(([key, property]) => {
        if (property.annotations?.exclude) {
          return "";
        }
        let apiPropertyString = apiPropertyToString(property, "create");
        return `${apiPropertyString}${key}: ${property.type};\n`;
      })
      .join("\n")}
}`;
}

function apiPropertyToString(property: any, type: string): string {
  const apiProperty =
    property.annotations?.apiProperty ?? ApiProperty.UNDOCUMENTED;
  let apiPropertyString = property.annotations?.exclude ? "@Exclude()\n" : "";
  if (apiProperty === ApiProperty.REQUIRED) {
    apiPropertyString = `@ApiProperty({ required: true })\n`;
  } else if (apiProperty === ApiProperty.OPTIONAL) {
    apiPropertyString = `@ApiPropertyOptional()\n`;
  } else if (apiProperty === ApiProperty.UNDOCUMENTED) {
    apiPropertyString = `@ApiHideProperty()\n`;
  }
  if (type === "create") {
    if (property.annotations?.isNotEmpty) {
      apiPropertyString += `@IsNotEmpty()\n`;
    }
    if (property.annotations?.isString) {
      apiPropertyString += `@IsString()\n`;
    }
  }
  return apiPropertyString;
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
