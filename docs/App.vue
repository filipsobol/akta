<template>
  <div class="w-full">
    <nav>
      <router-link to="/">Docs</router-link> | 
      <router-link to="/configuration">Configuration</router-link> |
      <router-link to="/routing">Routing</router-link> |
      <router-link to="/layouts">Layouts</router-link>
    </nav>

    <div class="container mx-auto prose prose-a:decoration-red-200 prose-a:decoration-2 prose-a:underline-offset-[5px] prose-h2:border-t prose-h2:border-gray-200 prose-h2:pt-8 p-2 pb-20 md:max-w-[38rem] lg:max-w-[48rem]">
      <router-view />
    </div>
  </div>
</template>
