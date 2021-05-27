/* 
JavaScript / XML
web o pagina: ejercicios de XML y JavaScript
autor: Prof. Carlos Boni
fecha: 12 mayo 2021
resumen: lectura y carga en array bidimensional de un XML

sintesis:
la lógica se basa en el uso de tres variables de tipo sessionStorage
usuarioLogueado : si existe, su valor es el nombre de usuario en sesion
usuarioIntentando y claveIntentando: si existen significa que debemos
validarlas para crear usuarioLogueado si corresponde
*/

// variable global de la pagina

// las siguientes variables estarán como sessionStorage
let usrIntentando = "";
let claveIntentando = "";

function controlar(){
	// determinamos en qué estado se carga la página:
	// 1 - sin usuario
	// 2 - usuario intentando ingresar
	// 3 - usuario con sesion iniciada
	$("#ingresar").show();
	$("#boton_desloguearse").hide();
			
	
			
	if (sessionStorage.getItem("usuarioLogueado")) {
		// estado 3 de nuestro diagrama de estados - con usuario
		// estamos cargando la página teniendo un usuario logueado previamente
		// y con la sesión activa pues no se ha desconectado aún
		// ocultamos formulario de login y mostramos desconectar
		$("#formulario_login").hide();
		$("#boton_desloguearse").show();	
		
		alert('controlar 2!');
		
	} else {
		if (sessionStorage.getItem("usuarioIntentando")) {
			alert('Ha validado el XML!');
			
			// estado 2 de nuestro diagrama de estados - transición
			// estamos recargando luego de que haya un intento de login
			// debemos validar si el usuario existe
			validarXML();
			// tardo un poco en recargar para dar tiempo a AJAX?
			//for(let timer=1;timer<100000000;timer++);
			alert('termina la pausa');
			//location.reload();
			
			// si el usuario no está intentando loguearse aún ni está logueado
			// mostramos el formulario para que lo rellene
		} else {
			alert('El usuario no está logueado!');
			
			// estado 1 de nuestro diagrama de estados - sin usuario
			// mostramos formulario de login y ocultamos desconectar
			$("#formulario_login").show();
			$("#boton_desloguearse").hide();
		}
	}
}

function loguearse(){
	if (typeof(Storage) !== "undefined") {

	  
	   
	  // oculta la opción de login 
	  $("#formulario_login").hide();
	  
	  // Almacena un valor usando el método setItem del objeto localStorage
	  var nombreUsuario =document.forms["form_login"]["user"].value;
	  var passwordUsuario =document.forms["form_login"]["password"].value;
	  sessionStorage.setItem("usuarioIntentando", nombreUsuario);
	  sessionStorage.setItem("claveIntentando", passwordUsuario);
	  
	  // ya tengo en memoria webStorage lo que puso en el formulario
	  // al recargarse la página podré recordar esta información

	  //location.reload();
	} else {
	  document.getElementById("mensaje_informativo").innerHTML = "Este navegador no soporta web storage...";
	}
}

function validarXML() {
	
	alert('pasa por validarxml 1');
	
	// lee desde aquí.
	usrIntentando = sessionStorage.getItem("usuarioIntentando");
	claveIntentando = sessionStorage.getItem("claveIntentando");
	
	sessionStorage.removeItem("usuarioIntentando");
	sessionStorage.removeItem("claveIntentando");
	
	alert('pasa por validarxml 2');

	// código inspirado en el siguiente tutorial de Jquery:
	// https://www.learningjquery.com/2012/04/read-and-process-xml-using-jquery-ajax
	$.ajax({
		type: "GET",
		url: "https://raw.githubusercontent.com/Mariam-CE/proyecto/master/login/usuariosregistrados.xml",
		dataType: "xml",
		success: function(xml){
			
			var login_exito = false;
			
			$(xml).find('user').each(function(){
			  var name = $(this).find('name').text();
			  var password = $(this).find('password').text();
	
			  /* alert('usrIntentando es ' + usrIntentando); */
			  /* alert('claveIntentando es ' + claveIntentando); */
	
			  if ((name == usrIntentando) && (password == claveIntentando)) {
				// almacena que el usuario ya se ha logueado porque ha introducido
				// ... bien los datos
				sessionStorage.setItem("usuarioLogueado", usrIntentando );
				
				login_exito = true;
				
				alert('ya se ha logueado con éxito');
				location.reload();
				
			  }
			  
	
			  /* alert('name es ' + name); */
			  /* alert('password es ' + password); */
			});
			
			if (login_exito == true) {
				window.open("file:///D:/LENGUAJE%20DE%20MARCAS/PROYECTO%203%20TRIMESTRE/PROYECTO3TRIMESTRE/colores.html");

				alert('Esta redirigiendo');
				
			}
			
			if (login_exito == false) {
				alert('Escribe bien el nombre del usuario y el password');
			}	
			
		},
	  error: function() {
		alert("Ha ocurrido un error al procesar el archivo XML.");
	  }
	});		
	
	alert('pasa por validarxml 3');		
}

function switchSheet() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "css/style_dia.css") {
    theme.href = "css/style_noche.css";
  } else {
    theme.href = "css/style_dia.css";
  }
}

function desloguearse(){
	sessionStorage.removeItem("usuarioLogueado");
	sessionStorage.removeItem("usuarioIntentando");
	sessionStorage.removeItem("claveIntentando");
	location.reload();
}
	

