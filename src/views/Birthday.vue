<template>
  <div class="birthday">
    <div class="form-container" v-show="showForm">
      <h1>Mars Birthday Surprise!</h1>
      <p>Happy Birthday from Curiosity on Mars! Enter your Birth Month and Birth Day and see how Curiosity celebrated your birthday in 2015!</p>
      <form v-on:submit.prevent="findWords">
        <p>
          Enter your birth month (number)
          <input type="number" v-model="month" /> and birth day (number)
          <input type="number" v-model="day" />
          <button type="submit">Submit</button>
        </p>
      </form>
      <ul v-if="results && results.length > 0" class="results">
        <li v-for="item of results" :key="item">
          <p>
            <strong>{{item.word}}</strong>
          </p>
          <p>{{item.score}}</p>
        </li>
      </ul>

      <ul v-if="errors && errors.length > 0" class="errors">
        <li v-for="error of errors" :key="error">{{error.message}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Birthday",
  data() {
    return {
      month: "",
      day: "",
      showForm: true,
      showError: false
    };
  },
  methods: {
    findWords: function() {
      axios
        .get(
          " https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY",
          {
            params: {
              earth_date: this.month
            }
          }
        )
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  border: 1px solid #aa0000;
  padding: 1rem;
  color: #aa0000;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
