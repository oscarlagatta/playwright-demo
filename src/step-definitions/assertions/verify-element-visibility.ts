import { Then } from '@cucumber/cucumber';
import {ElementKey} from "../../env/global";

/*
*
* So you might be wondering why we're removing our assertion library playwright test
* import { expect } from '@playwright/test';, so playwright test * is not going to work well with our
* new custom retry as it is not designed to return a true/false.
* It's designed to pass or fail automation test or step based on a positive or negative assertion using
* the playwright test function assert.
* @playwright/test is also not designed to work well with custom retries in an existing cucumber step function.
* For that reason, we are going to use native TypeScript and JavaScript functions.
* The benefit of this is that we are going to have all the same assertion functionality that the playwright
* test package provides, but we don't have to have the additional package @playwright/test
* plus we can use them for our custom retry functions right across the entire framework.
* */
import { getElementLocator } from '../../support/web-element-helper';
import {ScenarioWorld} from "../setup/world";
import { waitFor } from '../../support/wait-for-behaviour';


Then(
    /^the "([^"]*)" should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: string, negate: boolean) {

        const {
            screen: { page },
            // globalVariables,
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate?'not':''} be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
           return ((await page.$(elementIdentifier)) != null) === !negate;
        });
    }
)

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean) {

        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementPosition} ${elementKey} should ${negate?'not':''} be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        const index = Number(elementPosition.match(/\d/g)?.join('')) -1;

        await waitFor(async () => {

            const isElementVisible = (await page.$(`${elementIdentifier}>>nth=${index}`)) != null;

            return isElementVisible === !negate;
        });
    }
)

Then(
    /^I should( not)? see "(\d*)" "([^"]*)" displayed$/,
    async function(
        this: ScenarioWorld,
        negate: boolean,
        count: string,
        elementKey: ElementKey
    ) {

        const {
            screen: {page},
            globalConfig,
        } = this;

        console.log(`I should ${negate?'not ':''} see ${count} ${elementKey} displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
           // $$ matches all elements
           const element = await page.$$(elementIdentifier);

           return (Number(count) === element.length) === !negate;
        });
    }
)