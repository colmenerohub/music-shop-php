$(document).ready(() => {
    // ------------------------------------------------------------------
    // VARIABLES STATEMENT
    // ------------------------------------------------------------------
    const registerForm = $('#registerForm')[0];
    const registerName = $('#registerName')[0];
    const registerSurnames = $('#registerSurnames')[0];
    const registerAddress = $('#registerAddress')[0];
    const registerEmail = $('#registerEmail')[0];
    const registerPhone = $('#registerPhone')[0];
    const registerCodep = $('#registerCodep')[0];
    const registerPassword = $('#registerPassword')[0];
    const registerPasswordc = $('#registerPasswordc')[0];

    const namesRegex = /^([a-záéíóúA-ZÁÉÍÓÚ]+\s?){1,2}$/;
    const addressRegex = /^.{1,60}$/;
    const emailRegex = /^(\w+)\@(\w+)\.(\w+)$/;
    const phoneRegex = /^(?:\+34)?(\d{9})$/;
    const codepRegex = /^28\d{3}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\(\)\!\@\#\$\%\&\/\?\¿\¡\!\_\.\*]).{8,}$/;



    // ------------------------------------------------------------------
    // FUNCTIONS STATEMENT
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // CHECK FORM INFO
    // ------------------------------------------------------------------
    function checkRegex(input, regex, data, message) {
        if (input && input instanceof HTMLElement) {
            input.addEventListener("blur", () => {
                // Comprobamos si el input esta vacío
                if (input.value.trim() === '' || input.value === null || input.value === undefined) {
                    // Reseteamos el input a negro sin errores
                    input.style.borderColor = 'black';
                    $(`#register${data}Error`)[0].innerHTML = '';
                } else {
                    // Si el input recibe algo, comprobamos que sea válido
                    let inputInfo = input.value
                    if (data === 'Phone') inputInfo = input.value.replace(/\s/g, '')

                    if (!regex.test(inputInfo)) {
                        // Si no lo es, mostramos error en rojo
                        input.style.borderColor = 'red';
                        $(`#register${data}Error`)[0].innerHTML = message;
                    } else {
                        // Si es correcto borramos el posible error y mostramos verde
                        if (data !== 'Passwordc') {
                            input.style.borderColor = 'rgb(26, 196, 26)';
                            $(`#register${data}Error`)[0].innerHTML = '';
                        } else {
                            if (registerPassword.value === registerPasswordc.value) {
                                input.style.borderColor = 'rgb(26, 196, 26)';
                                $(`#register${data}Error`)[0].innerHTML = '';
                            } else {
                                input.style.borderColor = 'red';
                                $(`#register${data}Error`)[0].innerHTML = message;
                            }
                        }
                    }
                }
            });
        }
    }

    checkRegex(registerName, namesRegex, 'Name', 'Solo se permite un espacio entre nombres');
    checkRegex(registerSurnames, namesRegex, 'Surnames', 'Solo se permite un espacio entre apellidos');
    checkRegex(registerAddress, addressRegex, 'Address', 'Introduce una dirección válida');
    checkRegex(registerEmail, emailRegex, 'Email', 'Debe contener los símbolos @ y .');
    checkRegex(registerPhone, phoneRegex, 'Phone', 'Máximo 9 dígitos además del prefijo');
    checkRegex(registerCodep, codepRegex, 'Codep', 'Máximo 5 dígitos, empezando por 28');
    checkRegex(registerPassword, passwordRegex, 'Password', 'Mínimo una mayúscula, una minúscula, un número, un carácter especial y 8 carácteres');
    checkRegex(registerPasswordc, passwordRegex, 'Passwordc', 'Las contraseñas no son equivalentes');



    // ------------------------------------------------------------------
    // SHOW AND HIDE PASSWORD
    // ------------------------------------------------------------------
    function togglePassword(button) {
        const eyeIcon = $(`#register${button}_eye`)[0];

        eyeIcon.addEventListener('click', () => {
            if (eyeIcon.src.includes('invisiblePassword')) {
                eyeIcon.src = '/music-shop-php/assets/icons/visiblePassword.svg';
                $(`#register${button}`)[0].type = 'text';
            } else {
                eyeIcon.src = '/music-shop-php/assets/icons/invisiblePassword.svg';
                $(`#register${button}`)[0].type = 'password';
            }
        });
    }
    togglePassword('Password');
    togglePassword('Passwordc');



    // ------------------------------------------------------------------
    // SEPARATE PHONE DIGITS
    // ------------------------------------------------------------------
    registerPhone.addEventListener('input', function () {
        let numeroActual = this.value;
        numeroActual = numeroActual.replace(/\s/g, '');

        let numeroFormateado = '';
        for (let i = 0; i < numeroActual.length; i++) {
            if (i > 0 && i % 3 === 0) {
                numeroFormateado += ' ';
            }
            numeroFormateado += numeroActual[i];
        }

        this.value = numeroFormateado;
    });



    // ------------------------------------------------------------------
    // SEND FORM TO SERVER
    // ------------------------------------------------------------------
    function sendForm(action, formData) {
        $.ajax({
            type: "POST",
            url: "/music-shop-php/controller/usersController.php",
            data: { action: action, formData: formData },
            dataType: "json",
            beforeSend: function () { },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: response.message,
                }).then(function () {
                    window.location.href = "index.php?login";
                })
            },
            timeout: 5000,
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Error " + xhr.status,
                    text: JSON.parse(xhr.responseText).error
                });
            },
        });
    }



    // ------------------------------------------------------------------
    // VALIDATE FORM INFO BEFORE SUBMIT
    // ------------------------------------------------------------------
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Objeto para rastrear errores
        const wrongFields = {
            name: false,
            surnames: false,
            address: false,
            email: false,
            phone: false,
            codep: false,
            password: false,
            passwordc: false
        };
        let errorAlert = '';
        let wrongFieldsCount = 0;

        if (registerName.value.trim() === '' || !namesRegex.test(registerName.value)) wrongFields.name = true;
        if (registerSurnames.value.trim() === '' || !namesRegex.test(registerSurnames.value)) wrongFields.surnames = true;
        if (registerAddress.value.trim() === '' || !addressRegex.test(registerAddress.value)) wrongFields.address = true;
        if (registerEmail.value.trim() === '' || !emailRegex.test(registerEmail.value)) wrongFields.email = true;
        if (registerPhone.value.trim() === '' || !phoneRegex.test(registerPhone.value.replace(/\s/g, ''))) wrongFields.phone = true;
        if (registerCodep.value.trim() === '' || !codepRegex.test(registerCodep.value)) wrongFields.codep = true;
        if (registerPassword.value.trim() === '' || !passwordRegex.test(registerPassword.value)) wrongFields.password = true;
        if (registerPasswordc.value.trim() === '' || !passwordRegex.test(registerPasswordc.value)) wrongFields.passwordc = true;

        for (const field in wrongFields) {
            if (wrongFields.hasOwnProperty(field)) {
                if (wrongFields[field]) {
                    wrongFieldsCount++;
                    errorAlert += field + ', ';
                }
            }
        }

        errorAlert = errorAlert.slice(0, -2);

        if (wrongFieldsCount === 1) {
            errorAlert += ' incorrecto.';
        } else {
            // Reemplazar la última coma por 'y' si hay más de un error
            const lastCommaIndex = errorAlert.lastIndexOf(',');
            errorAlert = errorAlert.slice(0, lastCommaIndex) + ' y' + errorAlert.slice(lastCommaIndex + 1);
            errorAlert += ' incorrectos.';
        }

        if (!wrongFields.name && !wrongFields.surnames && !wrongFields.address && !wrongFields.email && !wrongFields.phone && !wrongFields.codep && !wrongFields.password && !wrongFields.passwordc) {
            formData = {
                registerName: registerName.value,
                registerSurnames: registerSurnames.value,
                registerAddress: registerAddress.value,
                registerEmail: registerEmail.value,
                registerPhone: registerPhone.value,
                registerCodep: registerCodep.value,
                registerPassword: registerPassword.value
            }
            sendForm('registerUser', formData);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: errorAlert
            });
        }
    });
});