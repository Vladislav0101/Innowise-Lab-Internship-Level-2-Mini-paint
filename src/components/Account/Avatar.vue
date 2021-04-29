<template>
  <div class="avatar">
    <img :src="srcLocal" alt="avatar" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import img from "../../assets/default-avatar.png";

export default Vue.extend({
  props: ["src"],

  computed: {
    ...mapGetters(["usersAvatars"]),

    srcLocal() {
      if (this.$store.getters.usersAvatars[this.src]) {
        return this.$store.getters.usersAvatars[this.src];
      } else {
        return img;
      }
    }
  }
});
</script>
