FROM node:20-alpine

WORKDIR /app

# Desativa chamadas automáticas de pacotes pelo Yarn/Next
ENV NEXT_TELEMETRY_DISABLED=1
ENV YARN_IGNORE_PATH=1

COPY package*.json ./

# Instala as dependências exatas do package.json
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]