<template>
  <div>
    <div>Index</div>

    <div>Count: {{ counter }}</div>

    <div>
      <p>Image:</p>
      <img :src="image">
    </div>

    <button @click="handleClick">Increment</button>
  </div>
</template>

<script>
import image from '../assets/logo.png';
import { ref } from 'vue';

export default {
  name: 'Index',

  setup() {
    const counter = ref(0);
    const handleClick = () => {
      counter.value += 1;
    }

    return {
      image,
      counter,
      handleClick
    };
  }
}
</script>