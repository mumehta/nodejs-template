FROM mhart/alpine-node:6


# Install app dependencies
COPY app /src
RUN cd /src; npm install

# Bundle app source

WORKDIR src

EXPOSE  3000
CMD ["node","/src/app.js"]
