<script setup>
  defineProps({
    msg: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h2>Trouvez la meilleure place avant même de partir !</h2>
  </div>
</template>

<style lang="scss" scoped>
.greetings {
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-between;  

  h2 {
    font-size: 6vw;
    font-weight: bold;
  }
}

</style>