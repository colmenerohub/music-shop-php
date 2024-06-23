<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/music-shop-php/assets/css/register/register.css">
        <link rel="stylesheet" href="/music-shop-php/assets/css/common/icons.css">
        <link rel="shortcut icon" href="/music-shop-php/assets/brodiscs.ico">
        <title>Brodiscs - Register</title>
    </head>

    <body>
        <a id='return' href='index.php?login'><span class="icon-reply"></span><span>Login</span></a>
        <div id='registerContainer'>
            <a href="index.php"><img id="bigLogo" src="/music-shop-php/assets/media/img/yellowLogo.png" alt=""></a>
            <form id="registerForm" method="POST">
                <h1>Register</h1>

                <div id='userDataContainer'>
                    <div>
                        <label for="registerName">Nombre</label>
                        <input id="registerName" name="registerName" type="text" required>
                        <span id='registerNameError' class="errorSpans"></span>

                        <label for="registerSurnames">Apellidos</label>
                        <input id="registerSurnames" name="registerSurnames" type="text" required>
                        <span id='registerSurnamesError' class="errorSpans"></span>

                        <label for="registerAddress">Dirección</label>
                        <input id="registerAddress" name="registerAddress" type="text" required>
                        <span id='registerAddressError' class="errorSpans"></span>
                    </div>

                    <div>
                        <label for="registerEmail">Email</label>
                        <input id="registerEmail" name="registerEmail" type="email" required>
                        <span id='registerEmailError' class="errorSpans"></span>

                        <label for="registerPhone">Teléfono</label>
                        <input id="registerPhone" name="registerPhone" type="text" value='+34' required>
                        <span id='registerPhoneError' class="errorSpans"></span>

                        <label for="registerCodep">Código Postal</label>
                        <input id="registerCodep" name="registerCodep" type="text" value='28' required>
                        <span id='registerCodepError' class="errorSpans"></span>
                    </div>
                </div>

                <div id='userPasswordContainer'>
                    <label for="registerPassword">Password</label>
                    <div class='passwordInput'>
                        <input id="registerPassword" name="registerPassword" type="password" required>
                        <img id="registerPassword_eye" src="/music-shop-php/assets/icons/invisiblePassword.svg" alt="">
                    </div>
                    <span id='registerPasswordError' class="errorSpans"></span>

                    <label for="registerPasswordc">Password Confirmation</label>
                    <div class='passwordInput'>
                        <input id="registerPasswordc" name="registerPasswordc" type="password" required>
                        <img id="registerPasswordc_eye" src="/music-shop-php/assets/icons/invisiblePassword.svg" alt="">
                    </div>
                    <span id='registerPasswordcError' class="errorSpans"></span>
                </div>

                <button type="submit">Send</button>
            </form>
        </div>

        <script src="assets/js/JQuery/jquery-3.7.1.min.js" type="text/javascript"></script>
        <script src="assets/js/SweetAlerts/sweetalert2.all.min.js"></script>
        <script src='assets/js/register/register.js'></script>
    </body>

</html>