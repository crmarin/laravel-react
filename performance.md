The best option to load bulk data is using a store procedure,
but in this case failed for a date formats

could you watch file in
````
 ./server/src/storage/transactions.csv
````
pros: 
    the load process is for a database, not for a server or client 
    security access
    
cons:
    knowlage for creating a procedure
    needs same length fields to insert in table

````
SET GLOBAL sql_mode = '';

LOAD DATA INFILE '/var/lib/mysql-files/transactions.csv'
    INTO
	TABLE transactions
    FIELDS TERMINATED BY ','
	ENCLOSED BY '"' 
    LINES TERMINATED BY '\n'
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
	creationDate = STR_TO_DATE(REPLACE(@creationDate, '"', ''),
	'%Y-%m-%d'),
	created_at = STR_TO_DATE(REPLACE(@created_at, '"', ''),
	'%Y-%m-%d'),
	updated_at = STR_TO_DATE(REPLACE(@updated_at, '"', ''),
	'%Y-%m-%d');
`````