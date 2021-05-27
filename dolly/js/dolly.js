


function cargarUser() {
    if (sessionStorage.getItem("usuarioIntentando") !== null) {
        $("#login").css("display", "none");
        $("#mensajeLogin").css("display", "initial");
        document.getElementById('aqui').innerHTML = sessionStorage.getItem("usuarioIntentando");
    }
}