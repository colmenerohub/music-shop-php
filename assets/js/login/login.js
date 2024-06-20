$(document).ready(() => {
    // ------------------------------------------------------------------
    // VARIABLES STATEMENT
    // ------------------------------------------------------------------
    const loginForm = $('#loginForm')[0];
    const loginEmail = $('#loginEmail')[0];
    const loginPassword = $('#loginPassword')[0];

    const emailRegex = /^(\w+)\@(\w+)\.(\w+)$/;

    function sendForm(action, formData){
        $.ajax({
            type: "POST",
            url: "/MarioMusicShop/controller/usersController.php",
            data: { action: action, formData: formData },
            dataType: "json",
            beforeSend: function () {},
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Sesión Iniciada.",
                }).then(function() {
                    window.location.href = "index.php";    
                })
            },
            timeout: 5000,
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Error " + xhr.status,
                    text: JSON.parse(xhr.responseText).error
                });
                if(JSON.parse(xhr.responseText).errorDebug) 
                console.error(JSON.parse(xhr.responseText).errorDebug); 
            },
        });
    }

    loginEmail.addEventListener("blur", () => {
        if (loginEmail.value.trim() === '' || loginEmail.value === null || loginEmail.value === undefined) {
            loginEmail.style.borderColor = 'black';
            $(`#loginEmailError`)[0].innerHTML = '';
        } else {
            if (!emailRegex.test(loginEmail.value)) {
                loginEmail.style.borderColor = 'red';
                $(`#loginEmailError`)[0].innerHTML = 'Debe contener los símbolos @ y .';
            } else {
                loginEmail.style.borderColor = 'rgb(26, 196, 26)';
                $(`#loginEmailError`)[0].innerHTML = '';
            }
        }
    });

    const eyeIcon = $(`#loginPassword_eye`)[0];
    eyeIcon.addEventListener('click', () => {
        if (eyeIcon.src.includes('invisiblePassword')) {
            eyeIcon.src = '/MarioMusicShop/assets/icons/visiblePassword.svg';
            $(`#loginPassword`)[0].type = 'text';
        } else {
            eyeIcon.src = '/MarioMusicShop/assets/icons/invisiblePassword.svg';
            $(`#loginPassword`)[0].type = 'password';
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let wrongEmail = false;
        if (loginEmail.value.trim() === '' || !emailRegex.test(loginEmail.value)) wrongEmail = true;

        if (!wrongEmail) {
            sendForm('login', {loginEmail: loginEmail.value, loginPassword: loginPassword.value});
        } else {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: 'Email incorrecto.'
            });
        }
    });
});