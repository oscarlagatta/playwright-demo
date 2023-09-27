import { Then } from '@cucumber/cucumber';
import {getIframeElement, inputValueOnIframe} from "../support/html-behaviour";
import { waitFor } from "../support/wait-for-behaviour";
import { getElementLocator } from "../support/web-element-helper";
import { ScenarioWorld } from "./setup/world";
import { ElementKey } from '../env/global';

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function (this:ScenarioWorld, elementKey: ElementKey, iframeName: string, inputValue: string) {

        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I fill in the ${elementKey} input on the ${iframeName} with ${inputValue}`);

        /*
        But basically what we're doing is we're taking a parameter "([^"]*)" of our new iframe.
        We're retrieving our basic iframe ID, and then we're passing that into a getIframeElement function
        that will actually return the iframe itself.
        */

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        const iframeIdentifier = getElementLocator(page, iframeName, globalConfig);


        await waitFor( async () => {

            const elementIframe = await getIframeElement(page, iframeIdentifier);

            const result = await page.waitForSelector(iframeIdentifier,
                {state: 'visible'}
            );

            if (result) {
                if (elementIframe) {
                    await inputValueOnIframe(elementIframe, elementIdentifier, inputValue);
                }
            }

            return result;
        });
    }
)