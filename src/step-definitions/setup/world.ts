/* import necessary functions from Playwright and Cucumber,  */
import playwright, {
    BrowserContextOptions,
    Page,
    Browser,
    BrowserContext,
    BrowserType,
} from "playwright";
import { World, IWorldOptions, setWorldConstructor, } from "@cucumber/cucumber";
import { env } from "../../env/parseEnv";
import {GlobalConfig, GlobalVariables} from "../../env/global";

export type Screen = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options)
        /*
        This ensures the global configuration
        for host and pages is accessible
        through cucumber world in each scenario.
        * */
        this.globalConfig = options.parameters as GlobalConfig;
        this.globalVariables = {}
    }

    globalConfig: GlobalConfig;
    globalVariables: GlobalVariables;

    screen!: Screen;

    /* init for the class */
    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
        /* replaces logic we had in the hooks file*/
        await this.screen?.page?.close();
        await this.screen?.context?.close();
        await this.screen?.browser?.close();

        // newBrowser(), custom function to determine the browser based on an environment variable that we set
        // will dictate if we run on Chromium, Firefox or Webkit (Safari).
        const browser = await this.newBrowser();
        const context = await browser.newContext(contextOptions);
        const page = await context.newPage();

        this.screen = { browser, context, page};

        return this.screen;
    }

    /*
        Function that determines the browser
    * */
    private newBrowser = async (): Promise<Browser> => {

        // setup automation browsers as allowed browsers by Playwright
        const automationBrowsers = ['chromium', 'firefox', 'webkit'];
        // set a new type of AutomationBrowser passing a number
        type AutomationBrowser = typeof automationBrowsers[number];
        const automationBrowser = env("UI_AUTOMATION_BROWSER") as AutomationBrowser;

        const browserType: BrowserType = playwright[automationBrowser];

        return await browserType.launch({
            devtools: process.env.DEVTOOLS !== 'false',
            headless: process.env.HEADLESS !== 'false',
            args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process'] // disables some features to increase speed in our tests, as will take less memory
        });
    }
}

// always at the bottom of the file
// and sets the world constructor for the entire class
setWorldConstructor(ScenarioWorld);