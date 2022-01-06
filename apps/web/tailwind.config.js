const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  content: createGlobPatternsForDependencies(__dirname),
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
