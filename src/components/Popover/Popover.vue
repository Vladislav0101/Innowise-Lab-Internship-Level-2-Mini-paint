<template>
  <div class="popover-box">
    <div class="notification" v-if="!isCheckedLocal"></div>

    <div :id="idElement">
      <slot></slot>
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
      <button class="agree-feature" @click="checkFeatureLocal">OK</button>
    </b-popover>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

export default Vue.extend({
  methods: {
    ...mapActions(["checkFeature"]),

    checkFeatureLocal(): void {
      this.checkFeature(this.idElement);
    }
  },

  computed: {
    ...mapGetters(["features"]),

    isCheckedLocal(): boolean {
      return this.features[this.idElement].isChecked;
    }
  },

  props: ["idElement", "text"]
});
</script>
