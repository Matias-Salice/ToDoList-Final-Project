<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
onMounted(()=>{
  console.log(userStore.user.user_metadata.first_name);
});


</script>

<template>
  <h2>Hola</h2>
  <h2 v-if="userStore.user">Bienvenido: {{ userStore.user.user_metadata.first_name }}</h2>
  
</template>

<style>
</style>
