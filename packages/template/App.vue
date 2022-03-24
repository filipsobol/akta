<template>
  <div class="inter">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Catch-all</router-link> |
    <router-link to="/product-123">Product</router-link> |
    <router-link to="/settings">Settings</router-link> |
    <router-link to="/settings/profile">Profile</router-link> |
    <router-link to="/about/us">About us</router-link>
    
    <router-view />
  </div>
</template>
