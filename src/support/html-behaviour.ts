import { Page, Frame } from 'playwright';
import { ElementLocator} from "../env/global";

export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.click(elementIdentifier);
}

export const inputValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.fill(elementIdentifier, input);
}

export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.selectOption(elementIdentifier, option);
}

export const checkElement = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.check(elementIdentifier);
}

export const uncheckElement = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.uncheck(elementIdentifier);
}

export const getValue = async(
    page: Page,
    elementIdentifier: ElementLocator
): Promise<string | null> => {

    // ensure the selector is ready
    await page.waitForSelector(elementIdentifier);

    // So we're using this get value to evaluate our element attribute, but then return
    // the element attribute value and ultimately return the string that sits within that value.
    return await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
        return el.value;
    });
}

export const getIframeElement = async(
    page: Page,
    iframeIdentifier: ElementLocator
): Promise<Frame | undefined | null> => {
    await page.waitForSelector(iframeIdentifier);

    const elementHandle = await page.$(iframeIdentifier);

    const elementIframe = await elementHandle?.contentFrame();

    return elementIframe;
}

export const inputValueOnIframe = async(
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await elementIframe.fill(elementIdentifier, inputValue);
}

export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await pages[pageIndex].focus(elementIdentifier);
    await pages[pageIndex].fill(elementIdentifier, inputValue);
}

export const clickElementAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    elementPosition: number
): Promise<void> => {

    /*
    * The nth of type selector allows us to select one or more elements
    * based on the source order, according to a formula.
    * We are passing our element position to determine the index of our retrieved element,
    * something to keep in mind the first element will be 0 index; that's the reason we do the
    * (-1) in the calling function
    * const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) -1;
    * and won't match the element.
    * */
    const element = await page.$(`${elementIdentifier}>>nth=${elementPosition}`);
    await element?.click();
}

export const getAttributeText = async (
    page: Page,
    elementIdentifier: ElementLocator,
    attribute: string
): Promise<string | null> => {

    // attribute text
    return page.locator(elementIdentifier).getAttribute(attribute);
}

export const scrollIntoView = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = page.locator(elementIdentifier);
    await element.scrollIntoViewIfNeeded();
}