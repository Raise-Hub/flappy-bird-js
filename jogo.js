console.log('[Test-game] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
  spriteX: 0,
  spriteY:0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,

  atualizar() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },

  desenhar() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, //sprite x - y
      flappyBird.largura, flappyBird.altura, //Tamanho do retorte na sprite
      flappyBird.x,
      flappyBird.y,
      flappyBird.largura, flappyBird.altura, //Tamanho do retorte na sprite
    );
  }
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
      planoFundo.x,
      planoFundo.y,
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

function loop() {
  flappyBird.atualizar();
  planoFundo.desenhar();
  chao.desenhar();
  flappyBird.desenhar();


  requestAnimationFrame(loop);
}

loop();
