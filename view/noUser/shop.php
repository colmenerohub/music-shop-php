<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/header.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/body.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/shop/diskCard.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/landingPage/card.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/footer.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/icons.css">
        <link rel="shortcut icon" href="/music-shop-php/assets/brodiscs.ico">
        <title>Brodiscs - Shop</title>
    </head>

    <body>
        <?php require_once 'common/header.php' ?>

        <div id='shop-container'>
            <div id='filters'>
                <label for="">Buscar...</label>
                <input type="text">

                <a href="">50's - Crooner, Rock & Roll, Rockabilly</a>
                <a href="">60's - Pop, Rock, Folk, Psych</a>
                <a href="">70's - Pop, Rock</a>

                <?php if (isset($_SESSION['role'])) {
                    if ($_SESSION["role"] === 'admin')
                        echo '<button id="insertButton" href="">Insertar <span class="icon-plus"></span></button>';
                } ?>
            </div>

            <main id="wrapper">
                <div id='pagination'></div>
            </main>
        </div>

        <?php require_once 'common/footer.php' ?>

        <script> const role = '<?php if (isset($_SESSION['role']))
            echo $_SESSION["role"]; ?>'; </script>
        <script src='assets/js/shop/paginateDisks.js'></script>
    </body>

</html>