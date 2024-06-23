$(document).ready(() => {
    const main = $('#wrapper')[0];
    let pagination = $('#pagination')[0];

    let prevPage = $('#prevPage')[0];
    let goFirstPage = $('#goFirstPage')[0];
    let goPrevPage = $('#goPrevPage')[0];

    let actualPage = $('#actualPage')[0];

    let goNextPage = $('#goNextPage')[0];
    let goLastPage = $('#goLastPage')[0];
    let lastPage = $('#lastPage')[0];

    let updateForm = $('#updateDiskForm form')[0];
    let insertForm = $('#insertDiskForm form')[0];

    const insertButton = $('#insertButton')[0];

    const APIURL = '/music-shop-php/controller/disksController.php';



    function setDisplay(element, condition) {
        element.style.display = condition ? 'inline' : 'none';
    }

    function resetPagination() {
        main.innerHTML +=
            `<div id='pagination'>
                <span id='prevPage'></span>
                <span id='goFirstPage' class="icon-arrow-left2"></span>
                <span id='goPrevPage' class="icon-circle-left"></span>
                <span id='actualPage'></span>
                <span id='goNextPage' class="icon-circle-right"></span>
                <span id='goLastPage' class="icon-arrow-right2"></span>
                <span id='lastPage'></span>
            </div>`;

        prevPage = $('#prevPage')[0];
        goFirstPage = $('#goFirstPage')[0];
        goPrevPage = $('#goPrevPage')[0];
        actualPage = $('#actualPage')[0];
        goNextPage = $('#goNextPage')[0];
        goLastPage = $('#goLastPage')[0];
        lastPage = $('#lastPage')[0];
    }

    function createCards(disks) {
        main.innerHTML = '';
        disks.forEach(function (disk) {
            let diskElement = document.createElement("div");
            diskElement.classList.add("albumCard");
            diskElement.dataset.id_products = disk.id_productos;
            diskElement.innerHTML = `
                <div class="container">
                    <div class="front" style="background-image: url(/music-shop-php/uploads/productos/${disk.imagen})"></div>
                    <div class="back">
                        <div class="inner">
                            <span>${disk.artista}</span>
                            <span>-</span>
                            <span>${disk.nombre}</span>
                            <span>${disk.precio}</span>
                            <div id='adminButtons'>
                                ${role === 'admin' ? `<button class="icon-pencil"></button>` : ''}

                                <button id='buy' class="details">
                                    <span>Details</span>
                                </button>

                                ${role === 'admin' ? `<button class="icon-bin"></button>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            main.appendChild(diskElement);
        });

        main.removeEventListener('click', mainClickListener);

        // Agregar el nuevo event listener
        main.addEventListener('click', mainClickListener);
    }

    function mainClickListener(event) {
        let id_products = '';

        if (event.target.classList.contains('icon-bin')) {
            id_products = event.target.closest('.albumCard').dataset.id_products;
            deleteDisk(id_products);
        } else if (event.target.classList.contains('icon-pencil')) {
            id_products = event.target.closest('.albumCard').dataset.id_products;
            editDiskById(id_products);
        } else if (event.target.closest('.details')) {
            id_products = event.target.closest('.albumCard').dataset.id_products;
            showDiskById(id_products);
        }
    }

    if (insertButton) {
        insertButton.addEventListener('click', () => {
            main.innerHTML = `
                <div id='insertDiskForm'>
                    <form>
                        <input type='text' id='insertName' name='name' placeholder='Nombre'/>
                        <input type='text' id='insertSection' name='section' placeholder='Seccion'/>
                        <input type='text' id='insertArtist' name='artist' placeholder='Artista'/>
                        <input type='text' id='insertPrice' name='price' placeholder='Precio'/>
                        <input type='text' id='insertStamp' name='stamp' placeholder='Sello'/>
                        <input type='text' id='insertFormat' name='format' placeholder='Formato'/>
                        <input type='text' id='insertState' name='state' placeholder='Estado'/>
                        <input type='text' id='insertQuantity' name='quantity' placeholder='Cantidad'/>
                        <input type='file' id='insertImage' name='image' placeholder='Foto'/>
                        <input type='submit' />
                    </form>
                </div>`

            insertForm = $('#insertDiskForm form')[0]

            insertForm.addEventListener('submit', (e) => {
                e.preventDefault();
                sendInsertForm();
            })
        })
    }

    function sendInsertForm() {
        let formData = new FormData();
        formData.append('action', 'insertDisk');
        formData.append('name', $('#insertName')[0].value);
        formData.append('section', $('#insertSection')[0].value);
        formData.append('artist', $('#insertArtist')[0].value);
        formData.append('price', $('#insertPrice')[0].value);
        formData.append('stamp', $('#insertStamp')[0].value);
        formData.append('format', $('#insertFormat')[0].value);
        formData.append('state', $('#insertState')[0].value);
        formData.append('quantity', $('#insertQuantity')[0].value);
        formData.append('newImage', $('#insertImage')[0].files[0]);

        console.log(formData);

        $.ajax({
            type: "POST",
            url: "/music-shop-php/controller/disksController.php",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            beforeSend: function () { },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: response.message,
                }).then(function () {
                    window.location.href = "index.php?shop";
                })
            },
            timeout: 5000,
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Error " + xhr.status,
                    text: xhr.responseText.error
                });
                if (xhr.responseText.errorDebug)
                    console.error(xhr.responseText.errorDebug);
            },
        });
    }

    function showDiskById(id_products) {
        $.ajax({
            type: "POST",
            url: "/music-shop-php/controller/disksController.php",
            data: { action: 'getDiskById', id_products: id_products },
            dataType: "json",
            beforeSend: function () { },
            success: function (response) {
                pagination.innerHTML = '';
                main.innerHTML = `
                    <div id='updateDiskForm'>
                        <img src='/music-shop-php/uploads/productos/${response.imagen}'>
                        
                        <form>
                            <span>${response.id_productos}</span>
                            <span>${response.imagen}</span>
                            <span>${response.nombre}</span>
                            <span>${response.artista}</span>
                            <span>${response.precio}</span>
                            <span>${response.seccion}</span>
                            <span>${response.sello}</span>
                            <span>${response.formato}</span>
                            <span>${response.estado}</span>
                            <span>${response.cantidad}</span>
                        </form>
                    </div>`
            },
            timeout: 5000,
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Error " + xhr.status,
                    text: JSON.parse(xhr.responseText).error
                });
                if (JSON.parse(xhr.responseText).errorDebug)
                    console.error(JSON.parse(xhr.responseText).errorDebug);
            },
        });
    }

    function editDiskById(id_products) {
        $.ajax({
            type: "POST",
            url: "/music-shop-php/controller/disksController.php",
            data: { action: 'getDiskById', id_products: id_products },
            dataType: "json",
            beforeSend: function () { },
            success: function (response) {
                pagination.innerHTML = '';
                main.innerHTML = `
                    <div id='updateDiskForm'>
                        <img src='/music-shop-php/uploads/productos/${response.imagen}'>

                        <form>
                            <input type='text' id='updateId_products' name='id_products' value='${response.id_productos}' hidden/>
                            <input type='text' id='currentImage' name='currentImage' value='${response.imagen}' hidden/>

                            <input type='text' id='updateName' name='name' value='${response.nombre}' />
                            <input type='text' id='updateArtist' name='artist' value='${response.artista}' />
                            <input type='text' id='updatePrice' name='price' value='${response.precio}' />
                            <input type='text' id='updateSection' name='section' value='${response.seccion}' />
                            <input type='text' id='updateStamp' name='stamp' value='${response.sello}' />
                            <input type='text' id='updateFormat' name='format' value='${response.formato}' />
                            <input type='text' id='updateState' name='state' value='${response.estado}' />
                            <input type='text' id='updateQuantity' name='quantity' value='${response.cantidad}' />
                            <input type='file' id='updateImage' name='image' />
                            <input type='submit' />
                        </form>
                    </div>`

                updateForm = $('#updateDiskForm form')[0];

                updateForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    sendUpdateForm();
                });
            },
            timeout: 5000,
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Error " + xhr.status,
                    text: JSON.parse(xhr.responseText).error
                });
                if (JSON.parse(xhr.responseText).errorDebug)
                    console.error(JSON.parse(xhr.responseText).errorDebug);
            },
        });
    }

    function sendUpdateForm() {
        let formData = new FormData();
        formData.append('action', 'updateDisk');
        formData.append('id_products', $('#updateId_products')[0].value);
        formData.append('name', $('#updateName')[0].value);
        formData.append('section', $('#updateSection')[0].value);
        formData.append('artist', $('#updateArtist')[0].value);
        formData.append('price', $('#updatePrice')[0].value);
        formData.append('stamp', $('#updateStamp')[0].value);
        formData.append('format', $('#updateFormat')[0].value);
        formData.append('state', $('#updateState')[0].value);
        formData.append('quantity', $('#updateQuantity')[0].value);
        formData.append('newImage', $('#updateImage')[0].files[0]);
        formData.append('currentImage', $('#currentImage')[0].value);

        console.log(formData);

        let result = confirm('Are you sure you want to update');

        if (result) {
            $.ajax({
                type: "POST",
                url: "/music-shop-php/controller/disksController.php",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",
                beforeSend: function () { },
                success: function (response) {
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                    }).then(function () {
                        window.location.href = "index.php?shop";
                    })
                },
                timeout: 5000,
                error: function (xhr) {
                    Swal.fire({
                        icon: "error",
                        title: "Error " + xhr.status,
                        text: xhr.responseText.error
                    });
                    if (xhr.responseText.errorDebug)
                        console.error(xhr.responseText.errorDebug);
                },
            });
        }
    }

    function deleteDisk(id_products) {
        if (confirm('Are you sure you want to delete')) {
            $.ajax({
                type: "POST",
                url: "/music-shop-php/controller/disksController.php",
                data: { action: 'deleteDisk', id_products: id_products },
                dataType: "json",
                beforeSend: function () { },
                success: function (response) {
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                    }).then(function () {
                        window.location.href = "index.php?shop";
                    })
                },
                timeout: 5000,
                error: function (xhr) {
                    Swal.fire({
                        icon: "error",
                        title: "Error " + xhr.status,
                        text: JSON.parse(xhr.responseText).error
                    });
                    if (JSON.parse(xhr.responseText).errorDebug)
                        console.error(JSON.parse(xhr.responseText).errorDebug);
                },
            });
        }
    }

    function getDisksByPage(url) {
        let currentPage = parseInt(url.split('=')[1]);
        if (isNaN(currentPage)) currentPage = 1;

        $.ajax({
            type: "GET",
            url: url,
            beforeSend: function () { },
            dataType: "json",
            success: function (response) {
                console.log(response);

                createCards(response.results)
                resetPagination();

                if (prevPage) prevPage.innerHTML = currentPage - 1;
                actualPage.innerHTML = currentPage;
                lastPage.innerHTML = response.info.pages;

                setDisplay(prevPage, response.info.prev !== null);
                setDisplay(goFirstPage, response.info.prev !== null);
                setDisplay(goPrevPage, response.info.prev !== null);
                setDisplay(goNextPage, response.info.next !== null);
                setDisplay(goLastPage, response.info.next !== null);
                setDisplay(lastPage, response.info.next !== null);

                goFirstPage.addEventListener('click', () => { getDisksByPage(APIURL + "?page=1"); });
                goPrevPage.addEventListener('click', () => { getDisksByPage(response.info.prev); });
                goNextPage.addEventListener('click', () => { getDisksByPage(response.info.next); });
                goLastPage.addEventListener('click', () => { getDisksByPage(APIURL + '?page=' + response.info.pages); });
            },
            timeout: 5000,
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Error " + xhr.status,
                    text: xhr.responseText.error
                });
            },
        });
    }

    getDisksByPage(APIURL + "?page=1")
});