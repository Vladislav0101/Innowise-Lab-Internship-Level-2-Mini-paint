<template>
  <div class="main_create">
    <Header :isCreated="true" :canvas="canvas"></Header>
    <div class="canvas_box">
      <Settings />
      <div class="canvas_block">
        <canvas
          class="canvas"
          @mousedown.prevent="mDown"
          @mouseup.prevent="mUp"
          @mousemove.prevent="mMove"
          width="500px"
          height="400px"
        >
          Обновите браузер
        </canvas>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import { ICanvas } from "../types/index";

import Header from "@/components/Header/Header.vue";
import Settings from "@/components/Create/Settings.vue";

export default Vue.extend({
  data(): ICanvas {
    return {
      canvas: null,
      context: null,
      colorLocal: "000000",
      sizeLocal: 5,
      action: "up",
      arrToBuildFigure: [],
      imageData: ""
    };
  },

  components: { Header, Settings },

  mounted() {
    const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    const context:
      | CanvasRenderingContext2D
      | null
      | undefined = canvas?.getContext("2d");

    this.canvas = canvas;
    this.context = context;
  },

  methods: {
    mDown(e: MouseEvent): void {
      this.action = "down";
      this.saveImageData();
      if (this.mode === "pencil") this.drawPoint(e);
    },

    mUp(): void {
      this.action = "up";
      this.arrToBuildFigure = [];
      this.saveImageData();
    },

    mMove(e: MouseEvent): void {
      if (this.action === "down") {
        if (this.mode === "pencil") {
          this.drawPoint(e);
        } else {
          const coordinates = this.getCoordinates(e);
          const ctx = this.context;
          ctx.putImageData(this.imageData, 0, 0);
          let x1;
          let y1;

          if (this.arrToBuildFigure.length === 0) {
            x1 = coordinates.x;
            y1 = coordinates.y;
            this.arrToBuildFigure.push([x1, y1]);
          } else {
            [x1, y1] = [...this.arrToBuildFigure[0]];
          }
          ctx.beginPath();
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size;
          ctx.lineCap = "round";

          if (this.mode === "line") {
            ctx.moveTo(x1, y1);
            ctx.lineTo(coordinates.x, coordinates.y);
            ctx.stroke();
          } else if (this.mode === "rectangle") {
            ctx.strokeRect(x1, y1, coordinates.x - x1, coordinates.y - y1);
          } else if (this.mode === "circle") {
            ctx.arc(
              x1,
              y1,
              coordinates.x - x1 < 0
                ? -(coordinates.x - x1)
                : coordinates.x - x1,
              0,
              2 * Math.PI
            );
            ctx.stroke();
          }
        }
      }
    },

    drawPoint(e: MouseEvent) {
      const coordinates = this.getCoordinates(e);
      const ctx = this.context;

      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.lineCap = "round";
      ctx.moveTo(coordinates.x, coordinates.y);
      ctx.lineTo(
        coordinates.x - coordinates.dx,
        coordinates.y - coordinates.dy
      );
      ctx.stroke();
      ctx.closePath();
    },

    saveImageData() {
      this.imageData = this.context.getImageData(
        0,
        0,
        this.canvas?.width,
        this.canvas?.height
      );
    },

    getCoordinates(e: MouseEvent): { [key: string]: number } {
      return {
        x: e.offsetX,
        y: e.offsetY,
        dx: e.movementX,
        dy: e.movementY
      };
    }
  },

  computed: {
    ...mapGetters(["size", "color", "mode"])
  }
});
</script>
<style scoped>
.main_create {
  width: max-content;
  height: max-content;
  width: 100%;
}
.canvas_box {
  height: calc(100vh - 74px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas_block {
  width: 90vw;
  background-color: gray;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  animation: color 20s linear infinite;
}
@keyframes color {
  0% {
    background-color: #ee8585;
  }
  25% {
    background-color: #b0ee85;
  }
  50% {
    background-color: #85eee1;
  }
  75% {
    background-color: #c385ee;
  }
  100% {
    background-color: #ee8585;
  }
}
</style>
