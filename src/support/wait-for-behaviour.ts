/*
*
* So the way the waitFor works is, basically it surrounds our assertion.
*
* is taking in a promise, and that promise will either resolve a true if the assertions
* is correct, e.g. the X is displayed on the screen; or it will return a false.
*
* But the way it works is that basically it will take in that promise. Then we're going to go ahead;
* and we're going to set a const
* const { timeout = 30000, wait = 2000 } = options || {};
* So in plain speak, it's a 30' second timeout and a 2' second wait.
*
* Then we proceed to
* const sleep = (ms: number) =>  new Promise(resolve => setTimeout(resolve, ms));
* This is basically setting a new sleep, and it's going to resolve the promise when timeout resolves.
*
* Then the  const startDate = new Date(); is basically saying grab the current date and store that as an object.
* But more importantly, it's going to store the time
*
*
* while (new Date().getTime() - startDate.getTime() < timeout) {
* if the time difference between our get time when we start the loop and the stop time
* when we actually defined our start date object if the difference is more than 30 seconds, then it
* knows to exit the loop and effectively throw the error.
*
* const result = await predicate();
* The type predicate, the always attached to a function that takes a single argument e.g. our promise
* and returns a boolean.
* if (result) return result; So if it's true returns result.
* then return us to our step and then pass the step.
* However, on if (result) return result;, if after 30 seconds and two second tries.So 15 retry total it will
* throw an error.
* */

export const waitFor = async <T> (
    predicate: () => T | Promise<T>,
    options?: { timeout?: number, wait?: number}
): Promise<T> => {
    const { timeout = 20000, wait = 2000 } = options || {};

    const sleep = (ms: number) =>  new Promise(resolve => setTimeout(resolve, ms));
    const startDate = new Date();

    while (new Date().getTime() - startDate.getTime() < timeout) {
        const result = await predicate();
        if (result) return result;

        await sleep(wait);

        // console.log(`Waiting ${wait}ms`);
    }

    throw new Error(`Wait time of ${timeout}ms exceeded`);
}