<template>
 <div class="container d-flex justify-content-center flex-wrap">
   <app-todo
       v-for="todo in todos"
       :key="todo.id"
       :todo.sync="todo"
       @delete-todo="deleteTodo"
       @complete-todo="completeTodo"
       @update-todo="updateForm"
   ></app-todo>

 </div>
</template>

<script>
import axios from "axios";
import sweetalert from 'sweetalert';
import AppTodo from './AppTodo'

export default {
  emits: ['delete-todo-app', 'update-todo-app', 'complete-todo-app'],
  props: ['todos'],
  components: {
    AppTodo
  },
  methods: {
    async deleteTodo(id) {
      try {
        await sweetalert({
          title: 'Вы уверены?',
          text: 'Эта задача будет навсегда удалена!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Да, удаляем!',
          closeOnConfirm: false,
        })
        await axios.delete(`https://vue-todo-list-ba64d-default-rtdb.firebaseio.com/todos/${id}.json`)
        this.$emit('delete-todo-app', id)
        await sweetalert('Удалено!', 'Ваша задача была удалена!', 'success');

      } catch (e) {
        console.log(e.message)
      }
    },
    async completeTodo(id) {
      try {
        const data = { completed: true }
        await axios.patch(`https://vue-todo-list-ba64d-default-rtdb.firebaseio.com/todos/${id}.json`, data)
        this.$emit('complete-todo-app', id, data)
        await sweetalert('Успех!', 'Задача выполнена!', 'success');

      } catch (e) {
        console.log(e.message)
      }
    },
    async updateForm(id, data) {
      try {
        await axios.patch(`https://vue-todo-list-ba64d-default-rtdb.firebaseio.com/todos/${id}.json`, data)
        this.$emit('update-todo-app', id, data)
        await sweetalert('Успех!', 'Задача отредактирована!', 'success');

      } catch (e) {
        console.log(e.message)
      }
    }
  },
}
</script>

<style scoped>

</style>
