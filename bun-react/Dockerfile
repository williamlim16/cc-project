FROM oven/bun:1.0

COPY . .
ENV CI=false
ENV NODE_ENV="production"
RUN bun install && \ 
    bun build-next

CMD [ "bun", "start" ]
