const palabras = ['Pseint','Viveros','Tinto','Caprendizaje','SofiaPlus','JavaScript','Galicia','Div','Github','Aprendiz','Caracol','Abajo','','Bonito','Cesta','Sol','Beber','Botella','Hamburguesa','Invierno'];


const contenedor = document.getElementById('contenedor');
const Usadas = document.getElementById('letrasUsadas');
const botonInicio = document.getElementById('botonInicio');
const textoAciertos = document.getElementById('textoUsadas');
const palabraMostrar = document.getElementById('palabraMostrar');
const resultado = document.getElementById('resultado');
const palabraMostrarTexto = document.getElementById('palabraMostrarTexto');
const contenedorUsadas = document.getElementById('contenedorUsadas');

//ocultar varios textos al iniciar el juego por primera vez, despues al darle al boton de rejugar el evento les da la orden de ocultarse"
textoAciertos.style.display = 'none';
contenedorUsadas.style.display = 'none';
palabraMostrarTexto.style.display = 'none';
resultado.style.display = 'none';


botonInicio.addEventListener('click', ()=>{

    //inicia el juego

    letrasUsadas = [];
    errores = 0;
    hits = 0;
    contenedor.innerHTML = '';
    Usadas.innerHTML = '';
    botonInicio.style.display = 'none';
    textoAciertos.style.display = 'block';
    Usadas.style.display = 'block';
    palabraMostrar.style.display = 'block';
    palabraMostrar.textContent = "";
    palabraMostrarTexto.style.display = 'none';
    contenedorUsadas.style.display = 'block';
    vidas = 10;
    contenedor.style.display = 'block';
    resultado.style.display = 'none';

    //drawHangMan();

    palabraAleatoria();
    drawWord();
    document.addEventListener('keydown', letterEvent);  
    
    //evento del teclado, no lo entendi..
});






let Seleccionada;
let letrasUsadas;
let errores = 0;
let hits;



const agregarLetra = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    Usadas.appendChild(letterElement);
}

/* const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
}; */



const endGame = () => {
    document.removeEventListener('keydown', letterEvent);

    textoAciertos.style.display = 'none';
    botonInicio.style.display = 'block';
    Usadas.style.display = 'none';
    palabraMostrar.textContent = palabraseleccionada
    palabraMostrarTexto.style.display = 'block';
    contenedorUsadas.style.display = 'none';
    resultado.style.display = 'block';

    if(vidas == 0){
        resultado.textContent = 'PERDISTE';
        resultado.classList.remove('verdecito');
        resultado.classList.add('rojito');
        palabraMostrarTexto.classList.add('rojito');
        palabraMostrar.classList.add('rojito');

    }else{
        resultado.textContent = 'GANASTE'
        resultado.classList.remove('rojito');
        resultado.classList.add('verdecito');
        contenedor.style.display = 'none';
        palabraMostrarTexto.classList.add('verdecito');
        palabraMostrar.classList.add('verdecito');

    }
}

const letraCorrecta = letter => {
    const { children } =  contenedor;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('invisible');
            hits++;
        }
    }
    if(hits === Seleccionada.length) endGame();

    //hits o aciertos es cuando se acierta la letra, si se iguala a la cantidad de letras de la palabra se acaba la partida
}

const letraEquivocada = () => {
    // addBodyPart(bodyParts[errores]);
    vidas = vidas - 1;
    
    if(vidas == 0){
        endGame();
    }; // ahi iba === bodyParts.length, lo cambie por 10 para que sean 10 intentos por palabra
        //aca se puede poner que aparezca un texto que diga game over cuando los errores igualen la cantidad de partes del muñeco, o se puede cambiar por el sistema de vidas, todo esto cuando la letra es erronea ( va a saltar error en js porque quite la parte del muñeco)
    
}

const LetraDetectada = letter => {
    if(Seleccionada.includes(letter)) {
        letraCorrecta(letter);
    } else {
        //eventos cuando falle la letra
        letraEquivocada();
        
    }
    agregarLetra(letter);
    letrasUsadas.push(letter);
};


const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !letrasUsadas.includes(newLetter)) {
        LetraDetectada(newLetter);
    };
};
//const letterevent es igual :Usa una expresión regular (/^[a-zñ]$/i) para verificar si newLetter es una sola letra del alfabeto español (incluyendo ñ).
//^ y $: Indican que se evalúa la cadena completa (una sola letra). [a-zñ]: Especifica que puede ser cualquier letra de la a a la z (incluyendo ñ).
//i: Hace que la búsqueda no distinga entre mayúsculas y minúsculas. si la tecla presionada no es letra condicion its not valid


const drawWord = () => {
    Seleccionada.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('invisible')
        contenedor.appendChild(letterElement);
    });
};

const palabraAleatoria = () => {
    let word = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    Seleccionada = word.split('');

    palabraseleccionada = word
}
// palabra aleatoria comment: Math.random(): Genera un número aleatorio entre 0 y 1.
//Math.random() * palabras.length: Multiplica este número por la cantidad de palabras en el array palabras.
//Math.floor(...): Redondea hacia abajo para obtener un índice válido del array.
//palabras[...]: Obtiene la palabra en ese índice.
//.toUpperCase(): Convierte la palabra a mayúsculas.
//word: Almacena la palabra seleccionada en mayúsculas.
/////
//word.split(''): Convierte la palabra en un array de letras individuales.
//Ejemplo: Si word = "JUEGO", entonces Seleccionada = ["J", "U", "E", "G", "O"].
//Propósito: Se usa para manipular la palabra letra por letra, útil en juegos como el ahorcado}

//word contiene la palabra aleatoria en mayúsculas.
//Seleccionada contiene un array con cada letra separada.
///palabraseleccionada almacena la palabra completa en una variable separada.
//Esta estructura es útil si necesitas trabajar tanto con la palabra completa como con sus letras individuales.


