FROM node:12-alpine
LABEL  maintainer="kumarnitesh2000"
WORKDIR /app/src
COPY . ./
RUN ["npm","install"]
RUN ["npm","install","-g","peer"]
CMD ["node","server.js"]
#CMD ["peerjs","--port","3001"]
