<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/login/login.css">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/common/icons.css">
    <link rel="shortcut icon" href="/MarioMusicShop/assets/brodiscs.ico">
    <title>Brodiscs - Login</title>
</head>
<body>
    <form id="loginForm" method="POST">
        <h1>Login</h1>

        <label for="loginEmail">UserName</label>
        <input id="loginEmail" name="loginEmail" type="text" required>
        <span id='loginEmailError' class="errorSpans"></span>

        <label for="loginPassword">Password</label>
        <div class='passwordInput'>
            <input id="loginPassword" name="loginPassword" type="password" required>
            <img id="loginPassword_eye" src="/MarioMusicShop/assets/icons/invisiblePassword.svg" alt="">
        </div>
        
        <span>¿No tienes cuenta? <a id="registerLink" href="index.php?register">Crear Cuenta</a></span>
        <button type="submit">Entrar</button>
        <a id="return" href="index.php" class="icon-home"></a>
    </form>

    <img id="bigLogo" src="/MarioMusicShop/assets/media/img/yellowLogo.png" alt="">
    
    <script src="assets/js/JQuery/jquery-3.7.1.min.js" type="text/javascript"></script>
    <script src="assets/js/SweetAlerts/sweetalert2.all.min.js"></script>
    <script src="assets/js/login/login.js"></script>
</body>
</html>