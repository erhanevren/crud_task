<?php
error_reporting(0);

define('DB_HOST', 'localhost');
define('DB_NAME', 'crud_task');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '1');
 
$conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

if (!$conn) {
    die("no db conn");
}
?>