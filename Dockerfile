FROM node:20 as builder

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /app

COPY . .

RUN npm install

ENV VITE_API_URL=http://localhost:8000
ENV VITE_APP_BASE=/

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]