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
import { MyInfoProvider } from './context/MyInfoContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
createRoot(document.getElementById('root')).render(
  <MyInfoProvider>
    <ProjectProvider>
      <PaymentProvider>
        <DesignerProvider>
          <AIFeedbackProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </AIFeedbackProvider>
        </DesignerProvider>
      </PaymentProvider>
    </ProjectProvider>
  </MyInfoProvider>
);
