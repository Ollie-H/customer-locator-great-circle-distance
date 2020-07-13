# music-venture-code-test
Node application for calculating which customers (in customers.txt) are located within a 100km radius to a central office location (lat/long) to invite to an event.

### Getting started

Requirements:
* Node >= 8.10 and npm >= 5.6

Steps:
* [ ] Clone project `git clone https://github.com/Ollie-H/customer-locator-great-circle-distance.git`
* [ ] Build project `yarn install`
* [ ] Start project `yarn run start` or `yarn run dev` if contributing
* [ ] Customers matching will output in console

### Other useful commands

* Run tests - `yarn run test`
* Run linting - `yarn run lint`
* Run linting (with fix) - `yarn run lint:fix`


### CI

CI tasks are ran in a github actions workflow, config can be found in [/.github/workflows/build-branch.yml](/.github/workflows/build-branch.yml)
