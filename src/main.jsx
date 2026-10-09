import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('QR Generator Render Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#991b1b', margin: '20px 0' }}>
          <h3 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>QR Code Generator Error</h3>
          <p style={{ margin: 0, fontSize: '13px' }}>{this.state.error?.message || 'An unexpected error occurred while loading the QR Generator.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function initQrGenerator() {
  try {
    const rootElements = document.querySelectorAll('#custom-qr-generator-root:not([data-mounted="true"])');

    rootElements.forEach((rootElement) => {
      rootElement.setAttribute('data-mounted', 'true');
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    });
  } catch (e) {
    console.error('QR Generator Mount Error:', e);
  }
}

// 1. Initial attempt
initQrGenerator();

// 2. DOMContentLoaded listener
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQrGenerator);
}

// 3. Window load listener
if (typeof window !== 'undefined') {
  window.addEventListener('load', initQrGenerator);
}

// 4. MutationObserver for dynamic page builders (Elementor, AJAX, popups)
if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(() => {
    initQrGenerator();
  });

  const targetNode = document.body || document.documentElement;
  if (targetNode) {
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });
  }
}
