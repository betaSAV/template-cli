import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate as classValidate } from "class-validator";
import { Logger } from "./logger";

export const validate = async <T>(
  cls: ClassConstructor<object>,
  plainObject: T
): Promise<string[]> => {
  return classValidate(plainToInstance(cls, plainObject)).then((errors) =>
    errors
      .map((error) =>
        Object.entries(error?.constraints ?? {}).map(([key, desc]) => desc)
      )
      .flat()
  );
};

export async function validateAndLogErrors<T>(
  validator: ClassConstructor<object>,
  value: T
): Promise<void> {
  const errors = await validate(validator, value);
  if (errors.length > 0) {
    Logger.error(
      `Class constructor: ${validator.name}\n\t\t${errors.join(",\n\t")}`
    );
    throw new Error("Command validation failed");
  }
}

export async function validateNestedAndLogErrors<T extends object>(
  validator: ClassConstructor<object>,
  plainObject: T
): Promise<void> {
  const errors = (
    await Promise.all(
      Object.values(plainObject).flatMap((v) => validate(validator, v))
    )
  ).flat();
  console.log(errors);
  if (errors.length > 0) {
    Logger.error(
      `Class constructor: ${validator.name}\n\t\t${errors.join(",\n\t")}`
    );
    throw new Error("Plain object validation failed");
  }
}
