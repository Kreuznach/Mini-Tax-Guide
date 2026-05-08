import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './FaqSection.module.css';

const FAQS = [
  {
    id: 'faq-1',
    question: '부가가치세 신고는 언제 해야 하나요?',
    answer:
      '개인 일반과세자는 연 2회 신고·납부합니다. 1기(1월 1일~6월 30일) 확정신고는 7월 25일까지, 2기(7월 1일~12월 31일) 확정신고는 다음 해 1월 25일까지 진행합니다. 간이과세자는 연 1회(다음 해 1월) 신고합니다. 정확한 일정은 홈택스 또는 국세청 세무일정에서 확인하세요.',
  },
  {
    id: 'faq-2',
    question: '종합소득세 신고 기간은 언제인가요?',
    answer:
      '매년 5월 1일부터 5월 31일까지 신고·납부합니다. 성실신고확인 대상 사업자는 6월 30일까지 신고 기간이 연장됩니다. 전년도 사업 소득이 있는 개인사업자는 반드시 기간 내 신고해야 가산세를 피할 수 있습니다.',
  },
  {
    id: 'faq-3',
    question: '간편장부 대상자는 어떻게 구분하나요?',
    answer:
      '직전 연도 수입금액이 업종별 기준(도소매·음식숙박업 등 3억 원, 제조·건설·운수 등 1억 5천만 원, 기타 7천5백만 원) 미만이면 간편장부 대상입니다. 기준 이상이거나 전문직은 복식부기 의무자입니다. 정확한 기준은 국세청에서 확인하세요.',
  },
  {
    id: 'faq-4',
    question: '사업 관련 비용은 어떻게 공제받나요?',
    answer:
      '사업에 직접 사용된 비용은 경비로 인정받을 수 있습니다. 세금계산서, 신용카드 매출전표, 현금영수증 등 적격 증빙을 반드시 수취·보관하세요. 적격 증빙 없이 지출한 비용은 가산세 부담이 생길 수 있습니다.',
  },
  {
    id: 'faq-5',
    question: '원천세는 무엇이고 언제 신고하나요?',
    answer:
      '직원 급여, 프리랜서 용역비 등을 지급할 때 원천징수한 세금입니다. 매월 말일까지 신고·납부가 원칙이며, 반기납부 승인을 받은 사업자는 7월과 1월에 일괄 납부할 수 있습니다. 3.3% 원천징수를 받는 프리랜서는 종합소득세 신고 시 기납부세액으로 차감합니다.',
  },
  {
    id: 'faq-6',
    question: '이 사이트의 정보는 얼마나 신뢰할 수 있나요?',
    answer:
      '본 서비스는 개인사업자를 위한 일반 정보 제공 목적으로 운영됩니다. 세법은 매년 개정될 수 있으므로, 실제 신고 전에는 국세청, 홈택스 또는 세무 전문가를 통해 반드시 최종 확인하시기 바랍니다. 본 내용은 세무 자문을 대체하지 않습니다.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className={styles.section}
      aria-labelledby="faq-title"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="faq-title" className="section-title">
            자주 묻는 질문
          </h2>
          <p className="section-subtitle">
            개인사업자 세금 신고와 관련하여 자주 나오는 질문을 모았습니다.
          </p>
        </div>

        <dl className={styles.list}>
          {FAQS.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <dt>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() => toggle(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                      aria-hidden="true"
                    >
                      <Icon id="chevron-down" size={18} />
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${faq.id}`}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
