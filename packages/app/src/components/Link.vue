<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { defineComponent, computed } from 'vue';
import { isExternal } from '../helpers/isExternal';

export default defineComponent({
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    const isExternalLink = computed(() => isExternal(props.to));

    return {
      isExternalLink
    };
  }
});
</script>
