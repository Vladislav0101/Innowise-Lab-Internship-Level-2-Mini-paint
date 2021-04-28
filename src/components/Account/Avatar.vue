<template>
  <div class="avatar">
    <img :src="src" alt="avatar" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import img from "../../assets/default-avatar.png";

export default Vue.extend({
  props: ["mail"],

  computed: {
    ...mapGetters(["usersAvatars"]),

    src() {
      // const avatars = this.$store.getters.usersAvatars;

      if (this.$store.getters.usersAvatars[this.mail]) {
        return this.$store.getters.usersAvatars[this.mail];
      } else {
        return img;
      }
    }
  }
});
</script>
