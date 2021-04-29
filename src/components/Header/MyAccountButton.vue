<template>
  <router-link :to="{ name: 'myAccount' }" class="my-account">
    <Avatar :src="email" />
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

import Avatar from "@/components/Account/Avatar.vue";

export default Vue.extend({
  props: ["email"],

  components: { Avatar }
});
</script>
