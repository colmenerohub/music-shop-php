<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/common/header.css">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/common/body.css">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/contact/contact.css">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/common/footer.css">
    <link rel="stylesheet" href="/MarioMusicShop/assets/css/common/icons.css">
    <link rel="shortcut icon" href="/MarioMusicShop/assets/brodiscs.ico">
    <title>Brodiscs - Contact</title>
</head>
<body>
    <?php require_once 'common/header.php' ?>

    <main>
        <h2>¿En qué podemos ayudarte?</h2>
        <img src="/MarioMusicShop/assets/media/img/atencionCliente.png" alt="">
    </main>

    <h2 class='subTitles animate-on-scroll'>Tu opinión nos importa</h2>

    <section>
        <form id="emailForm" class="animate-on-scroll" action="">
            <label for="emailName">Nombre Completo <br></label>
            <input id="emailName" name="emailName" type="text" placeholder="Nombre">
            
            <label for="emailAddress">Email <br></label>
            <input id="emailAddress" name="emailAddress" type="email" placeholder="test@test.com">

            <label for="emailSubject">Asunto <br></label>
            <input id="emailSubject" name="emailSubject" type="text" placeholder="Asunto">

            <label for="emailContent">Contenido <br></label>
            <textarea id="emailContent" name="emailContent" placeholder="Mensaje"></textarea>

            <div id="formActions">
                <button type="submit">Enviar</button>
                <button type="reset" class="icon-loop2"></button>
            </div>
        </form>

        <div class="animate-on-scroll">
            <div>
                <span class="icon-mail2"></span>
                <span>brodiscsofficial@gmail.com</span>
            </div>
            
            <div>
                <span class='icon-whatsapp'></span>
                <span>+34 606 18 34 92</span>
            </div>
            
            <div>
                <span class="icon-phone"></span>
                <span>916 034 590</span>
            </div>
        </div>
    </section>

    <div id="socialMedia">
        <div>
            <h1 class="animate-on-scroll"><a href="https://www.tiktok.com/@brodevs" class="icon-tiktok" style="color: #bc98f3;" target="_blank"></a></h1>
            <h2 class="animate-on-scroll" style="color: #bc98f3;">@brodiscs</h2>
        </div>
        <div>
            <h1 class="animate-on-scroll"><a href="https://www.instagram.com/thebrodevs/" class="icon-instagram" style="color: #84b6f4;" target="_blank"></a></h1>
            <h2 class="animate-on-scroll" style="color: #84b6f4;">@brodiscs</h2>
        </div>
        <div>
            <h1 class="animate-on-scroll"><a href="https://www.youtube.com/channel/UC6E_T_JPbo7Gl1q3OGFBv7A" class="icon-youtube" style="color: #ff6961;" target="_blank"></a></h1>
            <h2 class="animate-on-scroll" style="color: #ff6961;">@brodiscs</h2>
        </div>
        <div>
            <h1 class="animate-on-scroll"><a href="https://open.spotify.com/user/marioneti2004?si=8a4019bed0104564" class="icon-spotify" style="color: lightgreen;" target="_blank"></a></h1>
            <h2 class="animate-on-scroll" style="color: lightgreen;">@djmarioneti</h2>
        </div>
    </div>

    <?php require_once 'common/footer.php' ?>
    
    <script src='assets/js/contact/contactForm.js'></script>
</body>
</html>