## Installation

### Run docker

```
docker compose up
```

### Credentials

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

### store procedure

```
DELIMITER //

CREATE PROCEDURE LoadCSVToTransactions(IN csv_file_path VARCHAR(255))
BEGIN

LOAD DATA INFILE '/var/lib/mysql-files/transactions.csv'
    INTO
	TABLE transactions
    FIELDS TERMINATED BY ','
	ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n'
    (transactionID,
	amount,
	`type`,
	accountNumberFrom,
	accountNumberTypeFrom,
	accountNumberTo,
	accountNumberTypeTo,
	traceNumber,
	reference,
	description,
	@creationDate,
	@created_at,
	@updated_at)
SET
	creationDate = str_to_date(@creationDate,'%Y-%m-%d'),
	created_at = str_to_date(@created_at,'%Y-%m-%d %H:%i:%s'),
	updated_at = str_to_date(@updated_at,'%Y-%m-%d %H:%i:%s');
    
END //

DELIMITER ;

```

### frontend

```
http://localhost:3000
```

### backend

```
http://localhost:8080/api/transactions
```