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
        ]
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
