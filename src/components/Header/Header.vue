<template>
  <header>
    <component
      :is="CreationButtonIs"
      :idElement="'creation-button'"
      :text="features['creation-button'].text"
      v-if="!isCreated"
    ></component>

    <BackToMainButton v-else />

    <router-link :to="{ name: 'main' }" class="logo">
      <h1>
        mini-paint
      </h1>
    </router-link>

    <LogoutButton v-if="!isCreated" />

    <component
      :is="SaveButtonIs"
      :idElement="'save-button'"
      :text="features['save-button'].text"
      v-else
    ></component>
  </header>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import CreationButton from "@/components/Header/CreationButton.vue";
import CreationButtonWithHint from "@/components/Header/CreationButtonWithHint.vue";
import LogoutButton from "@/components/Header/LogoutButton.vue";
import BackToMainButton from "@/components/Header/BackToMainButton.vue";
import SaveButton from "@/components/Header/SaveButton.vue";
import SaveButtonWithHint from "@/components/Header/SaveButtonWithHint.vue";

export default Vue.extend({
  computed: {
    ...mapGetters(["isLearningPathActive", "features", "version"]),

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
    CreationButton,
    CreationButtonWithHint,
    LogoutButton,
    BackToMainButton,
    SaveButton
  }
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}
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
