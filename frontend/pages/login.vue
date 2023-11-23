
<template>
    <div class="col-6 position-absolute top-50 start-50 translate-middle bg-light p-4 rounded border border-1">
      <form @submit.prevent="onSubmit">

      <div class="mb-3">
        <label for="inputEmail" class="form-label">Email address</label>
        <input
          v-model="eValue"
          type="email"
          class="form-control"
          :class="{ invalid: eError }"
          id="inputEmail"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
        <small class="helper-text" :class="{ invalid: eError }">{{
          eError
        }}</small>
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input
          v-model="pValue"
          type="password"
          class="form-control"
          :class="{ invalid: pError }"
          id="inputPassword"
        />
        <small class="helper-text" :class="{ invalid: pError }">{{
          pError
        }}</small>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <p class="mt-3">Нет аккаунта? <NuxtLink to="/register" >Зарегестрируйся</NuxtLink> </p>
  </div>
</template>


<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useaAuthStore } from '../stores/authStore'


definePageMeta({
  layout: "the-empty",
  auth : false
});

const authStore = useaAuthStore()
const MIN_LENGHT_PASS = 6;
  const { isSubmitting, handleSubmit } = useForm();

  const {
    value: eValue,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField(
    "inputEmail",
    yup.string().trim().required("Введите email").email("Введите email")
  );


  const {
    value: pValue,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    "inputPassword",
    yup
      .string()
      .trim()
      .required("Введите пароль")
      .min(
        MIN_LENGHT_PASS,
        `Пароль не должен быть меньше ${MIN_LENGHT_PASS} символов.`
      )
  );

  const onSubmit = handleSubmit(async (val, { resetForm }) => {
    try {
      // console.log(val);
      authStore.login({
        email : val.inputEmail, 
        password : val.inputPassword,
      })
      resetForm();
    } catch (error) {
      /* empty */
    }
  });
</script>

<script>
export default {
  name: 'Login-form',
}
</script>

<style scoped>
.invalid {
  color: #f44336;
}
</style>