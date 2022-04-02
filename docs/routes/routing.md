# Routing

Akta automatically generates routes based on the content of the `routes` folder. Every file inside of it creates a route, which paths are based on the relative path to that folder and the filename.

// TODO: Note about SSR and client navigation

## Basic example

Let's create `home.vue` and `company/about_us.vue` components inside the `routes` folder like in the example below.

```text
routes/
├─ company/
│  ├─ about_us.vue
├─ home.vue
```

When you start the app, the `home.vue` component becomes a `/home` route. Because the `about_us.vue` component is inside the `company` folder, it becomes a `/company/about_us` route.

However, there are a few exceptions described below, where filenames don't directly correspond to route paths.

## `index` files

If you've been doing web development for some time, you already know that the `index` file has a special meaning. In a nutshell, most web servers will serve it as a "default document" when there is no path or filename specified in the request. Akta uses the same approach.

The simplest way to think about this is that `index` is essentially removed from the route path.

Let's create `index.vue` and `company/index.vue` components inside the `routes` folder like in the example below.

```text
routes/
├─ company/
│  ├─ index.vue
├─ index.vue
```

The `index.vue` becomes a `/` route and becomes the home page of your application. The `company/index.vue` becomes a `/company` route.

## Dynamic routes

Dynamic routes allow you to handle requests where parts of the path are variable.

### Variable segments

If only a single segment is variable, use can use square brackets with the name of that segment inside of it.

The `blog/[slug].vue` file will be served for requests such as `/blog/hello` and `/blog/world`. The variable part of the URL will be passed as a prop to the component, matching the name you provided between the square brackets.

```vue title="blog/[slug].vue"
<template>
  <p>Slug: {{ slug }}</p>
</template>

<script>
export default {
  props: ['slug']
};
</script>
```

You can also use this in folder names or even combine multiple dynamic segments.

The `blog/[year]/[id]-[slug].vue` will match `/blog/2022/1337-performance-tips`, where:

* `year` is `2022`,
* `id` is `1337`,
* `slug` is `performance-tips`.

Again, all three values will be available as props

```vue title="blog/[year]/[id]-[slug].vue"
<template>
  <div>
    <p>Year: {{ year }}</p>
    <p>ID: {{ id }}</p>
    <p>Slug: {{ slug }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'year',
    'id',
    'slug'
  ]
};
</script>
```

### Catch-all

There are cases when you don't know the structure of the URL, but still want a component to handle it. Most popular example is "catch-all" or 404 page, displayed to the user if the they visited the page that doesn't exist.

Catch-all route — same as routes with variable segments — use the square brackets syntax, but additionally, they include three dots before the name of the parameter.

Let's assume a structure like in the example below.

```text
routes/
├─ company/
│  ├─ index.vue
├─ [...params].vue
├─ index.vue
```

In such case, the `index.vue` component becomes a `/` route, `company/index.vue` becomes a `/company` route, but every other route will be handled by the `[...params].vue` component.

The variable part of the URL will be passed as a prop to the component, matching the name you provided between the square brackets.

```vue title="[...params].vue"
<template>
  <p>Params: {{ params }}</p>
</template>

<script>
export default {
  props: ['params']
};
</script>
```

The `params` props is an array of strings, after separating the matching URL by `/`.

## `__layout` files

TODO

## `__layout.nested` files

TODO
