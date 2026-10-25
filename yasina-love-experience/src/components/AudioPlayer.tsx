import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { LOVE_CONTENT } from '../data/love-content';

type AudioStatus = 'loading' | 'ready' | 'error';

// One audio element for the whole page. Re-mounting the player or rendering it twice
// (for example in React StrictMode) never starts a second copy of the same file.
let sharedAudio: HTMLAudioElement | null = null;

function getSharedAudio(src: string): HTMLAudioElement {
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.preload = 'metadata';
  }
  if (sharedAudio.getAttribute('src') !== src) {
    sharedAudio.src = src;
    sharedAudio.load();
  }
  return sharedAudio;
}

function formatTime(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const minutes = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function AudioPlayer() {
  const { src, title, missingHint } = LOVE_CONTENT.stageThree.audio;

  const [status, setStatus] = useState<AudioStatus>('loading');
  const [buffering, setBuffering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [supportsVolume, setSupportsVolume] = useState(true);
  const [playError, setPlayError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = getSharedAudio(src);
    audioRef.current = audio;

    // Some mobile browsers ignore volume changes. Detect that instead of showing a slider that does nothing.
    audio.volume = 0.5;
    const volumeWorks = Math.abs(audio.volume - 0.5) < 0.01;
    audio.volume = 1;
    setSupportsVolume(volumeWorks);

    const syncDuration = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    const handleMetadata = () => {
      syncDuration();
      setStatus('ready');
    };
    const handleTime = () => setCurrent(audio.currentTime);
    const handlePlay = () => {
      setPlaying(true);
      setPlayError('');
    };
    const handlePause = () => setPlaying(false);
    const handleWaiting = () => setBuffering(true);
    const handleCanPlay = () => setBuffering(false);
    const handleError = () => setStatus('error');

    audio.addEventListener('loadedmetadata', handleMetadata);
    audio.addEventListener('durationchange', syncDuration);
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handleCanPlay);
    audio.addEventListener('error', handleError);

    // Sync with an element that may already be loaded from an earlier mount.
    if (audio.error) {
      setStatus('error');
    } else if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleMetadata();
    }
    setPlaying(!audio.paused);
    setCurrent(audio.currentTime);

    return () => {
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audio.removeEventListener('durationchange', syncDuration);
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('playing', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || status !== 'ready') return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlayError('پخش انجام نشد. یه بار دیگه روی دکمه‌ی پخش بزن.');
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const next = Number(event.target.value);
    if (!audio || !Number.isFinite(next)) return;
    audio.currentTime = next;
    setCurrent(next);
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    setVolume(next);
    if (audioRef.current) audioRef.current.volume = next;
  };

  if (status === 'error') {
    return (
      <section className="card audio-card">
        <h2>{title}</h2>
        <div className="placeholder">
          <p>{missingHint}</p>
        </div>
      </section>
    );
  }

  const seekable = status === 'ready' && duration > 0;

  return (
    <section className="card audio-card" aria-label={title}>
      <h2>{title}</h2>

      <div className="player" aria-busy={status === 'loading' || buffering}>
        <div className="player-row">
          <button
            type="button"
            className="play-btn"
            onClick={togglePlay}
            disabled={status !== 'ready'}
            aria-label={playing ? 'توقف' : 'پخش'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <div className="time" dir="ltr">
            <span>{formatTime(current)}</span>
            <span className="time-sep"> / </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <input
          type="range"
          className="seek"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(current, duration || 0)}
          onChange={handleSeek}
          disabled={!seekable}
          aria-label="نوار پیشرفت"
        />

        {supportsVolume && (
          <label className="volume">
            <span aria-hidden="true">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolume}
              aria-label="میزان صدا"
            />
          </label>
        )}

        {(status === 'loading' || buffering) && <p className="status">در حال بارگذاری…</p>}
        {playError && <p className="status status-error">{playError}</p>}
      </div>
    </section>
  );
}
