import fs from "fs";
import { Logger } from "./logger";
import { execFunction } from "./process";
import { IsAlpha, IsEnum, IsInt, IsOptional, IsPositive, isAlpha } from "class-validator";
import { validateAndLogErrors } from "./validator";

enum PackageExecutor {
  YARN = "yarn",
  NPM = "npx",
}

enum ApiProperty {
  REQUIRED = "required: true",
  OPTIONAL = "required: false",
  UNDOCUMENTED = "undocumented",
}

enum PropertyType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  ARRAY = "array",
  OBJECT = "object",
}

enum PropertySqlType {
  VARCHAR = "varchar",
  INT = "int",
  BOOLEAN = "boolean"
}

class Entity {
  [key: string]: PropertySpec;
}

class PropertySpec {
  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(PropertySqlType)
  sqlType: PropertySqlType;

  @IsInt()
  @IsPositive()
  @IsOptional()
  size?: number;

  default?: string;

  annotations?: Annotations;
}

interface Annotations {
  exclude?: boolean;
  apiProperty?: ApiProperty;
}

export function prettierFormat(project: string) {
  Logger.info(`Formatting project with prettier`);
  const packageManager = prettierExecutor(project);
  execFunction(
    `hygen prettier apply --project ${project} --packageManager ${packageManager}`
  );
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

export async function generateFromJSON(path: string): Promise<string> {
  const entityJson = fs.readFileSync(path, "utf8");
  const entityObject: Entity = JSON.parse(entityJson);
  await validateAndLogErrors(Entity, entityObject);

  let propertiesString = "";
  propertiesString += Object.keys(entityObject)
    .map((key) => {
      const property = entityObject[key];
      const sizeString = property.size ? `, length: ${property.size}` : "";
      let defaultString = "";
      if (property.default !== undefined) {
        if (typeof property.default === "string") {
          defaultString = `, default: '${property.default}'`;
        } else {
          defaultString = `, default: ${property.default}`;
        }
      }
      const apiProperty = property.annotations?.apiProperty;
      const exclude = property.annotations?.exclude;
      const apiPropertyString = apiProperty ? `@ApiProperty({ ${ApiProperty[apiProperty]} })\n` : "";
      const excludeString = exclude ? "@Exclude()\n" : "";
      return `${excludeString}${apiPropertyString}@Column({ type: '${property.sqlType}'${sizeString}${defaultString} })\n${key}: ${property.type};\n`;
    })
    .join("\n");
  propertiesString += "\n}";

  return propertiesString;
}
