import styles from './DisclaimerSection.module.css';

export default function DisclaimerSection() {
  return (
    <section
      id="disclaimer"
      className={styles.section}
      aria-labelledby="disclaimer-title"
    >
      <div className={styles.inner}>
        <h2 id="disclaimer-title" className={styles.title}>
          안내 및 면책
        </h2>
        <p className={styles.body}>
          본 서비스는 개인사업자를 위한 일반 정보 제공용이며, 세무 신고나 세무
          자문을 대체하지 않습니다. 실제 신고 전에는{' '}
          <a
            href="https://www.nts.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            국세청
          </a>
          ,{' '}
          <a
            href="https://www.hometax.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            홈택스
          </a>{' '}
          또는 세무 전문가의 확인이 필요합니다.
        </p>
      </div>
    </section>
  );
}
