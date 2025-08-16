import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteConfig from './vite.config'

export default mergeConfig(
  {},
  defineConfig({
    ssr: {
      noExternal: [/element-plus/],
    },
    resolve: viteConfig.resolve,
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'vitest'],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
          // filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        vueTemplate: true,
        // 配置文件生成位置(false:关闭自动生成)
        dts: false,
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['lib/views', 'lib/comp'],
        // // 配置文件位置 (false:关闭自动生成)
        // dts: 'types/components.d.ts',
        dts: false,
      }),
    ],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: ['lib/**/*.ts'],
        exclude: [
          'lib/**/index.ts',
          'lib/**/types.ts',
          'lib/**/defaults.ts',
          'lib/**/components.ts',
          'lib/**/env.ts',
          'lib/assets/**',
          'lib/comp/**/*.ts',
          'lib/views/**/*.ts',
        ],
      },
    },
  }),
)
