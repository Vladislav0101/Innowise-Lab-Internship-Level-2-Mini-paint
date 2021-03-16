<template>
  <button class="logoutButton" @click.prevent="logout">logout</button>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  methods: {
    ...mapActions(["logoutUser"]),
    logout(): void {
      this.logoutUser();
    }
  }
});
</script>
