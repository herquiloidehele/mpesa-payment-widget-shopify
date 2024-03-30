import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HttpClient from '@/services/HttpClient'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/global.scss'

HttpClient.getInstance()

const app = createApp(App)

app.use(router)

app.mount('#app')
