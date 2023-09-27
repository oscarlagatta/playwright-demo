import { Then } from '@cucumber/cucumber';
import {checkElement, uncheckElement} from "../support/html-behaviour";
import { waitFor } from '../support/wait-for-behaviour';
import { ScenarioWorld } from './setup/world';
import { getElementLocator} from "../support/web-element-helper";
import { ElementKey} from "../env/global";

Then(
    /^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/,
    async function(this: ScenarioWorld, checked: boolean, unchecked: boolean, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I ${unchecked?'uncheck': 'check'} checked the ${elementKey} check box|radio button`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        // console.log(`check ${checked}`);
        // console.log(`unchecked ${unchecked}`);


        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: 'visible'
            });
            if (result) {
                console.log(`test ${!!unchecked}`);
                if(!!unchecked) {
                    await uncheckElement(page, elementIdentifier);
                } else {
                    await checkElement(page, elementIdentifier);
                }
            }
            return result;
        });
    }
)