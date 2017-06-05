// JavaScript source code
var xmlhttp = new XMLHttpRequest();
var url = "js/php.php";
var myArr;

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	//alert(this.responseText);
        var documentJson = JSON.parse(this.responseText);
        myArr = documentJson;
        myFunction(myArr["formulario"]);
        
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
	
    var select1 = document.getElementById("g");
    var select2 = document.getElementById("e");
    var select3 = document.getElementById("t");
    var titulo1 = document.getElementById("general");
    var titulo2 = document.getElementById("energia");
    var titulo3 = document.getElementById("transporte");
    
    for (i = 0; i < arr.length; i++) {
        var divPregunta = document.createElement("div");
        divPregunta.setAttribute("class", "preguntas");
        if(arr[i].categoria == "general") {
             select1.appendChild(divPregunta);
             titulo1.style.display = "flex";
        } else if(arr[i].categoria == "Energia") {
            select2.appendChild(divPregunta);
            titulo2.style.display = "flex";
        } else {
            select3.appendChild(divPregunta);
            titulo3.style.display = "flex";
        }
        var pPregunta = document.createElement("p");
        divPregunta.appendChild(pPregunta)
        var nodoPregunta = document.createTextNode(arr[i].textopregunta);
        pPregunta.appendChild(nodoPregunta);
        var formRespuesta = document.createElement("form");
        formRespuesta.setAttribute("action", "insert.php");
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
			inputRespuesta.setAttribute("onchange","mostrar( "+arr[i].respuesta[xd].idrespuesta + ")");
            var labelText = document.createTextNode(arr[i].respuesta[xd].textorespuesta);
            label.appendChild(labelText);
            label.innerHTML += "<br>";
            formRespuesta.appendChild(inputRespuesta);
            formRespuesta.appendChild(label);  
        }
            
        if(arr[i].dependiente == null ) {
                divPregunta.style.display = "flex";
                divPregunta.setAttribute("id",arr[i].idpregunta);
        } else {
             divPregunta.setAttribute("class","preguntas dependiente");
             divPregunta.setAttribute("id",arr[i].idpregunta);
        }
        divPregunta.appendChild(formRespuesta);    
    }
}

function mostrar(id){
    var array = myArr["dependencias"];
    
    for(i = 0 ; i < array.length ; i++) {
         if(array[i].idDepende == id) {
          document.getElementById(array[i].idPregunta).style.display = "flex";
        } else {
            document.getElementById(array[i].idPregunta).style.display = "none";
        } 
    } 
}