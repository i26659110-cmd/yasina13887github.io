import { AudioPlayer } from './AudioPlayer';
import { Burst } from './Burst';
import { FortuneCard } from './FortuneCard';
import { PhotoViewer } from './PhotoViewer';
import { LOVE_CONTENT } from '../data/love-content';
import { HEART_PATH } from '../utils/heart';

interface Props {
  onBack: () => void;
  onRestart: () => void;
}

export function Stage3Surprise({ onBack, onRestart }: Props) {
  const { title, backLabel, restartLabel } = LOVE_CONTENT.stageThree;

  return (
    <section className="stage-3" aria-labelledby="s3-title">
      {/* Big heart that fades in and out in the center on entry (CSS only) */}
      <div className="intro-heart" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d={HEART_PATH} />
        </svg>
      </div>

      {/* Paper and small hearts drifting around, removed after a short time */}
      <Burst count={36} durationMs={4200} />

      {/* Content fades in after the heart animation */}
      <div className="stage-3-content">
        <h1 id="s3-title" className="question">
          {title}
        </h1>

        <PhotoViewer />
        <AudioPlayer />
        <FortuneCard />

        <nav className="btn-row stage-nav" aria-label="ناوبری">
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            {backLabel}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onRestart}>
            {restartLabel}
          </button>
        </nav>
      </div>
    </section>
  );
}
