[![Build Status](https://drone.theruzil.com/api/badges/Envoy89/myworstblog/status.svg)](https://drone.theruzil.com/Envoy89/myworstblog)

# Простенький бложик

Простой бложик. Подробное описание https://ruzil33.gitbook.io/my-worst-blog/

## Запуск
1. Запуск в полном окружении
    1. docker-compose up -d
2. Локальный запуск
    1. Запуск бэкенда 
        1. cd ./server/
        2. npm install
        3. npm run dev
    2. Запуск фронтенда
        1. cd ./client
        2. yarn install
        3. yarn start