import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts'

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const RECIPES = [
  {
    id: 1,
    name: '닭가슴살 아보카도 샐러드',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80',
    time: 20, difficulty: '쉬움', category: 'diet', kcal: 340,
    carb: 12, protein: 42, fat: 14,
    tags: ['고단백', '저탄수화물', '500kcal미만'],
    desc: '촉촉한 닭가슴살과 크리미한 아보카도의 완벽한 조화. 운동 후 최고의 회복 식단.',
    altIngredients: [{ original: '마요네즈', alt: '그릭요거트' }, { original: '설탕', alt: '알룰로스' }],
    ingredients: [
      { id: '001', name: '닭가슴살', amount: 150, unit: 'g' },
      { id: '002', name: '아보카도', amount: 0.5, unit: '개' },
      { id: '003', name: '방울토마토', amount: 8, unit: '개' },
      { id: '004', name: '루꼴라', amount: 50, unit: 'g' },
      { id: '005', name: '올리브오일', amount: 1, unit: 'tbsp' },
      { id: '006', name: '레몬즙', amount: 1, unit: 'tbsp' },
      { id: '007', name: '소금·후추', amount: 1, unit: '약간' },
    ],
    steps: [
      { title: '닭가슴살 밑간', desc: '닭가슴살에 소금, 후추를 뿌리고 10분간 재워둡니다.' },
      { title: '닭가슴살 굽기', desc: '팬에 올리브오일을 살짝 두르고 중불에서 양면 각 5분씩 굽습니다. 완전히 식힌 뒤 결대로 찢어줍니다.' },
      { title: '채소 손질', desc: '아보카도는 씨를 제거하고 슬라이스, 방울토마토는 반으로 자릅니다.' },
      { title: '드레싱 만들기', desc: '올리브오일, 레몬즙, 소금, 후추를 잘 섞어 드레싱을 만듭니다.' },
      { title: '완성', desc: '루꼴라 위에 닭가슴살, 아보카도, 토마토를 예쁘게 올리고 드레싱을 뿌려 완성합니다.' },
    ],
  },
  {
    id: 2,
    name: '두부 스테이크 곤약밥',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80',
    time: 25, difficulty: '보통', category: 'diet', kcal: 280,
    carb: 18, protein: 22, fat: 10,
    tags: ['저탄고지', '저칼로리', '500kcal미만'],
    desc: '쌀밥 대신 곤약밥을 사용해 칼로리를 대폭 낮춘, 포만감 최강 다이어트 한끼.',
    altIngredients: [{ original: '쌀밥', alt: '곤약밥' }, { original: '간장', alt: '저염간장' }],
    ingredients: [
      { id: '001', name: '두부 (단단한)', amount: 200, unit: 'g' },
      { id: '002', name: '곤약밥', amount: 200, unit: 'g' },
      { id: '003', name: '양파', amount: 0.5, unit: '개' },
      { id: '004', name: '브로콜리', amount: 100, unit: 'g' },
      { id: '005', name: '저염간장', amount: 2, unit: 'tbsp' },
      { id: '006', name: '참기름', amount: 1, unit: 'tsp' },
    ],
    steps: [
      { title: '두부 물기 제거', desc: '두부를 키친타월로 감싸 무거운 것으로 15분 이상 눌러 물기를 완전히 제거합니다.' },
      { title: '두부 굽기', desc: '기름 없이 달군 팬에 두부를 올려 양면이 황금빛이 될 때까지 중강불로 굽습니다.' },
      { title: '채소 볶기', desc: '같은 팬에 양파, 브로콜리 순서로 살짝 볶아줍니다.' },
      { title: '소스 코팅', desc: '저염간장과 참기름을 섞어 두부와 채소에 골고루 코팅합니다.' },
      { title: '완성', desc: '곤약밥 위에 두부 스테이크와 채소를 올려 완성합니다.' },
    ],
  },
  {
    id: 3,
    name: '오버나이트 그릭 오트',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80',
    time: 5, difficulty: '쉬움', category: 'diet', kcal: 380,
    carb: 48, protein: 18, fat: 8,
    tags: ['고단백', '저지방', '500kcal미만'],
    desc: '전날 밤 5분이면 준비 끝! 아침을 바꾸는 마법의 오버나이트 오트.',
    altIngredients: [{ original: '꿀', alt: '알룰로스' }, { original: '일반 우유', alt: '무지방 우유' }],
    ingredients: [
      { id: '001', name: '오트밀', amount: 50, unit: 'g' },
      { id: '002', name: '그릭요거트', amount: 100, unit: 'g' },
      { id: '003', name: '무지방 우유', amount: 100, unit: 'ml' },
      { id: '004', name: '블루베리', amount: 50, unit: 'g' },
      { id: '005', name: '아몬드 슬라이스', amount: 10, unit: 'g' },
      { id: '006', name: '알룰로스', amount: 1, unit: 'tbsp' },
    ],
    steps: [
      { title: '재료 혼합', desc: '유리 용기에 오트밀, 그릭요거트, 무지방 우유, 알룰로스를 넣고 잘 섞습니다.' },
      { title: '냉장 숙성', desc: '뚜껑을 닫고 냉장고에서 최소 8시간(하룻밤) 보관합니다.' },
      { title: '토핑 & 완성', desc: '아침에 꺼내 블루베리와 아몬드 슬라이스를 올려 바로 즐깁니다.' },
    ],
  },
  {
    id: 4,
    name: '연어 아보카도 포케볼',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=80',
    time: 15, difficulty: '쉬움', category: 'diet', kcal: 490,
    carb: 35, protein: 35, fat: 20,
    tags: ['고단백', '오메가3', '500kcal미만'],
    desc: '하와이안 포케볼에서 영감받은 영양 만점 한끼. 오메가3 풍부한 연어로 건강하게.',
    altIngredients: [{ original: '흰쌀밥', alt: '현미밥' }, { original: '일반 간장', alt: '저염간장' }],
    ingredients: [
      { id: '001', name: '생연어 (회용)', amount: 150, unit: 'g' },
      { id: '002', name: '현미밥', amount: 150, unit: 'g' },
      { id: '003', name: '아보카도', amount: 0.5, unit: '개' },
      { id: '004', name: '오이', amount: 0.5, unit: '개' },
      { id: '005', name: '에다마메 (냉동)', amount: 50, unit: 'g' },
      { id: '006', name: '저염간장', amount: 1, unit: 'tbsp' },
      { id: '007', name: '참기름', amount: 0.5, unit: 'tsp' },
      { id: '008', name: '와사비', amount: 1, unit: '약간' },
    ],
    steps: [
      { title: '연어 마리네이드', desc: '연어를 한입 크기로 자르고 저염간장, 참기름을 섞어 5분간 재웁니다.' },
      { title: '채소 준비', desc: '아보카도와 오이를 깍둑썰기합니다. 에다마메는 끓는 물에 3분 데칩니다.' },
      { title: '포케볼 완성', desc: '현미밥을 그릇에 담고 연어, 아보카도, 오이, 에다마메를 색감 있게 올립니다.' },
      { title: '마무리', desc: '와사비와 남은 마리네이드를 곁들여 완성합니다.' },
    ],
  },
  {
    id: 5,
    name: '단호박 두부 수프',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80',
    time: 30, difficulty: '쉬움', category: 'diet', kcal: 220,
    carb: 28, protein: 12, fat: 6,
    tags: ['저칼로리', '비건', '500kcal미만'],
    desc: '달콤한 단호박과 부드러운 두부가 만나 만들어내는 따뜻하고 건강한 수프.',
    altIngredients: [{ original: '생크림', alt: '두유' }],
    ingredients: [
      { id: '001', name: '단호박', amount: 300, unit: 'g' },
      { id: '002', name: '두부 (연두부)', amount: 150, unit: 'g' },
      { id: '003', name: '양파', amount: 0.5, unit: '개' },
      { id: '004', name: '채수', amount: 400, unit: 'ml' },
      { id: '005', name: '두유 (무가당)', amount: 100, unit: 'ml' },
      { id: '006', name: '올리브오일', amount: 1, unit: 'tsp' },
    ],
    steps: [
      { title: '단호박 익히기', desc: '단호박을 전자레인지에 5분 돌린 뒤 껍질을 제거하고 굵게 썹니다.' },
      { title: '양파 볶기', desc: '냄비에 올리브오일을 두르고 양파가 투명해질 때까지 중불로 볶습니다.' },
      { title: '끓이기', desc: '단호박과 채수를 넣고 15분 끓입니다. 단호박이 완전히 무를 때까지.' },
      { title: '블렌딩', desc: '핸드블렌더로 곱게 갑니다. 두유와 두부를 넣고 다시 한번 곱게 갑니다.' },
      { title: '마무리', desc: '소금으로 간을 맞추고 따뜻하게 서빙합니다. 호박씨나 올리브오일로 마무리하면 예쁩니다.' },
    ],
  },
  {
    id: 6,
    name: '감자 크림 뇨끼',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80',
    time: 45, difficulty: '어려움', category: 'normal', kcal: 620,
    carb: 75, protein: 15, fat: 28,
    tags: ['이탈리안', '크리미', '위로음식'],
    desc: '손으로 직접 빚는 쫄깃한 뇨끼와 진한 크림소스의 감동적인 만남.',
    altIngredients: [],
    ingredients: [
      { id: '001', name: '감자', amount: 400, unit: 'g' },
      { id: '002', name: '중력분', amount: 120, unit: 'g' },
      { id: '003', name: '계란 노른자', amount: 1, unit: '개' },
      { id: '004', name: '생크림', amount: 200, unit: 'ml' },
      { id: '005', name: '파마산 치즈', amount: 50, unit: 'g' },
      { id: '006', name: '버터', amount: 20, unit: 'g' },
      { id: '007', name: '마늘', amount: 2, unit: '쪽' },
    ],
    steps: [
      { title: '감자 삶기', desc: '감자를 껍질째 삶아 완전히 무르면 껍질을 벗기고 곱게 으깹니다. 충분히 식혀주세요.' },
      { title: '반죽 만들기', desc: '으깬 감자에 밀가루, 계란 노른자, 소금을 넣어 부드럽게 반죽합니다. 과반죽 절대 금지!' },
      { title: '뇨끼 성형', desc: '반죽을 긴 막대 모양으로 밀어 2cm 간격으로 자릅니다. 포크로 무늬를 내면 소스가 잘 배어듭니다.' },
      { title: '뇨끼 삶기', desc: '끓는 소금물에 뇨끼를 넣고 떠오른 후 30초가 지나면 건져냅니다.' },
      { title: '크림소스', desc: '버터에 마늘을 볶고 생크림을 넣어 반으로 졸입니다. 파마산 치즈를 넣어 농도를 맞춥니다.' },
      { title: '완성', desc: '뇨끼와 크림소스를 버무려 접시에 담고 파마산 치즈를 듬뿍 갈아 올려 완성합니다.' },
    ],
  },
  {
    id: 7,
    name: '마파두부 덮밥',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=700&q=80',
    time: 20, difficulty: '보통', category: 'normal', kcal: 540,
    carb: 65, protein: 24, fat: 18,
    tags: ['중식', '매콤', '간단'],
    desc: '얼얼하게 매콤한 쓰촨풍 마파두부를 집에서 간단하게 즐겨보세요.',
    altIngredients: [],
    ingredients: [
      { id: '001', name: '두부 (부드러운)', amount: 300, unit: 'g' },
      { id: '002', name: '돼지고기 다짐육', amount: 100, unit: 'g' },
      { id: '003', name: '두반장', amount: 2, unit: 'tbsp' },
      { id: '004', name: '굴소스', amount: 1, unit: 'tbsp' },
      { id: '005', name: '마늘', amount: 3, unit: '쪽' },
      { id: '006', name: '생강', amount: 1, unit: '조각' },
      { id: '007', name: '대파', amount: 1, unit: '대' },
      { id: '008', name: '쌀밥', amount: 200, unit: 'g' },
    ],
    steps: [
      { title: '두부 데치기', desc: '두부를 2cm 깍둑썰기하고 끓는 소금물에 2분 데쳐 간수를 뺍니다.' },
      { title: '향신료 볶기', desc: '기름을 달구고 마늘, 생강, 대파 흰 부분을 넣어 향이 올라올 때까지 볶습니다.' },
      { title: '고기 볶기', desc: '다짐육을 넣어 색이 변할 때까지 볶은 뒤 두반장을 넣어 1분 더 볶습니다.' },
      { title: '졸이기', desc: '물 200ml와 굴소스를 넣고 두부를 넣어 약불에서 5분간 졸입니다.' },
      { title: '완성', desc: '참기름 한 방울을 마지막에 넣고 밥 위에 올려 대파 녹색 부분으로 장식합니다.' },
    ],
  },
  {
    id: 8,
    name: '에그 클라우드 토스트',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=700&q=80',
    time: 15, difficulty: '쉬움', category: 'normal', kcal: 280,
    carb: 22, protein: 14, fat: 14,
    tags: ['브런치', '간단', '인스타감성'],
    desc: 'SNS에서 화제! 구름처럼 폭신한 에그 클라우드 토스트를 집에서 만들어보세요.',
    altIngredients: [],
    ingredients: [
      { id: '001', name: '식빵', amount: 2, unit: '장' },
      { id: '002', name: '계란', amount: 2, unit: '개' },
      { id: '003', name: '파마산 치즈', amount: 2, unit: 'tbsp' },
      { id: '004', name: '소금·후추', amount: 1, unit: '약간' },
    ],
    steps: [
      { title: '흰자 분리', desc: '계란을 흰자와 노른자로 분리합니다. 노른자가 깨지지 않도록 조심해주세요.' },
      { title: '머랭 만들기', desc: '흰자에 소금 한 꼬집을 넣고 단단한 뿔이 생길 때까지 힘차게 휘핑합니다.' },
      { title: '치즈 섞기', desc: '머랭에 파마산 치즈를 넣고 가볍게 섞어줍니다.' },
      { title: '굽기', desc: '식빵 위에 머랭을 올리고 가운데에 노른자를 올립니다. 200°C 오븐에서 6~8분 굽습니다.' },
      { title: '완성', desc: '후추를 뿌리고 즉시 서빙합니다. 빨리 먹을수록 폭신함이 살아있습니다!' },
    ],
  },
]

