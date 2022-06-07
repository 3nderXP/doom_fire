const screen = document.querySelector('#screen'),
      screenContext = screen.getContext('2d'),
      fire = {
          pixels: [],
          width: 64,
          height: 64,
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

let fireUseInterval = null

screen.width = fire.width
screen.height = fire.height

function ignite(){

    screenContext.clearRect(0, 0, screen.width, screen.height)

    baseStructure()
    fireSource(true)
    render()

    clearInterval(fireUseInterval)

    fireUseInterval = setInterval(() => {

        calculateFirePropagation()

    }, 50)
    
}

function putOutFire(){

    fireSource(false)

}

function baseStructure(){

    for(let i = 0; i < (fire.width * fire.height); i++){

        fire.pixels[i] = 0

    }

}

function fireSource(state){

    for(let column = 0; column < fire.width; column++){

        const currentPixel = fire.pixels.length - fire.width + column

        fire.pixels[currentPixel] = state ? 31 : 0

    }

}

function calculateFirePropagation(){

    for(let column = 0; column < fire.width; column++){

        for(let row = 0; row < fire.height; row++){

            const currentPixel = column + (fire.width * row)

            updateFireStructure(currentPixel)

        }

    }

    render()

}

function updateFireStructure(pixel){
    
    const belowPixelIndice = pixel + fire.width,
          belowPixelIntensity = fire.pixels[belowPixelIndice],
          decay = Math.floor(Math.random() * 3)
    
    if(belowPixelIndice >= fire.pixels.length){

        return

    }

    fire.pixels[pixel - decay] = belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0

}

function render(){
    
    for(let row = 0; row < fire.height; row++){
        
        for(let column = 0; column < fire.width; column++){

            const currentPixel = column + (fire.width * row)
            
            screenContext.fillStyle = fire.paleta[fire.pixels[currentPixel]]
            screenContext.fillRect(column, row, 1, 1)

        }

    }

}

ignite()