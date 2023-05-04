import fs from "fs";
import { Logger } from "./logger";
import { execFunction } from "./process";
import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
import {
  validateNestedAndLogErrors,
} from "./validator";

enum PackageExecutor {
  YARN = "yarn",
  NPM = "npx",
}

export enum ApiProperty {
  REQUIRED = "required",
  OPTIONAL = "optional",
  UNDOCUMENTED = "undocumented",
}

enum PropertyType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "Date",
  OBJECT = "object",
}

enum PropertySqlType {
  BIT = "bit",
  TINYINT = "tinyint",
  SMALLINT = "smallint",
  INT = "integer",
  BIGINT = "bigint",
  DECIMAL = "decimal",
  NUMERIC = "numeric",
  FLOAT = "float",
  REAL = "real",

  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  TIMESTAMP = "timestamp",
  YEAR = "year",

  CHAR = "char",
  VARCHAR = "varchar",
  BOOLEAN = "boolean",
  TEXT = "text",

  NCHAR = "nchar",
  NVARCHAR = "nvarchar",
  NTEXT = "ntext",

  BINARY = "binary",
  VARBINARY = "varbinary",
  IMAGE = "image",

  CLOB = "clob",
  BLOB = "blob",
  XML = "xml",
  JSON = "json",
}

export class Entity {
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

  @IsOptional()
  default?: string;

  @IsOptional()
  annotations?: Annotations;
}

interface Annotations {
  exclude?: boolean;
  isNotEmpty?: boolean;
  isString?: boolean;
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

export async function checkJSON(path: string): Promise<Entity> {
  try {
    const entityJson = fs.readFileSync(path, "utf8");
    const entityObject: Entity = JSON.parse(entityJson);
    await validateNestedAndLogErrors(PropertySpec, entityObject);
    return entityObject;
  } catch (err: any) {
    throw err;
  }
}
