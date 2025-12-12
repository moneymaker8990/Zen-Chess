import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/index.css'

// #region agent log
fetch('http://127.0.0.1:7242/ingest/36a72d14-14e6-4dc3-8f08-e0b574ec4f5a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:boot',message:'App booting',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>,
)