const DIET_TAGS    = ['전체', '저탄고지', '고단백', '저칼로리', '저탄수화물', '저지방', '500kcal미만', '비건', '오메가3']
const NORMAL_TAGS  = ['전체', '이탈리안', '중식', '브런치', '간단', '매콤', '위로음식', '인스타감성']
const DIFFICULTIES = { 쉬움: '🟢', 보통: '🟡', 어려움: '🔴' }

const NAV = [
  { id: 'home',     label: '홈',        icon: '🏠' },
  { id: 'diet',     label: '다이어트',  icon: '🥗' },
  { id: 'normal',   label: '일반레시피', icon: '🍳' },
  { id: 'register', label: '레시피등록', icon: '✏️' },
]

/* ════════════════════════════════════════════════
   SMALL COMPONENTS
════════════════════════════════════════════════ */
const Tag = ({ label, color = 'green' }) => (
  <span style={{
    display: 'inline-block',
    background: color === 'green' ? 'rgba(90,142,68,0.12)' : 'rgba(224,124,58,0.12)',
    color:      color === 'green' ? '#4a7c35' : '#c4611a',
    border:     `1px solid ${color === 'green' ? 'rgba(90,142,68,0.25)' : 'rgba(224,124,58,0.25)'}`,
    borderRadius: 20,
    padding: '2px 10px',
    fontSize: 11,
    fontWeight: 700,
  }}>{label}</span>
)

