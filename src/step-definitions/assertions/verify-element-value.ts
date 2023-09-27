import { Then } from '@cucumber/cucumber';

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

import { ElementKey } from '../../env/global';
import {getAttributeText, getValue} from "../../support/html-behaviour";
import { getElementLocator } from '../../support/web-element-helper';
import {ScenarioWorld} from "../setup/world";
import { waitFor } from '../../support/wait-for-behaviour';


Then(
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {

        const {
            screen: { page },
            globalConfig,
            // globalVariables
        } = this;

        console.log(`the ${elementKey} should  ${negate?'not':''}contain the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
            const elementText = await page.textContent(elementIdentifier);
            // can return null
            return elementText?.includes(expectedElementText) === !negate;
        });
    }
)

Then(
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate?'not':''}equal the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
            const elementText = await page.textContent(elementIdentifier);

            return (elementText === expectedElementText) === !negate;
        });
    }
)

Then(
    /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, elementValue: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate?'not':''}contain the value ${elementValue}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
            const elementAttribute = await getValue(page, elementIdentifier);

            return elementAttribute?.includes(elementValue) === !negate;
        });
    }
)

Then(
    /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, elementValue: string) {

        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate?'not':''}equal the value ${elementValue}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
            const elementAttribute = await getValue(page, elementIdentifier);

            return (elementAttribute === elementValue) === !negate;
        });
    }
)

Then(
    /^the "([^"]*)" should( not)? be enabled$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate?'not':''}be enabled`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
           // playwright isEnabled
           const isElementEnabled = await page.isEnabled(elementIdentifier);

           return isElementEnabled === !negate;
        });
    }
)

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementPosition: string,
        elementKey: ElementKey,
        negate: boolean,
        expectedElementText: string) {

        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementPosition} ${elementKey} should ${negate?'not':''}contain the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1;

        await waitFor( async () => {
            // playwright isEnabled
            const elementText = await page.textContent(`${elementIdentifier}>>nth=${pageIndex}`);

            return elementText?.includes(expectedElementText) === !negate;
        });
    }
)


Then(
    /^the "([^"]*)" "([^"]*)" attribute should( not)? contain the text "(.*)"$/,
    async function(
        this: ScenarioWorld,
        elementKey: ElementKey,
        attribute: string,
        negate: boolean,
        expectedElementText: string) {


        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} ${attribute} attribute should ${negate?'not':''}contain the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {

            const attributeText = await getAttributeText(page, elementIdentifier, attribute);

            return attributeText?.includes(expectedElementText) === !negate;

        });

    }
)