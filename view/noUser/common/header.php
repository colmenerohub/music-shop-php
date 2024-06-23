<a id="nest">
    <span>0</span>
    <img src="/music-shop-php/assets/media/img/minecraftTurntable.png" alt="">
</a>

<?php
// Obtiene la URL actual
$currentUrl = $_SERVER['REQUEST_URI'];

// Define las URLs de tus enlaces en el menú de navegación
$homeUrl = "/music-shop-php/index.php";
$contactUrl = "/music-shop-php/index.php?contact";
$loginUrl = "/music-shop-php/index.php?login";
$shopUrl = "/music-shop-php/index.php?shop";

// Verifica la URL actual y actualiza la clase de selección en consecuencia
$homeClass = ($currentUrl == $homeUrl || $currentUrl == '/music-shop-php/') ? 'selectedNav' : '';
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
            <li><img src="/music-shop-php/assets/media/img/yellowLogo.png" alt="Brodiscs"></li>
            <li class="<?= $shopClass ?>"><a href="<?= $shopUrl ?>">Shop</a></li>
            <?php
            if (isset($_SESSION['name'])) {
                echo '<li><a id="account">' . $_SESSION['email'] . '</a><br><a id="logOut">Log out</a></li>';
            } else {
                echo '<li class="' . $loginClass . '"><a href="' . $loginUrl . '">Login</a></li>';
            }
            ?>
        </ul>
    </nav>
</header>