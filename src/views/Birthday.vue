<template>
  <div class="birthday">
    <div class="form-container" v-show="showForm">
      <h1>Mars Birthday Surprise!</h1>
      <p>Happy Birthday from Curiosity, a Rover on Mars! Enter your Birth Month and Birth Day and see how Curiosity celebrated your birthday!</p>
      <form v-on:submit.prevent="findWords">
        <p>
          Enter your birth month
          <input type="number" id="month" min="1" max="12" v-model="month" /> and birth day
          <input type="number" id="day" min="1" max="31" v-model="day" />
          <button type="submit">Submit</button>
        </p>
      </form>
      <spinner v-if="showSpinner"></spinner>
      <ul v-if="results && results.photos.length > 0" class="results">
        <li>
          
          <img
          v-bind:src="results.photos[0].img_src"
          v-bind:alt="'mars'"
          class="poster-image"
        />
        <p>
            <strong>{{results.photos[0].img_src}}</strong>
          </p>
        </li>
      </ul>
<p v-if="results && results.photos.length == 0" class="results">
  <br>
  Sorry, Curioisity took the day off today. Happy Birthday anyway!
</p>
      <ul v-if="errors && errors.length > 0" class="errors">
        <li v-for="error of errors" :key="error">{{error.message}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cubespinner from '@/views/Cubespinner';

export default {
  name: "Birthday",
  components: {
    spinner: Cubespinner
  },
  data() {
    return {
      month: "",
      day: "",
      showForm: true,
      showError: false,
      results: null,
      errors: null
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
          console.log (this.results.photos[0]);
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
