<template>
  <div>
    <div>Catch-all</div>

    <div>Count: {{ counter }}</div>

    <button @click="handleClick">Decrement</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Catch-all',

  setup() {
    const counter = ref(0);
    const handleClick = () => {
      counter.value -= 1;
    }

    return {
      counter,
      handleClick
    };
  }
}
</script>