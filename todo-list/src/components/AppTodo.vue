<template>
  <div class="card mr-3 mb-3" style="width: 18rem;">
    <div class="card-body" v-if="!isEditing">
      <h5 class="card-title">
        {{ todo.title }}
      </h5>
      <p class="card-text">
        {{ todo.description }}
      </p>
      <div class='d-flex justify-content-end' >
        <span class="edit mr-2" @click="showForm">
          <font-awesome-icon icon="edit" />
        </span>
        <span class="trash" @click="deleteTodo(todo)">
         <font-awesome-icon icon="trash" />
       </span>
      </div>
    </div>
    <div class="card-body" v-else>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Название задачи</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="title">
      </div>
      <div class="mb-3">
        <label for="floatingTextarea2">Описание задачи</label>
        <textarea class="form-control" id="floatingTextarea2" v-model="description" style="height: 100px"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="updateForm(todo)">Подтвердить</button>
    </div>
    <button type="button" class="btn btn-outline-success mb-2" v-if="!isEditing && todo.completed" disabled style="width: 80%; margin: 0 auto">Выполнено</button>
    <button type="button" class="btn btn-outline-danger mb-2" @click="completeTodo(todo)" v-if="!isEditing && !todo.completed" style="width: 80%; margin: 0 auto">В ожидании</button>
  </div>

</template>

<script>

export default {
  emits: ['complete-todo', 'delete-todo', 'update-todo'],
  props: ['todo'],
  data() {
    return {
      isEditing: false,
      title: '',
      description: ''
    }
  },
  methods: {
    completeTodo(todo) {
      this.$emit('complete-todo', todo.id);
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo.id);
    },
    showForm() {
      this.isEditing = true
    },
    updateForm(todo) {
      if (this.title.length > 0 && this.description.length > 0) {
        const nameTitle = this.title
        const todoDescription = this.description

        this.$emit('update-todo', todo.id, {
          title: nameTitle,
          description: todoDescription
        });

        this.isEditing = false
      }
    }
  }
}
</script>

<style scoped>
  .edit,
  .trash {
    cursor: pointer;
  }
</style>
