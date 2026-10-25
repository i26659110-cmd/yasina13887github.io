import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Stage1Hearts } from './components/Stage1Hearts';
import { Stage2Question } from './components/Stage2Question';
import { Stage3Surprise } from './components/Stage3Surprise';

type Step = 1 | 2 | 3;

const STEPS: Step[] = [1, 2, 3];
const TRANSITION_LOCK_MS = 700;

function Journey() {
  const [step, setStep] = useState<Step>(1);
  // The answer lives in memory only. It is kept while moving between stages and is not sent anywhere.
  const [answer, setAnswer] = useState('');
  // Changing runId remounts the current stage, used for "start over".
  const [runId, setRunId] = useState(0);

  const lockRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current !== null) window.clearTimeout(lockTimerRef.current);
    };
  }, []);

  // Returns false while a transition is running, so rapid clicks cannot skip stages.
  const goTo = (next: Step): boolean => {
    if (lockRef.current) return false;
    lockRef.current = true;
    setStep(next);
    lockTimerRef.current = window.setTimeout(() => {
      lockRef.current = false;
    }, TRANSITION_LOCK_MS);
    return true;
  };

  const restart = () => {
    if (goTo(1)) {
      setAnswer('');
      setRunId((id) => id + 1);
    }
  };

  return (
    <main className="app">
      <nav className="progress" aria-label="مراحل">
        {STEPS.map((s) => (
          <span
            key={s}
            className={s === step ? 'active' : undefined}
            aria-current={s === step ? 'step' : undefined}
          />
        ))}
      </nav>

      <div key={`${runId}-${step}`} className="stage fade-in">
        {step === 1 && <Stage1Hearts onAccept={() => goTo(2)} />}
        {step === 2 && (
          <Stage2Question
            answer={answer}
            onAnswerChange={setAnswer}
            onNext={() => goTo(3)}
            onBack={() => goTo(1)}
          />
        )}
        {step === 3 && <Stage3Surprise onBack={() => goTo(2)} onRestart={restart} />}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Journey />
    </ErrorBoundary>
  );
}
