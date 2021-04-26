<template>
  <Popover :idElement="idElement" :text="text">
    <template v-slot:content>
      <SearchUser @inputUser="inputUser"></SearchUser>
    </template>
    <template v-slot:buttons>
      <ButtonsToCompletePopover :idElement="idElement" />
    </template>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import SearchUser from "@/components/Main/SearchUser.vue";
import ButtonsToCompletePopover from "@/components/Popover/ButtonsToCompletePopover.vue";

export default Vue.extend({
  components: { Popover, SearchUser, ButtonsToCompletePopover },

  methods: {
    inputUser(value: string) {
      this.$emit("inputUser", value);
    }
  },

  props: ["idElement", "text"]
});
</script>
