The best option to load bulk data is using a store procedure,

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
	unique ids, you need truncate the table or erase id from csv data and procedure
````

TRUNCATE TABLE `laravel-react`.transactions;

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
`````

results: the insertion took 5s for 200.000 rows

`````
Queries	1
Updated Rows	200000
Execute time (ms)	5196
Fetch time (ms)	0
Total time (ms)	5196
Start time	2024-09-18 08:18:37.168
Finish time	2024-09-18 08:18:42.365
`````