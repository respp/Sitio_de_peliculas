let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const numero1 = document.getElementById('numero1');
const numeroActual = document.getElementById('numeroActual')
const numero2 = document.getElementById('numero2');
numero1.textContent = pagina-1;
numeroActual.textContent = pagina;
numero2.textContent = pagina+1;




btnSiguiente.addEventListener('click', () => {
    if (pagina<1000){
        pagina += 1;    
    cargarPeliculas();
    }
})
btnAnterior.addEventListener('click', () => {
    if (pagina>1){
        pagina -= 1;    
    cargarPeliculas();
    }
})

const cargarPeliculas = async() =>{
    try{
   const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=60a7e6ea574bc2a14b9bfa7de69cf584&language=es-MX&page=${pagina}`);
   //await solo funciona con el async en la funcion, y sirve para que la siguinte linea ocurra cuando termine de cargar la url
   console.log(respuesta);

   if(respuesta.status === 200){//si la respuesta es correcta
    const datos = await respuesta.json();

    let peliculas = '';
    
    datos.results.forEach(pelicula => {
        peliculas += `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        
        <h3 class="titulo">${pelicula.title}</h3>
        </div>
        `;

    });
    document.getElementById('contenedor').innerHTML = peliculas;

   }else if(respuesta.status === 401){//si la api key(el link) es erronea
       console.log('la api key es erronea');
   }else if(respuesta.status === 404){//si hay un error porque no se encontró el estado 401, y por ende la pelicula
       console.log('la pelicula no se encuentra disponible');
   }else{//si hay un error desconocido
       console.log('ocurrio un error inesperado');
   }
   
    }catch(error){
    console.log(error);
    }
    //siempre que se use async/await se usa tambien try/catch
    numero1.textContent = pagina-1;
    numeroActual.textContent = pagina;
    numero2.textContent = pagina+1;
}

cargarPeliculas();