import { useMemo } from 'react';
import checklistData from '../../data/checklist.json';
import industriesData from '../../data/industries.json';
import type { ChecklistItem, CheckedItems, Industry } from '../../types';
import Icon from '../Icon/Icon';
import styles from './ChecklistSection.module.css';

interface ChecklistSectionProps {
  selectedIndustry: string | null;
  checkedItems: CheckedItems;
  onCheckItem: (itemId: string, checked: boolean) => void;
}

const allItems = (checklistData as { items: ChecklistItem[] }).items;
const industries = (industriesData as { industries: Industry[] }).industries;

/** 선택된 업종의 checklistIds 순서대로 아이템을 정렬하고 필터링 */
function getVisibleItems(selectedIndustry: string | null): ChecklistItem[] {
  if (!selectedIndustry) {
    return allItems;
  }
  const industry = industries.find(i => i.id === selectedIndustry);
  if (!industry) return allItems;

  const ordered: ChecklistItem[] = [];
  const seen = new Set<string>();

  // 업종 지정 순서를 따름
  for (const id of industry.checklistIds) {
    const item = allItems.find(i => i.id === id);
    if (item && !seen.has(item.id)) {
      ordered.push(item);
      seen.add(item.id);
    }
  }
  return ordered;
}

/** 준비도 점수 계산: 체크된 weight 합 / 전체 weight 합 × 100 */
function calcScore(items: ChecklistItem[], checked: CheckedItems): number {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  const achieved = items
    .filter(item => checked[item.id])
    .reduce((sum, item) => sum + item.weight, 0);
  return Math.round((achieved / total) * 100);
}

function getScoreMessage(score: number): string {
  if (score === 100) return '완벽한 준비! 세금 신고에 자신 있게 임하세요.';
  if (score >= 80) return '준비가 잘 되어 있습니다. 남은 항목을 마저 확인해 보세요.';
  if (score >= 50) return '기본 준비는 되어 있습니다. 빠진 항목을 점검해 보세요.';
  if (score > 0) return '아직 준비가 더 필요합니다. 하나씩 체크해 나가세요.';
  return '아직 시작하지 않으셨네요. 위에서부터 차근차근 확인해 보세요.';
}

function getScoreColor(score: number): string {
  if (score >= 80) return styles.scoreFill__green;
  if (score >= 50) return styles.scoreFill__yellow;
  return styles.scoreFill__red;
}

/** 카테고리별 그룹핑 */
function groupByCategory(items: ChecklistItem[]): Map<string, ChecklistItem[]> {
  const map = new Map<string, ChecklistItem[]>();
  for (const item of items) {
    const group = map.get(item.category) ?? [];
    group.push(item);
    map.set(item.category, group);
  }
  return map;
}

export default function ChecklistSection({
  selectedIndustry,
  checkedItems,
  onCheckItem,
}: ChecklistSectionProps) {
  const visibleItems = useMemo(
    () => getVisibleItems(selectedIndustry),
    [selectedIndustry]
  );

  const score = useMemo(
    () => calcScore(visibleItems, checkedItems),
    [visibleItems, checkedItems]
  );

  const grouped = useMemo(() => groupByCategory(visibleItems), [visibleItems]);

  const checkedCount = visibleItems.filter(i => checkedItems[i.id]).length;
  const industryName = selectedIndustry
    ? industries.find(i => i.id === selectedIndustry)?.name ?? null
    : null;

  const handleReset = () => {
    visibleItems.forEach(item => onCheckItem(item.id, false));
  };

  return (
    <section
      id="checklist"
      className={styles.section}
      aria-labelledby="checklist-title"
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 id="checklist-title" className="section-title">
              절세 체크리스트
            </h2>
            <p className="section-subtitle">
              {industryName
                ? `${industryName} 업종에 맞는 항목을 확인하세요.`
                : '업종을 선택하면 맞춤 항목만 표시됩니다.'}
            </p>
          </div>
          {checkedCount > 0 && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleReset}
              aria-label="체크 항목 전체 초기화"
            >
              초기화
            </button>
          )}
        </div>

        {/* Source note */}
        <p className={styles.sourceNote}>
          출처: {checklistData.sourceName} · {checklistData.notice}
        </p>

        <div className={styles.layout}>
          {/* Checklist items */}
          <div className={styles.checklistArea}>
            {Array.from(grouped.entries()).map(([category, items]) => (
              <div key={category} className={styles.categoryGroup}>
                <h3 className={styles.categoryTitle}>{category}</h3>
                <ul className={styles.itemList}>
                  {items.map(item => {
                    const checked = !!checkedItems[item.id];
                    return (
                      <li key={item.id} className={`${styles.item} ${checked ? styles.itemChecked : ''}`}>
                        <label className={styles.itemLabel} htmlFor={`check-${item.id}`}>
                          <input
                            type="checkbox"
                            id={`check-${item.id}`}
                            className={styles.checkbox}
                            checked={checked}
                            onChange={e => onCheckItem(item.id, e.target.checked)}
                            aria-describedby={`desc-${item.id}`}
                          />
                          <span className={styles.checkmark} aria-hidden="true">
                            {checked && <Icon id="check-circle" size={16} />}
                          </span>
                          <div className={styles.itemText}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span
                              id={`desc-${item.id}`}
                              className={styles.itemDesc}
                            >
                              {item.description}
                            </span>
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Score panel (sticky on desktop) */}
          <aside className={styles.scorePanel} aria-label="세금 준비도 점수">
            <h3 className={styles.scorePanelTitle}>나의 준비도</h3>

            {/* Circular score */}
            <div className={styles.scoreCircleWrap}>
              <svg
                viewBox="0 0 36 36"
                className={styles.scoreCircle}
                aria-hidden="true"
              >
                <path
                  className={styles.circleBg}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${styles.circleFill} ${getScoreColor(score)}`}
                  strokeDasharray={`${score}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className={styles.scoreNumber} aria-live="polite">
                <span className={styles.scoreValue}>{score}</span>
                <span className={styles.scoreUnit}>점</span>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className={styles.progressBar}
              role="progressbar"
              aria-valuenow={score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`준비도 ${score}점`}
            >
              <div
                className={`${styles.progressFill} ${getScoreColor(score)}`}
                style={{ width: `${score}%` }}
              />
            </div>

            <p className={styles.scoreMessage}>{getScoreMessage(score)}</p>

            <div className={styles.scoreStats}>
              <span className={styles.statsValue}>{checkedCount}</span>
              <span className={styles.statsSeparator}>/</span>
              <span>{visibleItems.length}</span>
              <span className={styles.statsLabel}>항목 완료</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
