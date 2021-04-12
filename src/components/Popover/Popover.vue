<template>
  <div class="popover-box">
    <div class="notification" v-if="isLooked"></div>

    <div :id="id">
      <slot></slot>
    </div>

    <b-popover
      :target="id"
      triggers="hover"
      placement="right"
      class="popover"
      v-if="isLooked"
    >
      <h2>{{ idElement }}</h2>
      <p>{{ features[idElement].text }}</p>
      <button class="agree-feature" @click="removeCheckedFeature">OK</button>
    </b-popover>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { BPopover } from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  data(): { isLookedFeature: boolean } {
    return {
      isLookedFeature: false
    };
  },

  methods: {
    ...mapActions(["setVersionOnDB"]),

    removeCheckedFeature() {
      this.features[this.idElement].isChecked = true;
      let allIsChecked = true;

      Object.entries(this.features).forEach(item => {
        if (item[1].isChecked === false) {
          allIsChecked = false;
        }
      });

      if (allIsChecked) {
        this.setVersionOnDB(true);
      }
    }
  },

  computed: {
    ...mapGetters(["version", "features", "versionReviewed"]),

    id() {
      return `${this.idElement}`;
    },

    isLooked() {
      if (this.versionReviewed) {
        return false;
      } else if (
        !this.features[this.idElement].isChecked &&
        this.isCurrentVersion
      ) {
        return true;
      } else {
        return false;
      }
    },

    isCurrentVersion() {
      return this.requiredVersion === this.version;
    }
  },

  props: ["idElement", "requiredVersion"],

  components: { BPopover }
});
</script>

<style scoped>
@keyframes beat {
  0% {
    transform: scale(1);
    background-color: orange;
  }
  50% {
    transform: scale(1.3);
    background-color: crimson;
  }
  100% {
    transform: scale(1);
    background-color: orange;
  }
}
.popover-box {
  position: relative;
}
.notification {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: coral;
  animation: beat 2s ease-out infinite;
}
.popover {
  background-color: #fcfcfc;
  padding: 10px 15px;
  border-radius: 7px;
}
.agree-feature {
  width: 30px;
  height: 30px;
}
</style>
