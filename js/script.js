// JavaScript source code
var xmlhttp = new XMLHttpRequest();
var url = "js/php.php";
var myArr;

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var documentJson = JSON.parse(this.responseText);
        myArr = documentJson;
        myFunction(myArr["formulario"]);
        
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {

    var contenido = document.getElementById("box-container");
    var formRespuesta = document.createElement("form");
    formRespuesta.setAttribute("action", "insert.php");
    contenido.appendChild(formRespuesta);
	
    var select1 = document.createElement("div");
    select1.setAttribute("id","g");
    var titulo1 = document.createElement("h2");
    titulo1.setAttribute("id","general");
    var nodo1 = document.createTextNode("General");
    titulo1.appendChild(nodo1);
    select1.appendChild(titulo1);
    

    var select2 = document.createElement("div");
    select2.setAttribute("id","e");
    var titulo2 = document.createElement("h2");
    titulo2.setAttribute("id","energia");
    var nodo2 = document.createTextNode("Energía");
    titulo2.appendChild(nodo2);
    select2.appendChild(titulo2);

    var select3 = document.createElement("div");
    select3.setAttribute("id","t");
    var titulo3 = document.createElement("h2");
    titulo3.setAttribute("id","transporte");
    var nodo3 = document.createTextNode("Transporte");
    titulo3.appendChild(nodo3);
    select3.appendChild(titulo3);

    var select4 = document.createElement("div");
    select4.setAttribute("id","a");
    var titulo4 = document.createElement("h2");
    titulo4.setAttribute("id","agua");
    var nodo4 = document.createTextNode("Agua");
    titulo4.appendChild(nodo4);
    select4.appendChild(titulo4);


    var select5 = document.createElement("div");
    select5.setAttribute("id","m");
    var titulo5 = document.createElement("h2");
    titulo5.setAttribute("id","materiales");
    var nodo5 = document.createTextNode("Materiales");
    titulo5.appendChild(nodo5);
    select5.appendChild(titulo5);

    for (i = 0; i < arr.length; i++) {
        var divPregunta = document.createElement("div");
        divPregunta.setAttribute("class", "preguntas");
        if(arr[i].categoria == "general") {
             select1.appendChild(divPregunta);
             titulo1.style.display = "flex";
             formRespuesta.appendChild(select1);
        } else if(arr[i].categoria == "Energia") {
            select2.appendChild(divPregunta);
            titulo2.style.display = "flex";
            formRespuesta.appendChild(select2);
        } else if(arr[i].categoria == "Transporte"){
            select3.appendChild(divPregunta);
            titulo3.style.display = "flex";
            formRespuesta.appendChild(select3);
        } else if(arr[i].categoria == "Agua"){
            select4.appendChild(divPregunta);
            titulo4.style.display = "flex";
            formRespuesta.appendChild(select4);
        } else {
            select5.appendChild(divPregunta);
            titulo5.style.display = "flex";
            formRespuesta.appendChild(select5);
        }

        var pPregunta = document.createElement("p");
        divPregunta.appendChild(pPregunta)
        var nodoPregunta = document.createTextNode(arr[i].textopregunta);
        pPregunta.appendChild(nodoPregunta);
        var divRespuestas = document.createElement("div");
        divRespuestas.setAttribute("class", "respuestas");
        var sep = document.createElement("hr");
        divPregunta.appendChild(sep);
        for (var xd = 0; xd < arr[i].respuesta.length; xd++) {
            var nombre = i + "-" + xd;
            if(arr[i].respuestamultiple == "radio"){
                var inputRespuesta = document.createElement("input");
                inputRespuesta.setAttribute("type", "radio");
                inputRespuesta.setAttribute("id",nombre);
            } else {
                var inputRespuesta = document.createElement("input");
                inputRespuesta.setAttribute("type", "checkbox");
                inputRespuesta.setAttribute("id",nombre);
            }
            inputRespuesta.setAttribute("name", arr[i].idpregunta);
            inputRespuesta.setAttribute("value", arr[i].respuesta[xd].idrespuesta);
            var label = document.createElement("label");
	        label.setAttribute("for",nombre);
			inputRespuesta.setAttribute("onchange","mostrar("+arr[i].respuesta[xd].idrespuesta + "," + arr[i].idpregunta + ")");
            var labelText = document.createTextNode(arr[i].respuesta[xd].textorespuesta);
            label.appendChild(labelText);
            label.innerHTML += "<br>";
            divRespuestas.appendChild(inputRespuesta);
            divRespuestas.appendChild(label);  
        }

        if(arr[i].dependiente == null ) {
                divPregunta.style.display = "flex";
                divPregunta.setAttribute("id",arr[i].idpregunta);
        } else {
             divPregunta.setAttribute("class","preguntas dependiente");
             divPregunta.setAttribute("id",arr[i].idpregunta);
        }
        divPregunta.appendChild(divRespuestas);    
    }
    var divBoton = document.createElement("div");
    divBoton.setAttribute("id","divBoton");
    var boton = document.createElement("input");
    boton.setAttribute("type","submit");
    boton.setAttribute("value","Enviar");
    boton.setAttribute("id","botonFormulario");
    divBoton.appendChild(boton);
    formRespuesta.appendChild(divBoton);
}

function mostrar(id,preg){
    var array = myArr["dependencias"];
    
    for(i = 0 ; i < array.length ; i++) {
         if(array[i].idDepende == id && array[i].idPregunta != preg) {
            document.getElementById(array[i].idPregunta).style.display = "flex";
        } else if(array[i].idDepende > id){
            document.getElementById(array[i].idPregunta).style.display = "none";
        }
    } 
}