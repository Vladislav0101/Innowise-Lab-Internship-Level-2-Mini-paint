<template>
  <Popover :idElement="idElement" :text="text">
    <template v-slot:content>
      <SaveButton :canvas="canvas" />
    </template>
    <template v-slot:buttons>
      <ButtonsToCompletePopover :idElement="idElement" />
    </template>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import SaveButton from "@/components/Header/SaveButton.vue";
import ButtonsToCompletePopover from "@/components/Popover/ButtonsToCompletePopover.vue";

export default Vue.extend({
  components: { Popover, SaveButton, ButtonsToCompletePopover },

  props: ["idElement", "text", "canvas"]
});
</script>
