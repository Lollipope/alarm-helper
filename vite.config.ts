import { fileURLToPath, URL } from 'node:url'
// import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
import del from 'rollup-plugin-delete'
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false,
        // filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      vueTemplate: true,
      // 配置文件生成位置(false:关闭自动生成)
      dts: false,
      // dts: 'types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      // 指定自定义组件位置(默认:src/components)
      dirs: ['lib/views', 'lib/comp'],
      // // 配置文件位置 (false:关闭自动生成)
      // dts: 'types/components.d.ts',
      dts: false,
    }),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['lib/**/*.ts', 'lib/**/*.vue'],
      // // 输出目录
      outDir: ['types'],
      // 将动态引入转换为静态（例如：`import('vue').DefineComponent` 转换为 `import { DefineComponent } from 'vue'`）
      // staticImport: true,
      // 将所有的类型合并到一个文件中
      // rollupTypes: true,
    }),
    del({
      targets: [
        'types/*',
        // 排除以下自定义文件
        '!types/global.d.ts',
        '!types/components.d.ts',
        '!types/auto-imports.d.ts',
        '!types/aliplayer.d.ts',
      ],
      hook: 'buildStart',
    }),
  ],
  resolve: {
    alias: {
      '@ah': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@pkg/styles/common.scss" as *;`,
      },
    },
  },
  build: {
    lib: {
      entry: ['lib/index.ts'],
      name: 'AlarmHelper',
      fileName: `alarm-helper`,
      cssFileName: 'alarm-helper',
      formats: ['es', 'cjs', 'iife'],
    },
    cssCodeSplit: true, // 确保样式被提取成单独文件
    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: ['vue', 'element-plus', '@vueuse/core', 'qs', 'swiper', 'axios', 'dayjs'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖
        // 提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@vueuse/core': 'VueUse',
          qs: 'Qs',
          axios: 'axios',
          dayjs: 'dayjs',
        },
        exports: 'named',
      },
    },
  },

  // 开发环境配置
  base: './',
  server: {
    // 允许IP访问
    host: '0.0.0.0',
    // 应用端口 (默认:3000)
    port: 5173,
    // 运行是否自动打开浏览器
    open: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        // target: "http://128.23.13.125:18089", //双平后端
        target: 'http://172.17.0.88:18089', //开发环境
        // target: "http://172.17.0.86:18089", // 测试环境后端
        rewrite: (path) => path.replace(new RegExp('^/api'), ''),
        xfwd: true,
      },
    },
  },
})
