FROM node:lts

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=16000
RUN npm install && \ 
    npm run build-next

ENTRYPOINT ["npm","run", "start"]
