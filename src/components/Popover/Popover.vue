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
      <form>
        <button class="agree-feature" @click="checkFeatureLocal">Ok</button>
        <button @click.prevent="complete">Complete</button>
      </form>
    </b-popover>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

export default Vue.extend({
  methods: {
    ...mapActions(["checkFeature", "completeAll"]),

    checkFeatureLocal(): void {
      this.checkFeature(this.idElement);
    },

    complete() {
      this.completeAll(true);
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
