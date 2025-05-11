FROM node:18-alpine

# Установите зависимости для нативных модулей
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Сначала копируем только зависимости
COPY package*.json ./

RUN npm install --omit=dev --omit=optional

# Затем копируем остальное
COPY . .

# Запуск с дебаг-флагом
CMD ["node", "--trace-uncaught", "--trace-warnings", "--abort-on-uncaught-exception", "./index.js"]