const palabras = ['Pseint','Index','Tinto','Caprendizaje','SofiaPlus','JavaScript','Galicia','Div','Github','Aprendiz','Chichipato','Repositorio','Diego','Frontend','Algoritmo','Variable','Backend','Interfaz','Codigo','Script'];

6
const contenedor = document.getElementById('contenedor');
// contenedor de letras
const botonInicio = document.getElementById('botonInicio');
// boton iniciar juego
const palabraMostrar = document.getElementById('palabraMostrar');
// mostrar palabra al final de juego
const resultado = document.getElementById('resultado');
// mostrar si gano o perdio
const palabraMostrarTexto = document.getElementById('palabraMostrarTexto');
// "palabra:" xxxxxxx
const vidasContenedor = document.getElementById('vidas');
// "contenedor de los corazones"
const textoVidas = document.getElementById('textoVidas');
// texto de "vidas:"
const botonesTeclado = document.querySelectorAll('#tecla');
// siempre devuelve el ultimo elemento96
const by = document.getElementById('by');
const contenedorTeclado = document.getElementById("contenedorTeclado")
//ocultar varios textos al iniciar el juego por primera vez, despues al darle al boton de rejugar el evento les da la orden de ocultarse"


palabraMostrarTexto.style.display = 'none';
resultado.style.display = 'none';
textoVidas.style.display = 'none';
vidasContenedor.style.display = 'none';
by.style.display = 'block';
contenedorTeclado.style.display = 'none';



const corazones = () => {
    vidasContenedor.innerHTML = '';
    for (let i = 0; i < vidas; i++) {
        const corazon = document.createElement('img');
        corazon.src = "img/pngfind.com-minecraft-heart-png-697698.png";
        vidasContenedor.appendChild(corazon);
    }
};


botonInicio.addEventListener('click', ()=>{

    //inicia el juego

    letrasUsadas = [];
    hits = 0;
    contenedor.innerHTML = '';
    botonInicio.style.display = 'none';
    palabraMostrar.style.display = 'block';
    palabraMostrar.textContent = "";
    palabraMostrarTexto.style.display = 'none';
    vidas = 10;
    contenedor.style.display = 'block';
    resultado.style.display = 'none';
    textoVidas.style.display = 'block';
    vidasContenedor.style.display = 'block';
    by.style.display ='none';
    contenedorTeclado.style.display = 'block';

    corazones();
    resetTeclado();
    palabraAleatoria();
    AñadirPalabra();

    //se incluye el evento de agregar letras, si es segunda vez jugando, se incluye nuevamente
     
    
    
});

let Seleccionada;
let letrasUsadas;
let hits;

const palabraAleatoria = () => {
    let word = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();

    //... pendiente por explicacion
    Seleccionada = word.split('');
    // se separa la palabra con el .split que funciona como separador, es decir, divide la palabra en un arreglo de caracteres

    palabraseleccionada = word

    //la palabra seleccionada pero sin ser dividida por el .split
};


const AñadirPalabra = () => { 
    Seleccionada.forEach(Letra => {
        //se toma la palabra seleccionada para iterarla con el foreach
        const elementoLetra = document.createElement('span');
        elementoLetra.innerHTML = Letra.toUpperCase();
        //se pasa a mayuscula
        elementoLetra.classList.add('Letra');
        elementoLetra.classList.add('invisible')
        contenedor.appendChild(elementoLetra);
        // el elementoLetra se vuelve hijo de contenedor
    });
};

// Función que simula la entrada de una letra
const teclaPresionada = (event) => {
    Letra = event.target.innerHTML.toUpperCase();
    if (!letrasUsadas.includes(Letra)) {
        LetraDetectada(Letra);

        //si las letras usadas no incluyen la nueva letra presionada, se detecta una nueva y se le asigna la clase usado

        event.target.classList.add('usado');

        //a la tecla seleccionada se le asigna el usado.
    }
};

// Añadir el evento click a cada botón del teclado
botonesTeclado.forEach(button => {
    button.addEventListener('click', teclaPresionada);
});



const LetraDetectada = Letra => {
    if(Seleccionada.includes(Letra)) {
        letraCorrecta(Letra);
    } else {
        //eventos cuando falle la letra
        letraEquivocada();
        
    }
    agregarLetra(Letra);
    letrasUsadas.push(Letra);
};

const letraCorrecta = Letra => {
    const { children } =  contenedor;

    // con el { children} desestructuran los elementos hijos del elemento contenedor, el elemento hijo es el elementoLetra, lo que significa que el children en cierta forma extrae los nodos hijos del elemento contenedor
    for(let i = 0; i < children.length; i++) {

        //busca letra por letra hasta encontrarla dentro de la palabra
        if(children[i].innerHTML === Letra) {
            
            children[i].classList.toggle('invisible');
            //se alterna el estado de la letra de invsible a visible solo si es correcta
            hits++;
    
        }
    }
    if(hits === Seleccionada.length) endGame();

    //hits o aciertos es cuando se acierta la letra, si se iguala a la cantidad de letras de la palabra se acaba la partida porque en teoria ya adivino toda la palabra
};

const letraEquivocada = () => {
    
    vidas = vidas - 1;
    corazones();

    if(vidas == 0){
        endGame();
    };

};

const agregarLetra = Letra => {
    const elementoLetra = document.createElement('span');
    elementoLetra.innerHTML = Letra.toUpperCase();
};



const endGame = () => {

    

    botonInicio.style.display = 'block';
    palabraMostrar.textContent = palabraseleccionada
    palabraMostrarTexto.style.display = 'block';

    resultado.style.display = 'block';
    textoVidas.style.display = 'none';
    vidasContenedor.style.display = 'none';
    by.style.display ='block';
    contenedorTeclado.style.display = 'none';
    


    if(vidas == 0){
        resultado.textContent = 'PERDISTE';
        resultado.classList.remove('verdecito');
        resultado.classList.add('rojito');
        palabraMostrarTexto.classList.add('rojito');
        palabraMostrar.classList.add('rojito');

    }else{
        resultado.textContent = '¡GANASTE!'
        resultado.classList.remove('rojito');
        resultado.classList.add('verdecito');
        contenedor.style.display = 'none';
        palabraMostrarTexto.classList.add('verdecito');
        palabraMostrar.classList.add('verdecito');

    }

}

const resetTeclado = () => {
    botonesTeclado.forEach(button => {
        button.classList.remove('usado');

        // se remueve el usado para iniciar otra partida
    });
};



