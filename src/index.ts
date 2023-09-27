/*
* The purpose of the index.ts is used to be able to enable dynamic parameters
* to be passed via the actual cucumber arguments that we passed when we call
* the cucumber executable.
*
*
* */
import dotenv from 'dotenv';
import * as fs from "fs";
import {env, getJsonFromFile} from './env/parseEnv';
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig,
    PageElementMappings,
} from "./env/global";

const environment = env('NODE_ENV');

dotenv.config({
    path: env('COMMON_CONFIG_FILE')
});
// retrieve all env variables from file,
// populates these vars

// console.log(`${env('ENV_PATH')}${environment}`);
dotenv.config( {path: `${env('ENV_PATH')}${environment}.env`});

// retrieve json and store them
const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));

// console.log("hostsConfig ", hostsConfig);

const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'));

// console.log("pagesConfig ", pagesConfig);

/*
*
* readdirSync, basically it's a method used to synchronously read the contents of a given directory.
* The method returns an array with all the file names or objects in the directory.
* The options argument can be used to change the format in which the files are returned from the method.
* Expects a direct path
*  */
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)

/*
* So the final result of running the reducer across all elements of the array is a single value.
* const key = file.replace('.json', '');
* what's going to happen is it's basically going to return all our mappings pages.
* We might have a home.json, you might have a login.json.
* Is going to basically take our file name and replace '.json' with nothing ''.
* Meaning that in our mapping also it'll show `home` and then the relevant mappings,
* `log` in and the relevant mappings.
* const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
* We retrieve our mappings from each of our mappings .json
* And finally
* return {...pageElementConfigAcc, [key]: elementMappings};
* It's returning our object containing each page and its associated mappings.
*  */
const pageElementMappings: PageElementMappings = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        const key = file.replace('.json', '');
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
        return {...pageElementConfigAcc, [key]: elementMappings};
    },
    {}
)

const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
    pageElementMappings,
}

const common = `./src/features/**/*.feature \ 
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)} \
                -f json:./reports/report.json \
                --format progress-bar \
                --parallel ${env('PARALLEL')} \
                --retry ${env('RETRY')}`;

// Profiles for running: cucumber-js --profile <option>
const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression };
