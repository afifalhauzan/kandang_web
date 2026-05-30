# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS frontend_builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY resources ./resources
COPY public ./public
COPY vite.config.js tsconfig.json jsconfig.json components.json ./
RUN npm run build

FROM php:8.3-fpm-alpine AS app

WORKDIR /var/www

RUN apk add --no-cache \
    bash \
    freetype-dev \
    icu-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    mysql-client \
    oniguruma-dev \
    sqlite-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        exif \
        gd \
        intl \
        mbstring \
        pcntl \
        pdo_mysql \
        pdo_sqlite \
        zip

COPY --from=composer:2.8 /usr/bin/composer /usr/local/bin/composer

COPY . .
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    --optimize-autoloader

COPY --from=frontend_builder /app/public/build ./public/build

RUN mkdir -p storage bootstrap/cache database \
    && touch database/database.sqlite \
    && chown -R www-data:www-data storage bootstrap/cache database \
    && chmod -R ug+rwx storage bootstrap/cache database

COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/start.sh"]
CMD ["php-fpm"]


FROM nginx:1.27-alpine AS web

WORKDIR /var/www

COPY --from=app /var/www/public ./public
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
