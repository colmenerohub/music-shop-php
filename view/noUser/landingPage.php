<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/header.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/body.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/landingPage/landingPage.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/landingPage/card.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/footer.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/icons.css">
        <title>Brodiscs - Home</title>
    </head>

    <body>
        <?php require_once 'common/header.php' ?>

        <main>
            <h1><?php echo isset($_SESSION['name']) ? 'Bienvenid@ ' . $_SESSION['name'] . ' ' . $_SESSION['surnames'] : 'Online Vinyl Store' ?>
            </h1>
        </main>

        <h2 class='subTitles animate-on-scroll' style="color: black;">2023 BESTSELLERS</h2>

        <div id="wrapper"></div>

        <?php require_once 'common/footer.php' ?>

        <script src="/music-shop-php/assets/js/landingPage/generateAlbumCards.js"></script>
    </body>

</html>