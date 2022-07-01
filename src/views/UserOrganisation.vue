<script>
import axios from "axios";

export default {
  data: function () {
    return {
      // users: [],
      currentUser: null,
      currentUserOrganisations: [],
      editOrganisationParams: {},
      organisations: [],
      shifts: [],
      newShiftParams: {},
      errors: [],
    };
  },
  created: function () {
    // this.indexUsers();
    this.showUser("me");
    this.indexOrganisations();
    this.indexShifts();
  },
  methods: {
    // indexUsers: function () {
    //   axios.get("/users").then((response) => {
    //     console.log("users index", response);
    //     this.users = response.data;
    //   });
    // },
    createShift: function () {
      axios
        .post("/shifts", this.newshiftParams)
        .then((response) => {
          console.log("shifts create", response);
          this.$router.push("/shifts");
        })
        .catch((error) => {
          console.log("photos create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    indexShifts: function () {
      axios.get("/shifts").then((response) => {
        console.log("shifts index", response);
        this.shifts = response.data;
      });
    },
    indexOrganisations: function () {
      axios.get("/organisations").then((response) => {
        console.log("organisations index", response);
        this.organisations = response.data;
      });
    },
    showUser: function (id) {
      axios.get("/users/" + id).then((response) => {
        console.log("Current User", response);
        this.currentUser = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <div v-for="organisation in organisations" v-bind:key="organisation.id"></div>
    <div v-for="shift in shifts" v-bind:key="shift.id"></div>

    <div v-if="currentUser">
      <p>Logged in as {{ currentUser.name }}</p>
      <h2>{{ currentUser.organisation.name }}</h2>
      {{ currentUser.shifts }}
      <router-link v-bind:to="`/editOrganisation/${currentUser.organisation.id}`">Edit</router-link>
    </div>
  </div>
  <!-- <router-link v-bind:to="`/organisationShifts/${currentUser.shifts.id}`">View Shifts</router-link> -->
  <div>
    <h1>New Shift</h1>
    <form v-on:submit.prevent="createShift()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newShiftParams.name" />
      Start:
      <input type="text" v-model="newShiftParams.start" />
      Finish:
      <input type="text" v-model="newShiftParams.finish" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>
