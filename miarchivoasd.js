const palabras = ['Pseint','Index','Tinto','Caprendizaje','SofiaPlus','JavaScript','Galicia','Div','Github','Aprendiz','Chichipato','Repositorio','','Frontend','Algoritmo','Variable','Backend','Interfaz','Codigo','Script'];


const contenedor = document.getElementById('contenedor');
const Usadas = []
const botonInicio = document.getElementById('botonInicio');
const palabraMostrar = document.getElementById('palabraMostrar');
const resultado = document.getElementById('resultado');
const palabraMostrarTexto = document.getElementById('palabraMostrarTexto');
const vidasContenedor = document.getElementById('vidas');
const textoVidas = document.getElementById('textoVidas');
const keyboardButtons = document.querySelectorAll('.key');
const by = document.getElementById('by');
const contenedorTeclado = document.getElementById("keyboardContainer")
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
    Usadas.innerHTML = '';
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
 

    palabraAleatoria();
    AñadirPalabra();

    //se incluye el evento de agregar letras, si es segunda vez jugando, se incluye nuevamente
    document.addEventListener('keydown', eventoletra);  
    
    
});

let Seleccionada;
let letrasUsadas;
let hits;



const agregarLetra = Letra => {
    const elementoLetra = document.createElement('span');
    elementoLetra.innerHTML = Letra.toUpperCase();
}

/* const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
}; */



const endGame = () => {
    document.removeEventListener('keydown', eventoletra);

    //se quita el evento de escuchar teclas apretadas porque ya acabo el juego

    botonInicio.style.display = 'block';
    palabraMostrar.textContent = palabraseleccionada
    palabraMostrarTexto.style.display = 'block';

    resultado.style.display = 'block';
    textoVidas.style.display = 'none';
    vidasContenedor.style.display = 'none';
    by.style.display ='block';
    contenedorTeclado.style.display = 'none';
    


    if(vidas == 0){
        resultado.textContent = 'PERDISTE ;(';
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
}

const letraEquivocada = () => {
    
    vidas = vidas - 1;
    corazones();

    if(vidas == 0){
        endGame();
    }; // ahi iva === bodyParts.length, lo cambie por 10 para que sean 10 intentos por palabra
        //aca se puede poner que aparezca un texto que diga game over cuando los errores igualen la cantidad de partes del muñeco, o se puede cambiar por el sistema de vidas, todo esto cuando la letra es erronea ( va a saltar error en js porque quite la parte del muñeco)

}

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



// Función que simula la entrada de una letra
const buttonClick = (event) => {
    Letra = event.target.innerHTML.toUpperCase();
    if (!letrasUsadas.includes(Letra)) {
        LetraDetectada(Letra);

        event.target.classList.add('used');
    }
};

// Añadir el evento click a cada botón del teclado
keyboardButtons.forEach(button => {
    button.addEventListener('click', buttonClick);
});



const eventoletra = event => {
    let nuevaLetra = event.key.toUpperCase();
    // el event.key guardara el valor de la tecla presionada y la convertira en mayuscula

    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)){

        //Preguntar si la letra presionada es una tecla entre la a-z e incluyendo la ñ con la expresion regular

        // && si se uso ya la letra, con el ! se niega el "letrasUsadas.includes(nuevaLetra), es decir que no se incluye"


        
        LetraDetectada(nuevaLetra);
    };
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

const palabraAleatoria = () => {
    let word = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();

    //... pendiente por explicacion
    Seleccionada = word.split('');
    // se separa la palabra con el .split que funciona como separador, es decir, divide la palabra en un arreglo de caracteres

    palabraseleccionada = word

    //la palabra seleccionada pero sin ser dividida por el .split
}




