<template>
  <div class="header--information">
    <Avatar :src="userEmail" />
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
