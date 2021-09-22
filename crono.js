'use strict';

let tiempo = document.getElementById('tiempo');
let iniciar = document.getElementById('iniciar');
let detener = document.getElementById('detener');
let restablecer = document.getElementById('restablecer');
let parcial = document.getElementById('parcial');
let almacenarTiempos = document.getElementById('almacenarTiempos');

let hs = 0, min = 0, seg = 0, mls = 0, intervalo = 0;
let verificador = false;


init();

function init() {
    iniciar.addEventListener('click', iniciarContador);
    detener.addEventListener('click', detenerContador);
    restablecer.addEventListener('click', restablecerContador);
    parcial.addEventListener('click', grabarContador);
}

function iniciarContador() {
    if (verificador == false) {
        intervalo = setInterval(function () {
            let ht, mt, st, mlst;
            mls++; 
          
            if (mls > 99) {   
               seg++; 
               mls = 0;

            }else if (seg > 59) {
               min++;
               seg = 0;

            }else if (min > 59) {
               hs++;
               min = 0;

            }else if (hs > 24) hs = 0;
         
            mlst = ('0' + mls).slice(-2);
            st = ('0' + seg).slice(-2);
            mt = ('0' + min).slice(-2);
            ht = ('0' + hs).slice(-2);  
         
            tiempo.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
        }, 10); 
        verificador = true;
    } 
}

function detenerContador() {
    clearInterval(intervalo);
    verificador = false;
    if (tiempo.textContent != '00:00:00.00') {
        iniciar.innerText = "Reiniciar";
    }
}

function restablecerContador() {
    verificador = false;
    hs = 0;
    min = 0;
    seg = 0;
    mls = 0;
    tiempo.innerHTML = '00:00:00.00';
    clearInterval(intervalo);
    while(almacenarTiempos.firstChild){ 
        almacenarTiempos.removeChild(almacenarTiempos.firstChild); 
    } 
    iniciar.innerText = "Iniciar";
}

function grabarContador() {
    if (tiempo.textContent === '00:00:00.00') {
        var confirmar = confirm("¿iniciar el cronometro?");
        if (confirmar) iniciarContador();
    }
    else {
        let p = document.createElement('li');
        p.innerHTML = tiempo.innerHTML;
        almacenarTiempos.appendChild(p);
    }
}


