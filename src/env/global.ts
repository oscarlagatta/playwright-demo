/*We use this to exploit global types that we will be using right across our automation framework.
 Will save us defining these types across multiple classes and files.
 The type system checks the validity of the supplied values before they're stored or manipulated by the program.
 This ensures that the code behaves as expected.

 In global.ts we've set up global types that will be accessible right across our framework.


* */

export type PageId = string;
export type PagesConfig = Record<PageId, Record<string, string>>;
export type HostsConfig = Record<string, string>;
export type ElementKey = string;
export type ElementLocator = string;
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>;
export type GlobalVariables = { [key: string]: string };

export type GlobalConfig = {
    hostsConfig: HostsConfig,
    pagesConfig: PagesConfig,
    pageElementMappings: PageElementMappings,
}


