<template>
  <div class="signed">
    <h1>Signed URL testing</h1>
    <a href="https://parks-avid.s3.ca-central-1.amazonaws.com/fromApp/TODO.txt" target="_blank">TODO.txt (unsigned)</a>
    <button type="button" name="button" @click="getUrl()">Create a new signed URL</button>
    <br/>
    <a id="signed-link" v-bind:href="url" target="_blank" v-bind:class="{ show: generated }">Signed link to TODO.txt - expires in 60 s</a>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'SignedUrl',
  data() {
    return {
      url: "",
      generated: false,
      api_url: process.env.API_URL
    }
  },
  methods: {
    getUrl() {
      console.log('get URL!');
      var self = this;
      axios.get(this.api_url + '/presigned')
        .then(function(res) {
          self.url = res.data.url;
          self.generated = true;
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signed {
  background: white;
  padding: 30px;
  border: 1px solid #ccc;
}
#signed-link {
  display:none
}
#signed-link.show {
  display: block;
}
a {
  display: block;
  margin: 20px;
  color: #42b983;
  font-size:12px;
}
</style>
