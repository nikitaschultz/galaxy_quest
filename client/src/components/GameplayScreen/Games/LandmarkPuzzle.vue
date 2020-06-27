<template lang="html">
  <div class="game-container">
    <button v-if="loading" v-on:click="loadPuzzle" type="button" name="button">Let's Go!</button>
    <canvas id="canvas" width="600" height="400" :class="hiddenClass"></canvas>
  </div>
</template>

<script>
import sydneyImage from '../../../assets/sydney-opera-house.jpg';

export default {
  name: "landmark-puzzle",
  data(){
    return {
      loading: true
    }
  },
  computed: {
    hiddenClass(){
      return this.loading === true ? "hidden" : "show"
    }
  },
  mounted(){
    const image = new Image();
    image.src = sydneyImage;
    image.width = 600;
    image.height = 400;

    const puzzleWidth = 600;
    const puzzleHeight = 400;
    const pieceWidth = puzzleWidth / 3;
    const pieceHeight = puzzleHeight / 3;

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.border = "2px solid midnightblue";

    let pieces = [];
    let mouse = {x: 0, y: 0};
    let currentPiece = null;
    let currentDropPiece = null;

    image.onload = function(){
      ctx.drawImage(image, 0, 0, puzzleWidth, puzzleHeight);
      buildPieces();
    }

    function buildPieces(){
      let i;
      let piece;
      let xPos = 0;
      let yPos = 0;
      for(i = 0; i < 9; i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth
        if(xPos >= puzzleWidth){
          xPos = 0;
          yPos += pieceHeight;
        }
      }
      document.onmousedown = prepareShuffle;
    }

    function prepareShuffle(){
      document.onmousedown = shufflePuzzle;
    }

    function shufflePuzzle(){
      pieces = shuffleArray(pieces);
      ctx.clearRect(0, 0, puzzleWidth, puzzleHeight);
      let i;
      let piece;
      let xPos = 0;
      let yPos = 0;
      for(i = 0; i < pieces.length; i++){
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        ctx.drawImage(image, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
        ctx.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
          xPos = 0;
          yPos += pieceHeight;
        }
      }
      document.onmousedown = onPuzzleClick;
    }

    function shuffleArray(array){
      for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    function onPuzzleClick(event){
      if(event.layerX >= 0 && event.layerY >= 0){
        mouse.x = event.layerX;
        mouse.y = event.layerY;
      }
      currentPiece = checkPieceClicked();
      if(currentPiece !== null){
        ctx.clearRect(currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight);
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(image, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
        ctx.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
      }
    }

    function checkPieceClicked(){
      let i;
      let piece;
      for(i = 0; i < pieces.length; i++){
        piece = pieces[i];
        if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + piece.Height)){
        //not the piece
        }else{
          return piece
        }
      }
      return null;
    }

    function updatePuzzle(event){
      currentDropPiece = null;
      if(event.layerX >= 0 && event.layerY >= 0){
        mouse.x = event.layerX;
        mouse.y = event.layerY;
      }
      ctx.clearRect(0, 0, puzzleWidth, puzzleHeight);
      let i;
      let piece;
      for(i = 0; i < pieces.length; i++){
        piece = pieces[i];
        if(piece === currentPiece){
          continue;
        }
        ctx.drawImage(image, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        ctx.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if(currentDropPiece === null){
          if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
            //continue
          }
          else {
            currentDropPiece = piece;
            ctx.save();
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = 'white';
            ctx.fillRect(currentDropPiece.xPos, currentDropPiece.yPos, pieceWidth, pieceHeight);
            ctx.restore();
          }
        }
        ctx.save()
        ctx.globalAlpha = 0.6;
        ctx.drawImage(image, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight /2), pieceWidth, pieceHeight)
        ctx.restore();
        ctx.strokeRect(mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
      }
    }
  },
  methods: {
    loadPuzzle(){
      this.loading = false;
    }
  }
}
</script>

<style lang="css" scoped>

  .game-container {
    background-color: white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .hidden {
    display: none;
  }

</style>
