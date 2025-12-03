FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

FROM node:18
WORKDIR /app
COPY backend/package.json ./
RUN npm install
COPY backend/. .

RUN mkdir -p /app/public
COPY --from=frontend-build /app/frontend/build /app/public

EXPOSE 5000
CMD ["npm", "start"]
