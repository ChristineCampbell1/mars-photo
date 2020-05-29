<template>
  <div class="birthday">
    <div class="form-container" v-show="showForm">
      <h1>Mars Birthday Surprise!</h1>
      <p>Happy Birthday from Curiosity, a Rover on Mars! Enter your Birth Month and Birth Day and see how Curiosity celebrated your birthday in 2015!</p>
      <form v-on:submit.prevent="findWords">
        <p>
          Enter your birth month
          <input type="number" id="month" min="1" max="12" v-model="month" /> and birth day
          <input type="number" id="day" min="1" max="31" v-model="day" />
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
      let birthday="2019-" + this.month.padStart(2, '0') + "-" + this.day.padStart(2, '0');
      console.log (birthday)
      axios
        .get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
          {
            params: {
              earth_date: birthday,
              api_key:"7xZ66BpWSazfGipnUVukc2faSCCuI5C4Y0225tzj"
            }
          }
        )
        .then(response => {
          this.results = response.data;
          console.log (this.results);
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
