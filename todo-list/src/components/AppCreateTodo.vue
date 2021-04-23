<template>
  <div class="container" style="">
    <div class="card-body d-flex justify-content-center" v-if="!isCreating">
      <button type="submit" @click="openForm">
        <font-awesome-icon icon="plus" />
      </button>
    </div>

    <div class="card-body" v-if="isCreating">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">Название задачи</label>
        <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Напишите задачу" v-model="titleText">
      </div>
      <div class="mb-3">
        <label for="floatingTextarea">Описание задачи</label>
        <textarea class="form-control" placeholder="Начните описывать задачу" id="floatingTextarea" v-model="descriptionText" style="height: 100px"></textarea>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success mr-3" @click="sendForm">Добавить</button>
        <button type="submit" class="btn btn-danger" @click="closeForm">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['create-todo'],
  data() {
    return {
      titleText: '',
      descriptionText: '',
      isCreating: false
    }
  },
  methods: {
    openForm() {
      this.isCreating = true
    },
    closeForm() {
      this.isCreating = false
    },
    sendForm() {
      if (this.titleText.length > 0 && this.descriptionText.length > 0) {
        const title = this.titleText
        const description = this.descriptionText
        this.$emit('create-todo', {
          title,
          description,
          completed: false,
        })
        this.titleText = ''
        this.descriptionText = ''
        this.isCreating = false
      }
    }
  }
}
</script>

<style scoped>

</style>
