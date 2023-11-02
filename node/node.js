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

//File system // permite acceder a archicos en el sistema

// como traer modulo
const fs  = require('fs');
const { dirname } = require('path');

function leer(ruta, cb) {
    fs.readFile(ruta, (err, data) => {
        cb  (data.toString()); 
    })
}
leer(__dirname + '/ archivo.text', console.log)

function escribir(ruta, contenido, cb) {
    fs.writeFile(ruta, contenido, function (err) {
        if (err) {
            console.error('No he podido escribirlo', err);        
        } else {
            console.log('Se ha escrito correctamente');
        }
    });
} 
escribir(__dirname + 'archivo.txt', 'Spy un archivo nuevo', console.log);

//borar un archivo
function borrar(ruta, cb) {
    fs.unlink(ruta, cb);
}
borrar(__dirname + 'archivo1.txt', console.log);

/// Funciones de consola
console.log('Algo')
console.info()
console.error()
console.warn() //warning
console.table()//muestra datos en forma de tabla
console.group()//agrupar multples logs
console.groupEnd()
console.count()
console.countReset()

/// Gestión de errores
function serompe() {
    return 3+z;
}

try {
    serompe();
} catch(err) {
    console.error('Algo se ha roto');
    console.error(err.message);
}

/// Ejecutar procensos hijos
const { exec } = require('child_process');
// es similar a // const exec = require('child_process').exec;

exec('node modulos/consola.js', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return false;
    }
    console.log(stdout);
})

const { exec, spawn } = require('child_process');

let proceso = spawn('ls', ['-la']);

/// Respuestas http
const http = require('http');

http.createServer(function (req, res){
    console.log('Nueva petición');
    console.log(req.url);

    res.writeHead(201, { 'Content-Type': 'text/plain' })
    res.write('Hola hola');

    res.end();
}).listen(3000);

function router(req, res) { 
    console.log('Nueva petición');
    console.log(req,url);

    switch (req,url) {
        case '/hola':
            res.write('Hola que tal');
            res.end();
            break
        default:
            res.write('Error 404: no se lo que quieres');
            res.end();

    }
}

///os
const os = require('os');
console.log(os.arch()); // si es de x64 o x32
console.log(os.platform()); // si estamos e lnux o wiendos
console.log(os.cpus())
console.log(os.cpus().legnth) // ver los núcleos
console.log(os.freemem()); /// memoria libre en bytes
console.log(os.homedir()); // ver directorio raiz

//procesos
//antes que termine 
procces.on('beforeExit', () => {
    console.log('El va a terminar');
})

//despúes del exit no se ejecuta nada dentro del process on
procces.on('exit', () => {
    console.log('El proceso acabó');
})

//capturar el proceso cuando falla
process.on('uncaughtException', (err, origen) => {
    console.error('Se olvidó capturar un error');
    console.error(err);
})
//para promesas que se han rechazado
process.on('uncaughtRejection')

//para traer un módulo
const modulo = require('./modulo');
modulo();
//esto iria en el mpodulo
function saludar() {
    console.log('hola');
}
module.exports = saludar;

/// Para cifrar archivos
 const bcrypt = require('bcrypt');

 const password = '123423435';
 bcrypt.hash(password, 5, function(err, hash) {
    console.log(hash)
 })

/// libreria moment es para trabajar con fechas
const moment = require('moment');
let ahora = moment();
console.log(ahora.toString());
console.log(ahora.format('YYYY/MM/DD - HH:mm'))

//Para trabajar con imagenes
const sharp = require('sharp');
sharp('original.png')
 .resize(80)
 .grayscale()
 .toFile('resized.png');

///Buffer
//let buffer = Buffer.alloc(4);
//console.log(buffer);
//let buffer = Buffer.from('Hola'); // traduce el string a binario 

//crear un abecedario con loop for
let abc = Buffer.alloc(26);
for (let i = 0; i < 26; i++) {
    abc[i] = i + 97;
}

