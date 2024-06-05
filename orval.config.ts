import { defineConfig } from 'orval'

export default defineConfig({
  petstore: {
    input: 'https://backend-cheatsgame.iran.liara.run/schema/',
    output: {
      target: 'api/index.ts',
      override: {
        query: {
          useInfinite: true,
          useInfiniteQueryParam: 'nextId'
        },
        mutator: {
          path: 'api/mutator.ts',
          name: 'customInstance'
        }
      }
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  }
})
