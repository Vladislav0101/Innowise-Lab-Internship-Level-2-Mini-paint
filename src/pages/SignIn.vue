<template>
  <div class="auth_box">
    <div class="auth_area">
      <h1 class="c_white">
        mini<span style="margin:0 15px" class="c_white">-</span>paint
      </h1>
      <form action="sign_in" class="auth_form">
        <input
          type="text"
          placeholder="mail"
          class="auth_input"
          v-model="userToSent.userMail"
        />
        <input
          type="password"
          placeholder="password"
          class="auth_input"
          v-model="userToSent.userPassword"
        />
        <button class="auth_button" @click.prevent="signInUserLocal">
          sign in
        </button>
      </form>
      <router-link :to="{ name: 'registration' }">
        <div class="from_sign_to_reg">
          Registration
        </div>
      </router-link>
      <div class="error" v-if="submitStatus">
        <p>{{ submitStatus }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";

import { IAuth } from "@/types/index";

export default Vue.extend({
  data(): { userToSent: IAuth; submitStatus: string } {
    return {
      userToSent: {
        userMail: "",
        userPassword: ""
      },
      submitStatus: ""
    };
  },

  methods: {
    ...mapActions(["signInUser"]),

    signInUserLocal(): void {
      this.signInUser(this.userToSent)
        .then(() => {
          this.$router.push({ name: "main" });
        })
        .catch(err => {
          this.submitStatus = err.message;
          setTimeout(() => {
            this.submitStatus = "";
          }, 2000);
        });
    }
  }
});
</script>
