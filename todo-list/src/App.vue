<template>
  <div id="app">
    <app-alert :alert="alert" @close="alert = null"></app-alert>
    <h2 style="text-align: center">ToDo List</h2>

    <app-create-todo
        @create-todo="createTodo"
    ></app-create-todo>

    <app-loader v-if="loading"></app-loader>
    <app-todo-list
        v-else
        :todos="todos"
        @delete-todo-app="deleteTodoApp"
        @complete-todo-app="completeTodoApp"
        @update-todo-app="updateTodoApp"
    ></app-todo-list>
    <div class="container" style="text-align: center" v-if="todos.length === 0 && !loading">
      <p>Задач нету. Создайте парочку!</p>
    </div>
    <div class="card" style="width: 83%; margin: 0 auto">
      <p class="tasks ml-2 mt-2">Выполненные задачи: {{todos.filter(todo => {return todo.completed === true}).length}}</p>
      <p class="tasks ml-2">Задачи, которые находятся в процессе выполнения: {{todos.filter(todo => {return todo.completed === false}).length}}</p>
    </div>
  </div>
</template>

<script>

import sweetalert from 'sweetalert';
import axios from 'axios'
import AppTodoList from './components/AppTodoList'
import AppCreateTodo from './components/AppCreateTodo'
import AppAlert from "./components/AppAlert"
import AppLoader from "./components/AppLoader"

export default {
  components: {
    AppTodoList,
    AppCreateTodo,
    AppAlert,
    AppLoader
  },
  data() {
    return {
      todos: [],
      alert: null,
      loading: false
    };
  },
  mounted() {
    this.loadTodos()
  },
  methods: {
    async createTodo(newTodo) {
      const response = await fetch('https://vue-todo-list-ba64d-default-rtdb.firebaseio.com/todos.json',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      })

      const fireBaseData = await response.json()

      newTodo.id = fireBaseData.name

      this.todos.push(newTodo);
      await sweetalert('Успех!', 'Задача создана!', 'success');
    },
    deleteTodoApp(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    completeTodoApp(id, data) {
      const todo = this.todos.find(todo => todo.id === id)
      todo.completed = data.completed
    },
    updateTodoApp(id, data) {
      const todo = this.todos.find(todo => todo.id === id)
      todo.title = data.title
      todo.description = data.description
    },
    async loadTodos() {
      try {
        this.loading = true
        const {data} = await axios.get('https://vue-todo-list-ba64d-default-rtdb.firebaseio.com/todos.json')

        if (!data) {
          throw new Error('Список задач в базе данных пуст')
        }

        this.todos = Object.keys(data).map(key => {
          return {
            id: key,
            ...data[key]
          }
        })
        this.loading = false
      } catch (e) {
        this.alert = {
          type: 'alert-danger',
          title: 'Ошибка',
          text: e.message
        }
        this.loading = false
        console.log(e.message)
      }

    }
  }
}
</script>



<style>

</style>
