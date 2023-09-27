import { Then } from '@cucumber/cucumber';
import {ElementKey} from "../../env/global";
import {getElementLocator} from "../../support/web-element-helper";
import { ScenarioWorld } from "../setup/world";
import { waitFor } from '../../support/wait-for-behaviour';


Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function (
        this:ScenarioWorld,
        elementPosition: string,
        negate: boolean,
        expectedTitle: string
    ) {

        const {
            screen: {page, context},
        } = this;

        console.log(`the ${elementPosition} tab|window should ${negate ? 'not ' : ''}contain the title ${expectedTitle}`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1;

        /*
        * So this is leveraging waitForTimeout. It'll be the only way for time out in
        * the entire framework; when we play around with windows and tabs. And the reason for that
        * is there's no real native way to assert correctly on a new tab and not have a fragile test.
        * There are few workarounds, but this is a good simple solution to basically make it.
        * So when you transition tabs and windows in the middle of the test,
        * potentially running hundreds of tests in parallel, you won't have any instability issues.
        *  */

        await page.waitForTimeout(2000);

        await waitFor( async () => {
            /*
            *
            * So we're introducing another new concept here, and what this will do is get out current
            * "context" as in everything happening within the browser, and it will return it as pages.
            * In this situation we know we're going to have multiple tabs open and so
            * pages the object is actually going to contain all the pages within our current browser,
            * whether it's one, two, three, four, etc.
            *
            *  */
            let pages = context.pages();

            const pageTitle = await pages[pageIndex].title();

            return pageTitle?.includes(expectedTitle) === !negate;
        })
    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        elementPosition: string,
        negate: boolean
    ) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        console.log(`The ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':''} be displayed`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1;

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
           let pages = context.pages();

           const isElementVisible = (await pages[pageIndex].$(elementIdentifier)) != null;

           return isElementVisible === !negate;
        });
    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "(.*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        elementPosition: string,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        console.log(`The ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':''} contain the text ${expectedElementText}`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1;

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
            let pages = context.pages();

            const elementText = await pages[pageIndex].textContent(elementIdentifier);

            return elementText?.includes(expectedElementText) === !negate;
        });
    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "(.*)"$/,
    async function (
        this: ScenarioWorld,
        elementKey: ElementKey,
        elementPosition: string,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        console.log(`The ${elementKey} on the ${elementPosition} tab|window should ${negate?'not ':''}equal the text ${expectedElementText}`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1;

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor( async () => {
            let pages = context.pages();

            const elementText = await pages[pageIndex].textContent(elementIdentifier);

            return (elementText === expectedElementText) === !negate;
        });
    }
)