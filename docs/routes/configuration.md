# Configuration

The Akta application is controlled by the `akta.config.ts` file located at the root of the project.

It exports a `createAktaApp` function which creates a new Vue.js instance, together with `vue-router` and some other plugins. You can change how the application behaves using the configuration passed to that function. Here are the available options.

## `App`

This is the root Vue.js component, from which the whole application is created. By default, we use the `App.vue` component located at the root of the project, but you can move it to wherever you like and updated the `import` statement in the `akta.config.ts` file.

Because this is a root component, whatever you add to it, will be visible on every page. It's a great place to add components that are used on every page, such as header or footer.

The `<router-view />` component inside of it displays the content of the current page, based on the current URL. You should not remove it, but place it whether you want the page content to be.

**Example:**

```typescript
import App from './App.vue';

export default createAktaApp({
  App
});
```

## `head`

This object controls the `<head>` tag of your application, such as the `title`, `meta`, `style`, or `script` tags. Whatever you add to it, will apply to all pages.

See the [`@vueuse/head`](https://github.com/vueuse/head#api) library to see the available options.

**Example:**

```typescript
export default createAktaApp({
  head: {
    title: 'Akta - performant Vue framework'
  }
});
```

## `router`

This object allows you to control the [`vue-router` options](https://router.vuejs.org/api/#routeroptions) with two exceptions:

* `history` will always use the `createWebHistory()` in the browser and `createMemoryHistory()` during Server Side Rendering,
* `routes` will automatically be created based on the file tree in the `routes` directory of your project.

**Example:**

```typescript
export default createAktaApp({
  router: {
    linkActiveClass: 'custom-active-link-class',

    scrollBehavior(to, from, savedPosition) {
      /**
       * On page navigation, scroll to `savedPosition`
       * or to the very top of the page
       */
      return savedPosition || { top: 0 };
    },
  }
});
```
