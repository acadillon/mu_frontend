# Dockerfile
FROM node:20.11.0 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Utiliser une image nginx pour servir l'application
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]