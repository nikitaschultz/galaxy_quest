<template lang="html">


<div>
  <div v-if="this.score < 3 && this.lives > 0">
    <button v-on:click="startGame"> Game </button>
  </div>

    <img v-for= "(each,index) in item" src="@/assets/number_game_images/rubber_duck.jpg" width = "120" height = "120" :alt="each" :key="index">

    <button v-for="(answer, index) in answers" :key="index-3" v-on:click="checkAnswer(answer)"> {{answer}} </button>

    <div v-if="this.score > 0 || this.lives < 3">
<!-- remove start button -->
      <button v-on:click="startGame"> Click to have another shot </button>
    </div>
<!-- want to clear the board here  -->
    <div>
      <button> Score: {{this.score}}</button>
      <button> Lives: {{this.lives}}</button>
      <div v-if="this.score === 3">
        <h3>Well done you ve won!! </h3>
      </div>
      <div v-if="this.lives ===0">
        <h3> Booooo! </h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      item:[],
      answers:[],
      onclick: true,
      number: 0,
      answer: 0,
      wrongAnswer: 0,
      score: 0,
      lives: 3
    }
  },

  mounted() {
  },

  methods: {
    startGame(){
      this.number = this.randomNumber();
      this.createItemArray();
      this.createAnswersArray();
      this.shuffleArray(this.answers);
    },
    randomNumber() {
      const randomNumber = Math.floor((Math.random()*20)+1);
      return randomNumber;
    },
    createItemArray(){
      this.item= [];
      for (let i = 0; i< this.number; i++) {
        this.item.push(i);
      }
    },
    createAnswersArray(){
      this.answers= [];
      this.answers.push(this.number)
      while (this.answers.length < 3) {
        let newAnswer = this.randomNumber();
        if (!this.answers.includes(newAnswer)){
          this.answers.push(newAnswer);
          }
        }
      },
    shuffleArray(answers){
      var currentIndex = answers.length,
      temporaryValue, randomIndex;
      while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = answers[currentIndex];
        answers[currentIndex] = answers[randomIndex];
        answers[randomIndex] = temporaryValue;
      }
      return answers;
    },
    checkAnswer(answer) {
      if (this.lives > 0 && this.score < 3){
        if (answer === this.number){
          this.score++;
        }
        else {
          this.lives--;
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>

#question-container {
  width: 90%;
  height:40%;
  border: solid;
  border-width: medium;
  border-color: blue;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

#answer-container {
  display: center;
  width: 50%;
  margin-bottom: 20px;
  padding: 25px;
  justify-content: space-evenly;
}

</style>
