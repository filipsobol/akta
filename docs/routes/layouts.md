# Layouts

If you look at the design of this website and switch between different pages, you'll notice that many elements of it don't change. These elements below to what's called a layout, which is a part of the website that is shared between multiple pages.

This is a common pattern for a majority of websites, and Akta provides a mechanism to make working with layouts easy.

## Layout mechanism

The layout mechanism is based on two kinds of components:

* `__layout`,
* `__layout.nested`.

:::warning Two underscores
Note that both components are prefixed by two underscores.
:::

Layout components affect all components (routes) registered in the same and nested folders.

### `__layout` component

Let's see how the `__layout` components work with the following structure:

```text
routes/
├─ company/
│  ├─ about-us.vue
├─ __layout.vue
├─ home.vue
```

Because the `__layout.vue` component is in the root of the `routes` folder, it will affect all routes in the application. In the case of the example above, it will be used for both `/home` and `/company/about-us` routes.

If you move this component into the `company` folder, it will only affect the `/company/about-us` route, but not the `/home`.

If you create two `__layout.vue` components, one in the root and another in the `company` folder, the former one would be used for the `/home` route, and the latter for the `company/about-us`.

### `__layout.nested` files

As described in the previous section, you can use multiple `__layout` components, but each of them will override the other. If you instead want to nest the layout, you can use the `__layout.nested` component.

Let's see how the `__layout.nested` components work with the following structure:

```text
routes/
├─ company/
│  ├─ __layout.nested.vue
│  ├─ about-us.vue
├─ __layout.vue
├─ home.vue
```

Because the `__layout.vue` component is in the root of the `routes` folder, it will affect all routes in the application. However, because there is a `__layout.nested` component inside the `company` folder, the `/company/about-us` will additionally be wrapped in the `__layout.nested` component.

## Creating a layout component

Layout components are regular Vue.js components with one distinction - they must contain the `<router-view />` component where the nested layouts or pages should be placed. Otherwise, it will be the last displayed component.

```vue
<template>
  <div>
    <header>
      <!-- Page header and navigation -->
    </header>

    <router-view /> <!-- Nested layouts and pages will be displayed here -->

    <footer>
      <!-- Page footer -->
    </footer>
  </div>
</template>
```
