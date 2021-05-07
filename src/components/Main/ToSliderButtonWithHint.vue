<template>
  <Popover :idElement="idElement" :text="text">
    <template v-slot:content>
      <ToSliderButton />
    </template>
    <template v-slot:buttons>
      <ButtonsToCompletePopover :idElement="idElement" />
    </template>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import ToSliderButton from "@/components/Main/ToSliderButton.vue";
import ButtonsToCompletePopover from "@/components/Popover/ButtonsToCompletePopover.vue";

export default Vue.extend({
  components: { Popover, ToSliderButton, ButtonsToCompletePopover },

  props: ["idElement", "text"]
});
</script>
