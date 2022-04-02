<template>
  <div class="w-full">
    <nav>
      <router-link to="/">Docs</router-link> | 
      <router-link to="/configuration">Configuration</router-link> |
      <router-link to="/routing">Routing</router-link>
    </nav>

    <div class="container mx-auto prose prose-a:text-red-600 p-2 md:max-w-[38rem] lg:max-w-[48rem]">
      <router-view />
    </div>
  </div>
</template>
