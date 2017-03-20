    $(document).ready(function(){

        //Animar titulo
        var titulo = document.querySelector(".main-titulo")
        titulo.animate([{color: 'white'},{color: '#DCFF0E'}],
         {duration: 1000, iterations: Infinity})
    });
    
    window.addEventListener('load', main,false)
    var matriz = new Array(7)
    var elementoIniciado
    var btnReinicio = document.querySelector('.btn-reinicio')
    var panel = document.getElementById('panel-tablero')
    var destroy = []
    var intervalo
    var verificador
    function main(){
        btnReinicio.addEventListener('click',comenzar,false)
    }

    function comenzar(){
       
        var contenido = btnReinicio.innerHTML
        contenido = contenido.toUpperCase()
        if (contenido == "REINICIAR"){
            location.reload()
        } else {
            btnReinicio.innerHTML = "REINICIAR"
        }

        iniciar(7,7)
        llenar()
        
        intervalo = setInterval(timer,1000)
        verificar()
            
        // elementosDestroy()
      
        var imagenes = document.querySelectorAll('img')
        for(var i = 0; i < imagenes.length; i++){
            imagen = imagenes[i]
            imagen.addEventListener('dragstart', dragInicio, false)
            imagen.addEventListener('dragend', dragFin, false)
            imagen.addEventListener('dragover', dragOver, false)
            imagen.addEventListener('dragleave', dragLeave, false)
            imagen.addEventListener('drop', drop, false)
        }
    }
        //Llena la matriz con numeros aleatorios
    function iniciar(n,m){
        for (var i = 0; i < n; i++){
            matriz[i] = new Array(7)
            for (var j = 0; j < m; j++){
                matriz[i][j] = aleatorio(1,4)
            }
        }
        
    }

    //Carga las imagenes a la pantalla
    function llenar(){
        var html
        var col = document.querySelectorAll('div[class^="col"]')
        var panel = document.querySelector('.panel-tablero')
        
        panel.animate([
            {transform: 'translateY(-500px)'},
            {transform: 'translateY(-0px)'}
            ],
            {
                duration: 1000, 
                iterations: 1
            })
       
        var k = 0
        for(var j = 0; j < col.length; j++){
            html= ''
            for(var i = 0; i < matriz[j].length; i++){
                k++
                html +=  "<img src='images/"+ matriz[i][j]+".png' alt = '"+(i+1)+"' id='imagen"+(k)+"'>"        
            }
            col[j].innerHTML = html
        }
    
    }

   
    function dragInicio(e){
        var padre = e.target.parentNode.getAttribute('id')
        e.dataTransfer.setData('data',e.target.id)
    }

    function dragFin(e){
        e.preventDefault()
    }

    function drop(e){
        var id = e.dataTransfer.getData('data')
        var el1 = document.getElementById(id)
        var img = el1.getAttribute('src')
        var img2 = e.target.getAttribute('src')
        if (img == img2) return
        var n1 = el1.getAttribute('alt')
        var p1 = el1.parentNode
        var n2 = e.target.getAttribute('alt')
        var el2 = document.getElementById(e.target.id)
        var mov = document.getElementById('movimientos-text')
        p2 = e.target.parentNode
        if (p1 == p2){
            if ((n1 == n2 - 1)||(n1 - 1 == n2)){
                 el1.setAttribute('src',img2)
                 el2.setAttribute('src',img)   
                 mov.innerHTML = parseInt(mov.innerHTML) + 1
            }
         
        } else {
            var col1 = p1.getAttribute('alt')
            var col2 = p2.getAttribute('alt')
            if (n1 == n2 && ((col1 == col2 - 1) || (col1 - 1 == col2))){
                el1.setAttribute('src',img2)
                el2.setAttribute('src',img)
                mov.innerHTML = parseInt(mov.innerHTML) + 1
            }
        }   

        elementosDestroy()
    }

    function dragOver(e){
        e.preventDefault()  
    }

    function dragLeave(e){
        e.preventDefault()
    }

    //Este es el temporizador o timer
