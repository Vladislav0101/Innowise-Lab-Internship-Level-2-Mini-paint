<template>
  <form class="create-info" name="information" @submit.prevent="submitForm">
    <section class="create-main-info">
      <label for="create-firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="create-firstName"
        v-model="info.firstName"
        :class="{ 'validate-error': v$.firstName.$error }"
        @blur="v$.firstName.$touch()"
      />
      <!-- @blur="v$.firstName.$touch" -->
      <!-- :class="{ 'validate-error': v$.firstName.$error }" -->

      <label for="create-secondName">Second name</label>
      <input
        type="text"
        name="secondName"
        id="create-secondName"
        v-model="info.secondName"
        :class="{ 'validate-error': v$.secondName.$error }"
        @blur="v$.secondName.$touch()"
      />

      <p>Gender</p>
      <div class="gender-radio">
        <label for="male">
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            v-model="info.gender"
          />
        </label>
        <label for="female">
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            v-model="info.gender"
          />
        </label>
      </div>

      <label for="create-birthday">Birthday</label>
      <input
        type="date"
        name="birthday"
        id="create-birthday"
        v-model="info.birthday"
      />

      <label for="country">Country</label>
      <select name="country" id="country" v-model="info.country">
        <option value="Belarus">Belarus</option>
        <option value="Ukraine">Ukraine</option>
        <option value="Russia">Russia</option>
        <option value="UK">UK</option>
        <option value="USA">USA</option>
        <option value="Poland">Poland</option>
        <option value="Germany">Germany</option>
        <option value="Czech">Czech</option>
      </select>
    </section>

    <section class="create-work">
      <p>Employment</p>
      <div class="work-radio">
        <label for="employed">
          <span>Employed</span>
          <input
            type="radio"
            name="work"
            id="employed"
            v-model="info.isEmployed"
            :value="true"
          />
        </label>
        <label for="unemployed">
          <span>Unemployed</span>
          <input
            type="radio"
            name="work"
            id="unemployed"
            v-model="info.isEmployed"
            :value="false"
          />
        </label>
      </div>
      <label for="post" v-if="isEmployed">
        <p>Post</p>
        <input type="text" id="post" v-model="info.post" />
      </label>

      <p>Education</p>
      <div class="study-radio">
        <label for="student">
          <span>Student</span>
          <input
            type="radio"
            name="study"
            id="student"
            v-model="info.isStudy"
            :value="true"
          />
        </label>
        <label for="not-a-student">
          <span>Not a student</span>
          <input
            type="radio"
            name="study"
            id="not-a-student"
            v-model="info.isStudy"
            :value="false"
          />
        </label>
      </div>
      <label for="university" v-if="isStudy">
        <p>University</p>
        <input type="text" id="university" v-model="info.university" />
      </label>
      <label for="specialization" v-if="isStudy">
        <p>Specialization</p>
        <input type="text" id="specialization" v-model="info.specialization" />
      </label>
    </section>
    <button type="submit" class="create-submit-button">
      Edit
    </button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import useVuelidate from "@vuelidate/core";
import { required, alpha } from "@vuelidate/validators";
import { reactive } from "@vue/composition-api";
import { mapActions } from "vuex";

export default Vue.extend({
  setup(): { [key: string]: object } {
    const info: object = reactive({
      firstName: "",
      secondName: "",
      gender: null,
      birthday: null,
      country: null,
      post: null,
      university: null,
      specialization: null
    });

    const rules = {
      firstName: { required, alpha },
      secondName: { required, alpha },
      gender: { required }
    };

    const v$: object = useVuelidate(rules, info);

    return { info, v$ };
  },

  data() {
    return {
      isEmployed: null,
      isStudy: null,
      img: null
    };
  },

  mounted() {
    this.setCurrentInformation();
  },

  methods: {
    ...mapActions(["setUserInfo"]),

    submitForm(): void {
      this.v$.$touch();
      if (!this.v$.$error) {
        this.setUserInfo(this.info);
        this.$emit("changeIsEditMode");
      }
    },

    setCurrentInformation() {
      Object.entries(this.information).forEach(field => {
        this.info[field[0]] = field[1];
      });
    }
  },

  props: ["information"]
});
</script>

<style scoped>
.validate-error {
  border: 1px solid red;
}
</style>
