<?php
class DB_Connect {

    // constructor
    function __construct() {

    }

    // destructor
    function __destruct() {
        // $this->close();
    }

    // Connecting to database
    public function connect() {
        require_once 'include/config.php';
        // connecting to mysql
        $con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD,DB_DATABASE);
		//mysqli_connect('localhost', 'username', 'password', 'database');
        // selecting database
        //mysql_select_db(DB_DATABASE);
		//mysql_query('set character set utf8');
        mysqli_query($con, "SET NAMES utf8");
		

        // return database handler
        return $con;
    }

    // Closing database connection
    public function close() {
        mysqli_close($con);
    }

}

?>
