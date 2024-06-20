<?php
    if (isset($_GET["contact"])) {
        require "view/noUser/contact.php";
    } else if (isset($_GET["login"])) {
        require "view/noUser/login.php";
    } else if (isset($_GET["register"])) {
        require "view/noUser/register.php";
    } else if (isset($_GET["shop"])) {
        require "view/noUser/shop.php";
    } else {
        require "view/noUser/landingPage.php";
    }