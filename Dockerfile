FROM node:gallium-alpine

WORKDIR /home/dev/server-api

COPY server.zip server.zip
RUN unzip server.zip
RUN rm server.zip

CMD ["node", "dist/main"]

EXPOSE 8000