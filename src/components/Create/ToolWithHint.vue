<template>
  <Popover :idElement="idElement" :text="text">
    <template v-slot:content>
      <Tool :class="toolClass" :mode="mode"><slot></slot></Tool>
    </template>
    <template v-slot:buttons>
      <ButtonsToCompletePopover :idElement="idElement" />
    </template>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Tool from "@/components/Create/Tool.vue";
import Popover from "@/components/Popover/Popover.vue";
import ButtonsToCompletePopover from "@/components/Popover/ButtonsToCompletePopover.vue";

export default Vue.extend({
  props: ["mode", "toolClass", "idElement", "text"],

  components: { Tool, Popover, ButtonsToCompletePopover }
});
</script>
