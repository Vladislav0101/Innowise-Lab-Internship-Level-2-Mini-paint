<template>
  <div class="popover-box">
    <div class="notification" v-if="!isCheckedLocal"></div>

    <div :id="idElement">
      <slot name="content"></slot>
    </div>

    <b-popover
      :target="idElement"
      triggers="hover"
      placement="right"
      class="popover"
      v-if="!isCheckedLocal"
    >
      <h2>{{ idElement }}</h2>
      <p>{{ text }}</p>
      <div>
        <slot name="buttons"></slot>
      </div>
    </b-popover>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Vue from "vue";

export default Vue.extend({
  computed: {
    ...mapGetters(["features"]),

    isCheckedLocal(): boolean {
      return this.features[this.idElement].isChecked;
    }
  },

  props: ["idElement", "text"]
});
</script>
