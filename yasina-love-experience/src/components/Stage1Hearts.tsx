import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Burst } from './Burst';
import { LOVE_CONTENT } from '../data/love-content';
import { cssVars } from '../utils/cssVars';
import { HEART_PATH } from '../utils/heart';

const HEART_COLORS = ['#ff7aa2', '#ff4f8b', '#f7a1a1', '#ff8fab', '#e8707e', '#ff6b9a'];
// Different string lengths so the hearts hang at different heights (px)
const STRING_LENGTHS = [28, 6, 46, 14, 36, 20];
// Slightly different swing and beat timings so the motion does not look mechanical
const SWAY_SECONDS = [3.8, 4.4, 4.0, 4.9, 3.6, 4.6];
const BEAT_SECONDS = [1.6, 1.9, 1.7, 2.0, 1.8, 1.5];

const MAX_YES_SCALE = 1.6;
const SCALE_PER_ATTEMPT = 0.07;
const MOVE_COOLDOWN_MS = 350;
const ACCEPT_DELAY_MS = 1400;
const ROW_PADDING = 8;
const NO_BUTTON_MARGIN = 14;
const PLACEMENT_TRIES = 40;

interface Props {
  onAccept: () => void;
}

interface Point {
  x: number;
  y: number;
}

function scaleFor(attempts: number): number {
  return Math.min(1 + attempts * SCALE_PER_ATTEMPT, MAX_YES_SCALE);
}

export function Stage1Hearts({ onAccept }: Props) {
  const { name, heartLetters } = LOVE_CONTENT;
  const { questionIntro, questionMain, yesLabel, noLabel } = LOVE_CONTENT.stageOne;

  const [attempts, setAttempts] = useState(0);
  const [noPoint, setNoPoint] = useState<Point | null>(null);
  const [accepted, setAccepted] = useState(false);

  const rowRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const lastMoveRef = useRef(0);
  const acceptTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (acceptTimerRef.current !== null) window.clearTimeout(acceptTimerRef.current);
    };
  }, []);

  // Moves the "no" button to a random free spot inside the row, away from the (scaled) "yes" button.
  const placeNoButton = (yesScale: number) => {
    const row = rowRef.current;
    const yes = yesRef.current;
    const no = noRef.current;
    if (!row || !yes || !no) return;

    const maxX = row.clientWidth - no.offsetWidth - ROW_PADDING;
    const maxY = row.clientHeight - no.offsetHeight - ROW_PADDING;

    // offsetLeft/offsetTop are layout values and ignore CSS transforms, so the scale is applied manually.
    const yesCenterX = yes.offsetLeft + yes.offsetWidth / 2;
    const yesCenterY = yes.offsetTop + yes.offsetHeight / 2;
    const halfW = (yes.offsetWidth * yesScale) / 2 + NO_BUTTON_MARGIN;
    const halfH = (yes.offsetHeight * yesScale) / 2 + NO_BUTTON_MARGIN;
    const blocked = {
      left: yesCenterX - halfW,
      right: yesCenterX + halfW,
      top: yesCenterY - halfH,
      bottom: yesCenterY + halfH,
    };

    let next: Point = { x: ROW_PADDING, y: ROW_PADDING };
    for (let i = 0; i < PLACEMENT_TRIES; i++) {
      const x = ROW_PADDING + Math.random() * Math.max(0, maxX - ROW_PADDING);
      const y = ROW_PADDING + Math.random() * Math.max(0, maxY - ROW_PADDING);
      const overlaps =
        x < blocked.right &&
        x + no.offsetWidth > blocked.left &&
        y < blocked.bottom &&
        y + no.offsetHeight > blocked.top;
      if (!overlaps) {
        next = { x, y };
        break;
      }
    }
    setNoPoint(next);
  };

  // Called on click, and on mouse hover. A short cooldown prevents runaway moves.
  const attempt = () => {
    if (accepted) return;
    const now = performance.now();
    if (now - lastMoveRef.current < MOVE_COOLDOWN_MS) return;
    lastMoveRef.current = now;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    placeNoButton(scaleFor(nextAttempts));
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    // Touch devices only fire the click, so tapping works without hover.
    if (event.pointerType === 'mouse') attempt();
  };

  const handleYes = () => {
    if (accepted) return;
    setAccepted(true);
    acceptTimerRef.current = window.setTimeout(onAccept, ACCEPT_DELAY_MS);
  };

  const yesScale = scaleFor(attempts);

  return (
    <section className="stage-1" aria-labelledby="s1-title">
      <div className="hearts" role="img" aria-label={`نام ${name}`}>
        {heartLetters.map((letter, i) => (
          <div
            key={`${letter}-${i}`}
            className="hanger"
            style={cssVars({
              '--i': i,
              '--len': `${STRING_LENGTHS[i % STRING_LENGTHS.length]}px`,
              '--sway': `${SWAY_SECONDS[i % SWAY_SECONDS.length]}s`,
            })}
          >
            <span className="string" aria-hidden="true" />
            <div
              className="heart"
              style={cssVars({ '--i': i, '--heart': HEART_COLORS[i % HEART_COLORS.length] })}
            >
              <div
                className="heart-inner"
                style={cssVars({ '--beat': `${BEAT_SECONDS[i % BEAT_SECONDS.length]}s` })}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={HEART_PATH} />
                </svg>
                <span className="letter" dir="ltr">
                  {letter}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card question-card">
        <p className="question-intro">{questionIntro}</p>
        <h1 id="s1-title" className="question">
          {questionMain}
        </h1>

        <div className="btn-row" ref={rowRef}>
          <button
            ref={yesRef}
            type="button"
            className="btn btn-primary yes-btn"
            style={cssVars({ '--yes-scale': yesScale })}
            onClick={handleYes}
            disabled={accepted}
          >
            {yesLabel}
          </button>
          <button
            ref={noRef}
            type="button"
            className={noPoint ? 'btn btn-ghost no-btn floating' : 'btn btn-ghost no-btn'}
            style={noPoint ? { left: noPoint.x, top: noPoint.y } : undefined}
            onClick={attempt}
            onPointerEnter={handlePointerEnter}
            disabled={accepted}
          >
            {noLabel}
          </button>
        </div>
      </div>

      {accepted && <Burst count={28} durationMs={1600} />}
    </section>
  );
}