const StatPill = ({ icon, label, value }) => (
  <div style={{
    background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
    padding: '14px 10px', textAlign: 'center',
    boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
  }}>
    <span style={{ fontSize: 24 }}>{icon}</span>
    <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--green-600)', lineHeight: 1 }}>{value}</span>
    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</span>
  </div>
)

const NutritionBar = ({ label, value, max, color }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 700 }}>{value}g</span>
    </div>
    <div className="nutrition-bar-track">
      <div className="nutrition-bar-fill" style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }} />
    </div>
  </div>
)

/* ════════════════════════════════════════════════
   RECIPE CARD
════════════════════════════════════════════════ */
const RecipeCard = ({ recipe, onClick, animDelay = 0 }) => (
  <div
    className="recipe-card fade-up"
    style={{ animationDelay: `${animDelay}s` }}
    onClick={() => onClick(recipe)}
    role="button"
    tabIndex={0}
    aria-label={`${recipe.name} 레시피 보기`}
    onKeyDown={e => e.key === 'Enter' && onClick(recipe)}
  >
    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
      <img
        src={recipe.image} alt={recipe.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
      {recipe.category === 'diet' && (
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--green-700)', borderRadius: 10, padding: '3px 10px', fontSize: 11, fontWeight: 800, color: '#fff' }}>
          다이어트 🥗
        </div>
      )}
      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 10, padding: '3px 10px', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
        ⏱ {recipe.time}분
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{DIFFICULTIES[recipe.difficulty]} {recipe.difficulty}</span>
      </div>
    </div>
    <div style={{ padding: '16px 18px 18px' }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1.3 }}>{recipe.name}</h3>
      <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>{recipe.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: recipe.category === 'diet' ? 12 : 0 }}>
        {recipe.tags.slice(0, 3).map(t => <Tag key={t} label={t} />)}
      </div>
      {recipe.category === 'diet' && (
        <div style={{ display: 'flex', gap: 10, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          {[['🔥', recipe.kcal, 'kcal', '#e07c3a'], ['💪', recipe.protein + 'g', '단백질', 'var(--green-500)'], ['🌾', recipe.carb + 'g', '탄수', 'var(--blue-500)'], ['🫙', recipe.fat + 'g', '지방', 'var(--brown-500)']].map(([ico, val, lbl, clr]) => (
            <div key={lbl} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: clr }}>{val}</div>
              <div style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 1 }}>{lbl}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)

/* ════════════════════════════════════════════════
   RECIPE DETAIL
════════════════════════════════════════════════ */
const RecipeDetail = ({ recipe, onBack }) => {
  const [servings, setServings]   = useState(1)
  const [activeStep, setActiveStep] = useState(0)

  const fmt = (n) => { const v = n * servings; return v % 1 === 0 ? v : v.toFixed(1) }

  const pieData = [
    { name: '탄수화물', value: recipe.carb * 4,    fill: '#4a7abf' },
    { name: '단백질',   value: recipe.protein * 4, fill: '#5a8e44' },
    { name: '지방',     value: recipe.fat * 9,     fill: '#c4845a' },
  ]
  const barData = [{ name: '영양소', 탄수화물: recipe.carb, 단백질: recipe.protein, 지방: recipe.fat }]

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', paddingBottom: 80 }} className="fade-in">
      {/* Hero */}
      <div style={{ position: 'relative' }}>
        <img src={recipe.image} alt={recipe.name}
          style={{ width: '100%', height: 'clamp(220px, 40vw, 380px)', objectFit: 'cover', display: 'block' }}
          loading="eager"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
        <button
          onClick={onBack}
          style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(8px)' }}
        >
          ← 뒤로
        </button>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 24px 28px' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {recipe.tags.map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{recipe.name}</h1>
          <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 1.6 }}>{recipe.desc}</p>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Quick Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '24px 0' }}>
          {[['⏱', '조리 시간', `${recipe.time}분`], ['📊', '난이도', recipe.difficulty], ['🔥', '칼로리', `${recipe.kcal * servings} kcal`]].map(([icon, lbl, val]) => (
            <StatPill key={lbl} icon={icon} label={lbl} value={val} />
          ))}
        </div>

        {/* Nutrition Charts (diet only) */}
        {recipe.category === 'diet' && (
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 20, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>📊 영양 성분 분석</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, alignItems: 'center' }}>
              {/* Bars */}
              <div>
                <NutritionBar label="탄수화물" value={recipe.carb * servings} max={100} color="#4a7abf" />
                <NutritionBar label="단백질"   value={recipe.protein * servings} max={60} color="#5a8e44" />
                <NutritionBar label="지방"     value={recipe.fat * servings} max={60} color="#c4845a" />
                <div style={{ marginTop: 14, padding: '12px', background: 'var(--orange-100)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>총 칼로리</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--orange-500)', lineHeight: 1.1 }}>{recipe.kcal * servings}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>kcal</div>
                </div>
              </div>
              {/* Pie */}
              <div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                      {pieData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Pie>
                    <Tooltip formatter={v => [`${Math.round(v)}kcal`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
                  {pieData.map(d => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: d.fill }} />
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Serving Calculator */}
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '20px 20px', marginBottom: 20, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>🛒 재료</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-alt)', borderRadius: 14, padding: '6px 14px', border: '1px solid var(--border-hover)' }}>
              <button onClick={() => setServings(Math.max(1, servings - 1))}
                style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--green-500)', background: 'transparent', color: 'var(--green-600)', fontWeight: 900, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>−</button>
              <span style={{ fontSize: 16, fontWeight: 800, minWidth: 24, textAlign: 'center' }}>{servings}</span>
              <button onClick={() => setServings(servings + 1)}
                style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'var(--green-500)', color: '#fff', fontWeight: 900, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>+</button>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>인분</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
            {recipe.ingredients.map(ing => (
              <div key={ing.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 13px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{ing.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginLeft: 8, whiteSpace: 'nowrap' }}>{fmt(ing.amount)}{ing.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alt Ingredients */}
        {recipe.altIngredients.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, var(--green-50), #e8f4e1)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 20, border: '1px solid rgba(90,142,68,0.2)' }}>
            <h2 style={{ margin: '0 0 14px', fontSize: 17, fontWeight: 800, color: 'var(--green-800)' }}>🔄 건강한 대체 식재료</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recipe.altIngredients.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ background: '#fff', borderRadius: 10, padding: '6px 13px', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{item.original}</span>
                  <span style={{ color: 'var(--green-500)', fontSize: 18, fontWeight: 900 }}>→</span>
                  <span style={{ background: 'var(--green-700)', borderRadius: 10, padding: '6px 13px', fontSize: 13, color: '#fff', fontWeight: 800 }}>{item.alt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>👨‍🍳 조리 순서</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recipe.steps.map((step, i) => (
              <div key={i} className={`step-card${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(activeStep === i ? -1 : i)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveStep(activeStep === i ? -1 : i)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: activeStep === i ? 'var(--green-600)' : 'var(--border)', color: activeStep === i ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0, transition: 'all 0.25s' }}>{i + 1}</div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: activeStep === i ? 'var(--green-800)' : 'var(--text-primary)' }}>{step.title}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 16, color: 'var(--text-faint)', transition: 'transform 0.25s', transform: activeStep === i ? 'rotate(180deg)' : 'none' }}>⌄</span>
                </div>
                {activeStep === i && (
                  <p className="slide-down" style={{ margin: '12px 0 0 46px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{step.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   RECIPE LIST PAGE
════════════════════════════════════════════════ */
const RecipeListPage = ({ category, setDetail }) => {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('전체')
  const tags = category === 'diet' ? DIET_TAGS : NORMAL_TAGS

  const filtered = useMemo(() => RECIPES.filter(r => {
    if (r.category !== category) return false
    if (activeTag !== '전체' && !r.tags.includes(activeTag)) return false
    const q = search.trim().toLowerCase()
    if (!q) return true
    return r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.name.toLowerCase().includes(q)) || r.tags.some(t => t.toLowerCase().includes(q))
  }), [category, activeTag, search])

  return (
    <div>
      <div className="search-wrap" style={{ marginBottom: 16 }}>
        <span className="search-icon">🔍</span>
        <input className="input-field" placeholder="요리명 또는 재료로 검색..." value={search} onChange={e => setSearch(e.target.value)} aria-label="레시피 검색" />
      </div>
      <div className="tag-scroll" style={{ marginBottom: 20 }} role="list" aria-label="필터 태그">
        {tags.map(tag => (
          <button key={tag} className={`tag-pill${activeTag === tag ? ' active' : ''}`} onClick={() => setActiveTag(tag)} role="listitem">{tag}</button>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>레시피 <strong style={{ color: 'var(--green-600)' }}>{filtered.length}</strong>개</p>
      {filtered.length === 0
        ? <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🥕</div>
            <p style={{ color: 'var(--text-faint)', fontSize: 15 }}>검색 결과가 없습니다</p>
          </div>
        : <div className="recipe-grid">
            {filtered.map((r, i) => <RecipeCard key={r.id} recipe={r} onClick={setDetail} animDelay={i * 0.05} />)}
          </div>
      }
    </div>
  )
}

/* ════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════ */
const HomePage = ({ setPage, setDetail }) => {
  const dietRecipes = RECIPES.filter(r => r.category === 'diet')
  const avgKcal = Math.round(dietRecipes.reduce((a, r) => a + r.kcal, 0) / dietRecipes.length)

  return (
    <div>
      {/* Hero Banner */}
      <div className="fade-up" style={{ borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, #2d5020 0%, #4a7c35 45%, #7ab55c 100%)', padding: 'clamp(24px, 5vw, 40px)', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -50, right: 60, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ margin: '0 0 6px', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>건강한 식탁을 위한</p>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)', lineHeight: 1.25 }}>
            다이어트 레시피<br />한눈에 보기 🥗
          </h1>
          <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 1.7 }}>
            칼로리 걱정 없이 맛있게!<br />영양 성분까지 한눈에 확인하세요.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setPage('diet')} style={{ background: '#fff', color: 'var(--green-800)', border: 'none', borderRadius: 14, padding: '12px 22px', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
              다이어트 레시피 →
            </button>
            <button onClick={() => setPage('normal')} style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 14, padding: '12px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              일반 레시피
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="fade-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        <StatPill icon="🥗" label="다이어트 레시피" value={dietRecipes.length} />
        <StatPill icon="🔥" label="평균 칼로리" value={`${avgKcal}kcal`} />
        <StatPill icon="📚" label="전체 레시피" value={RECIPES.length} />
      </div>

      {/* Featured */}
      <div className="fade-up delay-2">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>⭐ 추천 다이어트 레시피</h2>
          <button onClick={() => setPage('diet')} style={{ background: 'none', border: 'none', color: 'var(--green-600)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>전체보기 →</button>
        </div>
        <div className="recipe-grid">
          {dietRecipes.slice(0, 3).map((r, i) => <RecipeCard key={r.id} recipe={r} onClick={setDetail} animDelay={i * 0.08} />)}
        </div>
      </div>

      {/* Quick Filter */}
      <div className="fade-up delay-3" style={{ marginTop: 32, background: 'linear-gradient(135deg, var(--orange-100), #fdf0e6)', borderRadius: 'var(--radius-lg)', padding: 22, border: '1px solid rgba(224,124,58,0.15)' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 800, color: '#b85e2a' }}>⚡ 빠른 필터로 찾기</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DIET_TAGS.slice(1).map(tag => (
            <button key={tag} onClick={() => setPage('diet')} style={{ padding: '8px 14px', borderRadius: 20, border: '2px solid rgba(224,124,58,0.2)', background: 'rgba(255,255,255,0.75)', color: '#b85e2a', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = '#e07c3a'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.75)'; e.target.style.color = '#b85e2a' }}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   REGISTER PAGE
════════════════════════════════════════════════ */
const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', time: '', difficulty: '쉬움', category: 'diet', kcal: '', protein: '', carb: '', fat: '', tags: '', desc: '' })
  const [submitted, setSubmitted] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.name.trim() && form.time

  const Input = ({ label, field, type = 'text', placeholder, half = false }) => (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{label}</label>
      <input className="input-field" type={type} placeholder={placeholder} value={form[field]} onChange={e => set(field, e.target.value)} />
    </div>
  )

  if (submitted) return (
    <div className="scale-in" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)', marginBottom: 8 }}>레시피가 등록되었어요!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>소중한 레시피를 공유해 주셔서 감사합니다.</p>
      <button onClick={() => { setSubmitted(false); setForm({ name: '', time: '', difficulty: '쉬움', category: 'diet', kcal: '', protein: '', carb: '', fat: '', tags: '', desc: '' }) }}
        style={{ background: 'var(--green-700)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 30px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
        다른 레시피 등록하기
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: 580, margin: '0 auto' }} className="fade-up">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 23, color: 'var(--text-primary)', marginBottom: 4, marginTop: 0 }}>레시피 등록 ✍️</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 28 }}>나만의 건강 레시피를 공유해보세요!</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Name - full width */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>요리명 *</label>
          <input className="input-field" placeholder="예: 닭가슴살 아보카도 샐러드" value={form.name} onChange={e => set('name', e.target.value)} />
        </div>
        <Input label="조리 시간 (분) *" field="time" type="number" placeholder="20" half />
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>난이도</label>
          <select className="input-field" value={form.difficulty} onChange={e => set('difficulty', e.target.value)} style={{ appearance: 'none' }}>
            {['쉬움', '보통', '어려움'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        {/* Category */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>카테고리</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['diet', '🥗 다이어트'], ['normal', '🍳 일반']].map(([val, lbl]) => (
              <button key={val} onClick={() => set('category', val)}
                style={{ flex: 1, padding: '11px', border: `2px solid ${form.category === val ? 'var(--green-500)' : 'var(--border-hover)'}`, borderRadius: 'var(--radius-md)', background: form.category === val ? 'var(--green-50)' : 'var(--surface)', fontWeight: 700, fontSize: 14, cursor: 'pointer', color: form.category === val ? 'var(--green-800)' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
        {/* Description */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>요리 설명</label>
          <textarea className="input-field" placeholder="요리를 간단히 소개해주세요" value={form.desc} onChange={e => set('desc', e.target.value)}
            style={{ resize: 'vertical', minHeight: 80, border: '1.5px solid var(--border-hover)', borderRadius: 'var(--radius-md)', padding: '13px 16px', fontSize: 14, color: 'var(--text-primary)', width: '100%' }} />
        </div>
        {/* Nutrition */}
        <div style={{ gridColumn: 'span 2', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', padding: 18, border: '1px solid var(--border)' }}>
          <p style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>🔥 영양 정보</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['kcal', '칼로리 (kcal)'], ['protein', '단백질 (g)'], ['carb', '탄수화물 (g)'], ['fat', '지방 (g)']].map(([k, lbl]) => (
              <div key={k}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>{lbl}</label>
                <input className="input-field" type="number" placeholder="0" value={form[k]} onChange={e => set(k, e.target.value)} style={{ border: '1.5px solid var(--border-hover)' }} />
              </div>
            ))}
          </div>
        </div>
        {/* Tags */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>다이어트 태그 (쉼표로 구분)</label>
          <input className="input-field" placeholder="예: 고단백, 저탄수화물, 500kcal미만" value={form.tags} onChange={e => set('tags', e.target.value)} />
        </div>
        {/* Submit */}
        <div style={{ gridColumn: 'span 2' }}>
          <button onClick={() => valid && setSubmitted(true)}
            style={{ width: '100%', padding: 16, background: valid ? 'var(--green-700)' : '#ddd', color: valid ? '#fff' : '#aaa', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 800, cursor: valid ? 'pointer' : 'not-allowed', transition: 'all 0.2s', marginTop: 4 }}>
            {valid ? '레시피 등록하기 🚀' : '요리명과 조리 시간을 입력해주세요'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   APP
════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage]     = useState('home')
  const [detail, setDetail] = useState(null)

  const handleDetail = useCallback((recipe) => {
    setDetail(recipe)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleBack = useCallback(() => {
    setDetail(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const changePage = useCallback((p) => {
    setDetail(null)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const pageTitle = { home: '홈', diet: '다이어트 레시피', normal: '일반 레시피', register: '레시피 등록' }

  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      {!detail && (
        <header className="app-header" role="banner">
          <div className="header-inner">
            <div className="header-logo" onClick={() => changePage('home')} role="link" tabIndex={0} aria-label="그린레시피 홈으로" onKeyDown={e => e.key === 'Enter' && changePage('home')}>
              <div className="logo-icon">🥦</div>
              <span className="logo-text">그린레시피</span>
              <span className="logo-badge">BETA</span>
            </div>
            {/* Desktop nav */}
            <nav className="header-desktop-nav" aria-label="메인 내비게이션">
              {NAV.map(item => (
                <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => changePage(item.id)} aria-current={page === item.id ? 'page' : undefined}>
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>
          </div>
        </header>
      )}

      {/* ── Detail Header ── */}
      {detail && (
        <header className="app-header" role="banner" style={{ zIndex: 0, position: 'relative', boxShadow: 'none' }}>
          {/* transparent — hero covers it */}
        </header>
      )}

      {/* ── Main Content ── */}
      <main className={`main-content${detail ? ' detail-mode' : ''}`} id="main" role="main">
        {detail ? (
          <RecipeDetail recipe={detail} onBack={handleBack} />
        ) : page === 'home' ? (
          <HomePage setPage={changePage} setDetail={handleDetail} />
        ) : page === 'diet' ? (
          <>
            <div style={{ marginBottom: 22 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', margin: '0 0 4px' }}>🥗 다이어트 레시피</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>저칼로리 · 고단백 · 영양 가득 건강식 모음</p>
            </div>
            <RecipeListPage category="diet" setDetail={handleDetail} />
          </>
        ) : page === 'normal' ? (
          <>
            <div style={{ marginBottom: 22 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', margin: '0 0 4px' }}>🍳 일반 레시피</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>맛있고 다양한 일상 요리 모음</p>
            </div>
            <RecipeListPage category="normal" setDetail={handleDetail} />
          </>
        ) : (
          <RegisterPage />
        )}
      </main>

      {/* ── Bottom Nav (Mobile) ── */}
      {!detail && (
        <nav className="bottom-nav" aria-label="하단 내비게이션">
          {NAV.map(item => (
            <button key={item.id} className={`bottom-nav-item${page === item.id ? ' active' : ''}`} onClick={() => changePage(item.id)} aria-label={item.label} aria-current={page === item.id ? 'page' : undefined}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              <span className="nav-dot" />
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
