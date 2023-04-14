import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'

module.exports = defineConfig({
    plugins: [vue(), dts()], // to process SFC
    resolve:{
        alias:{
            '@' : path.resolve(__dirname, './src')
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'notificationCenter',
            formats: ['es', 'umd', 'cjs'], // adding 'umd' requires globals set to every external module
            fileName: (format) => `library.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'], // not every external has a global
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
        emptyOutDir: false,
    },
});