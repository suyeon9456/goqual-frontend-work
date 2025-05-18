import React from 'react';
import { CButton } from '@coreui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <h4>문제가 발생했습니다</h4>
          <p className="text-danger text-center">{this.state.error?.message}</p>
          <CButton
            color="primary"
            className="mt-3"
            active
            tabIndex={-1}
            onClick={() => {
              if (this.props.retry == null) {
                window.location.reload();
                return;
              }
              this.props.retry();
            }}
          >
            다시 시도
          </CButton>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
