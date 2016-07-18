<template>
  <div id="todo">
    <h1>Vue Todo Demo !</h1>
    <input style="display:block; margin:auto;" v-model="newTodo"
           @keyup.enter="addTodo" placeholder="press enter add new item xxxx !">
    <ul>
      <li v-for="todo in todos">
        <span>{{ todo.text }}</span>
        <button @click="removeTodo($index)">X</button>
      </li>
    </ul>
    <validator name="validation1">
      <form novalidate>
        <div class="username-field">
          <label for="username">username:</label>
          <input id="username" type="text" v-validate:username="['required']">
        </div>
        <div class="comment-field">
          <label for="comment">comment:</label>
          <input id="comment" type="text" v-validate:comment="{ maxlength: 256 }">
        </div>
        <div class="errors">
          <p v-if="$validation1.username.required">Required your name.</p>
          <p v-if="$validation1.comment.maxlength">Your comment is too long.</p>
        </div>
        <input type="submit" value="send" v-if="$validation1.valid">
      </form>
    </validator>
  </div>
</template>

<script>
  export default{
    name: 'TodoView',
    data () {
      return {
        newTodo: '',
        todos: [
          { text: 'Add todos' }
        ],
        fileds: [{
          id: '',
          name: '',
          validate: ['require']
        }]
      }
    },
    methods: {
      addTodo: function () {
        var text = this.newTodo.trim()
        if (text) {
          this.todos.push({ text: text })
          this.newTodo = ''
        }
      },
      removeTodo: function (index) {
        this.todos.splice(index, 1)
      }
    }
  }
</script>
