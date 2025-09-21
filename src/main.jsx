import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import { ProjectProvider } from './context/ProjectContext.jsx';
import { PaymentProvider } from './context/PaymentContext.jsx';
import { DesignerProvider } from './context/DesignerContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <PaymentProvider>
        <DesignerProvider>
          <App />
        </DesignerProvider>
      </PaymentProvider>
    </ProjectProvider>
  </StrictMode>
);
