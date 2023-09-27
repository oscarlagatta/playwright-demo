import { Page } from 'playwright';
import { ElementKey, ElementLocator, GlobalConfig} from "../env/global";
import {getCurrentPageId} from "./navigation-behavior";

/*
* Will determine our element identifier based on our current page and the element key
* or parameter passed by cucumber.
* */
export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    // globalVariables: GlobalVariables,
    globalConfig: GlobalConfig
): ElementLocator => {

    const currentPage = getCurrentPageId(page, globalConfig);
    // Get Page elements mapping from global config
    const { pageElementMappings } = globalConfig;

    // // retrieve our currently set of global variables for current screen
    // const currentPage = globalVariables.currentScreen;


    // We're returning our page element mappings based on our current page, e.g. Home
    // However, if this element, key or keys don't exist, basically try and then retrieve from common.json
    return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
}
