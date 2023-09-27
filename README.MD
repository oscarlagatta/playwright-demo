General information

Playwright


Playwright is a node library to automate the Chromium, web kit and Firefox browsers.
It enables cross browser web automation that is evergreen, capable, reliable and fast.

# What differentiates it from the competition.

- Can run on any browser, on any platform.
- Playwright supports all modern rendering engines, including Chromium, Web Kit and Firefox.
- Can test on Windows, Linux and MacOS; headless or headed.
- Can use the playwright API with TypeScript, JavaScript, Python, Dot Net or Java. 
- and it has the ability for native mobile emulation of Google Chrome for Android and Mobile Safari.
- Same rendering engine works on the desktop and in the Cloud 

# Resilience
 
- Auto-wait Playwright waits for elements to be actionable prior to performing actions.
- It also has a rich set of introspection events.
- The combination of these the two eliminate the need for artificial timeouts, which is a primary cause of flaky tests.

# Web-first assertions

- Playwright assertions are created specifically for the dynamic web; checks automatically and retries until the necessary conditions are met.

# Tracing

- Configure test retry strategy.
- Capture execution.
- Trace videos and screenshots to eliminate flaky tests.


# No tradeoffs, no limits.

- Multiple everything. Test scenarios that span through multiple tabs, multiple origins and multiple users.
- Creates scenarios with different contexts for different users and run them against your server all in one test
- Trusted events: hover elements, interact with dynamic controls, produce trusted events.
- Playwright uses real browser input pipeline indistinguishable from the real user.
- Test frames peer shadow DOM: Playwright selectors pierce shadow downs and allow entering frames seamlessly.

# Full isolation and fast execution

- Browser contexts: Playwright creates a browser context for each test. 
- Browser context is equivalent to a brandnew browser profile.
- This delivers full test isolation with zero overhead. Creating a new browser context only takes a handful of milliseconds.
- Log in once: to save the authentication state of the context and re-use it in all your test. This bypasses repetitive logging operations in each test, yet delivers full isolation of independent tests.

# Powerful tooling

- Codgen: generates test by recording the actions. Save them into any language.
- Playwright inspector: which helps you to inspect pages, step through the test execution, see click points and explore our execution logs.
- Trace viewer: We can capture all the information to investigate the test failure.
- Playwright Trace contains test execution screencast, live Dom, Snapshots, action explorer, test sources, and many more.



- We want an automation framework that caters for a variety of skill levels.
- We want a framework that's easy to maintain over time.

- The flexibility to make changes
- Encourage shared ownership right across the team.
- Leading tooling under the hood 
- Increase collaboration right across the team
- Object orientated design and benefits that go along with 
- Readability - easy to understand
- Ability to quickly add automation tests and really focus on the automation
- Low code, low complexity,
- open source and finally zero cost.

Playwright Automation Framework Doco

https://playwright.dev/docs/intro

Cucumber Documentation

https://cucumber.io/docs/cucumber/

npx -p typescript tsc --init
yarn add playwright -D
yarn add @playwright/test -D // assertion libraries to validate results 
yarn add @cucumber/cucumber -D
d


"noImplicitAny": false,  // convert typescript from an optionally typed to a type language, reason of false some packages like
cucumber are not fully developed with typescript, that javascript developed.

```
"scripts": {
"cucumber": "cucumber-js src/features/**/*.feature --require-module ts-node/register --require src/step-definitions/**/**/*.ts"
},
```

1. `--require-module` is es6 support necessary when using cucumber, 
2. `--require` for step definitions is where the step definitions can be found

terminal we should be able to run 

`yarn run cucumber`

Rexeg that accepts a string inside a set of double quotes
/^I am on the "([^"]*)" page$/,

Segregate Test locations; test-id, or data-id (recommended); cleaner code and readable 

In the hooks we have the browser context, like here below

`global.context = await global.browser.newContext();`

Browser context is an isolated, incognito like session within a browser instance, browser context, fast and cheap to create.

It's recommend running each test scenario in its own new browser context so that the browser state is 
isolated between tests definitions directly from the playwright document docs. 

But it's an essential to understand that when you're setting a new context.
It's basically taking your browser and saying, Hey, this is completely fresh.
It's almost an incognito window. No cache, no cookies, fresh context for the browser.

Global.page 


A browser context can have multiple pages, a page refers to a single tab or pop-up window within a browser context.
It should be used to navigate to URLs and interact with the page's content.
As you can see below, we are just setting a new global page global context, a new page, which means we will have a single tab in which we run our automation.

`global.page = await global.context.newPage();`


## Cucumber World

Cucumber World is an isolated context for each scenario exposed to the hooks and steps as this enabling us to sit and recall some state across the lifecycle of your scenario.
Is accessible via this in scenario `before`, `after`, `when`, `given` and `then` the steps used to solve scenario configuration and current playwright browser a great way.

Enables us the ability to set global configuration for each scenario, meaning all our cucumber scenarios run independently and `retain any configuration` or `variables` set before or throughout.


And basically what we're doing is we're disabling a lot of the security that Google has introduced in the Chrome browser, and it's going to significantly speed up our tests.
```
const browser = await browserType.launch({
    headless: process.env.HEADLESS !== 'false',
    args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process']
});
```

