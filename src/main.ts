import './presentation/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './presentation/router'

// Importaciones de Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { FirebaseApp } from './config/firebaseConfig'
/*
  Importas FirebaseApp que exportaste en firebaseConfig.js
  Esto conecta VueFire con tu configuración de Firebase
*/

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Configuración de VueFire
app.use(VueFire, {
  firebaseApp: FirebaseApp, // Usas la misma instancia que creaste
  modules: [
    VueFireAuth() // Integras el módulo de autenticación
  ]
  /*
    Esto permite usar auth directamente en componentes con:
    const auth = useAuth()
  */
})

app.mount('#app')