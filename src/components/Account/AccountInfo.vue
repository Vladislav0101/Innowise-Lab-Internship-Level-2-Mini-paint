<template>
  <div>
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
  },

  methods: {
    propToShow(prop: string): string {
      let returnProp;
      switch (prop) {
        case "firstName":
          returnProp = "First name";
          break;
        case "secondName":
          returnProp = "Second name";
          break;
        default:
          returnProp = prop[0].toUpperCase() + prop.slice(1, prop.length);
          break;
      }
      return returnProp.trim();
    }
  },

  props: ["userEmail", "information"]
});
</script>
