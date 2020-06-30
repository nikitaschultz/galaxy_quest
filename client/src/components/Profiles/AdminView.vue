<template lang="html">
  <div class="admin-container">
    <h2>Admin</h2>
    <div v-if="awaitingPassword">
      <div>
        <form v-on:submit.prevent="checkPassword" class="column-view">
          <label class="form-label" for="password-input">Please enter the password to access the admin settings.</label><br>
          <input type="password" name="password-input" class="text-box" v-model:value="inputPassword"><br>
          <input type="submit" name="submit" value="Go" class="button">
        </form><br>
      </div>
      <div v-if="passwordIncorrect">
        <p>Sorry, incorrect.  Please try again.</p>
      </div>
    </div>
    <div v-if="!awaitingPassword">
      <div v-if="passwordCorrect && !changePasswordForm" class="column-view" >
        <div class="profile-grid">
          <div v-for="profile in profiles">
            <p>{{ profile.name }}</p>
            <button class="edit-button" v-on:click="handleDeleteProfile(profile)">Delete Profile</button>
          </div>
        </div><br>
        <button type="button" name="button" v-on:click="toggleChangePasswordForm">Change Admin Password</button>
      </div>
      <div v-if="passwordCorrect && changePasswordForm">
        <form v-on:submit.prevent="changePassword" >
          <label class="form-label" for="password-input">Please enter the new password.</label><br><br>
          <input type="password" name="password-input" class="text-box" v-model:value="newPassword">
          <input type="submit" name="submit" value="Go" class="button">
        </form><br>
      </div>
    </div><br>
    <button type="button" name="button" v-on:click="toggleAdminView">Close</button>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import ProfileService from '@/services/ProfileService.js';

export default {
  name: "admin-view",
  data(){
    return {
      inputPassword: "",
      password: "Password123",
      awaitingPassword: true,
      passwordCorrect: false,
      passwordIncorrect: false,
      changePasswordForm: false,
      newPassword: ""
    }
  },
  props: ["profiles"],
  mounted(){
    eventBus.$on('admin-view', () => {
    })
  },
  methods: {
    checkPassword(){
      if(this.inputPassword === this.password){
        this.awaitingPassword = false;
        this.passwordIncorrect = false;
        this.passwordCorrect = true;
      }else{
        this.passwordIncorrect = true;
      }
    },
    toggleAdminView(){
      eventBus.$emit('toggle-admin-view')
    },
    handleDeleteProfile(profile){
      ProfileService.deleteProfile(profile._id)
      .then((res) => {
        eventBus.$emit('profile-deleted')
        eventBus.$emit('toggle-admin-view')
      })
    },
    toggleChangePasswordForm(){
      this.changePasswordForm = !this.changePasswordForm;
    },
    changePassword(){
      this.password = this.newPassword;
      this.newPassword = "";
      this.toggleChangePasswordForm();
    }
  }
}
</script>

<style lang="css" scoped>

  .admin-container {
    position: fixed;
    width: 70vw;
    height: 60vh;
    top: 20vh;
    left: 15vw;
    background-color: white;
    box-shadow: 0 0 30px cornflowerblue;
    border: 1px solid midnightblue;
    text-align: center;
  }

  .column-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile-grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .edit-button {
    width: 150px;
  }

  .form-label {
    font-size: 25px;
    font-family: 'Boogaloo', cursive;
    color: black;
  }

</style>
