$(document).ready(() => {
    if($('#logOut')[0]){
        $('#logOut')[0].addEventListener('click', function(event) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/MarioMusicShop/controller/usersController.php",
                data: {action: 'logOut'},
                dataType: "json",
                beforeSend: function () {},
                success: function (response) {
                    window.location.href = "index.php?login";
                    console.log(response.message);
                },
                timeout: 5000,
                error: function (error) {
                    console.error(error.responseText);
                },
            });
        });
    }
});