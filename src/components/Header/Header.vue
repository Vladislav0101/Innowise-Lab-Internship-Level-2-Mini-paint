<template>
  <div class="header-wrapper">
    <header class="wrapper">
      <Logo />
      <nav>
        <component
          :is="CreationButtonIs"
          :idElement="'creation-button'"
          :text="features['creation-button'].text"
          v-if="!isCreated"
        ></component>

        <BackToMainButton v-else />

        <component
          :is="SaveButtonIs"
          :idElement="'save-button'"
          :text="features['save-button'].text"
          :canvas="canvas"
          v-if="isCreated"
        ></component>
        <MyAccountButton :email="email" />
        <LogoutButton v-if="!isCreated" />
      </nav>
    </header>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import Logo from "@/components/Header/Logo.vue";
import CreationButton from "@/components/Header/CreationButton.vue";
import CreationButtonWithHint from "@/components/Header/CreationButtonWithHint.vue";
import LogoutButton from "@/components/Header/LogoutButton.vue";
import BackToMainButton from "@/components/Header/BackToMainButton.vue";
import SaveButton from "@/components/Header/SaveButton.vue";
import SaveButtonWithHint from "@/components/Header/SaveButtonWithHint.vue";
import MyAccountButton from "@/components/Header/MyAccountButton.vue";

export default Vue.extend({
  computed: {
    ...mapGetters(["isLearningPathActive", "features", "version", "email"]),

    CreationButtonIs(): Function {
      return this.isLearningPathActive && this.version === "1.0"
        ? CreationButtonWithHint
        : CreationButton;
    },

    SaveButtonIs(): Function {
      return this.isLearningPathActive && this.version === "1.0"
        ? SaveButtonWithHint
        : SaveButton;
    }
  },

  props: ["isCreated", "canvas"],

  components: {
    Logo,
    CreationButton,
    CreationButtonWithHint,
    LogoutButton,
    BackToMainButton,
    SaveButton,
    MyAccountButton
  }
});
</script>

<style scoped>
@keyframes header_h1 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
h1 {
  animation: header_h1 4s linear infinite;
  font-size: 2.5rem;
  cursor: pointer;
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>
