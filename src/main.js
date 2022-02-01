import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

// import * as Vue from 'vue'
// import Va from 'vue-atlas'
// import 'vue-atlas/dist/vue-atlas.css'
// .use(Va, 'en')

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(App).use(router).use(Oruga).mount('#app')
