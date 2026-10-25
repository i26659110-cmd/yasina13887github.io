import { useEffect, useMemo, useState } from 'react';
import { cssVars } from '../utils/cssVars';

const COLORS = ['#e63977', '#ff7aa2', '#ffd6e3', '#8fcfef', '#f6c9bc', '#e0606e', '#fff3b0'];

interface Props {
  /** Number of pieces. Keep it small (roughly 20–40) so the animation stays light. */
  count: number;
  /** How long the burst stays on screen before it is removed. */
  durationMs: number;
}

/** A one-time burst of paper pieces and small hearts. Removes itself after durationMs. */
export function Burst({ count, durationMs }: Props) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        isHeart: i % 3 === 0,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() * 2 - 1) * 540,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs]);

  if (!visible) return null;

  return (
    <div className="burst" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={p.isHeart ? 'burst-piece heart' : 'burst-piece paper'}
          style={cssVars({
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            '--c': p.color,
          })}
        >
          {p.isHeart ? '♥' : ''}
        </span>
      ))}
    </div>
  );
}
