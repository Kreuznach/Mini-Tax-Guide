import officialLinksData from '../../data/officialLinks.json';
import type { OfficialLink } from '../../types';
import Icon from '../Icon/Icon';
import styles from './OfficialLinksSection.module.css';

const links = (officialLinksData as { links: OfficialLink[] }).links;

export default function OfficialLinksSection() {
  return (
    <section
      id="official-links"
      className={styles.section}
      aria-labelledby="links-title"
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <h2 id="links-title" className="section-title">
            공식 자료 바로가기
          </h2>
          <p className="section-subtitle">
            더 자세한 내용은 정부 공식 사이트에서 확인하세요.
          </p>
        </div>

        {/* Link grid */}
        <ul className={styles.grid} aria-label="공식 세무 사이트 목록">
          {links.map(link => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.card}
                aria-label={`${link.name} - 새 탭에서 열기`}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon id={link.iconId} size={22} />
                  </div>
                  <div className={styles.cardText}>
                    <span className={styles.cardName}>{link.name}</span>
                    <span className={styles.cardDesc}>{link.description}</span>
                  </div>
                </div>
                <div className={styles.externalIcon} aria-hidden="true">
                  <Icon id="external-link" size={16} />
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Disclaimer */}
        <div className={styles.disclaimer} role="note" aria-label="면책 고지">
          <Icon id="alert-circle" size={18} className={styles.disclaimerIcon} />
          <div className={styles.disclaimerText}>
            <p className={styles.disclaimerTitle}>⚠ 이용 전 꼭 확인하세요</p>
            <p>
              본 서비스는 <strong>일반 정보 제공</strong>을 목적으로 하며,
              세무 신고를 대신하거나 세무 자문을 제공하지 않습니다.
            </p>
            <p>
              실제 신고 전에는 <strong>국세청, 홈택스</strong> 또는
              공인세무사를 통해 반드시 최종 확인하시기 바랍니다.
              세법은 매년 개정될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
