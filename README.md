# barnstorm-samples

Samples of end to end testing using Barnstorm

## Getting Started

Install dependencies:

`npm install`

## Running the End to End Tests

Run the Barnstorm sample test, `cypress/integration/todoSpecWithBarnstorm.ts`, by command line:

`npm run e2e`

Or, start Cypress UI:

`npm run cypress:open`

Pick any test and run it.

## Explore Barnstorm Test Structure

To create a simple Barnstorm example, I've started with a sample test provided by the awesome folks at Cypress.io in `cypress/integration/todoSpec.ts`.  This is the default sample test that you will see when running `cypress:open` in a project where `Cypress` has been recently installed.

I've copied this test into `cypress/integration/todoSpecWithBarnstorm.ts` and converted to use Barnstorm structure.  Both tests are performing the same basic test actions on the same app so it makes it simpler to see what makes Barnstorm different.

A few things to note when comparing these two tests:

* The Barnstorm test contains no CSS selectors (these are pulled out into `tower` file so they can be specified once and then reused).  A test without selectors makes it easier to focus on the intention of the test rather than implementation details.
* The Barnstorm test contains no DOM walking logic (this logic is pulled out into the Barnstorm `instruments` in a generic way).  Swapping out DOM walking (imperative) with Barnstorm `instruments` (declarative) makes tests easier to debug and reason about.
* We can represent the structure of nested items more intentionally with Barnstorm.  Each TODO list item has a checkbox and we want to be able to target the checkbox for a specific list item when we manipulate or verify the checkbox.  The Barnstorm `tower` file with `flight instruments` is able to represent this nested relationship easily.
* In the Barnstorm test, the expected state of the entire app is checked at the end of each test step, but the test only has to provide the changes to the expected state (the initial expected state is provided in the `tower` files where an `instrument` for each UI element is declaratively specified).  To help debug any Barnstorm test, the developer can print out the expected state of any instrument at any time by using `console.log(instrument.getStateString())`.  The test without Barnstorm has to make every verification explicitly and it is sometimes difficult to figure out the overall expected state of the app when debugging because the developer has to read back through test steps to find the most recent verification of expected state for each bit of state.  Since the entire app state is not verified, this test will also not be able to detect regressions in the global app state due to indirect effects of any specific test action.  The Barnstorm test has less verification logic but does more verification.
* Test steps in the Barnstorm test can be easily reused in another test (for example as test setup) because they already live outside the test file in a `flight plan` file rather in the test file itself.
* Switching the Cypress test framework out for another test framework would cause significant refactoring for the test without Barnstorm because it is highly coupled to the implementation details of the Cypress framework, including the specifics of DOM walking.  Switching the test framework for the Barnstorm test would be easier because only the Cypress specific `mechanics` would need to be swapped out.

## Learn More About Barnstorm

For more information on how to use Barnstorm, see the [Barnstorm](<https://github.com/kryter/barnstorm>) core project.
