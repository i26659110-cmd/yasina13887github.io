import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Catches unexpected render errors and shows a friendly message instead of a blank page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Yasina app error:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="app">
          <section className="card">
            <h1 className="question">یه مشکلی پیش اومد 🥺</h1>
            <p>صفحه رو دوباره بارگذاری کن تا ادامه بدیم.</p>
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              بارگذاری دوباره
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
