import { createApp } from 'vue';
import { clerkPlugin } from 'vue-clerk/plugin';
import App from './App.vue'

createApp(App)
  .use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  })
  .mount('#app')
