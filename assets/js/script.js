//VARIABLES
var btnSearch = document.getElementById('btn-search')
var mybutton = document.getElementById("myBtn");
var card = document.querySelector('#main-container');
//URL
var url = 'https://digimon-api.vercel.app/api/digimon';
//FETCH
fetch (url)
.then(response => response.json())
.then(datos => {listarDigimon(datos)})

//FUNCION PARA LLENAR LA TABLA CON TODOS LOS DIGIMON

    var contenido = document.querySelector('#lista-content');
    var div = document.querySelector('#tabla-digi');
    function listarDigimon(datos){
        contenido.innerHTML = ''
        for (let temp of datos){
            contenido.innerHTML += 
            `<tr>
                <td class="text-center">${temp.name}</td>
                <td class="text-center"><img src="${temp.img}"></td>
                <td class="text-center">${temp.level}</td>
            </tr>`
        }
        div.style.display = 'block';
    }



//FUNCION DE BUSCAR UN DIGIMON EN ESPECIFICO 
function searchDigimon(info){
    card.innerHTML = ''
    for (let temp of info){
        card.innerHTML += `<div class="col-sm-12 col-md-6 offset-md-3 pt-5">
              <div class="card justify-content-center">
                    <div class="card-header">
                        <h2 class="card-title text-center "><strong>${temp.name}</strong></h2>
                    </div>
                    <img class="card-img-top" id="img-card" src="${temp.img}" title='digimon-buscado'>
                    <div class="card-header ">
                        <h3 class="card-title text-center">  Nivel: ${temp.level}</h3>
                    </div>
              </div>
            </div>`
    }
}

//EJECUTAR MODAL DE ERROR AL BUSCAR UN DIGIMON
function errorSearch(msj){
    document.getElementById('errorMessage').innerHTML = msj;
    var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
}

//BUSQUEDA DE DIGIMON ESPECIFICO
btnSearch.addEventListener('click', function(e){
    e.preventDefault();
    var nombreDigimon = document.getElementById('nombre-digimon').value.trim();
    if (!(nombreDigimon == '')){
        var urlSearch = 'https://digimon-api.vercel.app/api/digimon/name/'+nombreDigimon;
        fetch (urlSearch)
        .then(response => response.json())
        .then(info => {
            if(info.length > 0){
                searchDigimon(info)
            } else {
                errorSearch('¡El Digimon buscado no existe!')
            }
        })
        .catch(error => console.log('Hubo un error: ',error))
    } else {
        errorSearch('¡Ingrese el nombre de un Digimon antes de buscar!');
    }
})

// FUNCIONABILIDAD DE BOTON SCROLL UP TO TOP
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};
function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}
