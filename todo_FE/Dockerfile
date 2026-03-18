# مرحله 1: build Angular app
FROM node:20-alpine as build

WORKDIR /app

# copy package files
COPY package*.json ./

RUN npm install

# copy all source code
COPY . .

# build Angular app
RUN npm run build

# مرحله 2: serve with nginx
FROM nginx:alpine

# copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
