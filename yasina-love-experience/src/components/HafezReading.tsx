import { LOVE_CONTENT } from '../data/love-content';

/** The Hafez ghazal and its interpretation, rendered as real text (no images). */
export function HafezReading() {
  const { sectionTitle, poemTitle, couplets, interpretationTitle, interpretation } =
    LOVE_CONTENT.stageThree.fortune.hafez;

  return (
    <article className="hafez-book" dir="rtl" lang="fa" aria-label={sectionTitle}>
      <h3 className="hafez-title">{poemTitle}</h3>

      <div className="poem">
        {couplets.map((couplet, index) => (
          <div className="couplet" key={index}>
            {couplet.lines.map((line, lineIndex) => (
              <p key={lineIndex} className="verse" lang={couplet.lang} dir="rtl">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="hafez-divider" aria-hidden="true">
        ❦
      </div>

      <h4 className="interpretation-title">{interpretationTitle}</h4>
      <p className="interpretation" lang="fa" dir="rtl">
        {interpretation}
      </p>
    </article>
  );
}
