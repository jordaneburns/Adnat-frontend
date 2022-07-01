<script>
import axios from "axios";
export default {
  data: function () {
    return {
      shifts: [],
      organisation: {},
      ShiftOrganisationParams: {},
    };
  },
  created: function () {
    axios.get("/shifts/" + this.$route.params.id).then((response) => {
      console.log("organisations show", response);
      this.ShiftOrganisationParams = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="shifts-index">
    <h1>All Shifts</h1>
    <div v-for="shift in shifts" v-bind:key="shift.id">
      <h2>{{ shift }}</h2>

      <p>{{ organisation.name }}</p>
    </div>
  </div>
</template>
