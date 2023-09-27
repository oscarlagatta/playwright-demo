import { Given} from '@cucumber/cucumber';
import { PageId } from "../env/global";
import {navigateToPage, currentPathMatchesPageId, reloadPage} from "../support/navigation-behavior";
import {waitFor} from "../support/wait-for-behaviour";
import { ScenarioWorld } from "./setup/world";


Given(
    /^I am on the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {

        const {
            screen: { page },
            // globalVariables,
            globalConfig,
        } = this;

        console.log(`I am on the ${pageId} page`);

        // /*
        // * It will set our current screen global variable inside the specific scenarios
        // * at this stage that will be set to home.
        // *  */
        // globalVariables.currentScreen = pageId;

        await navigateToPage(page, pageId, globalConfig);

        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
    }
)

Given(
    /^I am directed to the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I am directed to the ${pageId} page`);

        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));

    }
)

Given(
    /^I refresh the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I refresh the ${pageId} page`);

        await reloadPage(page);

        await waitFor( () => currentPathMatchesPageId(page, pageId, globalConfig), {
            timeout: 30000
        });
    }
)