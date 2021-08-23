<template>
  <div>
    <div>About directory</div>

    <div>Count: {{ counter }}</div>

    <button @click="handleClick">Increment</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Index',

  setup() {
    const counter = ref(0);
    const handleClick = () => {
      counter.value += 1;
    }

    return {
      counter,
      handleClick
    };
  }
}
</script>