import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

module.exports = defineConfig({
    plugins: [vue()], // to process SFC
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
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