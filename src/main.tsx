import App from './App.tsx'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { GraphProvider } from './api/MicrosoftGraph/GraphClientContext.tsx';
import { msalConfig } from './api/MicrosoftGraph/authConfig.ts'

const queryClient = new QueryClient()
const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <GraphProvider>
          <App />
        </GraphProvider>
      </MsalProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
