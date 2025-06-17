import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'semantic-ui-css/semantic.min.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import store from '../store/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <QueryClientProvider client={queryClient}>
    <Provider store={store} >
    <App />
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
