<a id="nest">
    <span>0</span>
    <img src="/MarioMusicShop/assets/media/img/minecraftTurntable.png" alt="">
</a>

<?php
    // Obtiene la URL actual
    $currentUrl = $_SERVER['REQUEST_URI'];

    // Define las URLs de tus enlaces en el menú de navegación
    $homeUrl = "/MarioMusicShop/index.php";
    $contactUrl = "/MarioMusicShop/index.php?contact";
    $loginUrl = "/MarioMusicShop/index.php?login";
    $shopUrl = "/MarioMusicShop/index.php?shop";

    // Verifica la URL actual y actualiza la clase de selección en consecuencia
    $homeClass = ($currentUrl == $homeUrl || $currentUrl == '/MarioMusicShop/') ? 'selectedNav' : '';
    $contactClass = ($currentUrl == $contactUrl) ? 'selectedNav' : '';
    $loginClass = ($currentUrl == $loginUrl) ? 'selectedNav' : '';
    $shopClass = ($currentUrl == $shopUrl) ? 'selectedNav' : '';
    $defaultClass = ''; 

    session_start();
?>

<header>
    <nav>
        <ul>
            <li class="<?= $homeClass ?>"><a href="<?= $homeUrl ?>">Home</a></li>
            <li class="<?= $contactClass ?>"><a href="<?= $contactUrl ?>">Contact</a></li>
            <li><img src="/MarioMusicShop/assets/media/img/yellowLogo.png" alt="Brodiscs"></li>
            <li class="<?= $shopClass ?>"><a href="<?= $shopUrl ?>">Shop</a></li>
            <?php
                if(isset($_SESSION['name'])){
                    echo '<li><a id="account">'.$_SESSION['email'].'</a><br><a id="logOut">Log out</a></li>';
                } else {
                    echo '<li class="'. $loginClass. '"><a href="'. $loginUrl .'">Login</a></li>';
                }
            ?>
        </ul>
    </nav>
</header>