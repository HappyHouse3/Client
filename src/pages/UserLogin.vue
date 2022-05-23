<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <login-form data-background-color="green"> </login-form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../pages/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>
