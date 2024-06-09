<script setup>
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const username = ref("");

const createUserAndRedirect = async () => {
  await userStore.createNewUser(email.value, password.value, username.value);
  if (userStore.user) {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <h1>Log</h1>


  <input placeholder="Write your username" v-model="username" />
  <input placeholder="Write your email" v-model="email" />
  <input type="password" placeholder="Write your password" v-model="password" />
  <button @click="createUserAndRedirect">
    Create new User
  </button>

  <div v-if="userStore.errorMessage" style="color: red;">
    {{ userStore.errorMessage }}
  </div>

  <br><br>
  <button @click="taskStore.fetchTasks()">fetch tasks</button>
  <ul>
    <li v-for="task in taskStore.tasks" :key="task.id">
      {{ task.title }}
    </li>
  </ul>
</template>

<style></style>
