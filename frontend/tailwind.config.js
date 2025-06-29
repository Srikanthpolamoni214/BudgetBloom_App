/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// export default {
//   darkMode: 'class', // Enable class-based dark mode
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This is crucial!
  theme: {
    extend: {},
  },
  plugins: [],
}