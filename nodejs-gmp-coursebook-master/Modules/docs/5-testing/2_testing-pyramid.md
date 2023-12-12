---
sidebar_position: 2
---
# Testing Pyramid

I am pretty sure that you’ve heard the term `Testing Pyramid` quite a lot of times. But let’s quickly go through it and refresh our memory on some core concepts. 

To verify the correctness of an application, we can use different types of testing. Each type of test has a different scope of tested elements and requires different time and resources to run.

:::tip Definition

Testing Pyramid is a visual representation of unit, integration, and e2e tests ratio in an application.

:::

Let’s check the diagram below and review each layer of the pyramid separately.

![Testing Pyramid](./img/5-testing-pyramid.png)

### Unit tests

:::tip Definition

Unit tests check the logic of individual functions or units in isolation. They are at the base of the Testing Pyramid because they take the least time and cost.

::: 

Unit tests should be:
- **Fast**: quick to be run and see the results
- **Isolated**: should not be influenced by any external factors
- **Repeatable**: output shouldn’t change based on being run on different environments
- **Self-validating**: no manual work needed to check if test passed or not
- **Thorough**: should cover happy and error paths, edge cases, large input values, etc

**Example:** you have a function `sum()` that calculates the sum of two numbers. You want to test if 2+2 equals 4, 2+3 equals 5, etc.

### Integration tests

:::tip Definition

Integration tests validate the interaction of a piece of code with external components. For this reason, they run slower than unit tests.

:::

**Example:** you have two modules `Users` and `Groups`. `Users` calls `Groups` to retrieve user groups information. You want to test the integration between these two modules. 


### E2E tests

E2E tests are at the top of the Testing Pyramid because they involve the largest scope and are the most complex.

:::tip Definition

E2E tests can be treated differently depending on the application you are working on.
- for frontend applications, E2E tests are UI tests where the actual user interaction is checked in combination with API.
- for backend applications, E2E tests are more like API tests, where we test how our API is responding to requests.

:::

They take the longest to run as they replicate the way an actual user or service interaction and check all the system layers.

**Example:** you have an endpoint POST `/users` to create users. You want to test API status codes, response structure, etc.

This was a quick overview of testing types that will be described in this module. Later on you will see real examples of unit / integration / e2e tests and how they can be written in Node.js.
