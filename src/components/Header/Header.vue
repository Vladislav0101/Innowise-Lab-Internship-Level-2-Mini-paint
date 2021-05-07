<template>
  <div class="header-wrapper">
    <header class="wrapper">
      <Logo />
      <nav :class="{ 'burger-active': isBurgerActive }">
        <component
          :is="CreationButtonIs"
          :idElement="'creation-button'"
          :text="features['creation-button'].text"
          v-if="!isCreated"
        ></component>

        <BackToMainButton v-else />

        <component
          :is="SaveButtonIs"
          :idElement="'save-button'"
          :text="features['save-button'].text"
          :canvas="canvas"
          v-if="isCreated"
        ></component>
        <MyAccountButton :email="email" />
        <LogoutButton v-if="!isCreated" />
      </nav>
      <div class="burger" @click="isBurgerActive = !isBurgerActive">
        <svg
          class="burger-current-icon"
          v-if="!isBurgerActive"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 477.867 477.867"
          style="enable-background:new 0 0 477.867 477.867;"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M256,0h-34.133C99.392,0.141,0.141,99.392,0,221.867c0,9.426,7.641,17.067,17.067,17.067H460.8
			c9.426,0,17.067-7.641,17.067-17.067C477.726,99.392,378.475,0.141,256,0z M34.901,204.8
			c8.941-96.613,89.939-170.551,186.965-170.667H256c97.026,0.116,178.025,74.053,186.965,170.667H34.901z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M460.8,341.333h-68.267c-3.693,0-7.286,1.198-10.24,3.413l-58.027,43.52l-58.027-43.52
			c-2.954-2.216-6.547-3.413-10.24-3.413H17.067C7.641,341.333,0,348.974,0,358.4v34.133c0.056,47.105,38.228,85.277,85.333,85.333
			h307.2c47.105-0.056,85.277-38.228,85.333-85.333V358.4C477.867,348.974,470.226,341.333,460.8,341.333z M443.733,392.533
			c0,28.277-22.923,51.2-51.2,51.2h-307.2c-28.277,0-51.2-22.923-51.2-51.2v-17.067h216.183l63.71,47.787
			c6.068,4.551,14.412,4.551,20.48,0l63.71-47.787h45.517V392.533z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M460.8,273.067H17.067C7.641,273.067,0,280.708,0,290.133S7.641,307.2,17.067,307.2H460.8
			c9.426,0,17.067-7.641,17.067-17.067S470.226,273.067,460.8,273.067z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M153.6,102.4c-9.426,0-17.067,7.641-17.067,17.067v17.067c0,9.426,7.641,17.067,17.067,17.067s17.067-7.641,17.067-17.067
			v-17.067C170.667,110.041,163.026,102.4,153.6,102.4z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M238.933,102.4c-9.426,0-17.067,7.641-17.067,17.067v17.067c0,9.426,7.641,17.067,17.067,17.067S256,145.959,256,136.533
			v-17.067C256,110.041,248.359,102.4,238.933,102.4z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M324.267,102.4c-9.426,0-17.067,7.641-17.067,17.067v17.067c0,9.426,7.641,17.067,17.067,17.067
			c9.426,0,17.067-7.641,17.067-17.067v-17.067C341.333,110.041,333.692,102.4,324.267,102.4z"
              />
            </g>
          </g>
        </svg>
        <svg
          class="burger-current-icon"
          v-else
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 415.188 415.188"
          style="enable-background:new 0 0 415.188 415.188;"
          xml:space="preserve"
        >
          <path
            d="M412.861,78.976c3.404-6.636,2.831-14.159-0.15-20.404c0.84-7.106-1.02-14.321-7.746-19.855
	c-6.262-5.151-12.523-10.305-18.781-15.457c-11.005-9.055-28.237-11.913-38.941,0c-48.619,54.103-99.461,105.856-152.167,155.725
	c-39.185-36.605-78.846-72.713-118.223-108.868c-13.82-12.693-33.824-8.71-42.519,6.411c-12.665,6.286-22.931,14.481-31.42,28.468
	c-4.042,6.664-3.727,15.076,0,21.764c25.421,45.578,74.557,85.651,114.957,122.529c-5.406,4.839-10.772,9.724-16.287,14.461
	c-54.43,46.742-91.144,76.399-23.029,124.325c0.919,0.647,1.856,0.504,2.789,0.882c1.305,0.602,2.557,1.026,4.004,1.264
	c0.45,0.017,0.87,0.093,1.313,0.058c1.402,0.114,2.774,0.471,4.195,0.192c36.621-7.18,70.677-35.878,101.576-67.48
	c30.1,29.669,62.151,58.013,97.395,74.831c8.391,4.005,18.395,1.671,24.855-3.931c10.832,0.818,20.708-5.913,25.665-15.586
	c0.734-0.454,1.207-0.713,2.002-1.21c15.748-9.838,17.187-29.431,5.534-42.936c-26.313-30.492-54.284-59.478-82.798-87.95
	C316.426,196.043,380.533,141.939,412.861,78.976z"
          />
        </svg>
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import Logo from "@/components/Header/Logo.vue";
import CreationButton from "@/components/Header/CreationButton.vue";
import CreationButtonWithHint from "@/components/Header/CreationButtonWithHint.vue";
import LogoutButton from "@/components/Header/LogoutButton.vue";
import BackToMainButton from "@/components/Header/BackToMainButton.vue";
import SaveButton from "@/components/Header/SaveButton.vue";
import SaveButtonWithHint from "@/components/Header/SaveButtonWithHint.vue";
import MyAccountButton from "@/components/Header/MyAccountButton.vue";

export default Vue.extend({
  data(): { isBurgerActive: boolean } {
    return {
      isBurgerActive: false
    };
  },

  computed: {
    ...mapGetters(["isLearningPathActive", "features", "version", "email"]),

    CreationButtonIs(): Function {
      return this.isLearningPathActive && this.version === "1.0"
        ? CreationButtonWithHint
        : CreationButton;
    },

    SaveButtonIs(): Function {
      return this.isLearningPathActive && this.version === "1.0"
        ? SaveButtonWithHint
        : SaveButton;
    }
  },

  methods: {},

  props: ["isCreated", "canvas"],

  components: {
    Logo,
    CreationButton,
    CreationButtonWithHint,
    LogoutButton,
    BackToMainButton,
    SaveButton,
    MyAccountButton
  }
});
</script>

<style scoped>
@keyframes header_h1 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
h1 {
  animation: header_h1 4s linear infinite;
  font-size: 2.5rem;
  cursor: pointer;
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>
