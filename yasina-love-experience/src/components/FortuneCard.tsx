import { useEffect, useState } from 'react';
import { FlowerCorner } from './FlowerCorner';
import { HafezReading } from './HafezReading';
import { LOVE_CONTENT } from '../data/love-content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const TYPE_INTERVAL_MS = 40;

export function FortuneCard() {
  const { title, revealLabel, showFullLabel } = LOVE_CONTENT.stageThree.fortune;
  const { finalMessage } = LOVE_CONTENT.stageThree;
  const reduceMotion = usePrefersReducedMotion();

  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState('');
  const [skipped, setSkipped] = useState(false);
  const typingDone = typed.length >= finalMessage.length;

  // Closing message types out after the fal is revealed. It is shown at once for reduced motion or after "نمایش کامل".
  useEffect(() => {
    if (!revealed) return;
    if (reduceMotion || skipped) {
      setTyped(finalMessage);
      return;
    }
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setTyped(finalMessage.slice(0, index));
      if (index >= finalMessage.length) window.clearInterval(id);
    }, TYPE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [revealed, finalMessage, reduceMotion, skipped]);

  return (
    <section className="card fortune-card" aria-labelledby="fortune-title">
      <FlowerCorner className="flower flower-top" />
      <FlowerCorner className="flower flower-bottom" />

      <h2 id="fortune-title" className="fortune-title">
        {title}
      </h2>

      {!revealed ? (
        <button type="button" className="btn btn-primary" onClick={() => setRevealed(true)}>
          {revealLabel}
        </button>
      ) : (
        <>
          <div className="hafez-reveal">
            <HafezReading />
          </div>

          <div className="fortune-divider" aria-hidden="true">
            ✿
          </div>

          <p className="final-message">
            {typed}
            {!typingDone && <span className="caret" aria-hidden="true" />}
          </p>

          {!typingDone && (
            <button type="button" className="link-btn" onClick={() => setSkipped(true)}>
              {showFullLabel}
            </button>
          )}
        </>
      )}
    </section>
  );
}
