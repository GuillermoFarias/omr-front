module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: ["@nuxt/eslint-config", "plugin:vue/vue3-recommended"],
    rules: {
        "vue/multi-word-component-names": "off"
    }
};