import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { shaderCompiler } from '@galacean/engine-shader-compiler/bundler/rollup'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    shaderCompiler({
      precompile: {
        input: 'src/effects/shaders',
        output: 'src/effects/.compiled',
        emitIndex: false,
        emitSources: false,
      },
    }),
    vue(),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{
            name: 'galacean',
            test: /[\\/]node_modules[\\/]@galacean[\\/]/,
            includeDependenciesRecursively: true,
          }],
        },
      },
    },
  },
  ssgOptions: {
    script: 'async',
  },
})
