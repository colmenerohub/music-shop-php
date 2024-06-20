<?php
    require "Configuration.php";
    Class Connection{
        public static function __connect(){
            $conn = new PDO("mysql:localhost=".HOST."; dbname=".DB, USER, PASSWORD);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // $conn->exec("set charset set " .CHARSET);
            return $conn;
        }
    }