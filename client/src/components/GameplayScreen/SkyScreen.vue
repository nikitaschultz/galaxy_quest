<template lang="html">
  <div id="sky-container">
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>

export default {
  name: "sky-screen",
  data(){
    return {
      starCoordinates: []
    }
  },
  mounted(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const skyScreen = document.getElementById("sky-container")

    canvas.width = skyScreen.clientWidth;
    canvas.height = skyScreen.clientHeight;

    let starCoordinates = [];

    function getStarCoordinates(){
      if(starCoordinates.length > 0){
        for(let star in starCoordinates){
          drawStar(star.relX * canvas.width, star.relY * canvas.height)
        }
      }
    }

    function updateScreen(event){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      getStarCoordinates;

      let cRect = canvas.getBoundingClientRect();
      let xPos = Math.round(event.clientX - cRect.left);
      let yPos = Math.round(event.clientY - cRect.top);

      let xEval = xPos > 0 && xPos < canvas.width
      let yEval = yPos > 0 && yPos < canvas.height

      console.log(starCoordinates);

      if(xEval && yEval){
        document.onmousedown = placeStar;
      } else {
        document.onmousedown = null;
      }

      drawStar(xPos, yPos);
    }

    function drawStar(xStart, yStart){
      ctx.save();
      ctx.translate(xStart, yStart);
      ctx.beginPath();
      ctx.moveTo(0, -20);
      for (let i = 0; i < 5; i++){
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - (20 * 0.5));
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, -20);
      }
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.restore();
    }

    document.onmousemove = updateScreen;

    function placeStar(){
      let cRect = canvas.getBoundingClientRect();
      let xPos = Math.round(event.clientX - cRect.left);
      let yPos = Math.round(event.clientY - cRect.top);

      let star = {
        relX: xPos / canvas.width,
        relY: yPos / canvas.height
      };

      starCoordinates.push(star);

      drawStar(xPos, yPos);
    }

  }
}
</script>

<style lang="css" scoped>

  #sky-container {
    width: 100%;
    height: 75vh;
    background-image: radial-gradient(indigo, midnightblue, black, black);
  }

</style>
