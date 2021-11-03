'use strict'
console.log('ACCEDIO')

desaparecerProductos()

function desaparecerProductos(){
    const section = document.getElementsByTagName('section')
    section.classList.add('.hide')
}

