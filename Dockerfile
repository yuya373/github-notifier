FROM node:8-alpine
RUN echo "unsafe-perm = true" > /root/.npmrc
RUN echo "ipv6" >> /etc/modules

RUN apk update && \
    apk --no-cache add p7zip xorriso rpm python make g++

ENV USE_SYSTEM_7ZA true
ENV USE_SYSTEM_XORRISO true

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
