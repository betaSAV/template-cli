export type OptionsMapping<T> = {
  [key in keyof T]: string;
};

export const optionsToArgs = <T extends {}>(
  options: T,
  optionsMap: OptionsMapping<T>
) =>
  Object.keys(options)
    .map((key: string) =>
      options[key as keyof T] === true ? optionsMap[key as keyof T] : ""
    )
    .join(" ");
