<template>
  <div class="auth_box">
    <div class="auth_area">
      <h1 class="c_white">
        mini<span style="margin:0 15px" class="c_white">-</span>paint
      </h1>
      <form action="sign_in" class="auth_form">
        <input
          custom-input
          type="text"
          placeholder="mail"
          class="auth_input"
          v-model="userToSent.userMail"
        />
        <input
          custom-input
          type="password"
          placeholder="password"
          class="auth_input"
          v-model="userToSent.userPassword"
        />
        <input
          custom-input
          type="password"
          placeholder="password"
          class="auth_input"
          v-model="userToSent.userPasswordConfirm"
        />
        <button
          custom-button
          class="auth_button"
          @click.prevent="registerUserLocal"
        >
          register
        </button>
      </form>
      <router-link :to="{ name: 'sign' }">
        <div class="from_sign_to_reg">
          Sign in
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

import { IPasswordToCheck, IAuth } from "@/types/index";

export default Vue.extend({
  data(): { userToSent: IAuth & IPasswordToCheck; submitStatus: string } {
    return {
      userToSent: {
        userMail: "",
        userPassword: "",
        userPasswordConfirm: ""
      },
      submitStatus: ""
    };
  },

  methods: {
    ...mapActions(["registerUser"]),

    registerUserLocal(): void {
      if (
        this.userToSent.userPassword === this.userToSent.userPasswordConfirm
      ) {
        this.registerUser(this.userToSent)
          .then(() => {
            this.$router.push({ name: "main" });
          })
          .catch(err => {
            this.submitStatus = err.message;
            setTimeout(() => {
              this.submitStatus = "";
            }, 2000);
          });
      } else {
        this.submitStatus = "Check your password";
        setTimeout(() => {
          this.submitStatus = "";
        }, 2000);
      }
    }
  }
});
</script>
