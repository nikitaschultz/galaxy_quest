<template lang="html">
  <div id="sky-container">
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
import ProfileService from '@/services/ProfileService.js';
import { eventBus } from '@/main.js';

export default {
  name: "sky-screen",
  props: ["activeProfile"],
  mounted(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const skyScreen = document.getElementById("sky-container")

    canvas.width = skyScreen.clientWidth;
    canvas.height = skyScreen.clientHeight;

    let skyWidth = canvas.width
    let skyHeight = canvas.height

    let starCoordinates = this.activeProfile.starCoordinates;
    let starPoints = this.activeProfile.starPoints;
    let profileId = this.activeProfile._id;

    function getStarCoordinates(stars){
      stars.forEach((star) => {
        let xPos = Math.round(star.relX * skyWidth);
        let yPos = Math.round(star.relY * skyHeight);

        drawStar(xPos, yPos);
      })
    }

    function updateScreen(event){
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if(starCoordinates.length > 0){
        getStarCoordinates(starCoordinates);
      }

      let cRect = canvas.getBoundingClientRect();
      let xPos = Math.round(event.clientX - cRect.left);
      let yPos = Math.round(event.clientY - cRect.top);

      let xEval = xPos > 0 && xPos < canvas.width
      let yEval = yPos > 0 && yPos < canvas.height

      if(xEval && yEval){
        if(starPoints > 0){
          document.onmousedown = placeStar;
        } else {
          document.onmousedown = null;
          document.onmousemove = null;
        }
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
      starPoints = starPoints - 1;

      let cRect = canvas.getBoundingClientRect();
      let xPos = Math.round(event.clientX - cRect.left);
      let yPos = Math.round(event.clientY - cRect.top);

      let star = {
        relX: xPos / skyWidth,
        relY: yPos / skyHeight
      };

      starCoordinates.push(star);

      drawStar(xPos, yPos);

      let updatedData = {
        starPoints: starPoints,
        starCoordinates: starCoordinates
      }

      ProfileService.updateProfile(profileId, updatedData)
      .then((profile) => eventBus.$emit('profile-updated', profile))

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
