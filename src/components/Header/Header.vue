<template>
  <header>
    <CreationButton v-if="!isCreated" />
    <BackToMainButton v-else />
    <router-link :to="{ name: 'main' }" class="logo">
      <h1>
        mini-paint
      </h1>
    </router-link>
    <LogoutButton v-if="!isCreated" />
    <SaveButton :canvas="canvas" v-else />
  </header>
</template>
<script lang="ts">
import Vue from "vue";
import CreationButton from "@/components/Header/CreationButton.vue";
import LogoutButton from "@/components/Header/LogoutButton.vue";
import BackToMainButton from "@/components/Header/BackToMainButton.vue";
import SaveButton from "@/components/Header/SaveButton.vue";

export default Vue.extend({
  props: ["isCreated", "canvas"],
  components: { CreationButton, LogoutButton, BackToMainButton, SaveButton }
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