## Cucumber World

It is an isolated context for each scenario exposed to the hooks and steps as this enabling us to sit and recall some state across the lifecycle of our scenarios.

Cucumber world is accessible via `this` in scenario `before`, `after`, `when`, `given` and `then` steps. It's used to solve scenario configuration and current playwright browser. 
I understand the real benefit of *cucumber world* in separate context and configuration for every scenario is by imagining the following scenario. 
I want you to imagine we have five cucumber scenarios; each scenario we want to store of value in a global variable to persist the entirety of our test.
Perhaps it's the credit card balance of a user that we store at the start of each test. So when we want to make a five pounds purchase, we can set on an expected balance.
Obviously, we know what our balance will be if we are running these tests over and over again, and we don't want to update our automation tests to validate our balance for every test suite run.
Running a scenario, one test after the other will work really well with a simple global variable, setting the balance during each test.
Assuming we are retrieving the balance and asserting on our stored balance minus our purchase price, however, it's when we run these tests in parallel that this approach will fail.
It will fail because our global variable which is not leveraging `cucumber world` as it can be shared across our entire framework.
All five scenarios, even when running at the same time, could be updated or overwritten at the wrong time, causing the test to fail.
**Cucumber World** enables us the ability to set global configuration for each scenario, meaning all our `cucumber scenarios` run independently and retain any configuration or variables set before or throughout.
Remember when we set up our first automation test; and we had to reference `Global.Page` in order to use **playwright's** **page function** in order to interact with each page.
`await global.page.goto("http://localhost:4200");`
We are using the global .d.ts within TypeScript to put Interfaces and Types in the global namespace to make it easier to have the **Page** type from Playwright available for consumption in all our TypeScript code.
THIS IS NOT BEST PRACTICE It's really just a way to enable us to get up and running quickly with our Cucumber Playwright and TypeScript.
Now we are going to implement our **Playwright pages types** via Cucumber World and pass it correctly through our cucumber steps. This will provide us the ability to separate out our browser page and context for each scenario.
It will also provide a much cleaner way to utilize our `hooks.ts` and enable us the ability to easily run our tests across different browsers, from Chrome to Safari to Firefox.


yarn add @babel/cli -D  // core component for compilation
yarn add @babel/preset-env -D  // uses latest javascript
yarn add @babel/preset-typescript -D

yarn add dotenv -D  // MODULE for .env files

dotenv it's a zero dependency module that loads environment variables from a .env file into a process and 
storages configuration environment separate from code and is based on 12 factor app methodology.

For us, it's basically just saying, Hey, you have passed a common config file through in the script that you call from your package.json

And we configure to sit in the process.env 
``dotenv.config({path: env('COMMON_CONFIG_FILE')});`` 
So we can use the `commmon.env` file with the key value
`UI_AUTOMATION_BROWSER='chromium'`


yarn add cucumber-html-reporter

run_tests.sh
============
```
#cucumber tag
tag=$1

#run cucumber tests & on failure run postcucumber
yarn run cucumber --profile $tag || yarn run postcucumber
```


./run_tests.sh dev 

It may need permission

chmod +x ./run_tests.sh

./run_tests.sh dev


One of the biggest challenges most automation suites around the world faces is around stability.
Most automation frameworks from playwright to puppeteer to Cyprus come with a variety of mechanisms
to provide stability for your automation framework.
These include Sleep's Waits that will wait for elements to be visible or active, and even ways to
wait for network traffic to be completed.

`However, from experience, we have found they lack a key ingredient and that is the ability to retry
step a certain amount of times until failure, but not fail on the first try.`


We then introduce our own custom WaitFor and this will enable us to retry an assertion and a specific amount of time
until finally we stop and fail the automation test.
This waitFor is going to be the ultimate function to help us with stabilizing our automation suite and providing us 
the ability to confidently run our automation suite in CI whether it's across one browser or five.

IMPORTANT:
So as you remember when we touched on reporter, the reporter won't generate on failure, and that's because 
it's in a post cucumber hook and technically, the way `node` works is that it won't call post hooks 
if the underlying script that we're running, e.g., in our case cucumber; fails.

**THAT'S WHY WE RUN ====>>>>>  `./run_tests.sh dev`** 


1. DOCS   https://playwright.dev/

## BUGS, FEATURES AND QUESTIONS

1. File an Issue https://github.com/microsoft/playwright/issues/new/choose

2. Issue overview  https://github.com/microsoft/playwright/issues

## COMMUNITY

1. Twitter https://twitter.com/playwrightweb

2. Blog https://dev.to/playwright

3. YouTube https://www.youtube.com/Playwrightdev

4. Conference Talks https://playwright.dev/community/conference-videos

5. StackOverflow https://stackoverflow.com/questions/tagged/playwright


# THE GOAL
`Not only to learn how to build a world-class automation framework, 
but also how to use cucumber, playwright, TypeScript and also build 
something that we can use.
Triple value...`


removed this to include environments 
"cucumber": "COMMON_CONFIG_FILE=env/common.env yarn cucumber-compile",


# playwright-demo
