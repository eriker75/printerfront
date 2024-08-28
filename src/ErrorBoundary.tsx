import React, { useState, useCallback } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errorCount, setErrorCount] = useState(0);

  const handleReset = useCallback(() => {
    setErrorCount(0);
  }, []);

  const handleError = useCallback((error: Error, info: React.ErrorInfo) => {
    console.log('Logging error:', error, info);
    setErrorCount((prevCount) => prevCount + 1);
  }, []);

  if (errorCount > 3) {
    return <div>Too many errors occurred. Please refresh the page.</div>;
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
