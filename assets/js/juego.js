
(() => {
        'use strict'

   
    let deck               = [] ;
    const   tipos            = ['C','D','H','S'],
            especiales       = [ 'A','J','Q','K'];

    let puntosJugador = 0,
        puntosComputradora = 0;


    // referencias del html
    const btnPedir = document.querySelector( '#btnPedir'),
          btnDetener = document.querySelector( '#btnDetener'),
           btnNuevo = document.querySelector( '#btnNuevo');

    const divCartasJugador = document.querySelector( '#Jugador1-cartas'),
          divCartasComputadora = document.querySelector( '#Computadora-cartas'),
          puntosHTML = document.querySelectorAll('small');
    
     // esta funcion inicializa el juego
     const inicializarJuego = () =>{
        deck = crearDeck();
    }



    //esta funcion crea una nueva baraja
    const crearDeck = ()=>{ 
        deck = [];

        for ( let i = 2; i <= 10; i++  ){
            for(let tipo of tipos ){
                deck.push (i + tipo); 
            }
        }
        
        for ( let tipo of tipos ){
            for (let esp of especiales ){
                deck.push( esp + tipo );
            }


        }  
        
            
            return _.shuffle(deck);;



    }
    



    // esta funcion me permite tomar una carta 

    const PedirCarta = ()=> {

            if ( deck.length === 0 ){
                throw 'No hay cartas en el Deck';
            }

           
            return deck.pop();
        }
    const valorCarta = (carta) => {

        const valor = carta.substring (0, carta.length - 1); 

        return (isNaN (valor ) ) ? 
                (valor === 'A') ? 11 : 10  //condicion ternaria
                : valor * 1;
                
                
    }

    // turno computadora 
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = PedirCarta();
            puntosComputradora = puntosComputradora + valorCarta( carta);
            puntosHTML [1].innerText  = puntosComputradora;

            //<img class="carta" src="assets/cartas/8S.png"></img>
            const imgCARTA = document.createElement ('img');
            imgCARTA.src = `assets/cartas/${carta}.png`;
            imgCARTA.classList.add('carta');
            
            divCartasComputadora.append(imgCARTA);
            if (puntosMinimos > 21 ){
                break;
            }

        } while( (puntosComputradora < puntosMinimos) && ( puntosMinimos <=21 ) );

        setTimeout(() => {
            
    
            if( puntosComputradora === puntosMinimos){
            alert('Nadie gana');
            } else if (puntosMinimos > 21){
            alert('computadora gana')
            }    else if (puntosComputradora > 21 ){ 
            alert ('Jugador Gana');
            } else {
            alert('Computadora gana')
            }
        },10  );

    }

    // Eventos 

    btnPedir.addEventListener('click', () =>  {

            const carta = PedirCarta();
            puntosJugador = puntosJugador + valorCarta( carta);
            puntosHTML [0].innerText  = puntosJugador;

            //<img class="carta" src="assets/cartas/8S.png"></img>
            const imgCARTA = document.createElement ('img');
            imgCARTA.src = `assets/cartas/${carta}.png`;
            imgCARTA.classList.add('carta');
            
            divCartasJugador.append(imgCARTA);

            if ( puntosJugador > 21 ) {

                console.log ('LO SIENTO PERDISTE PUTO');
                btnPedir.disabled = true;
                turnoComputadora(puntosJugador);
            }
            else if (puntosJugador ===21 ){
                console.log('21, GREAT!');
            }
            

            

            
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora(puntosJugador);


    });


    btnNuevo.addEventListener('click', () => {


        console.clear();
        deck =[];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputradora = 0;

        puntosHTML[0].innerText=0;
        puntosHTML[1].innerText= 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    });

        
})();






