/*
* If parses env then we are expecting an environment variable to be set
* otherwise stop the test.
* If not browser is defined we can't run the test.
* */

export const env = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw Error(`No environment variable found for ${key}`);
    }
    return value;
}

/*
* getJasonFromFile and return it in this structure Record<string, string>
  If then we cross back into our global.ts; it's very simple, and it's matching
  to actual types, mapping our types declaration global.ts, and it needs to be
  because the global object that comes back from that in order to use it, we are
  required to match the mappings.
* */
export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
    return require(`${process.cwd()}${path}`)
}

export const envNumber = (key: string): number => {
    return Number(env[key]);
}