import Icon from '../Icon/Icon';
import styles from './Footer.module.css';

const navLinks = [
  { href: '#industry-selection', label: '업종 선택' },
  { href: '#tax-schedule', label: '세금 일정' },
  { href: '#checklist', label: '체크리스트' },
  { href: '#official-links', label: '공식 자료' },
];

const officialLinks = [
  { href: 'https://www.nts.go.kr', label: '국세청' },
  { href: 'https://www.hometax.go.kr', label: '홈택스' },
  { href: 'https://www.8899.or.kr', label: '노란우산공제' },
  { href: 'https://www.efund.or.kr', label: '전자기부금영수증' },
];

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return;
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brandCol}>
          <div className={styles.logoGroup}>
            <Icon id="receipt" size={20} className={styles.logoIcon} />
            <span className={styles.brandName}>Mini Tax Guide</span>
          </div>
          <p className={styles.brandDesc}>
            개인사업자의 세무 준비를 돕는 정보 제공 서비스입니다.
            업종별 맞춤 세금 일정과 절세 체크리스트로 복잡한 세무 업무를
            가볍게 시작해 보세요.
          </p>
        </div>

        {/* Site links */}
        <nav className={styles.linkCol} aria-label="사이트 내 메뉴">
          <h3 className={styles.colTitle}>메뉴</h3>
          <ul className={styles.linkList}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.footerLink}
                  onClick={e => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Official links */}
        <nav className={styles.linkCol} aria-label="공식 외부 사이트">
          <h3 className={styles.colTitle}>공식 사이트</h3>
          <ul className={styles.linkList}>
            {officialLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.footerLink}
                >
                  {link.label}
                  <Icon id="external-link" size={12} className={styles.extIcon} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {year} Mini Tax Guide. 개인사업자 세금 정보 가이드.
        </p>
        <p className={styles.disclaimer}>
          본 서비스는 일반 정보 제공용이며, 세무 자문을 대체하지 않습니다.
          세법은 변경될 수 있으므로 실제 신고 전 반드시 공식 기관을 통해 확인하세요.
        </p>
      </div>
    </footer>
  );
}
