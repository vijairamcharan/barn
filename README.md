# Barn

**Barn is like yarn, but with a b.**

Status: works on my machine.

Barn will figure out what package manager is being used in the current project, and defer execution to the right package manager.

This way you won't have to remember what package manager is being used in the current project you are working in.

Instead of running `npm install nanoid` in an npm managed repository, or `yarn add nanoid` in a yarn managed repository, or `pnpm add nanoid` in an pnpm managed repository.

Everywhere, simply run:

```
barn add nanoid
```

Supported package managers:

- pnpm
- yarn
- npm

## Usage

### Create new projects

Example:

```
barn create next-app
```

Note: for now defaults to pnpm. Configuration option coming soon.

### Run package.json scripts

Examples:

```
barn dev
```

```
barn build
```

### Other package manager commands

Examples:

```
barn add nanoid
```

```
barn remove nanoid
```
