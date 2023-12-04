---
sidebar_position: 10
custom_edit_url: null
---

# Practical task

In this task you will be needed to modify your Node.js application and perform the following changes:
   - update config management to use environment variables instead of hardcoded values (if any)
   - implement graceful shutdown
   - add health check API endpoint with DB connection check
   - add debug logs to the most significant/important places/services of your app; update npm scripts to run the app with a proper debug logs (based on env variable)
   - add logger service using [Winston](https://www.npmjs.com/package/winston), [Bunyan](https://www.npmjs.com/package/bunyan) or other package based on your preference; add logging of incoming requests (method, path) and request handling (response) time
   - dockerize the app according to best practises; try getting an image with as minimal size as possible
   - add few [husky](https://www.npmjs.com/package/husky) hooks to your app to: check the [commit](https://www.npmjs.com/package/@commitlint/config-conventional) message, run linting script on commit, run unit tests on push; setup any static code analyser and perform quality scan over your app; check whether you have secure npm dependencies
     
**Additional (optional) tasks:**
   - use Docker compose for all the local infrastructure (app and DB)
   - set up a [local](https://docs.docker.com/registry/deploying/) or any free container registry ([DockerHub](https://hub.docker.com/), [AWS ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html), [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry/), or [Google Artifact Registry](https://cloud.google.com/blog/products/application-development/understanding-artifact-registry-vs-container-registry)) and publish your image there; pull image from registry and run it; publish few different versions of your app (with proper tags) to the registry
   - create a repository in internal [GitBud.epam.com](https://gitbud.epam.com/); push the code of your Node.js app there; based on the [sample template](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Nodejs.gitlab-ci.yml) create [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html) template to run a simple CI/CD which will contain all the jobs from the mandatory part (`eslit`, `tests`, `npm audit`, `build stage` (dockerise the app), and (optionally) static code analysis) that will be executed by shared worker; investigate [GitLab CI/CD capabilities](https://docs.gitlab.com/ee/ci/), and push the template to start and test the pipeline (note, that your pipeline can be executed with some delay due to a limited capacity of shared workers); providing you created a cloud container registry (AWS ECR, DockerHub, etc.), configure credentials and push the built docker image to the container registry from the pipeline;

### Evaluation criteria
- `60 - 69` - Config management is updated, implemented graceful shutdown, and the healthcheck endpoint are added. App works as intended.
- `70 - 79` - In addition to previous changes logger and debug logs are added. App works as intended and changes logging/debugging behaviour (output) based on given env variables.
- `80 - 89` - All required tasks are implemented.
- `90 - 100` - All required and some/all optional tasks are implemented.