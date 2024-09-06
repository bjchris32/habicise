# execute in /server directory:
# docker run -p 4002:4002 -v `pwd`:/app habicise_server
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4002

# TODO: use another script to make the docker image compatible for both dev and prod env
# https://stackoverflow.com/questions/60197212/calling-different-commands-in-dockerfiles-depending-on-environment
CMD ["npm", "run", "dev"]
