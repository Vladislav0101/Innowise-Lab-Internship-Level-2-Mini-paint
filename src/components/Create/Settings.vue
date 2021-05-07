<template>
  <div class="settings">
    <component
      :is="componentIs"
      v-for="item of tools"
      :key="item.id"
      :idElement="item.idElement"
      :requiredVersion="'1.0'"
      :toolClass="item.toolClass"
      :mode="item.mode"
      :text="features[item.idElement].text"
    >
      <div
        :class="item.idElement"
        v-if="'circle rectangle line'.includes(item.idElement)"
      ></div>

      <div v-else-if="item.idElement === 'pencil'">
        <img src="../../assets/pencil.png" alt="pencil" width="35px" />
      </div>

      <div v-else-if="item.idElement === 'size'">
        <button @click="setIsSizeInput">width</button>
        <input
          type="range"
          v-model="localSize"
          width="50px"
          v-if="isSizeInput"
        />
      </div>

      <div v-else-if="item.idElement === 'color'">
        <input type="color" v-model="localColor" width="50px" />
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

import Tool from "@/components/Create/Tool.vue";
import ToolWithHint from "@/components/Create/ToolWithHint.vue";

interface SettingsData {
  localSize: number;
  isSizeInput?: boolean;
  localColor: string;
  tools: Array<object>;
}
export default Vue.extend({
  data(): SettingsData {
    return {
      localSize: 0,
      isSizeInput: false,
      localColor: "",
      tools: [
        {
          id: 1,
          idElement: "rectangle",
          requiredVersion: "'1.0'",
          toolClass: "settings_figure",
          mode: "rectangle"
        },
        {
          id: 2,
          idElement: "circle",
          requiredVersion: "'1.0'",
          toolClass: "settings_figure",
          mode: "circle"
        },
        {
          id: 3,
          idElement: "line",
          requiredVersion: "'1.0'",
          toolClass: "settings_figure",
          mode: "line"
        },
        {
          id: 4,
          idElement: "pencil",
          requiredVersion: "'1.0'",
          toolClass: "settings_figure",
          mode: "pencil"
        },
        {
          id: 5,
          idElement: "size",
          requiredVersion: "'1.0'",
          toolClass: "settings_size"
        },
        {
          id: 6,
          idElement: "color",
          requiredVersion: "'1.0'",
          toolClass: "settings_color"
        }
      ]
    };
  },

  computed: {
    ...mapGetters([
      "size",
      "color",
      "isLearningPathActive",
      "features",
      "version"
    ]),

    componentIs(): Function {
      return this.isLearningPathActive && this.version === "1.0"
        ? ToolWithHint
        : Tool;
    }
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
    }
  },

  components: { Tool, ToolWithHint },

  mounted() {
    this.localSize = this.size;
    this.localColor = this.color;
  }
});
</script>

<style>
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
