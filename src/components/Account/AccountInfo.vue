<template>
  <div class="box_main-information">
    <div class="main-information" v-if="information">
      <div v-for="(value, prop) of informationToShow" :key="prop">
        <span class="info-prop" v-if="value">{{ propToShow(prop) }} : </span>
        <span class="info-value">{{ value }}</span>
      </div>
    </div>
    <div class="no-info" v-else>
      This user has not left any information about himself yet.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["userEmail", "information"],

  methods: {
    propToShow(prop: string): string {
      switch (prop) {
        case "firstName":
          return "First name";
        case "secondName":
          return "Second name";
        default:
          return prop[0].toUpperCase() + prop.slice(1, prop.length).trim();
      }
    }
  },

  computed: {
    informationToShow() {
      return {
        firstName: this.information.firstName,
        secondName: this.information.secondName,
        gender: this.information.gender,
        birthday: this.information.birthday,
        country: this.information.country,
        post: this.information.post,
        university: this.information.university,
        specialization: this.information.specialization
      };
    }
  }
});
</script>
