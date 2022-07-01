<script>
import axios from "axios";

export default {
  data: function () {
    return {
      organisation: {},
      editOrganisationParams: {},
      errors: [],
    };
  },

  created: function () {
    axios.get("/organisations/" + this.$route.params.id).then((response) => {
      console.log("Organisations show", response);

      this.organisation = response.data;

      this.editOrganisationParams = this.organisation;
    });
  },

  methods: {
    updateOrganisation: function (organisation) {
      axios

        .patch("/organisations/" + organisation.id, this.editOrganisationParams)

        .then((response) => {
          console.log("organisations update", response);

          this.$router.push("/organisation");
        })

        .catch((error) => {
          console.log("organisations update error", error.response);

          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="organisations-edit">
    <h1>Edit Organisation</h1>

    <form v-on:submit.prevent="updateOrganisation(organisation)">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        Name:

        <input type="text" v-model="editOrganisationParams.name" />
      </div>
      <div>
        Hourly Rate:

        <input type="text" v-model="editOrganisationParams.hourly_rate" />
      </div>

      <input type="submit" value="Update" />
    </form>
  </div>
</template>
