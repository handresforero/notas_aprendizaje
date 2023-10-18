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

function hola (nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, ' + nombre);
            resolve(nombre);
        }, 1500);
    });
}

function hablar(callbackHablar) {
    setTimeout(function () {
        console.log('Bla, bla, bla...');
        callbackHablar();
    }, 1000);
}

function adios(nombre, otroCallback) {
    setTimeout(function() {
        console.log('Adios', nombre);
        otroCallback();
    }, 1000);
}

hola('Carolos')
    .then()