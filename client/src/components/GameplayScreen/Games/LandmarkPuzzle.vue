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
    let mouse = {x:0, y:0};
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
          yPos += puzzleHeight
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
