# SST Notes App

This is a simple static site built to practice setting up the skeleton, and implementing a full stack website. As part of this, I set up linting, all CI/CD workflows, testing, and the folder structures.

This site is a static site, with a ReactTs front-end. I used SST to build the backend, and deploy the application to AWS.

This app connects to a weather API.

I used SST to develop the AWS resources, and for local development.

Currently hosted at https://weather.zvanammers.com.

## How to spin up the app for local dev

1. Configure aws login `aws configure sso`

2. Run `pnpm dev` in notes folder

3. Run `pnpm run dev:frontend:sst` in notes folder