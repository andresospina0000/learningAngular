/*function saludar(nombre : string)
{
    console.log("Hola "+nombre.toUpperCase());
}

var wolverine = { nombre: "Logan"};

saludar(wolverine.nombre);

let mensaje = "hola";

if(true){
   let mensaje = "adiossss" ;
}

console.log(mensaje);

const OPCIONES = "todas";//constante

//se puede declarar sin el tipo siemmpre y cuando se le asigne un valor implicito
let nombre:string = "Peter";
let numero:number = 123;
let booleano:boolean = true;

let hoy:Date = new Date();

hoy = new Date('2020-10-21');

console.log(hoy);

let cualquiera:any;

cualquiera = nombre;
cualquiera = numero;
cualquiera = booleano;
cualquiera = hoy;

let spiderman = {
    nombre : "Peter",
    edad : 20
}

//se puede modificar el objeto siempre y cuando tenga las mismas propiedades con sus respectivos
//tipos de dato
spiderman = {
    nombre : "Peter",
    edad : 20
}

let nombre1:string = "Juan";
let apellido:string = "Perez";
//let texto = "Hola Mundo";
let edad:number = 32;

//let texto = "Hola, " + nombre1 + " " + apellido + " "+"("+edad+")";}

//template literal. se usa para definirlo el back tick
let texto =  `Hola, 
${nombre}  ${apellido}
 (${edad})`;

console.log(texto);

function getNombre(){
    return "Andres"
}

let texto1 =  `Hola, ${getNombre()}`

console.log(texto1);
*/
//Parametros obligatorios, opcionales
/**
 * 
 * @param quien obligatorio
 * @param objeto opcional con valor default
 *//*
function activar(quien:string
                 ,objeto:string="batiseñal"
                 ,momento?:string){

    let mensaje:string;


    if(momento){

        mensaje =`${quien} activo la ${objeto} en la ${momento}.`;
    }else{
        mensaje =`${quien} activo la ${objeto}.`;
    }

    console.log(mensaje);
}

activar("Gordon","objeto","tarde");

//Funciones de Flecha************************************************************

let miFuncion = function (a:string){
    return a;
}

let miFuncionF = (a:string) => a;

console.log(miFuncion("Normal"));
console.log(miFuncionF("Flecha"));

let miFuncion2 = function(a:number, b:number){
    return a + b;
}

let miFuncion2F = (a:number, b:number)=> a+b;

let miFuncion3 = function(nombre:string){
    nombre=nombre.toUpperCase();
    return nombre;
}

let miFuncion3F = (nombre:string)=>{
    nombre=nombre.toUpperCase();
    return nombre;
}
*/
/*let nombre: "Andres";

//declarar objeto
let hulk = {
    nombre: "Hulk",
    smash(){
        setTimeout(() => console.log(this.nombre + " smash!!"), 1500);
    }
}

hulk.smash();*/

//Destructuracion de Objetos******************************

/*let avenger = {
    nombre :"Steve",
    clave : "Capitan America",
    poder: "Droga"
}*/

//Destructuracion a mano
/*let nombre = avenger.nombre;
let clave = avenger.clave;
let poder = avenger.poder;*/

//Destructuracion forma simple
//let {nombre,clave,poder} = avenger;
//console.log(nombre,clave,poder);

//Destructuracion con alias, el alias va despues de los :
/*let {nombre:string,clave,poder} = avenger;
console.log(string,clave,poder);

let avengers: string [] = ["Thor","Steve","Tony"];

//Para capturar los valores en el orden del arreglo
//let [thor, capi, ironman] = avengers;

//Para capturar los valores en el orden del arreglo pero sin capturar el resto de los valores
let [, , ironman] = avengers;

console.log(ironman);*/

//Promesas*********************************************

//Para poder declarar la promesa se cambio en el JSON el valor del target por es6
//Los parametrs resolve y reject son convenciones, asi e encuentra por lo general en TS
/*let prom1 = new Promise( function ( resolver, rechazar) {
    setTimeout(() => {
       console.log("Promesa terminada.") 

       //Si termina bien la ejecucion
       //resolver();

       //Si termina mal
       rechazar();
    }, 1500);
})

console.log("Paso 1");

prom1.then(function(){
    console.log("Ejecutarme cuando termine bien")
},
function(){
    console.log("Ejecutarme cuando termine mal")
}
)

console.log("Paso 2");*/

//Interfaces*****************************************

//Capitalizar la primera letra de cada palabra, para seguir el estandar
/*interface Xmen {
    nombre:string,
    poder:string
}

function enviarMision(xmen:Xmen){
    console.log("Enviando a: " + xmen.nombre);
}

function enviarCuartel(xmen:Xmeny){
    console.log("Enviando al cuartel: " + xmen.nombre);
}

//Asi se declararia normalmente el objeto
/*let wolverine = {
    nombreXmen : "Wolverine",
    poder :  "Regeneracion"
};*/

//Declarandolo con la interface
/*let wolverine:Xmen = {
    nombre : "Wolverine",
    poder :  "Regeneracion"
};

enviarMision(wolverine);
enviarCuartel(wolverine);*/

//Clases**********************************************

/*class Avenger {
    nombre:string = "Sin nombre";
    equipo:string = "undefined";
    nombreReal:string = "undefined";

    puedePelear:boolean = false;
    peleasGanadas:number = 0;

    constructor(nombre:string,equipo:string,nombreReal:string){
        this.nombre = nombre;
        this.equipo = equipo;
        this.nombreReal = nombreReal;
    }
}

let antman:Avenger = new Avenger("Antman","Capitan","Scott Lang");

console.log(antman)*/

//Decoradores********************************************

function consola( constructor:Function){
    //console.log(constructor);//De esta forma se ejecutaria la funcion o en este caso, el constructor de la clase
    console.log(constructor);//De esta forma se ve el constructor q se esta llamando
}

//Asi se declara un decorador, con el @ y el nombre del metodo, manda a fuerza el constructo a fuerza
@consola
class Villano{

    //El parametro se puede ingresar asi sin necesidad de declarar la propiedad al inicio de la clase,
    //y se dará por hecho que es una propiedad y q tambien es un paramrtro del constructor
    constructor(public nombre:string){

    }
}