<template>
  <Popover :idElement="idElement" :text="text">
    <Tool :class="toolClass" :mode="mode"><slot></slot></Tool>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Tool from "@/components/Create/Tool.vue";
import Popover from "@/components/Popover/Popover.vue";

export default Vue.extend({
  props: ["mode", "toolClass", "idElement", "text"],

  components: { Tool, Popover }
});
</script>
