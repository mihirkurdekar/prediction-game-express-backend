FROM node:carbon
ENV PORT 3000

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .
#COPY package*.json ./
#COPY tsconfig.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
RUN npm run tsc

EXPOSE 3000
CMD [ "node", "dist/server.js" ]