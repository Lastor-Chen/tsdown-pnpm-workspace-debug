# tsdown + pnpm workspace for debug

A minimal reproduction for tsdown issue [!544](https://github.com/rolldown/tsdown/issues/544)

## About

System environment:

- OS: macBook darwin arm64
- node: v22.15.1
- pnpm: v10
- tsdown: v0.18.0 (the demo), v0.17.4 (actual project)

pnpm workspace folder structure:

```yaml
apps/
  my-app/ # @apps/my-app
packages/
  lib-a/ # @pkg/lib-a
```

`@pkg/lib-a` is a workspace package provided to `@apps/my-app`.

### Usage

install dependencies

```shell
$ pnpm install
```

build `@pkg/lib-a`

```shell
$ pnpm build:lib
```

build `@apps/my-app`

```shell
$ pnpm build:app
```

### Expected behavior

Expected import `@pkg/lib-a` with submodule path to be bundled after build.

```js
// tsdown config
defineConfig({
  unbundle: false, // expect "workspace:*" to be bundled
})

// source index.ts
import { init } from '@pkg/lib-a/preload'
init()

// build result
function init() {
	return "do init";
}
init();
```

### Actual behavior

It was not bundled.

```js
// tsdown config
defineConfig({
  unbundle: false,
  noExternal: ['@pkg/lib-a'], // doesn't work even if added
})

// source index.ts
import { init } from '@pkg/lib-a/preload'
init()

// build result
import { init } from "@pkg/lib-a/preload";
init();
```

When used a exact name, it was bundled.

```js
// tsdown config
defineConfig({
  unbundle: false,
  noExternal: ['@pkg/lib-a/preload'], // worked
})

// source index.ts
import { init } from '@pkg/lib-a/preload'
init()

// build result
//#region ../../packages/lib-a/dist/preload/utils.js
function init() {
	return "do init";
}
init();
```
