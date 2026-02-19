# Imagen base
FROM node:20

# Carpeta de trabajo
WORKDIR /app

# Copiamos package.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto
EXPOSE 3000

# Ejecutamos el JS compilado
CMD ["node", "dist/app.js"]
