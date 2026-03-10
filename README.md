# 🥦 그린레시피 (Green Recipe)

> 다이어터와 요리 초보를 위한 건강 레시피 앱  
> 칼로리 걱정 없이, 맛있고 건강하게!

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)](https://vitejs.dev)

---

## 📱 스크린샷

| 홈 | 다이어트 레시피 | 레시피 상세 |
|:---:|:---:|:---:|
| 추천 레시피 · 빠른 필터 | 태그 필터 · 검색 | 영양 차트 · 인분 계산기 |

---

## ✨ 주요 기능

### 🥗 다이어트 특화
- **칼로리 & 영양 성분 표시** — kcal / 탄수화물 / 단백질 / 지방
- **파이 차트 시각화** — Recharts 기반 영양 비율 차트
- **건강한 대체 식재료** — 설탕 → 알룰로스, 흰쌀 → 현미밥 등

### 🔍 검색 & 필터
- **실시간 검색** — 요리명 또는 재료명으로 즉시 검색
- **다이어트 태그 필터** — 저탄고지 / 고단백 / 500kcal 미만 / 비건 등

### 📖 레시피 상세
- **단계별 카드 형식** — 클릭으로 펼치는 조리 순서
- **인분 계산기** — +/- 버튼으로 재료 양 자동 계산

### 📐 반응형 디자인
| 화면 크기 | 레이아웃 |
|-----------|---------|
| 모바일 (< 640px) | 1열 카드 + 하단 탭 바 |
| 태블릿 (640px ~) | 2열 카드 그리드 |
| 데스크탑 (≥ 900px) | 3열 카드 + 상단 헤더 내비 |

---

## 🚀 Vercel 배포 방법

### 방법 1: Vercel CLI (추천)

```bash
# 1. 프로젝트 폴더로 이동
cd green-recipe

# 2. 의존성 설치
npm install

# 3. 로컬 개발 서버 실행 (확인용)
npm run dev

# 4. Vercel CLI 설치
npm install -g vercel

# 5. 배포
vercel

# 이후 프롬프트:
# ? Set up and deploy "green-recipe"? → Y
# ? Which scope? → (본인 계정 선택)
# ? Link to existing project? → N
# ? What's your project's name? → green-recipe
# ? In which directory is your code located? → ./
# ✅ Auto-detected Vite framework → 자동 설정됨
```

### 방법 2: GitHub 연동 (자동 배포)

1. GitHub에 저장소 생성 후 푸시
   ```bash
   git init
   git add .
   git commit -m "feat: 그린레시피 초기 구현"
   git remote add origin https://github.com/YOUR_ID/green-recipe.git
   git push -u origin main
   ```

2. [vercel.com](https://vercel.com) → **Add New Project** → GitHub 저장소 선택

3. 설정 확인:
   - **Framework Preset**: Vite ✅ (자동 감지)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Deploy** 클릭 → 약 1분 후 배포 완료 🎉

### 방법 3: Vercel 웹 대시보드 (드래그 앤 드롭)

```bash
npm run build   # dist/ 폴더 생성
```

[vercel.com/new](https://vercel.com/new) → `dist/` 폴더를 드래그 앤 드롭

---

## 🛠 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🗂 프로젝트 구조

```
green-recipe/
├── public/
│   ├── favicon.svg          # 탭 아이콘 (SVG)
│   └── apple-touch-icon.svg # iOS 홈 화면 아이콘
├── src/
│   ├── main.jsx             # 앱 진입점
│   ├── App.jsx              # 메인 앱 컴포넌트
│   └── index.css            # 글로벌 스타일 & CSS 변수
├── index.html               # HTML 엔트리 (메타태그, OG, PWA 설정)
├── vite.config.js           # Vite 설정 (코드 스플리팅)
├── vercel.json              # Vercel SPA 라우팅 & 캐시 헤더
├── package.json
└── README.md
```

---

## 🧱 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 18 |
| 빌드 도구 | Vite 5 |
| 차트 | Recharts |
| 폰트 | Noto Sans KR / Noto Serif KR (Google Fonts) |
| 이미지 | Unsplash (CDN, lazy loading) |
| 배포 | Vercel |

---

## 📋 페이지 구성

| 페이지 | 설명 |
|--------|------|
| **🏠 홈** | 추천 다이어트 레시피 · 통계 · 빠른 필터 |
| **🥗 다이어트** | 저칼로리 레시피 목록 · 태그 필터 · 검색 |
| **🍳 일반 레시피** | 일반 요리 목록 · 검색 |
| **✏️ 레시피 등록** | 레시피 폼 입력 · 등록 |
| **📄 레시피 상세** | 영양 차트 · 인분 계산기 · 단계별 조리법 |

---

## ♿ 접근성

- 시맨틱 HTML (`<header>`, `<main>`, `<nav>`, `role` 속성)
- 키보드 내비게이션 지원 (`tabIndex`, `onKeyDown`)
- `aria-label` / `aria-current` 적용
- `prefers-reduced-motion` 미디어쿼리 지원

---

## 🔮 향후 개발 계획

- [ ] 레시피 즐겨찾기 (로컬스토리지)
- [ ] 주간 식단 플래너
- [ ] 레시피 공유 기능
- [ ] 다크 모드
- [ ] PWA (오프라인 지원)

---

## 📄 라이선스

MIT © 2024 그린레시피
