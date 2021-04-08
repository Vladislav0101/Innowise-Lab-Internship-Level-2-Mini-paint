<template>
  <main>
    <router-link :to="{ name: 'main' }" style="position:absolute">
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="25"
        width="25"
        viewBox="0 0 438.483 438.483"
        style="enable-background:new 0 0 438.483 438.483;"
        xml:space="preserve"
        class="back_to_main_from_slider_svg"
      >
        <g>
          <g>
            <path
              d="M431.168,230.762c-23.552-75.776-98.304-127.488-187.904-129.024V13.162c0-4.096-3.584-7.68-7.68-7.68
			c-1.536,0-3.072,0.512-4.608,1.536L3.136,171.882c-3.584,2.56-4.096,7.168-1.536,10.752c0.512,0.512,1.024,1.024,1.536,1.536
			l227.84,163.84c3.584,2.56,8.192,1.536,10.752-1.536c1.024-1.536,1.536-3.072,1.536-4.608v-88.064
			c55.296,0,101.888,26.112,118.272,65.536c13.824,33.792,2.56,70.144-30.208,100.352c-3.072,3.072-3.584,7.68-0.512,10.752
			c1.536,1.536,3.584,2.56,5.632,2.56h6.144c1.536,0,3.072-0.512,4.096-1.536C421.952,381.802,454.208,304.49,431.168,230.762z"
            />
          </g>
        </g>
      </svg>
    </router-link>
    <div class="slider">
      <div @click.prevent="prev" class="toggle_slides">&lt;</div>
      <transition-group name="slider" class="slider_box" tag="div">
        <PictureBox
          v-for="pictureInfo of arrPicturesToShow"
          :key="pictureInfo.date"
          :pictureInfo="pictureInfo"
        />
      </transition-group>
      <div @click.prevent="next" class="toggle_slides">&gt;</div>
      <div @click.prevent="start" class="slider_start" v-if="!isStartShow">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          height="30"
          width="30"
          viewBox="0 0 511.999 511.999"
          style="enable-background:new 0 0 511.999 511.999;"
          xml:space="preserve"
          class="slider_svg_play"
        >
          <g>
            <g>
              <path
                d="M443.86,196.919L141.46,10.514C119.582-2.955,93.131-3.515,70.702,9.016c-22.429,12.529-35.819,35.35-35.819,61.041
			v371.112c0,38.846,31.3,70.619,69.77,70.829c0.105,0,0.21,0.001,0.313,0.001c12.022-0.001,24.55-3.769,36.251-10.909
			c9.413-5.743,12.388-18.029,6.645-27.441c-5.743-9.414-18.031-12.388-27.441-6.645c-5.473,3.338-10.818,5.065-15.553,5.064
			c-14.515-0.079-30.056-12.513-30.056-30.898V70.058c0-11.021,5.744-20.808,15.364-26.183c9.621-5.375,20.966-5.135,30.339,0.636
			l302.401,186.405c9.089,5.596,14.29,14.927,14.268,25.601c-0.022,10.673-5.261,19.983-14.4,25.56L204.147,415.945
			c-9.404,5.758-12.36,18.049-6.602,27.452c5.757,9.404,18.048,12.36,27.452,6.602l218.611-133.852
			c20.931-12.769,33.457-35.029,33.507-59.55C477.165,232.079,464.729,209.767,443.86,196.919z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div @click.prevent="stop" class="slider_stop" v-if="isStartShow">
        <svg
          height="30"
          viewBox="-45 0 327 327"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          class="slider_svg_stop"
        >
          <path
            d="m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"
          />
          <path
            d="m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"
          />
        </svg>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

import PictureBox from "@/components/Main/PictureBox.vue";

interface SliderBoxData {
  arrPicturesToShow: Array<never>;
  slidesNumber: number;
  lookedPictures: [];
  isStartShow: boolean;
  intervalId: undefined | number;
}

export default Vue.extend({
  data(): SliderBoxData {
    return {
      arrPicturesToShow: [],
      lookedPictures: [],
      slidesNumber: 5,
      isStartShow: false,
      intervalId: undefined
    };
  },

  methods: {
    ...mapActions(["getPictures"]),

    getPicturesToShow() {
      if (!this.arrayOfUrls.length) {
        this.getPictures().then(() => {
          this.arrPicturesToShow = this.arrayOfUrls;
        });
      }
      this.arrPicturesToShow = this.arrayOfUrls.slice(0, this.slidesNumber);
    },

    prev() {
      if (this.lookedPictures.length) {
        this.arrPicturesToShow.unshift(
          this.lookedPictures[this.lookedPictures.length - 1]
        );
        this.lookedPictures.pop();
      }
    },

    next() {
      if (this.arrPicturesToShow.length > 1) {
        this.lookedPictures.push(this.arrPicturesToShow[0]);
        this.arrPicturesToShow.shift();
      }
    },

    start() {
      this.intervalId = setInterval(() => {
        this.next();
        if (this.arrPicturesToShow.length === 1) {
          clearInterval(this.intervalId);
        }
      }, 3500);
      this.isStartShow = true;
    },

    stop() {
      clearInterval(this.intervalId);
      this.isStartShow = false;
    }
  },

  mounted() {
    this.getPicturesToShow();
  },

  computed: {
    ...mapGetters(["arrayOfUrls"])
  },

  components: { PictureBox }
});
</script>

<style scoped>
.slider-leave-active {
  position: absolute;
}
.slider-leave-to,
.slider-enter {
  opacity: 0;
  transition: all 1.5s linear;
}
.slider-enter-active {
  transition: all 1s linear;
}
.slider-move {
  transition: all 1.5s;
}
</style>
