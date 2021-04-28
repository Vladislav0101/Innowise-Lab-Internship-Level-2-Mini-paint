<template>
  <div class="header--information">
    <Avatar :mail="userEmail" />
    <p>{{ userEmail }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Avatar from "@/components/Account/Avatar.vue";

export default Vue.extend({
  props: ["userEmail"],

  components: { Avatar }
});
</script>

<style scoped>
img {
  width: auto;
  height: 40px;
}
</style>
