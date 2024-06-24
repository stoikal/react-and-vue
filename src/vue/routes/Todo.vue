<script setup>
import { onMounted, ref, computed } from 'vue'
import todoService from '../services/todo'

const todos = ref([])
const doneList = computed(() => todos.value.filter(todo => todo.is_done))
const todoList = computed(() => todos.value.filter(todo => !todo.is_done))

const loadData = async () => {
  const data = await todoService.getAll()
  todos.value = data
}

onMounted(() => loadData())

const toggleTodo = async (todo) => {
  await todoService.setIsDone(todo.id, !todo.is_done)
  loadData()
}

const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)
  const inputValue = formData.get('new-todo')

  if (inputValue) {
    await todoService.create({
      title: inputValue,
      parent: null,
      is_done: false
    })
    form.reset()
    loadData()
  }
}
</script>

<template>
  <div class="px-6">
    <div class='mb-2'>
      <div
        v-for="todo of todoList"
        :key="todo.id"
      >
        <span
          role="button"
          class="cursor-pointer"
          @click="toggleTodo(todo)"
        >
          {{ todo.title }}
        </span>
      </div>
      <div
        v-for="todo of doneList"
        :key="todo.id"
      >
        <span
          role="button"
          class="cursor-pointer"
          @click="toggleTodo(todo)"
        >
          <s>{{ todo.title }}</s>
        </span>
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <input name="new-todo" />
    </form>
  </div>
</template>