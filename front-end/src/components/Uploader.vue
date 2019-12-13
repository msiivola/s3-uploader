<template lang="html">
  <div id="uploader">
    <h1>Upload file to S3</h1>
    <div class="form">
      <div class="select">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
      </div>
      <button id="submit" v-on:click="submitFile()">Submit</button>
    </div>
    <p class="upload-status">{{ statusMsg }}</p>

    <!-- <form @submit="upload">
      <input type="file" name="userFile" />
      <br /><br />
      <input id="submit" type="submit" value="Upload" name="submit">
    </form> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Uploader",
  data() {
    return {
      userFile: '',
      statusMsg: ""
    }
  },
  methods: {
    // upload(e) {
    //   e.preventDefault();
    // },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      this.statusMsg = "Uploading ... "
      // Implement a FormData object, supported by modern browsers
      let formData = new FormData();
      // Append the file to FormData.
      // What we are doing is essentially building a key-value pair to submit to the server like a standard POST request:
      formData.append('userFile', this.file);

      var self = this;
      // Post data using axios
      axios.post('http://localhost:8080/api/upload',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(res) {
          console.log('Response:', res.status);
          if (res.status == 200) {
            self.statusMsg = "Upload successful!"
          } else {
            self.statusMsg = "Upload failed"
          }
      })
      .catch(function(e) {
          console.log(e);
      });
    }
  }
}
</script>

<style lang="css" scoped>
.form .select {
  display: block;
  margin: 30px 0;
}
#uploader {
  background: white;
  padding: 20px;
  margin-bottom:10px;
  border: 1px solid #ccc;
}
#submit {
  width: 80%;
  height:30px;
}
.upload-status {
  /* color: green; */
  font-size:12px;
  margin:20px;
}
</style>
