<template>
  <router-link :to="{ name: 'myAccount' }" class="my-account">
    {{ email }}
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["email"]
});
</script>
