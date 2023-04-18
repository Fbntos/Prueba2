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
        
        if (temp.level === 'In Training'){
            var nivel = 'Los Digimon de este nivel son muy jóvenes y aún no han desarrollado completamente sus habilidades o personalidad. A menudo, son pequeños y adorables, y requieren mucho cuidado y atención para crecer y evolucionar.';
        } else if (temp.level === 'Rookie'){
            var nivel = 'Este nivel de Digimon es el siguiente después del nivel In Training. Los Digimon de este nivel han comenzado a desarrollar sus habilidades y habilidades especiales, pero aún no son muy fuertes. A menudo, tienen una personalidad joven e ingenua, y requieren entrenamiento y experiencia para evolucionar a niveles más altos.';
        } else if (temp.level === 'Champion') {
            var nivel = 'Este nivel de Digimon es la evolución intermedia entre el nivel Rookie y el nivel Ultimate/Mega. Los Digimon de este nivel son mucho más fuertes y tienen habilidades especiales únicas. A menudo, tienen una personalidad más madura y determinada, y son capaces de luchar contra otros Digimon de niveles más altos.'
        } else if (temp.level === 'Ultimate'){
            var nivel = 'Este nivel de Digimon es uno de los más poderosos. Los Digimon de este nivel son muy grandes y fuertes, y tienen habilidades especiales extremadamente poderosas. A menudo, tienen una personalidad seria y determinada, y pueden luchar contra otros Digimon de nivel Ultimate/Mega.'
        } else if (temp.level === 'Fresh'){
            var nivel = 'Este nivel de Digimon es el más bajo de todos, incluso más bajo que el nivel In Training. Los Digimon de este nivel son recién nacidos y aún no han desarrollado completamente su forma o personalidad. A menudo, son muy pequeños y adorables, y requieren mucho cuidado y atención para crecer y evolucionar.'
        } else if (temp.level === 'Mega'){
            var nivel = 'Este nivel de Digimon es el más poderoso de todos. Los Digimon de este nivel son enormes y tienen habilidades especiales extremadamente poderosas. A menudo, tienen una personalidad seria y determinada, y son capaces de luchar contra otros Digimon de nivel Mega. Algunos Digimon de nivel Mega son considerados legendarios o divinos.'
        } else if (temp.level === 'Armor'){
            var nivel = 'Este nivel de Digimon es único y se logra a través de la armadura de Digi-Eggs, que proporciona una forma alternativa de evolución a través de la protección que brinda. Los Digimon de nivel Armor tienen habilidades especiales únicas y pueden ser más poderosos que los Digimon de su nivel correspondiente.'
        }
        card.innerHTML += `<div class="col-sm-12 col-md-6 offset-md-3 pt-5">
              <div class="card justify-content-center">
                    <div class="card-header">
                        <h2 class="card-title text-center "><strong>${temp.name}</strong></h2>
                    </div>
                    <img class="card-img-top" id="img-card" src="${temp.img}" title='digimon-buscado'>
                    <div class="card-body text-center">
                        <h3 class="card-title text-center">  Nivel: ${temp.level}</h3>
                        <p class="card-text text-center">${nivel}</p>
                        <a onclick="location.reload()" class="btn btn-warning">Volver</a>
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
