import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate as classValidate } from "class-validator";

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
