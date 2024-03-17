console.log('[Test-game] Flappy Bird');

const son_Hit = new Audio();
son_Hit.src = './efeitos_sonoros/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const globais = {};
let telaAtiva = {};
function mudarTela(novaTela) {
  telaAtiva = novaTela

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pular() {
      console.log('devo pular');
      console.log('[antes]', flappyBird.velocidade);
      flappyBird.velocidade =  - flappyBird.pulo;
      console.log('[depois]', flappyBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualizar() {
      if(fazColisao(flappyBird, chao)) {
        console.log('Fez colisao');
        son_Hit.play();

        setTimeout(() => {
          mudarTela(telas.INICIO);

        }, 500)

        return;
      }
      console.log(2)
  
      //TODO verificar esta velocidade estranha
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
  
    desenhar() {
      contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY, //sprite x - y
        flappyBird.largura, flappyBird.altura, //Tamanho do retorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura, //Tamanho do retorte na sprite
      );
    }
  }

  return flappyBird;
}

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenhar() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, //sprite x - y
      chao.largura, chao.altura, //Tamanho do retorte na sprite
      chao.x,
      chao.y,
      chao.largura, chao.altura, //Tamanho do retorte na sprite      
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, //sprite x - y
      chao.largura, chao.altura, //Tamanho do retorte na sprite
      (chao.x + chao.largura),
      chao.y,
      chao.largura, chao.altura, //Tamanho do retorte na sprite      
    );
  }
}

const planoFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenhar() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoFundo.spriteX, planoFundo.spriteY, //sprite x - y
      planoFundo.largura, planoFundo.altura, //Tamanho do retorte na sprite
      planoFundo.x, planoFundo.y,
      planoFundo.largura, planoFundo.altura, //Tamanho do retorte na sprite      
    );

    contexto.drawImage(
      sprites,
      planoFundo.spriteX, planoFundo.spriteY, //sprite x - y
      planoFundo.largura, planoFundo.altura, //Tamanho do retorte na sprite
      (planoFundo.x + planoFundo.largura),
      planoFundo.y,
      planoFundo.largura, planoFundo.altura, //Tamanho do retorte na sprite      
    )
  }
}

const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  
  desenhar() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

const telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
    },
    desenha() {
      planoFundo.desenhar();
      chao.desenhar();
      globais.flappyBird.desenhar();
      mensagemGetReady.desenhar();

    },
    click(){
      mudarTela(telas.JOGO)
    },
    atualiza() {

    }
  }
}

telas.JOGO = {
  desenha() {
    planoFundo.desenhar();
    chao.desenhar();
    globais.flappyBird.desenhar();
  },
  click() {
    globais.flappyBird.pular();
  },
  atualiza() {
    globais.flappyBird.atualizar();
  }
}

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudarTela(telas.INICIO)

loop();
