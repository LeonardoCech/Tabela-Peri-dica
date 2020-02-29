let eletronicConf = "K2 L8 M18 N32 O18 P1 Q0 R0";

let canvas = document.getElementById('animateAtom');
let ctx = canvas.getContext('2d');

let zero = canvas.width / 2; // Considera o meio do Canvas como o ponto 0 do plano cartesiano

let layerSize = (47.5 * canvas.width) / 100; // Tamanho das camadas orbitais
let layerDifference = (5 * canvas.width) / 100; // Distancia entre uma camada e outra

let layerColor = "orange";
let eletronColor = "orange";

ctx.strokeStyle = layerColor;

// Drawing layers
for (let i = 0; i < 8; i++) {

    ctx.beginPath();
    ctx.arc(zero, zero, layerSize, 0, 2 * Math.PI);
    ctx.stroke();

    layerSize -= layerDifference;
}

// Core
ctx.beginPath();
ctx.arc(zero, zero, layerDifference, 0, 2 * Math.PI);
ctx.stroke();

function percentToNumber(percent) {
    return (percent * canvas.width) / 100;
}

function getLayers( string ) {
    str = string.split(" ");
    
    for (let i = 0; i < str.length; i++) { 
        str[i] = str[i].replace(/[K-R]/g, "");  
        str[i] = parseInt(str[i]);
    }
    return str;
}
drawnEletrons( getLayers(eletronicConf) );

// Desenho
function drawnEletrons( eletrons ) { // Considera o meio do canvas como ponto 0 
                                        //para desenhas os eletrons

    let radiusEletron = percentToNumber(2);
    let radius = percentToNumber(12.5);
    
    for (let i = 0; i < eletrons.length; i++) {
        for (let j = 0; j < eletrons[i]; j++) {


            deg = (360 / eletrons[i]);
            teta = (deg * j / 180) * Math.PI; // Regra de 3 considerando que 1 * Math.PI = 180 graus
            sin = radius * Math.sin(teta) + zero;
            cos = radius * Math.cos(teta) + zero;

            ctx.moveTo(zero, zero);
            ctx.arc(cos, sin, radiusEletron, 0, 2 * Math.PI);
            ctx.fillStyle = eletronColor;
            ctx.fill();
        }
        radius += percentToNumber(5);
    }
}