import { LOVE_CONTENT } from '../data/love-content';

interface Props {
  answer: string;
  onAnswerChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Stage2Question({ answer, onAnswerChange, onNext, onBack }: Props) {
  const { title, subtitle, placeholder, nextLabel, emptyHint, backLabel, maxLength } =
    LOVE_CONTENT.stageTwo;
  const hasText = answer.trim().length > 0;

  return (
    <section className="card stage-2" aria-labelledby="s2-title">
      <h1 id="s2-title" className="question">
        {title}
      </h1>
      <p className="subtitle">{subtitle}</p>

      <label htmlFor="answer" className="visually-hidden">
        {subtitle}
      </label>
      <textarea
        id="answer"
        dir="auto"
        rows={5}
        maxLength={maxLength}
        value={answer}
        placeholder={placeholder}
        aria-describedby="answer-hint"
        onChange={(e) => onAnswerChange(e.target.value)}
      />

      <div className="field-meta">
        <span id="answer-hint" className="hint">
          {hasText ? '' : emptyHint}
        </span>
        <span className="counter" dir="ltr">
          {answer.length}/{maxLength}
        </span>
      </div>

      <button type="button" className="btn btn-primary" onClick={onNext} disabled={!hasText}>
        {nextLabel}
      </button>
      <button type="button" className="btn btn-ghost" onClick={onBack}>
        {backLabel}
      </button>
    </section>
  );
}
