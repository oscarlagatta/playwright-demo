import { Page } from 'playwright';
import { GlobalConfig, PageId } from '../env/global';

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    { pagesConfig, hostsConfig}: GlobalConfig): Promise<void> => {

    const {
        //  if the environment variable is not set,
        //  will turn into 'localhost'
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env;

    const hostPath = hostsConfig[`${hostName}`];

    // console.log('hostPath ', hostPath);

    const url = new URL(hostPath);

    // console.log('url ', url);

    const pagesConfigItem = pagesConfig[pageId];

    url.pathname = pagesConfigItem.route;

    // console.log('url.pathname ', url.pathname);

    await page.goto(url.href);
}

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {

    const pageRegexString = pagesConfig[pageId].regex;
    const pageRegex = new RegExp(pageRegexString);

    return pageRegex.test(path);
}

export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    const { pathname: currentPath } = new URL(page.url());

    // console.log("currentPath ", currentPath);

    return pathMatchesPageId(currentPath, pageId, globalConfig);
}

export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig

): PageId => {

    // returns all the page mappings
    const { pagesConfig } = globalConfig;

    // console.log('pagesConfig ', pagesConfig);

    // object keys return array of the pages
    const pageConfigPageIds = Object.keys(pagesConfig);

    // console.log('pageConfigPageIds ', pageConfigPageIds);

    // retrieve the url from the browser
    const { pathname: currentPath } = new URL(page.url());

    // find a page using the .find where the url matches the regex
    const currentPageId = pageConfigPageIds.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
    );

    // console.log('currentPageId ', currentPageId);

    // if false we return error, if you try to pass e.g. login; and it's not
    // in the pages.json
    if(!currentPageId) {
        throw Error(
            `Failed to get page name from current route ${currentPath} \
             possible pages: ${JSON.stringify((pagesConfig))}`
        );
    }

    return currentPageId;
}

export const reloadPage = async ( page: Page): Promise<void> => {
    await page.reload();
}