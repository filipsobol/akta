# Routing

```ts twoslash title="test" { 1-3 }
interface IdLabel {id: number, /* some fields */ }
interface NameLabel {name: string, /* other fields */ }
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
// This comment should not be included

// ---cut---
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented"
}

let variable = createLabel("typescript");
//  ^?

// @errors: 2339
variable.includes('123');
```

// TODO: Note about SSR and client navigation

Akta automatically generates routes based on the content of the `routes` folder. Every file inside of it creates a route, which paths are based on the relative path to that folder and the filename.

Let's create `home.vue` and `company/about_us.vue` components inside the `routes` folder as shown in the example below.

```text title="test"
routes/
├─ company/
│  ├─ about_us.vue
├─ home.vue
```

When you start the app, the `home.vue` component becomes a `/home` route. Because the `about_us.vue` component is inside the `company` folder, it becomes a `/company/about_us` route.

However, there are a few exceptions, where filenames don't directly correspond to route paths.

## `index` files

If you've been doing web development for some time, you already know that the `index` file has a special meaning. In a nutshell, most web servers will serve it as a "default document" when there is no path or filename specified in the request. Akta uses the same approach.

The simplest way to think about this is that `index` is essentially removed from the route path.

Let's create `index.vue` and `company/index.vue` components inside the `routes` folder as shown in the example below.

```text
routes/
├─ company/
│  ├─ index.vue
├─ index.vue
```

The `index.vue` becomes a `/` route and becomes the home page of your application. The `company/index.vue` becomes a `/company` route.

## Dynamic routes

Dynamic routes allow you to handle requests with variable paths.

### Single segment

If only a single segment is variable, use can use square brackets with the name of that segment inside of it.

The `blog/[slug].vue` file will be served for requests such as `/blog/hello` and `/blog/world`. The variable part of the URL will be passed as a prop to the component, matching the name you provided between the square brackets.

```vue title="blog/[slug].vue"
<template>
  <p>Slug: {{ slug }}</p> // FIX THIS IN MARKDOWN!!!!!
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

{{ test }}

```vue title="blog/[year]/[id]-[slug].vue"

<template>
  <div>
    <p>Year: {{ year }}</p> // FIX THIS IN MARKDOWN!!!!!
    <p>ID: {{ id }}</p> // FIX THIS IN MARKDOWN!!!!!
    <p>Slug: {{ slug }}</p> // FIX THIS IN MARKDOWN!!!!!
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

[...params]

## `__layout` files

TODO

## `__layout.nested` files

TODO