// stram es para archivos muy grandes para hacerlo de a poquitos gruandando por paques con los chunk
const fs = require('fs');
const { error } = require('console');
let data = '';
let readableStream = fs.createReadStream(__dirname + 'iput.txt');
readableStream.setEncoding('UTF8');
readableStream.on('data', function (chunk) {
    console.log(chunk)
})

// cuanto se demora, tiempos
let suma = 0
console.time('bucle');
for (let i = 0; i < 1000000; i++) {
    suma += 1;
}
console.timeEnd('bucle');

//Debugger
// se pone en cmd node --inspect <nombre archivo>.js
//En chrome se ponde inspector

//El primera parametro en todas las funcienos deberia ser el error
function asincrona() {
    setTimeout(function() {
        try {
            let a = 3 + z;
            callback(null, a);
        } catch (e) {
            callback(e);
        }
    }, 1000);
}
asincrona(function (err,dato) {
    if(err) {
        console.error('Tenemos un errro');
        console.error(err);
        return false;
    }
})

//Scraping
//lanza chrome sin verlo
//npm i puppeteer

const puppeteer = require('puppeteer');

//funcion asincrona
(async () => {
    //coddigo
    console.log('Lanzar navegador');
    const browser = await puppeteer.launch();
    //const browser = await puppeteer.launch({ headless: false }); //Esto para poder ver el navegador

    const page = await browser.newPage();
    await page.goto('http:')

    var titulo1 = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        console.log(h1.innerHTML);
        return h1.innerHTML;
    });

    console.log(titulo1);

    console.log('Cerramos navegador')
    browser.close()
})();

///Automatizar procesos
//npm i -gulp gulp-server-livereload
const gulp = require('gulp');

gulp.task('build', function(cb) {
    //codigo
})

///aplicación de escritorio
//electron: npm init
//npm i electron
const { app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', crearVentana);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadFile('indes.html')
}

//Funcón dentro de otra función
function nombreCompleto (name, lastname) {
    return name + " " + lastname
}
function saludo (name, lastname, username) {
    const completeName = nombreCompleto(name, lastname);

    console.log("Mi nombre es " + completeName + "pero me gusta" + username);
}

//condicioanales if y switch

const tipoSuscripcion = "Basic";

switch (tipoSuscripcion) {
    case "Free":
        console.log("");
        break;
    case "Basic":
        console.log("");
        break;

}

///Bucle for
for (let i = 0; i < 5; i++) {
    console.log('El valor es ' + i);
}

///Bucle While
let h = 0;
while(h<5) {
    console.log('El valor es ' + h);
    h++;
}

///promt es una funcion que saca un pop up en el navegador
let pregunta = promt('Cuánto es 2+2')

```js

///Para que en archivo .md coloree segun lengujaje, truco de ,mac down
```

///array
const array = [];
//para acceder a un elemento es por el index
array[0]
array.length

/// objeto es similar a un dict en python 
const objeto = {'nombre': 'predro'}
objeto.nombre
Object.values(objeto)
Object.keys(objeto)

///reducción de condicionaesl con return

const tiposDeSuscripciones = {
    free: 'Solo puedes tomar cursos gratis',
    basic: 'Puedes tomar casi todos los cursos',
    expert: 'Cursos durante un año',
    expertduo: 'Alguien más pude topamr cursos'
}

function conseguirTipoSuscripcion(suscripcion) {
    if (tiposDeSuscripciones[suscripcion]) {
        console.log(tiposDeSuscripciones[suscripcion]);
        return;        
    }
    console.warn('Ese tipo de suscripción no existe');
}

conseguirTipoSuscripcion('free')


///en html, para ejecutar codigo js se usa la etiqueta script

/// conectar desde js un html
//query selector funciona parecido a css
const h1 = document.querySelector('h1')
//elementos creados es con #
const input1 = document.querySelector('#calculo1');

///Escribir html desde js
h1.innerHTML = 'Patito feo'; 
//obtener atributo
h1.getAttribute('class');
//cambiar atributo
h1.setAttribute('class', 'rojo');
//crear elmento desde cero
document.createElement('img');

///addEvenListener
const btn = docuemnt.querySelector('#btnCalcular');

