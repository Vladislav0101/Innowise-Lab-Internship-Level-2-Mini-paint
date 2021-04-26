<template>
  <div class="header--information">
    <div class="avatar">
      <img src="../../assets/default-avatar.png" alt="avatar" width="50px" />
    </div>
    <p>{{ userEmail }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["userEmail"]
});
</script>
