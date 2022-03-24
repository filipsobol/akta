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

<script lang="ts">
import image from '../assets/logo.png';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',

  setup() {'default';

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
});
</script>
