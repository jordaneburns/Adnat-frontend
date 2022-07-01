<script>
import axios from "axios";

export default {
  data: function () {
    return {
      organisations: [],
      newOrganisationParams: {},
      editOrganisationParams: {},
      joinOrganisationParams: {},
    };
  },
  created: function () {
    this.indexOrganisations();
  },
  methods: {
    joinOrganisation: function (organisation) {
      console.log(organisation);
      this.joinOrganisationParams = {
        name: organisation.name,
        hourly_rate: organisation.hourly_rate,
      };
      axios
        .post("/organisations", this.joinOrganisationParams)
        .then((response) => {
          console.log("characters create", response);
          // this.newCharacterParams.push(users);
          this.$router.push("/UserOrganisation/:id");
        })
        .catch((error) => {
          console.log("characters create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    indexOrganisations: function () {
      axios.get("/organisations").then((response) => {
        console.log("organisations index", response);
        this.organisations = response.data;
      });
    },
    createOrganisation: function () {
      axios
        .post("/organisations", this.newOrganisationParams)
        .then((response) => {
          console.log("organisations create", response);
          this.organisations.push(response.data);
          this.newOrganisationParams = {};
        })
        .catch((error) => {
          console.log("organisations create error", error.response);
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Organisations</h1>
    <div v-for="organisation in organisations" v-bind:key="organisation.id">
      <p>{{ organisation.name }}</p>
      <router-link v-bind:to="`/editOrganisation/${organisation.id}`">Edit</router-link>
      <button v-on:click="joinOrganisation(organisations)">Join</button>
    </div>
    <div>
      <h1>Create Organisation</h1>
      <div>
        Name:
        <input type="text" v-model="newOrganisationParams.name" />
      </div>
      <div>
        Hourly Rate: $
        <input type="text" v-model="newOrganisationParams.hourly_rate" />
      </div>

      <button v-on:click="createOrganisation()">Create Organisation</button>
      <a href="/logout">Logout</a>
      <form v-on:submit.prevent="joinOrganisation()"></form>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style></style>
