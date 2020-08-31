FROM node
# Install node tools
RUN npm install nodemon -g
RUN npm install sequelize-cli -g
RUN npm install pm2 -g
RUN npm install gm -g
# Update apt first
RUN apt-get update

# Install apt tool
RUN apt-get install -y nginx

# install Nano
RUN apt-get install -y nano

# install iputils-ping
RUN apt-get install -y iputils-ping

# install net-tools
RUN apt-get install -y net-tools

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /opt/app
ADD . /opt/app

# Kalo mau idup
# nodemon index.js