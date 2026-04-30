import { useState, useCallback } from 'react';
import type { Theme } from '../../types';
import Icon from '../Icon/Icon';
import styles from './Header.module.css';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const navLinks = [
  { href: '#industry-selection', label: '업종 선택' },
  { href: '#tax-schedule', label: '세금 일정' },
  { href: '#checklist', label: '체크리스트' },
  { href: '#official-links', label: '공식 자료' },
];

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMenu();
      const target = document.querySelector(href);
      if (target) {
        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          72; /* nav height offset */
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [closeMenu]
  );

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Mini Tax Guide 홈으로"
        >
          <Icon id="receipt" size={22} className={styles.logoIcon} />
          <span>Mini Tax Guide</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="주요 메뉴">
          <ul className={styles.navList}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={e => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.themeBtn} btn btn-ghost btn-sm`}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            <Icon id={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          <a
            href="#industry-selection"
            className={`btn btn-accent btn-sm ${styles.ctaBtn}`}
            onClick={e => handleNavClick(e, '#industry-selection')}
          >
            가이드 시작하기
          </a>
          <button
            className={`${styles.menuBtn} btn btn-ghost btn-sm`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="모바일 메뉴 열기"
          >
            <Icon id={menuOpen ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="모바일 내비게이션"
        >
          <nav>
            <ul className={styles.mobileNavList}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={e => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileFooter}>
            <a
              href="#industry-selection"
              className="btn btn-accent btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={e => handleNavClick(e, '#industry-selection')}
            >
              내 업종으로 확인하기
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
