import "./tailwind.css";
import { createRoot } from 'react-dom/client';
import { CPExportWorkflowWizard } from './components/CPExportWorkflowWizard';

function setupRootEl() {
  let rootEl = document.getElementById('react-wizard-root');
  if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = 'react-wizard-root';
    
    Object.assign(rootEl.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f1f5f9',
      zIndex: '9999',
      overflowY: 'auto'
    });
    document.body.appendChild(rootEl);
  } else {
    rootEl.style.display = 'block';
  }
  return rootEl;
}

window.mountExportWizard = (txId: string) => {
  const rootEl = setupRootEl();
  const onClose = () => { if (rootEl) rootEl.style.display = 'none'; };
  const root = createRoot(rootEl);
  root.render(<CPExportWorkflowWizard txId={txId} onClose={onClose} />);
};


