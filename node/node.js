//callback
function soyAsincrono() {
    console.log('Hola, soy una función asincrona');
    setTimeout(function () {
        console.log('Estoy siendo asíncrono');
    }, 1000);        
}

console.log('Iniciando proceso...')

soyAsincrono();

console.log('Terminanod proceso...')


function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, '+nombre);
        miCallback(nombre); 
    }, 1000);
}

function hablar(callbackHablar) {
    setTimeout(function() {
        console.log('Bla bla bla bla...');
        callbackHablar();
    })
}

function adios (nombre, otroCallback) {
    setTimeout(function() {
        console.log('Adios', nombre);
        otroCallback();
    }, 1000);
}

console.log('Iniciando proceso...');
hola('Carlos', function () {
    adios('Carlos', function() {
        console.log('Terminando proceso...');
    });
});


///Callback Hell
function conversacion(nombre, veces, callback) {
    if (veces > 0) {
        hablar(function () {
            conversacion(nombre, --veces, callback);
        })
    } else {
        adios(nombre, callback);
    }
}
console.log('Iniciando proceso...')
hola('Carlos', function (nombre) {
    conversacion(nombre, 3, function() {
        console.log('Proceso terminado');
    });
});


//Promesas: son como callbaks y son estados, peuden estar resueltas o no
// ña diferencia entre promesas y callbacks, es que se pueden ir anidando
function hola (nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, ' + nombre);
            resolve(nombre);
        }, 1500);
    });
}

function hablar(callbackHablar) {
    return new Promise( (resolve, reject) => {
        setTimeout(function () {
            console.log('Bla, bla, bla...');
            r<esolve(nombre);
        }, 1000);
    })
    
}

function adios(nombre, otroCallback) {
    return new Promise( (resolve, reject) => {
        setTimeout(function() {
            console.log('Adios', nombre);
            resolve();
        }, 1000);
    } );    
}

console.log('Iniciando el proceso..')
hola('Carlos')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then((nombre) => {
        console.log('Terminando el proceso');
    })
    .catch (error => {
        console.error('Ha habido un error');
        console.error(error);
    })

// Async Await 
async function hola(nombre) {
    return Promise (function (resolve, reject) {
        setTimeout(function() {
            console.log('Hola' + nombre);
            resolve(nombre);
        }, 1500);
    });
}
// para que sirva este codigo se debe poner en las fucnioes hablar y adios async antes de function
async function main() {
    let nombre = await hola('Carlos');
    await hablar();
    await hablar();
    await adios(nombre);
}

main();

/////Globals
global.miVariable = 'elValor';
// no usar si es extricto ya que es foco de prblemas
//PAra ver los globales

// esto para probar varias veces una conexión a BD
console.log(global);

let i = 0;
let intervalo = setInterval(function () {
    console.log('Hola');
    if (i === 3) {
        clearInterval(intervalo);
    }
    i++;    
}, 1000);

//File system

// como traer modulo
const fs  = require('fs');