function timer(){
    timer = document.querySelector('#timer')
    var tiempo = timer.innerHTML
    var panel = document.getElementById('panel-tablero')
    var mov = document.getElementById('movimientos-text')
    var scores = document.getElementsByClassName('panel-score')
    var score = scores[0]
    var minuto = parseInt(tiempo.substring(0,2))
    var segundo = parseInt(tiempo.substring(3,5))
    var terminado = document.getElementById('terminado')
     if (!minuto && !segundo){
        timer.innerHTML = "00:00"
        clearInterval(intervalo)
        panel.classList.add("efectoTablero")
        panel.addEventListener('animationend', function(e){
            var el = e.target
            el.setAttribute('style','display:none')
        }, false)
        terminado.classList.remove('invisible')
        terminado.animate([
            {opacity: 0},
            {opacity: 1}
        ],{
            duration: 1000,
            iterations: 1
        })
       
        score.animate([
            {transform: 'scale(2)'},
           {transform: 'translateX(100%)'},
            {transform: 'translateX(0%)'},
            
           

        ],{duration: 2000, iterations: 1})
        
        panel.classList.add('clasegrande')
        
        return
    }
    segundo--
    if (segundo < 0){
        segundo = 59
        minuto--
    }
    tiempo = ""
    if (minuto < 10){
        tiempo = "0"
    }
    tiempo += minuto + ":"
    if (segundo < 10){
        tiempo += "0"
    }
    tiempo += segundo
    timer.innerHTML = tiempo
}

function elementosDestroy(){
    var elemento;
    for (var i = 1; i < 8; i++){
        
        for (var j = 1; j < 8; j++){
            var k = (i - 1) * 7 + j
            elemento = document.getElementById('imagen'+k)
            if (elemento.classList.contains('animation')){
                elemento.classList.remove('animation')
                elemento.setAttribute('src','')
            }
            
        }
        
    }

    moverElementos()
                
}

function moverElementos(){
 var elemento, el1, el2
 var img, img1, img2
 var puntos = document.querySelector("#score-text")
 var col = document.querySelectorAll('div[class^="col"]')
   for (var m = 0; m < col.length; m++) {
       for (var j = 0; j < col.length; j++){
        for (var i = 0; i < matriz[j].length; i++){
            elemento = col[j].childNodes[i]
            img = elemento.getAttribute('src')
            if (!img){
                for (var k = i; k > 0; k--){
                    el1 = col[j].childNodes[k] 
                    el2 = col[j].childNodes[k-1]
                    img1 = el1.getAttribute('src')
                    img2 = el2.getAttribute('src')
                    el1.setAttribute('src',img2)
                    el2.setAttribute('src',img1)
                }
            }
            
        }
    }
   }
   for (var j = 0; j < col.length; j++){
       for (var i = 0; i < matriz[j].length; i++){
            elemento = col[j].childNodes[i]
            img = elemento.getAttribute('src')
            if (!img){
                puntos.innerHTML = parseInt(puntos.innerHTML) + 2
                var n = aleatorio(1,4)
                img = 'images/' + n + '.png'
                elemento.setAttribute('src',img)
            }
       }
   }
     

    
}

    
function quitarAnimacion(e, animacion){
    var elemento = e.target
    if (elemento.classList.contains(animacion)){
        elemento.classList.remove(animacion)
    }
    
}

function eliminarNodos(){

}

function verificar(){
  var col1, col2, col3, fil1, fil2, fil3, img
  var col = document.querySelectorAll('div[class^="col"]')
  verificado = 0
    for(var j = 0; j < col.length; j++){
        
        for(var i = 0; i < matriz[j].length; i++){
           if (i < matriz[j].length - 2){
            col1 =  col[j].childNodes[i]
            col2 = col[j].childNodes[i+1]
            col3 = col[j].childNodes[i+2]
            if (col1.getAttribute('src') == col2.getAttribute('src') && col1.getAttribute('src') ==            col3.getAttribute('src')){
                col1.classList.add('animation')
                col2.classList.add('animation')
                col3.classList.add('animation')
                verificado++
            }
           }

           if (j < matriz[j].length - 2){
               fil1 = col[j].childNodes[i]
               fil2 = col[j + 1].childNodes[i]
               fil3 = col[j + 2].childNodes[i]

                if (fil1.getAttribute('src') == fil2.getAttribute('src') && fil1.getAttribute('src') ==     fil3.getAttribute('src')){
                    fil1.classList.add('animation')
                    fil2.classList.add('animation')
                    fil3.classList.add('animation')
                    verificado++
                } 
           }
          
           
                   
        }
    }
    if (verificado > 0){
        verificador = setInterval(verificar,1000)
        elementosDestroy()
        return false
    }
    else{
        clearInterval(verificador)
        return true
    }
    
  
}

 //Genera un numerio aleatrio en un rango determinado
    function aleatorio(inferior,superior){ 
        var numPosibilidades = superior - inferior 
        var aleat = Math.random() * numPosibilidades 
        aleat = Math.round(aleat) 
        return parseInt(inferior) + aleat 

    }

