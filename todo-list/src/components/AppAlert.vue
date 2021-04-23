<template>
  <div class="alert" v-if="alert" :class="alert.type" role="alert">
    <h4 class="alert-heading">{{ alert.title }}</h4>
    <p>{{ alert.text }}</p>
    <hr>
    <button class="btn" :class="alert.type" @click="$emit('close')">Закрыть</button>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: ['alert']
}
</script>

<style scoped>

</style>
