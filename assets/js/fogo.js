const fogoContainer = document.querySelector('#fogo-container')
const debug = false
const velocidadeDoFogo = 50
const fogo = {
    pixels: [],
    largura: 36,
    altura: 36,
    paleta: {
        0: '#000000',
        1: '#00060f',
        2: '#000814',
        3: '#000c1f',
        4: '#00132e',
        5: '#00183b',
        6: '#001a40',
        7: '#002152',
        8: '#002966',
        9: '#003178',
        10: '#003480',
        11: '#003a8f',
        12: '#003f9c',
        13: '#0047b0',
        14: '#0051c7',
        15: '#005ce3',
        16: '#0067ff',
        17: '#0a6eff',
        18: '#1c78ff',
        19: '#2b81ff',
        20: '#3887fc',
        21: '#4a93ff',
        22: '#61a1ff',
        23: '#75adff',
        24: '#8ab9ff',
        25: '#99c2ff',
        26: '#a8cbff',
        27: '#b8d5ff',
        28: '#c9dfff',
        29: '#d9e8ff',
        30: '#e6f0ff',
        31: '#ffffff'
    }
}

const paleta = {}

for(let i = 32; i > 0; i--){

    paleta[32 - i] = fogo.paleta[i - 1]

}

let interval = null

function acender(){

    estruturaBase()
    fonteDoFogo()
    renderizar()
    setInterval(calcularPropagacaoDoFogo, velocidadeDoFogo)

}

function estruturaBase(){

    for(let pixel = 0; pixel < (fogo.largura * fogo.altura); pixel++){

        fogo.pixels[pixel] = 0

    }

}

function fonteDoFogo(){

    for(let coluna = 0; coluna < fogo.largura; coluna++){

        let pixelAtual = fogo.pixels.length - fogo.largura + coluna

        fogo.pixels[pixelAtual] = 31

    }

}

function calcularPropagacaoDoFogo(){

    for(let coluna = 0; coluna < fogo.largura; coluna++){

        for(let linha = 0; linha < fogo.altura; linha++){

            const pixelAtual = coluna + (fogo.largura * linha)
            
            atualizarPropagacaoDoFogo(pixelAtual)

        }

    }

    renderizar()

}

function atualizarPropagacaoDoFogo(pixelAtual){

    const indiceDoPixelAbaixo = pixelAtual + fogo.largura,
          intensidadeDoPixelAbaixo = fogo.pixels[indiceDoPixelAbaixo],
          diminuirIntensidade = Math.floor(Math.random() * 3)
    
    if(indiceDoPixelAbaixo >= fogo.pixels.length){

        return

    }
    
    fogo.pixels[pixelAtual - -diminuirIntensidade] = intensidadeDoPixelAbaixo - diminuirIntensidade >= 0 ? intensidadeDoPixelAbaixo - diminuirIntensidade : 0

}

function renderizar(){

    let html = `<table data-debug="${debug}">`

    for(linha = 0; linha < fogo.altura; linha++){

        html += `<tr>`

        for(coluna = 0; coluna < fogo.largura; coluna++){

            pixelAtual = coluna + (fogo.largura * linha)

            html += `<td style="background-color: ${fogo.paleta[fogo.pixels[pixelAtual]]};">`

            html += `<span class="indice">${pixelAtual}</span>`
            html += `<span class="intensidade">${fogo.pixels[pixelAtual]}</span>`

            html += `</td>`

        }

        html += `</tr>`
        
    }
    
    html += `</table>`

    fogoContainer.innerHTML = html

}

acender()