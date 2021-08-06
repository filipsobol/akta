<template>
  <div>
    <p>123</p>
    <p>{{ test }}</p>
    <p>456</p>
    <p>{{ test }}</p>
    <p>789</p>
    <p>{{ test }}</p>
    <p>123</p>
    <p>{{ test }}</p>
    <p>456</p>
    <p>{{ test }}</p>
    <p>789</p>
    <p>{{ test }}</p>
  </div>
</template>

<script>

export default {
  props: {
    test: {
      type: String
    }
  }
}
</script>

