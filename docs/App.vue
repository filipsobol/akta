<template>
  <div class="w-full">
    <nav>
      <router-link to="/">Docs</router-link> | 
      <router-link to="/configuration">Configuration</router-link> |
      <router-link to="/routing">Routing</router-link>
    </nav>

    <div class="container mx-auto prose lg:prose-lg prose-a:text-red-600">
      <router-view />
    </div>
  </div>
</template>
