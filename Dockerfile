FROM node

WORKDIR /usr/src/

COPY . /usr/src/

EXPOSE 5000

RUN npm i

CMD ["npm", "run", "docker:start"]  