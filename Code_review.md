
1. Select Specified the columns in the SELECT query.
2. Replace string concatenation with a prepared statement using bind_param.
3. Add try-catch blocks to catch and handle 
````
<?php

class TransactionExportService
{
    private $dbConnection;

    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function exportToCSV($userId)
    {
        try {

            $stmt = $this->dbConnection->prepare("SELECT id, amount, type, description, date FROM transactions WHERE user_id = ?");
            if (!$stmt) {
                throw new Exception("Error preparing SQL statement");
            }

            $stmt->bind_param('i', $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                throw new Exception("No transactions found for user: " . $userId);
            }


            $fileName = "transactions_" . $userId . "_" . time() . ".csv";
            $fileHandle = fopen($fileName, 'w');

            if (!$fileHandle) {
                throw new Exception("Error opening file for writing");
            }


            fputcsv($fileHandle, ['Transaction ID', 'Amount', 'Type', 'Description', 'Date']);


            while ($transaction = $result->fetch_assoc()) {
                fputcsv($fileHandle, [
                    $transaction['id'],
                    $transaction['amount'],
                    $transaction['type'],
                    $transaction['description'],
                    $transaction['date']
                ]);
            }

            fclose($fileHandle);
            echo "Export completed successfully. File: " . $fileName;

        } catch (Exception $e) {

            error_log($e->getMessage());
        }
    }
}
````