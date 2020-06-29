<template lang="html">
  <div class="game-container">
    <button v-if="loading" v-on:click="loadPuzzle" name="start-game" class="start-game-button">Let's Go!</button>
    <canvas id="canvas" width="600" height="400" :class="hiddenClass"></canvas>
  </div>
</template>

<script>
import { eventBus } from '../../../main.js';
import PicturePuzzleService from '../../../services/Games/PicturePuzzleService.js';

export default {
  name: "picture-puzzle",
  data(){
    return {
      loading: true,
      data: [],
      selectedItem: null,
      puzzleImage: ""
    }
  },
  computed: {
    hiddenClass(){
      return this.loading === true ? "hidden" : "show"
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    loadPuzzle(){
      this.loading = false;
      eventBus.$emit('picture-puzzle-game-ready');
    },
    fetchData(){
      PicturePuzzleService.getLandmarks()
      .then((data) => {
        this.data = data;
        const selectedItem = data[Math.floor(Math.random() * data.length)];
        this.selectedItem = selectedItem;
        this.puzzleImage = require("@/assets/landmarks/" + selectedItem.image + ".png");
        eventBus.$emit('picture-puzzle-game-loaded', selectedItem);
        this.createPuzzle();
      })
    },
    createPuzzle(){
      const image = new Image();
      image.src = this.puzzleImage;

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

      document.onmousedown = preparePuzzle();

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
        document.onmousedown = shufflePuzzle;
      }

      function preparePuzzle(){
        image.onload = function(){
          ctx.drawImage(image, 0, 0, puzzleWidth, puzzleHeight);
          buildPieces();
        }
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
        let cRect = canvas.getBoundingClientRect();

        let xEval = (event.clientX - cRect.left) > 0 && (event.clientX - cRect.left) < canvas.width;
        let yEval = (event.clientY - cRect.top) > 0 && (event.clientY - cRect.top) < canvas.height;
        if(xEval && yEval){
          mouse.x = Math.round(event.clientX - cRect.left);
          mouse.y = Math.round(event.clientY - cRect.top);
          currentPiece = checkPieceClicked();
        }else{
          currentPiece = null;
        }
        if(currentPiece !== null){
          ctx.clearRect(currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight);
          ctx.save();
          ctx.globalAlpha = 0.9;
          ctx.drawImage(image, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
          ctx.restore();
          document.onmousemove = updatePuzzle;
          document.onmousedown = pieceDropped;
        }
      }

      function checkPieceClicked(){
        let i;
        let piece;
        for(i = 0; i < pieces.length; i++){
          piece = pieces[i];
          let xEval = (mouse.x < (piece.xPos + pieceWidth) && mouse.x > piece.xPos)
          let yEval = (mouse.y < (piece.yPos + pieceHeight) && mouse.y > piece.yPos)
          if(!xEval || !yEval){
            continue;
          }
          return piece;
        return null;
        }
      }

      function updatePuzzle(event){
        currentDropPiece = null;
        let xEval = event.layerX >= 0 && event.layerX <= puzzleWidth;
        let yEval = event.layerY >= 0 && event.layerY <= puzzleHeight;
        if(xEval && yEval){
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
          let xEval = (mouse.x <= (piece.xPos + pieceWidth) && mouse.x >= piece.xPos)
          let yEval = (mouse.y <= (piece.yPos + pieceHeight) && mouse.y >= piece.yPos)
          if(xEval && yEval){
            currentDropPiece = piece;
            ctx.save();
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = 'white';
            ctx.fillRect(currentDropPiece.xPos, currentDropPiece.yPos, pieceWidth, pieceHeight);
            ctx.restore();
          }
          ctx.save()
          ctx.globalAlpha = 0.6;
          ctx.drawImage(image, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight /2), pieceWidth, pieceHeight)
          ctx.restore();
          ctx.strokeRect(mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
        }
      }

      function pieceDropped(event){
        document.onmousemove = null;
        document.onmousedown = onPuzzleClick;
        if(currentDropPiece != null){
          let temp = {xPos: currentPiece.xPos, yPos: currentPiece.yPos}
          currentPiece.xPos = currentDropPiece.xPos;
          currentPiece.yPos = currentDropPiece.yPos;
          currentDropPiece.xPos = temp.xPos;
          currentDropPiece.yPos = temp.yPos;
        }
        resetPuzzleAndCheckWin();
      }

      function resetPuzzleAndCheckWin(){
        eventBus.$emit('picture-puzzle-game-shuffle-fact');
        ctx.clearRect(0,0, puzzleWidth, puzzleHeight);
        let gameWin = true;
        let i;
        let piece;
        for(i = 0; i < pieces.length; i++){
          let piece = pieces[i];
          ctx.drawImage(image, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
          ctx.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
          if(piece.xPos !== piece.sx || piece.yPos !== piece.sy){
            gameWin = false;
          }
        }
        if(gameWin){
          setTimeout(gameOver, 500);
        }
      }

      function gameOver(){
        document.onmousedown = null;
        document.onmousemove = null;
        document.onmouseup = null;
        eventBus.$emit('game-won')
      }
    }
  }
}
</script>

<style lang="css" scoped>

  .game-container {
    background-color: white;
    height: 75vh;
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
