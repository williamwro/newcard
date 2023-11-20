FROM php:7.4-apache  

RUN apt-get update \
    && apt-get install sudo \
    && apt-get install -y libpq-dev wget git unzip zip \
    && docker-php-ext-install pdo pdo_pgsql \
    && apt-get clean \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /var/www/html

COPY site/ /var/www/html/

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN apt-get install zip unzip \
    && curl -sS https://getcomposer.org/installer -o composer-setup.php \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && unlink composer-setup.php

RUN pecl install xdebug-3.0.4 \
    && docker-php-ext-enable xdebug

#RUN apt-get install -y libmemcached-dev zlib1g-dev \
#    && pecl install memcached-3.1.5 \
#    && docker-php-ext-enable memcached

 RUN echo 'date.timezone="America/Sao_Paulo"' >> /usr/local/etc/php/conf.d/date.ini \
    && echo 'opcache.enable=1' >> /usr/local/etc/php/conf.d/opcache.conf \
    && echo 'opcache.validate_timestamps=1' >> /usr/local/etc/php/conf.d/opcache.conf \
    && echo 'opcache.fast_shutdown=1' >> /usr/local/etc/php/conf.d/opcache   

EXPOSE 80