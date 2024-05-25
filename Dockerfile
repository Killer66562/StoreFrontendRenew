FROM node:20

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /app

COPY . .

RUN npm install

ENV VITE_API_URL=http://localhost:8000
ENV VITE_APP_BASE=/test/

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]