$(document).ready(() => {
    // ------------------------------------------------------------------
    // VARIABLES STATEMENT
    // ------------------------------------------------------------------
    const emailForm = $('#emailForm')[0];
    const emailName = $('#emailName')[0];
    const emailAddress = $('#emailAddress')[0];
    const emailSubject = $('#emailSubject')[0];
    const emailContent = $('#emailContent')[0];

    const nameRegex = /^([a-záéíóúA-ZÁÉÍÓÚ]+\s?)+$/;
    const addressRegex = /^(\w+)\@(\w+)\.(\w+)$/;
    const subjectRegex = /^.{1,60}$/;
    const contentRegex = /^.{1,320}$/;

    // ------------------------------------------------------------------
    // FUNCTIONS STATEMENT
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // CHECK FORM INFO
    // ------------------------------------------------------------------
    function createSpanAfterInput(input, data, message) {
        let errorSpan = document.createElement('span');
        errorSpan.innerHTML = message
        errorSpan.id = `email${data}Error`;
        input.insertAdjacentElement("afterend", errorSpan);
    }

    function chechRegex(input, regex, data, message){
        input.addEventListener("blur", () => {
            // Comprobamos si el input esta vacío
            if (input.value.trim() === '' || input.value === null || input.value === undefined){
                // Reseteamos el input a negro sin errores
                input.style.borderColor = 'black';
                if ($(`#email${data}Error`)[0]) $(`#email${data}Error`)[0].remove();
            } else {
                // Si el input recibe algo, comprobamos que sea válido
                if(!regex.test(input.value)){
                    // Si no lo es, mostramos error en rojo
                    input.style.borderColor = 'red';
                    if (!$(`#email${data}Error`)[0]) createSpanAfterInput(input, data, message)
                } else {
                    // Si es correcto borramos el posible error y mostramos verde
                    input.style.borderColor = 'rgb(26, 196, 26)';
                    if ($(`#email${data}Error`)[0]) $(`#email${data}Error`)[0].remove();
                }
            }
        });
    }

    chechRegex(emailName, nameRegex, 'Name', '*Introduce un nombre y apellidos válidos');
    chechRegex(emailAddress, addressRegex, 'Address', '*Debe incluir @ y . (test@test.com)');
    chechRegex(emailSubject, subjectRegex, 'Subject', '*Debe incluir como máximo 60 caracteres.');
    chechRegex(emailContent, contentRegex, 'Content', '*Debe incluir como máximo 320 caracteres.');


    // ------------------------------------------------------------------
    // VALIDATE FORM INFO BEFORE SUBMIT
    // ------------------------------------------------------------------
    emailForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Objeto para rastrear errores
        const wrongFields = {
            name: false,
            address: false,
            subject: false,
            content: false
        };
        let errorAlert = '';
        let wrongFieldsCount = 0;

        if (emailName.value.trim() === '' || !nameRegex.test(emailName.value)) wrongFields.name = true;
        if (emailAddress.value.trim() === '' || !addressRegex.test(emailAddress.value)) wrongFields.address = true;
        if (emailSubject.value.trim() === '' || !subjectRegex.test(emailSubject.value)) wrongFields.subject = true;
        if (emailContent.value.trim() === '' || !contentRegex.test(emailContent.value)) wrongFields.content = true;

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

        if (!wrongFields.name && !wrongFields.address && !wrongFields.subject && !wrongFields.content) {
            Swal.fire({
                icon: "success",
                title: "Formulario enviado.",
            }).then(function() {
                emailForm.submit();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: `${errorAlert}`
            });
        }
    });


    // ------------------------------------------------------------------
    // RESET FORM INFO
    // ------------------------------------------------------------------
    function resetForm(input, data){
        if ($(`#email${data}Error`)[0]) $(`#email${data}Error`)[0].remove();
        input.style.borderColor = 'black';
        input.value = '';
    }

    emailForm.addEventListener('reset', (event) => {
        event.preventDefault();
        resetForm(emailName, 'Name');
        resetForm(emailAddress, 'Address');
        resetForm(emailSubject, 'Subject');
        resetForm(emailContent,'Content');
    });
});