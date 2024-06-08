<script setup>
import { useUserStore } from "../stores/user";
import { useTaskStore} from "../stores/task"
import { ref } from "vue";

const userStore = useUserStore();
const taskStore = useTaskStore();

const email = ref("");
const password = ref("");
</script>

<template>
  <h1>Home</h1>
  <h2 v-if="userStore.user">Current User: {{ userStore.user.user.email }}</h2>

  <input placeholder="Write your email" v-model="email" />
  <input type="password" placeholder="Write your password" v-model="password" />
  <button @click="userStore.createNewUser(email, password)">
    Create new User
  </button>

  <br><br>
  <button @click="taskStore.fetchTasks()">fetch tasks</button>
  <ul>
    <li v-for="task in taskStore.tasks">
      {{ task.title }}
    </li>
  </ul>
</template>

<style></style>