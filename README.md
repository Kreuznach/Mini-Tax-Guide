# Mini Tax Guide — 개인사업자 세금 가이드

> **개인사업자가 업종별 세금 일정과 절세 준비사항을 가볍게 확인하는 DB 없는 정적 웹서비스**

**서비스명: Mini Tax Guide**

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-Personal-green)](LICENSE)

---

## 📋 서비스 개요

세금 신고 직전에 당황하지 않도록, 개인사업자에게 필요한 세무 정보를 한 페이지에 정리한 서비스입니다.

- **DB 없음**: 모든 데이터는 `/src/data/*.json` 정적 파일로 관리
- **로컬 저장**: 체크리스트 상태와 업종 선택은 `localStorage`에 저장 (서버 전송 없음)
- **일반 정보 제공**: 세무 자문을 대체하지 않습니다

---

## ✨ MVP1 기능 (현재 구현)

| 기능 | 설명 |
|------|------|
| 업종 선택 | IT 프리랜서, 온라인 판매, 크리에이터, 음식점/카페, 미용/서비스, 임대업, 전문직, 기타 |
| 세금 일정 | `taxCalendar.json` 기반 월별 세금 신고 일정 + 월 선택 드롭다운 |
| 절세 체크리스트 | 업종별 맞춤 항목 표시, localStorage 저장 |
| 세금 준비도 점수 | 체크 항목 기반 0-100점 실시간 계산 |
| 공식 링크 | 국세청, 홈택스, 노란우산공제, 전자기부금영수증 (새 탭 열기) |
| 다크 모드 | 시스템 기본값 + 수동 토글, localStorage 저장 |
| 모바일 반응형 | 모바일 우선 설계, 햄버거 메뉴 |
| D-day 표시 | 히어로 섹션에서 다음 세금 신고 D-day 자동 계산 |
| 면책 문구 | 세무 자문 비대체 명시 |

---

## 🔮 MVP2 예정 기능

- `.ics` 캘린더 다운로드
- 업종별 상세 페이지
- 블로그형 세금 콘텐츠
- 세무사 제휴 문의 버튼
- 카카오톡 공유
- "내 신고 준비 PDF 저장" 기능

---

## 🗂️ 프로젝트 구조

```
Mini-Tax-Guide/
├── index.html                  # Vite 진입점
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vercel.json                 # Vercel SPA 리다이렉트 설정
├── .gitignore                  # html/ 폴더 포함 (TeleportHQ 목업 제외)
├── PROGRESS.md                 # MVP 진행 현황
├── html/                       # [gitignored] TeleportHQ 원본 목업
└── src/                        # Mini Tax Guide 소스코드
    ├── main.tsx                # React 앱 진입점
    ├── App.tsx                 # 루트 컴포넌트, 전역 상태 관리
    ├── App.module.css
    ├── vite-env.d.ts
    ├── types/
    │   └── index.ts            # TypeScript 타입 정의
    ├── hooks/
    │   ├── useLocalStorage.ts  # localStorage 퍼시스턴스 훅
    │   └── useTheme.ts         # 다크/라이트 모드 토글 훅
    ├── data/                   # 정적 JSON 데이터 (세법 변경 시 이 파일만 수정)
    │   ├── taxCalendar.json    # 연간 세금 신고 일정
    │   ├── industries.json     # 업종 목록 및 체크리스트 매핑
    │   ├── checklist.json      # 절세 체크리스트 항목
    │   └── officialLinks.json  # 공식 사이트 링크
    ├── styles/
    │   └── global.css          # CSS 변수, 리셋, 유틸리티 클래스
    └── components/
        ├── Icon/
        │   └── Icon.tsx        # SVG 아이콘 컴포넌트
        ├── Header/             # 네비게이션, 다크모드 토글
        ├── HeroSection/        # 히어로 배너 + D-day 카드
        ├── IndustrySelectorSection/  # 업종 선택 그리드
        ├── TaxCalendarSection/       # 월별 세금 일정
        ├── ChecklistSection/         # 체크리스트 + 준비도 점수
        ├── OfficialLinksSection/     # 공식 링크 + 면책 고지
        └── Footer/             # 푸터
```

---

## 📦 데이터 파일 관리

모든 세금 데이터는 `/src/data/` 폴더의 JSON 파일로 관리됩니다.  
**세법 개정 시 해당 JSON 파일만 수정하면 됩니다.**

각 JSON 파일에는 `lastUpdated`, `sourceName`, `sourceUrl` 필드가 포함되어 있어 데이터 신뢰성을 추적할 수 있습니다.

| 파일 | 설명 |
|------|------|
| `taxCalendar.json` | 월별 세금 신고 이벤트 (12개월) |
| `industries.json` | 업종 정보 및 매핑 체크리스트 ID |
| `checklist.json` | 절세 체크리스트 항목 (가중치 포함) |
| `officialLinks.json` | 공식 사이트 링크 |

---

## 🚀 개발 시작

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🌐 Vercel 배포

1. GitHub에 푸시
2. [Vercel](https://vercel.com)에서 저장소 연결
3. Framework Preset: **Vite** 선택
4. Build Command: `npm run build`
5. Output Directory: `dist`

`vercel.json`의 SPA 리다이렉트 설정이 포함되어 있습니다.

---

## ⚠️ 법적 고지

Mini Tax Guide는 **일반 정보 제공**을 목적으로 하며, 세무 신고를 대신하거나 세무 자문을 제공하지 않습니다.  
실제 신고 전에는 국세청, 홈택스 또는 공인세무사를 통해 반드시 최종 확인하시기 바랍니다.  
세법은 매년 개정될 수 있으며, 본 서비스의 정보가 최신이 아닐 수 있습니다.
