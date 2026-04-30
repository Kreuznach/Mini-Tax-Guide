# Mini Tax Guide — 진행 현황 (PROGRESS)

> 마지막 업데이트: 2025년

---

## MVP1 체크리스트

### ✅ 완료

#### 📁 프로젝트 설정 파일
- [x] `package.json` — React 18 + Vite 5 + TypeScript 5
- [x] `vite.config.ts` — Vite 빌드 설정
- [x] `tsconfig.json` / `tsconfig.node.json` — TypeScript 설정
- [x] `index.html` — 진입점, Google Fonts (Sora + Work Sans)
- [x] `.gitignore` — `html/` 목업 폴더 제외
- [x] `vercel.json` — SPA 리라이트 규칙

#### 📊 정적 데이터 파일 (`src/data/`)
- [x] `taxCalendar.json` — 연간 세금 일정 20개 이벤트
- [x] `industries.json` — 8개 업종 정의
- [x] `checklist.json` — 13개 체크리스트 항목 (가중치 포함)
- [x] `officialLinks.json` — 4개 공식 링크

#### 🏗️ 기반 파일
- [x] `src/vite-env.d.ts`
- [x] `src/types/index.ts` — 전체 TypeScript 타입
- [x] `src/hooks/useLocalStorage.ts` — localStorage 훅
- [x] `src/hooks/useTheme.ts` — 다크모드 토글 훅
- [x] `src/styles/global.css` — CSS 변수, 리셋, 유틸리티

#### 🧩 컴포넌트
- [x] `Icon/Icon.tsx` — SVG 인라인 아이콘 (20종)
- [x] `Header/Header.tsx` — 스티키 네비, 다크모드, 모바일 메뉴
- [x] `HeroSection/HeroSection.tsx` — D-day 카드, 그라데이션 배경
- [x] `IndustrySelectorSection/` — 업종 선택 그리드 + 하이라이트 패널
- [x] `TaxCalendarSection/` — 월별 세금 일정 + 드롭다운
- [x] `ChecklistSection/` — 체크리스트 + SVG 원형 점수 차트
- [x] `OfficialLinksSection/` — 공식 링크 + 면책 고지
- [x] `Footer/Footer.tsx` — 브랜드, 네비, 외부 링크, 저작권

#### 🔗 앱 조합
- [x] `src/App.tsx` — 전역 상태 관리, 컴포넌트 연결
- [x] `src/main.tsx` — React 앱 진입점

#### 📄 문서
- [x] `README.md` 업데이트
- [x] `PROGRESS.md` (이 파일)

---

## 📦 빌드 검증

| 단계 | 상태 |
|------|------|
| `npm install` | ✅ 완료 |
| `npm run build` (TypeScript 오류 없음) | ✅ 완료 — 53 modules, JS 183 kB / CSS 31 kB |
| `npm run dev` (개발 서버 정상 실행) | ⬜ 미실행 |
| Vercel 배포 테스트 | ⬜ 미실행 |

---

## 🔮 MVP2 로드맵

| 기능 | 우선순위 | 상태 |
|------|---------|------|
| `.ics` 세금 일정 캘린더 다운로드 | 높음 | ⬜ |
| 업종별 세금 계산기 (추정 세액) | 높음 | ⬜ |
| "절세 준비 PDF 저장" 기능 | 중간 | ⬜ |
| 카카오톡/링크 공유 버튼 | 중간 | ⬜ |
| 세무사 제휴 문의 CTA | 중간 | ⬜ |
| 블로그형 세금 콘텐츠 | 낮음 | ⬜ |
| 업종별 상세 페이지 | 낮음 | ⬜ |
| Google Analytics / 로그 수집 | 낮음 | ⬜ |

---

## ⚠️ 알려진 제한 사항

1. **세법 최신성**: `taxCalendar.json`은 최근 국세청 공고 기준이지만, 신고 기한 변경 시 수동 업데이트 필요
2. **간이과세 기준**: 간이과세자 부가세 신고 주기는 업종에 따라 다를 수 있음
3. **체크리스트 범위**: 현재 13개 항목으로 구성되어 있으며, 업종별 세부 항목 확대 예정
4. **접근성**: ARIA 기본 구현 완료; 스크린 리더 전체 테스트 미수행