btn.addEventListener('click', btnOnClick);

function btnOnClick(){
    const sumaInputs = input1.value + input2.value;
    h1.innerHTML = 'Resultados: ' + sumaInputs;
}

///arrays
const productList = [];
productList.push({
    name:'Bike',
    price:'120',
    image:'http://....',
})

/// en html se llama for (product of productsList) { ....}

///PAra comentar varias líneasw de código /* codigo varias lineas */

for (product of productList) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const img = document.createElement('img');
    img.setAttribute('src', product.image);

}

//fuente para ver mas appenChild en bucle for: https://platzi.com/new-home/clases/3271-javascript-practico/51023-lista-de-productos-html-a-partir-de-arrays/

/// para saber tipo de variable
typeof 40

///declarar variable
var edad;
///inicializar variable
edad = 30;

///Funciones
//Funcion declarativa

function miFunction() {
    return 3;
}
miFunction();
//función de expresión o anónima 
var miFunction = function() {
    return a+b;
}
miFunction();

///Unir cadenas de texto
function saludarEstudiantes(estudiante) {
    console.log(`Hola ${estudiante}`);
}

///Hoisting: las variables se tiene s que declarar antes de llamarlas pero las funciones si se pueden llamar antes de definirlas

///Las ecuaciones implicitas es cuando el legunaje njos ayuda y cambia un tipo de valor a otro valor, en la ecuación explicita obligamos a cambiar el valor

//pasar de string a number
a = 20;
b = String(a);
c = Number(b);

//NaN es not a number
///Truthy - Falsy
Boolean(null) ///0, undefine, NaN, ""

///Oepradores
//negar: !false
// == compara
// === valida que los dos sean estrictamente iguales, 
// a && b //significa si a es verdad y también b es verdad
// a || b // si a o b es verdad se cumple la condición 
// ++ // incrementa valor en 1, // +=2 //suma valor de 2 

//operador tenario
condition ? true: false;
//ejemplo
var numero = 1;
var resultado = numero === 1 ? "Sí soy uno" : "No soy uno";

///arrays
var frutas = [];
var agregaAlFinal = frutas.push('Uvas');
var AgregaAlPirincipio = frutas.unshift('Cereza');
var elimina = frutas.pop('Uvas');
var Borra1erElementoSiEs = frutas.shift('Uvas');
var pocision = frutas.indexOf("Cereza");

///objetos
//this es una variable que hace refersencia al objeto
var miAuto = {
    marca: "Toyota",
    modelo: "Corolla",
    annio: 2020,
    detalleDelAuto: function(){
        console.log(`Auto ${this.modelo} ${this.annio}`);
    }
};
miAuto.detalleDelAuto()

///función constructora
function auto(marca, modelo, annio) {
    this.marca = marca;
    this.modelo = modelo;
    this.annio = annio;
}
//el operador new genera una nueva instancia de la función constructora (instancia es un objeto que deriva de otro objeto)
var autoNuevo = new auto("Tesla", "MOdel 3", 2020);
var autoNuevo2 = new auto("Tesla", "Model X", 2018);
var autoNuevo3 = new auto("Toyota", "Corolla", 2021);

//recorrido de arrays
var articulos = [
    {nombre:"Bici", costo: 3000},
    {nombre:"Tv", costo: 2500},
    {nombre:"Libro", costo: 320},
    {nombre:"Celular", costo: 10000},    
];
var articulosFiltrados = articulos.filter(function(articulo) {
    return articulo.costo <= 500
});
//el 2do método de filtro es el map que crea un array con esto
var nombreArticulos = articulos.map(function(articulo) {
    return articulo.nombre;
});
//3cer método
var encuentraArticulo = articulos.find(function(articulo) {
    return articulo.nombre === "Laptop"
});
//for each
articulos.forEach(function(articulo) {
    console.log(articulo.nombre)
})
// otro metodo filtrado
var articulosBaratos = articulos.some(function(articulo) {
    return articulo.costo <= 700;
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//https://insomnia.rest/download
// Insomnia e spara prbar los endpoints
