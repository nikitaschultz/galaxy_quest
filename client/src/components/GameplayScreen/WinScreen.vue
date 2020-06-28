<template lang="html">
  <div id="win-container">
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  name: "win-screen",
  mounted(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const winScreen = document.getElementById("win-container");

    canvas.width = winScreen.clientWidth;
    canvas.height = winScreen.clientHeight;

    const xStart = canvas.width / 2;
    const yStart = canvas.height / 2;

    let sparks = [];

    let animationAge = 0;

    let spinAge = 0.02

    function drawStar(){
      ctx.save();
      ctx.translate(xStart, yStart);
      ctx.rotate(spinAge)
      ctx.beginPath();
      ctx.moveTo(0, -70);
      for (let i = 0; i < 5; i++){
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - (70 * 0.5));
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, -70);
      }
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.restore();
      spinAge += 0.02;
    }

    function resetSparks(){
      sparks = [];
      animationAge = 0;
      for(let i = 0; i < 30; i++){
        let spark = {
          x: xStart,
          y: yStart,
          vx: Math.random(),
          vy: Math.random(),
          red: Math.random() * 255,
          green: Math.random() * 255,
          blue: Math.random() * 255
        };
        if (Math.random() > 0.5){
          spark.vx = -spark.vx
        };
        if (Math.random() > 0.5){
          spark.vy = -spark.vy
        };
        sparks.push(spark);
      }
    }

    function drawSparks(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparks.forEach((spark) => {
        for (let n = 0; n < 10; n++){
          let trailAge = n;
          spark.x = spark.x + spark.vx * (trailAge / 4);
          spark.y = spark.y + spark.vy * (trailAge / 4);
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgb(${spark.red}, ${spark.green}, ${spark.blue}, ${1 - trailAge / 100})`
          ctx.fill();
        }
      })
      animationAge += 1;
      if (animationAge > 50){
        resetSparks();
      }
      drawStar();
      window.requestAnimationFrame(drawSparks);
    }

    window.requestAnimationFrame(drawSparks);
  }
}
</script>

<style lang="css" scoped>

  #win-container {
    width: 100%;
    height: 100%;
    background-color: black;
  }

</style>
