// stores/user.js
import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref(null);
  const errorMessage = ref("");

  const errorMessages = {
    AuthWeakPasswordError: "Contraseña incorrecta, debe tener mínimo 6 dígitos",
    AuthInvalidEmailError: "Formato de email incorrecto",
    default: "Ocurrió un error. Por favor, inténtelo de nuevo.",
  };

  const createNewUser = async (email, password, username) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: username,
          },
        },
      });

      if (error) {
        if (error.message && error.message.includes("invalid format")) {
          errorMessage.value = errorMessages["AuthInvalidEmailError"];
        } else {
          const errorKey = error.name || "default";
          errorMessage.value =
            errorMessages[errorKey] || errorMessages["default"];
        }
        console.log("Error details:", error);
      } else {
        user.value = data.user;
        errorMessage.value = "";
      }
    } catch (error) {
      errorMessage.value = "Ocurrió un error. Por favor, inténtelo de nuevo.";
      console.error("Unexpected error:", error);
    }
  };

  return { user, errorMessage, createNewUser };
});
