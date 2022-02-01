<template>
  <div>
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム</label>
    <input type="text" name="" id="name" v-model="name">
    <br>
    <label for="comment">コメント</label>
    <textarea name="" id="comment" v-model="comment"></textarea>
    <br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <br>
    <h2>掲示板</h2>
    <div v-for="post in posts" :key="post.name">
      <div>名前：{{ post.fields.name.stringValue }}</div>
      <div>コメント：{{ post.fields.comment.stringValue }}</div>
    </div>
  </div>
</template>

<script>
import axios from './axios-auth';

export default {
  data() {
    return {
      name: '',
      comment: '',
      posts: []
    }
  },
  created() {
    axios.get(
      '/comments'
    )
    .then(response => {
      this.posts = response.data.documents
    })
    .catch(error => { error });
  },
  methods: {
    createComment() {
      axios.post(
        '/comments',
        {
          fields: {
            name: {
              stringValue: this.name
            },
            comment: {
              stringValue: this.comment
            }
          }
        }
      );
      this.name = '';
      this.comment = '';
    }
  }
}
</script>

<style scoped>
 label, input, textarea {
   display: block;
 }
</style>
