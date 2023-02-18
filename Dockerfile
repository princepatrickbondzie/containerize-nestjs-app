#syntax:docker/dockerfile:1

FROM node:16-alpine as base
# ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "yarn.lock", " ./"]

FROM base as dev
RUN yarn install --frozen-lockfile --production:false
COPY . .
RUN yarn add global @nestjs/cli
CMD ["yarn", "start:dev"]

FROM dev as test
ENV NODE_ENV=test
CMD ["yarn", "test"]

FROM test as test-cov
CMD ["yarn", "test:cov"]

FROM dev as test-watch
ENV GIT_WORK_TREE=/app GIT_DIR=/app/.git
RUN apk add git
CMD ["yarn", "test:watch"]

FROM base as prod
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn add global @nestjs/cli
RUN yarn build
CMD ["yarn", "start:prod"]