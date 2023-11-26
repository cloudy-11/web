# Build docker image.
# Sử dung node
FROM node:20.9.0 as builder

ARG workdir=.
LABEL description="deploy react app"

WORKDIR /app

COPY ${workdir}/ /app/

COPY .env .env

RUN yarn
RUN yarn build

EXPOSE 3000

RUN yarn global add serve
CMD  ["serve", "-s", "build", "--no-request-logging"]
