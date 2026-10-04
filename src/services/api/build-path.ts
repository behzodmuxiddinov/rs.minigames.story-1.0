type PathParameters<T extends string> =
  T extends `${string}:${infer Parameter}/${infer Rest}`
    ? Parameter | PathParameters<`/${Rest}`>
    : T extends `${string}:${infer Parameter}`
      ? Parameter
      : never;

type PathArguments<T extends string> = [PathParameters<T>] extends [never]
  ? []
  : [parameters: Record<PathParameters<T>, string | number>];

export const buildPath = <T extends string>(
  path: T,
  ...[parameters]: PathArguments<T>
): string =>
  path.replaceAll(/:(\w+)/g, (_, key: string) =>
    encodeURIComponent(
      String((parameters as Record<string, string | number>)[key]),
    ),
  );
