import { useMemo } from 'react';
import calendarData from '../../data/taxCalendar.json';
import type { TaxEvent, TaxEventType } from '../../types';
import Icon from '../Icon/Icon';
import styles from './TaxCalendarSection.module.css';

interface TaxCalendarSectionProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const MONTHS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

const TYPE_META: Record<TaxEventType, { label: string; colorClass: string }> = {
  vat: { label: '부가가치세', colorClass: styles.typeVat },
  income: { label: '소득세', colorClass: styles.typeIncome },
  withholding: { label: '원천세', colorClass: styles.typeWithholding },
  other: { label: '기타', colorClass: styles.typeOther },
};

function formatDateRange(event: TaxEvent): string {
  const { month, startDay, endDay } = event;
  if (!endDay || endDay === startDay) return `${month}월 ${startDay}일`;
  return `${month}월 ${startDay}일 ~ ${endDay}일`;
}

export default function TaxCalendarSection({
  selectedMonth,
  onMonthChange,
}: TaxCalendarSectionProps) {
  const events = useMemo<TaxEvent[]>(() => {
    const data = calendarData as { events: TaxEvent[] };
    return data.events.filter(e => e.month === selectedMonth);
  }, [selectedMonth]);

  return (
    <section
      id="tax-schedule"
      className={styles.section}
      aria-labelledby="calendar-title"
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 id="calendar-title" className="section-title">
              세금 신고 일정
            </h2>
            <p className="section-subtitle">
              놓치면 가산세! 월별 주요 신고 일정을 미리 체크하세요.
            </p>
          </div>

          {/* Month selector */}
          <div className={styles.monthSelectorWrap}>
            <label htmlFor="month-select" className={styles.monthLabel}>
              월 선택
            </label>
            <div className={styles.monthSelectContainer}>
              <select
                id="month-select"
                className={styles.monthSelect}
                value={selectedMonth}
                onChange={e => onMonthChange(Number(e.target.value))}
                aria-label="조회할 월 선택"
              >
                {MONTHS.map((label, i) => (
                  <option key={i + 1} value={i + 1}>
                    {label}
                  </option>
                ))}
              </select>
              <Icon id="chevron-down" size={16} className={styles.selectArrow} />
            </div>
          </div>
        </div>

        {/* Source note */}
        <p className={styles.sourceNote}>
          출처: {calendarData.sourceName} (
          <a
            href={calendarData.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.sourceLink}
          >
            {calendarData.sourceUrl}
          </a>
          ) · {calendarData.notice}
        </p>

        {/* Event list */}
        {events.length === 0 ? (
          <div className={styles.empty} role="status">
            <Icon id="calendar" size={40} className={styles.emptyIcon} />
            <p>이 달에는 주요 신고 일정이 없습니다.</p>
          </div>
        ) : (
          <ul className={styles.eventList} aria-label={`${selectedMonth}월 세금 일정`}>
            {events.map(event => {
              const typeMeta = TYPE_META[event.type];
              return (
                <li key={event.id} className={styles.eventCard}>
                  <div className={styles.eventLeft}>
                    <div className={styles.dotWrap} aria-hidden="true">
                      <div
                        className={`${styles.dot} ${event.urgent ? styles.dotUrgent : ''}`}
                      />
                    </div>
                  </div>
                  <div className={styles.eventContent}>
                    <div className={styles.eventMeta}>
                      <span className={`${styles.typeBadge} ${typeMeta.colorClass}`}>
                        {typeMeta.label}
                      </span>
                      {event.urgent && (
                        <span className={styles.urgentBadge}>
                          <Icon id="alert-circle" size={12} />
                          중요
                        </span>
                      )}
                      <span className={styles.dateRange}>
                        <Icon id="calendar" size={14} />
                        {formatDateRange(event)}
                      </span>
                    </div>

                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventDesc}>{event.description}</p>

                    <div className={styles.eventDetails}>
                      <div className={styles.detailGroup}>
                        <span className={styles.detailLabel}>대상</span>
                        <span className={styles.detailValue}>
                          {event.targetAudience.join(', ')}
                        </span>
                      </div>
                      {event.preparations.length > 0 && (
                        <div className={styles.detailGroup}>
                          <span className={styles.detailLabel}>준비물</span>
                          <ul className={styles.prepList}>
                            {event.preparations.map((prep, i) => (
                              <li key={i} className={styles.prepItem}>
                                {prep}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
