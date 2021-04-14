<template>
  <Popover :idElement="idElement" :text="text">
    <SearchUser @inputUser="inputUser"></SearchUser>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import SearchUser from "@/components/Main/SearchUser.vue";

export default Vue.extend({
  components: { Popover, SearchUser },

  methods: {
    inputUser(value: string) {
      this.$emit("inputUser", value);
    }
  },

  props: ["idElement", "text"]
});
</script>
