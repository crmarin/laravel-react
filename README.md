## Installation

### Run docker

```
docker compose up
```

### Credentialas

```
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=laravel-react
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_PORT=3306
```

### Connect to backend

```
docker exec -it backend /bin/sh

```

#### copy .env.example to .env
```
cp .env.example .env
```
#### Give access to logs
```
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
```

### Run migration

```
php artisan migrate
```

### Run seed

```
php artisan db:seed --class=TransactionTableSeeder
```
