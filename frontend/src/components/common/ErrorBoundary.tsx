import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in UI Boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-4">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground max-w-md mb-6 text-sm">
            {this.state.error?.message || 'An unexpected rendering error occurred. Please refresh or try again later.'}
          </p>
          <Button onClick={this.handleReset} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
