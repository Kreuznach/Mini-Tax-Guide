import { useMemo } from 'react';
import calendarData from '../../data/taxCalendar.json';
import type { TaxEvent } from '../../types';
import Icon from '../Icon/Icon';
import styles from './HeroSection.module.css';

/** 오늘 기준 가장 가까운 미래 세금 이벤트를 찾아 D-day 반환 */
function getNextTaxEvent(): { event: TaxEvent; dDay: number } | null {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 1-based

  const upcoming = (calendarData as { events: TaxEvent[] }).events
    .map(event => {
      // 이번 달 또는 이후 달의 이벤트에 대해 날짜 계산
      let eventYear = year;
      let eventMonth = event.month;
      if (eventMonth < month) {
        eventYear = year + 1; // 내년으로
      }
      const deadline = new Date(
        eventYear,
        eventMonth - 1,
        event.endDay ?? event.startDay
      );
      deadline.setHours(23, 59, 59, 999);
      const msLeft = deadline.getTime() - today.getTime();
      const dDay = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
      return { event, dDay };
    })
    .filter(({ dDay }) => dDay >= 0)
    .sort((a, b) => a.dDay - b.dDay);

  return upcoming[0] ?? null;
}

export default function HeroSection() {
  const nextEvent = useMemo(() => getNextTaxEvent(), []);

  const dDayLabel =
    nextEvent == null
      ? '—'
      : nextEvent.dDay === 0
      ? 'D-Day'
      : `D-${nextEvent.dDay}`;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Text block */}
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>개인사업자 세금 가이드</p>
          <h1 id="hero-title" className={`${styles.title} section-title`}>
            세금 신고 직전에 <br className={styles.titleBreak} />
            당황하지 않게
          </h1>
          <p className={styles.subtitle}>
            업종별 세금 일정과 절세 준비사항을
            <br />
            한 페이지에서 가볍게 확인하세요.
          </p>
          <div className={styles.ctaGroup}>
            <a
              href="#industry-selection"
              className="btn btn-accent btn-lg"
              onClick={e => {
                e.preventDefault();
                const el = document.querySelector('#industry-selection');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
            >
              내 업종으로 확인하기
            </a>
            <a
              href="#tax-schedule"
              className="btn btn-outline btn-lg"
              onClick={e => {
                e.preventDefault();
                const el = document.querySelector('#tax-schedule');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
            >
              이번 달 일정 보기
            </a>
          </div>
        </div>

        {/* Preview card */}
        <div className={styles.previewCard} aria-live="polite">
          <div className={styles.previewHeader}>
            <div className={styles.previewIconWrap} aria-hidden="true">
              <Icon id="calendar" size={20} />
            </div>
            <span className={styles.previewLabel}>다음 세금 일정</span>
          </div>
          <div className={styles.previewBody}>
            <p className={styles.previewDDay}>{dDayLabel}</p>
            <p className={styles.previewTitle}>
              {nextEvent?.event.title ?? '일정 없음'}
            </p>
            {nextEvent && (
              <p className={styles.previewMonth}>
                {nextEvent.event.month}월{' '}
                {nextEvent.event.startDay}일
                {nextEvent.event.endDay && nextEvent.event.endDay !== nextEvent.event.startDay
                  ? ` ~ ${nextEvent.event.endDay}일`
                  : ''}
              </p>
            )}
          </div>
          <div className={styles.previewFooter}>
            <Icon id="alert-circle" size={14} />
            <span>놓치면 가산세가 발생합니다</span>
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div className={styles.featuresStrip} aria-label="주요 기능">
        {[
          { icon: 'briefcase', label: '업종별 맞춤 가이드' },
          { icon: 'calendar', label: '이번 달 세금 일정' },
          { icon: 'check-circle', label: '절세 체크리스트' },
          { icon: 'external-link', label: '공식 자료 바로가기' },
        ].map(f => (
          <div key={f.label} className={styles.featureItem}>
            <Icon id={f.icon} size={18} className={styles.featureIcon} />
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
