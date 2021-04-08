<template>
  <div class="settings">
    <div class="settings_figure" @click="setRectangleMode">
      <div class="rectangle"></div>
    </div>
    <div class="settings_figure" @click="setCircleMode">
      <div class="circle"></div>
    </div>
    <div class="settings_figure" @click="setLineMode">
      <div class="line"></div>
    </div>
    <div class="settings_line">
      <button class="pencil" @click="setPencilMode">
        <img src="../../assets/pencil.png" alt="" />
      </button>
    </div>
    <div class="settings_size">
      <button @click="setIsSizeInput">width</button>
      <input type="range" v-model="localSize" width="50px" v-if="isSizeInput" />
    </div>
    <div class="settings_color">
      <input type="color" v-model="localColor" width="50px" />
    </div>
  </div>
</template>
<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

import { ISettings } from "@/types/index";

export default Vue.extend({
  data(): ISettings {
    return {
      localSize: 0,
      isSizeInput: false,
      localColor: "",
      mode: "pencil"
    };
  },
  computed: {
    ...mapGetters(["size", "color"])
  },
  watch: {
    localSize(): void {
      this.setSize(this.localSize);
    },
    localColor(): void {
      this.setColor(this.localColor);
    }
  },
  methods: {
    ...mapActions(["setSize", "setColor", "setMode"]),
    setIsSizeInput(): void {
      this.isSizeInput = !this.isSizeInput;
    },
    setPencilMode(): void {
      this.mode = "pencil";
      this.setMode("pencil");
    },
    setLineMode(): void {
      this.mode = "line";
      this.setMode("line");
    },
    setCircleMode(): void {
      this.mode = "circle";
      this.setMode("circle");
    },
    setRectangleMode(): void {
      this.mode = "rectangle";
      this.setMode("rectangle");
    }
  },
  mounted() {
    this.localSize = this.size;
    this.localColor = this.color;
  }
});
</script>
<style scoped>
.settings {
  width: 10vw;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.settings_size {
  position: relative;
}
.settings_size input {
  transform: rotate(-90deg);
  position: absolute;
}
.settings_color input {
  border: none;
  width: 50px;
  height: 55px;
}
.pencil {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 0;
}
.pencil img {
  width: 35px;
}
</style>
