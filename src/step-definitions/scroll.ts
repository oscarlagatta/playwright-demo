import { Then } from '@cucumber/cucumber';
import { scrollIntoView } from "../support/html-behaviour";
import { waitFor } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';

Then(
    /^I scroll to the "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {

        const {
            screen: { page },
            globalConfig
        } = this;

        console.log(`I scroll to the ${elementKey}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
           const result = await page.waitForSelector(elementIdentifier, {
               state: 'visible'
           });
           if (result) {
               await scrollIntoView(page, elementIdentifier);
           }
           return result;
        });
    }
)