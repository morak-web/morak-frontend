import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import { ProjectProvider } from './context/ProjectContext.jsx';
import { PaymentProvider } from './context/PaymentContext.jsx';
import { DesignerProvider } from './context/DesignerContext.jsx';
1;
import { AIFeedbackProvider } from './context/AIFeedbackContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <PaymentProvider>
        <DesignerProvider>
          <AIFeedbackProvider>
            <App />
          </AIFeedbackProvider>
        </DesignerProvider>
      </PaymentProvider>
    </ProjectProvider>
  </StrictMode>
);
