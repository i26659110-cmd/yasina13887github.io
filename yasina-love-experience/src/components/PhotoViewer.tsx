import { useEffect, useState } from 'react';
import { LOVE_CONTENT } from '../data/love-content';

type PhotoStatus = 'loading' | 'ready' | 'error';

export function PhotoViewer() {
  const { src, alt, title, placeholderText, loadingText, downloadLabel, downloadFileName } =
    LOVE_CONTENT.stageThree.photo;

  const [status, setStatus] = useState<PhotoStatus>('loading');
  const [open, setOpen] = useState(false);

  // Escape closes the enlarged view; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <section className="card media-card" aria-label={title}>
      <h2>{title}</h2>

      {status === 'error' ? (
        <div className="photo-placeholder" role="img" aria-label={placeholderText}>
          <span className="placeholder-icon" aria-hidden="true">
            📷
          </span>
          <p>{placeholderText}</p>
          <code dir="ltr">public/images/our-photo.jpg</code>
        </div>
      ) : (
        <>
          {status === 'loading' && <p className="loading-text">{loadingText}</p>}
          <button
            type="button"
            className="photo-btn"
            onClick={() => setOpen(true)}
            disabled={status !== 'ready'}
            aria-label="بزرگ‌نمایی عکس"
            style={{ display: status === 'ready' ? 'block' : 'none' }}
          >
            <img
              src={src}
              alt={alt}
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('error')}
            />
          </button>
        </>
      )}

      {status === 'ready' && (
        <a className="btn btn-ghost" href={src} download={downloadFileName}>
          {downloadLabel}
        </a>
      )}

      {open && status === 'ready' && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(false)}>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox-close" aria-label="بستن" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
      )}
    </section>
  );
}
