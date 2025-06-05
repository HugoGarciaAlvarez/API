window.addEventListener('DOMContentLoaded', function(){
    //Obtenemos los elementos del DOM
    let btnPeticion = this.document.getElementById('btnPedir');
    let inputDragonBall = this.document.getElementById('numeroDragonBall');
    let imgDragonBall = this.document.getElementById('imagenDragonBall');
    let divInfo = this.document.getElementById('infoDragonBall');
    let descripcionPersonaje = this.document.getElementById('descripcionDragonBall');

    btnPeticion.addEventListener('click', pedirDragonBall );
    


    function pedirDragonBall (){
        
        let nombreDragonBall = inputDragonBall.value.toLowerCase();

        fetch("https://dragonball-api.com/api/characters/" + nombreDragonBall)
            .then(res =>{
                console.log(res.status)
                if(!res.ok){
                    throw new Error("Personaje no encontrado no encontrado");
                }

                return res.json();
            })
            .then(data => {
                console.log(data);
                mostrarData(data);


            })
            .catch(error => {
                imgDragonBall = "";
                divInfo.innerHTML = "";
                descripcionPersonaje.innerHTML = "";
                console.log(error.mesage)
            })

    }
   function mostrarData(data) {
    // Obtener la URL de la imagen del personaje
    let urlImagen = data.image;
    imgDragonBall.src = urlImagen;

    // Formatear datos
    let nombre = data.name.toUpperCase();
    let ki = data.ki;
    let maxKi = data.maxKi;
    let raza = data.race;
    let gender = data.gender;
    let description = data.description;


    // Mostrar en el div con formato similar al de Pokémon
    divInfo.innerHTML =
        "<p><strong>Nombre</strong>: " + nombre + "</p>" +
        "<p><strong>Raza</strong>: " + raza + "</p>" +
        "<p><strong>Ki</strong>: " + ki + "</p>"+
         "<p><strong>Ki maximo</strong>: " + maxKi + "</p>"+
          "<p><strong>Genero </strong>: " + gender + "</p>" ;
    descripcionPersonaje.innerHTML = 
        "<p><strong>Descripcion</strong>: " + description + "</p>";
}
    
 function mostrarTodosLosPersonajes(){
    fetch("https://dragonball-api.com/api/characters")
 }   






})