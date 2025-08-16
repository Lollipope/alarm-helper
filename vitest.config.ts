import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  {},
  defineConfig({
    resolve: viteConfig.resolve,
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: ['lib/**/*.{ts,js}'],
        exclude: [
          'lib/**/index.ts',
          'lib/**/types.ts',
          'lib/**/defaults.ts',
          'lib/**/components.ts',
          'lib/**/env.ts',
          'components.ts',
          'lib/assets/**',
        ],
      },
    },
  }),
)
