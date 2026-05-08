import styles from './BookkeepingSection.module.css';

const ITEMS = [
  {
    id: 'bk-1',
    title: '장부 기록 의무 유형 확인',
    desc: '업종·수입 규모에 따라 간편장부 또는 복식부기 의무가 다릅니다. 직전 연도 수입금액이 기준에 해당하는지 확인하고 해당 방식으로 장부를 준비하세요.',
  },
  {
    id: 'bk-2',
    title: '세금계산서 발행·수취 내역 정리',
    desc: '전자세금계산서 발행·수취 내역은 홈택스에서 일괄 조회할 수 있습니다. 누락된 건이 없는지 정기적으로 대조하세요.',
  },
  {
    id: 'bk-3',
    title: '매출·비용 증빙 서류 구분 보관',
    desc: '사업 관련 비용과 개인 비용은 반드시 구분하여 보관하세요. 신용카드 매출전표, 현금영수증, 종이 영수증 등 적격 증빙은 5년간 보관 의무가 있습니다.',
  },
  {
    id: 'bk-4',
    title: '사업용 계좌 및 카드 분리 관리',
    desc: '사업용 계좌와 카드를 개인용과 분리하면 장부 정리가 수월하고 경비 처리 오류를 줄일 수 있습니다. 홈택스에서 사업용 신용카드를 등록하면 매입세액 공제 내역이 자동 집계됩니다.',
  },
  {
    id: 'bk-5',
    title: '간이영수증·현금 거래 별도 관리',
    desc: '3만 원 이하 거래라도 사업 관련 비용은 현금영수증 또는 카드 사용을 권장합니다. 간이영수증은 적격 증빙으로 인정되지 않을 수 있으므로 주의하세요.',
  },
];

export default function BookkeepingSection() {
  return (
    <section
      id="bookkeeping"
      className={styles.section}
      aria-labelledby="bookkeeping-title"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="bookkeeping-title" className="section-title">
            장부·증빙 관리 체크리스트
          </h2>
          <p className="section-subtitle">
            세금 신고 전 장부 기록과 증빙 서류 정리 상태를 미리 점검하세요.
          </p>
        </div>

        <ul className={styles.list} aria-label="장부·증빙 관리 항목">
          {ITEMS.map(item => (
            <li key={item.id} className={styles.item}>
              <div className={styles.bullet} aria-hidden="true" />
              <div className={styles.itemText}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemDesc}>{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className={styles.notice}>
          ※ 위 항목은 일반 정보 제공 목적이며, 실제 기장 의무 및 증빙 요건은
          국세청 또는 세무 전문가에게 확인하시기 바랍니다.
        </p>
      </div>
    </section>
  );
}
