import industriesData from '../../data/industries.json';
import type { Industry } from '../../types';
import Icon from '../Icon/Icon';
import styles from './IndustrySelectorSection.module.css';

interface IndustrySelectorSectionProps {
  selectedIndustry: string | null;
  onSelect: (id: string) => void;
}

const industries = (industriesData as { industries: Industry[] }).industries;

export default function IndustrySelectorSection({
  selectedIndustry,
  onSelect,
}: IndustrySelectorSectionProps) {
  return (
    <section
      id="industry-selection"
      className={styles.section}
      aria-labelledby="industry-title"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="industry-title" className="section-title">
            내 업종 선택
          </h2>
          <p className="section-subtitle">
            맞춤형 절세 체크리스트를 보려면 사업 유형을 선택하세요.
          </p>
        </div>

        <div className={styles.grid} role="list" aria-label="업종 목록">
          {industries.map(industry => {
            const isSelected = selectedIndustry === industry.id;
            return (
              <div
                key={industry.id}
                role="listitem"
                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              >
                <button
                  className={styles.cardBtn}
                  onClick={() => onSelect(industry.id)}
                  aria-pressed={isSelected}
                  aria-label={`${industry.name} 선택${isSelected ? ' (선택됨)' : ''}`}
                >
                  <div
                    className={`${styles.iconWrap} ${isSelected ? styles.iconWrapSelected : ''}`}
                    aria-hidden="true"
                  >
                    <Icon id={industry.iconId} size={26} />
                  </div>
                  <h3 className={styles.name}>{industry.name}</h3>
                  <p className={styles.desc}>{industry.description}</p>

                  {isSelected && (
                    <span className={styles.selectedBadge} aria-hidden="true">
                      ✓ 선택됨
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected industry highlights */}
        {selectedIndustry && (() => {
          const industry = industries.find(i => i.id === selectedIndustry);
          if (!industry) return null;
          return (
            <div className={styles.highlights} aria-live="polite" aria-atomic="true">
              <h3 className={styles.highlightsTitle}>
                <Icon id={industry.iconId} size={18} className={styles.highlightsIcon} />
                {industry.name} 주요 세무 포인트
              </h3>
              <ul className={styles.highlightsList}>
                {industry.highlights.map((h, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <Icon id="check-circle" size={16} className={styles.checkIcon} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#checklist"
                className="btn btn-accent btn-md"
                onClick={e => {
                  e.preventDefault();
                  const el = document.querySelector('#checklist');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 72;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
              >
                체크리스트 바로 보기
              </a>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
