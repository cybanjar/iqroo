FROM keymetrics/pm2:14-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache \
    bash \
    git \
    curl \
    openssh

ENV HOST="0.0.0.0"
ENV PORT=3020
ENV NPM_CONFIG_LOGLEVEL warn
ENV API_QURAN  = "https://quran-api-sage.vercel.app/"
ENV API_HADIST = "https://hadith-api-cybanjar.vercel.app/"
ENV FIREBASE_API_KEY        = "AIzaSyACbF1TMSbjtoSNJRFO7Qfni9tSNxVtmfQ"
ENV FIREBASE_AUTH_DOMAIN    = "qiroooo.firebaseapp.com"
ENV FIREBASE_PROJECT_ID     = "qiroooo"
ENV FIREBASE_STORAGE_BUCKET = "qiroooo.appspot.com"
ENV FIREBASE_MESS_SENDER_ID = "505315684122"
ENV FIREBASE_APP_ID         = "1:505315684122:web:4082be321bd275fdd406a3"


WORKDIR /usr/src/app
RUN npm install -g npm@7.21.0


# Install app dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm run install

COPY . /usr/src/app

# RUN cp -n .env.example .env
RUN npm run lint
RUN npm run build

EXPOSE 3020

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production"]

ARG BUILD_VERSION \
    BUILD_DATE

ENV BUILD_VERSION=${BUILD_VERSION} \
    BUILD_DATE=${BUILD_DATE}