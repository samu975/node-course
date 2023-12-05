---
sidebar_position: 10
custom_edit_url: null
---

# Practical task
### Prerequisites

You are working for a delivery company that has offices in Great Britain, Germany, France and the Netherlands. You are a part of backend team that focuses on building internal tools for that company. One day you received a new request from a customer to create a public holidays module. This module will:
- show a list of public holidays for specific country for the current year
- show the next public holiday for specific country
- show if today is public holiday in your location

After some time of investigation, you found [Nager.Date API](https://date.nager.at/swagger/index.html) that meets the requirements above. Your customer agreed to use it, so now you can start the development. 

Once you’ve finished writing code, you have to cover your module with tests. 

### Source code

You can find the implementation [here](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/tree/master/public-for-mentees/5-testing).

### Task 1

Write unit tests for [public-holidays.service.ts](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/5-testing/src/services/public-holidays.service.ts) and [helpers.ts](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/5-testing/src/helpers.ts) files. Keep in mind that any external calls are mocked in unit tests.

### Task 2

Write integration tests for [public-holidays.service.ts](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/5-testing/src/services/public-holidays.service.ts). Do not forget that in this case you make real calls to the API.

### Task 3

Get code coverage with tests for your application. Strive to have no less than 90% of code coverage.

### Task 4

Select any 2 endpoints from [Nager.Date API](https://date.nager.at/swagger/index.html) and write e2e tests for them. 

### Evaluation criteria
- `60 - 69` - Tasks 1 and/or 2 are done.
- `70 - 79` - Tasks 1, 2 and 3 are done.
- `80 - 89` - All tasks are completed. Code coverage is less than 90%.
- `90 - 100` - All tasks are completed. Code coverage is more than 90%.


