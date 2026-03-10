import { useState, useMemo, useEffect } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

/* ─────────────────────────────────────────────
   SAMPLE DATA
───────────────────────────────────────────── */
const RECIPES = [
  {
    id: 1,
    name: "닭가슴살 아보카도 샐러드",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    time: 20,
    difficulty: "쉬움",
    category: "diet",
    kcal: 340,
    carb: 12,
    protein: 42,
    fat: 14,
    tags: ["고단백", "저탄수화물", "500kcal미만"],
    desc: "촉촉한 닭가슴살과 크리미한 아보카도의 조화. 운동 후 최고의 회복 식단입니다.",
    altIngredients: [{ original: "마요네즈", alt: "그릭요거트" }, { original: "설탕", alt: "알룰로스" }],
    ingredients: [
      { id: "0001", name: "닭가슴살", amount: 150, unit: "g" },
      { id: "0002", name: "아보카도", amount: 0.5, unit: "개" },
      { id: "0003", name: "방울토마토", amount: 8, unit: "개" },
      { id: "0004", name: "루꼴라", amount: 50, unit: "g" },
      { id: "0005", name: "올리브오일", amount: 1, unit: "tbsp" },
      { id: "0006", name: "레몬즙", amount: 1, unit: "tbsp" },
      { id: "0007", name: "소금·후추", amount: 1, unit: "약간" },
    ],
    steps: [
      { title: "닭가슴살 준비", desc: "닭가슴살에 소금, 후추를 뿌리고 10분간 재운다." },
      { title: "닭가슴살 익히기", desc: "팬에 올리브오일을 살짝 두르고 중불에서 앞뒤로 각 5분씩 굽는다. 완전히 익으면 식혀서 결대로 찢는다." },
      { title: "채소 손질", desc: "아보카도는 씨를 제거하고 슬라이스, 방울토마토는 반으로 자른다." },
      { title: "드레싱 만들기", desc: "올리브오일, 레몬즙, 소금, 후추를 섞어 드레싱을 만든다." },
      { title: "완성", desc: "루꼴라 위에 닭가슴살, 아보카도, 토마토를 올리고 드레싱을 뿌려 완성한다." },
    ],
  },
  {
    id: 2,
    name: "두부 스테이크 곤약밥",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    time: 25,
    difficulty: "보통",
    category: "diet",
    kcal: 280,
    carb: 18,
    protein: 22,
    fat: 10,
    tags: ["저탄고지", "저칼로리", "500kcal미만"],
    desc: "일반 밥 대신 곤약밥을 사용해 칼로리를 대폭 낮춘 포만감 최강 한끼",
    altIngredients: [{ original: "쌀밥", alt: "곤약밥" }, { original: "간장소스", alt: "저염간장" }],
    ingredients: [
      { id: "0001", name: "두부", amount: 200, unit: "g" },
      { id: "0002", name: "곤약밥", amount: 200, unit: "g" },
      { id: "0003", name: "양파", amount: 0.5, unit: "개" },
      { id: "0004", name: "브로콜리", amount: 100, unit: "g" },
      { id: "0005", name: "저염간장", amount: 2, unit: "tbsp" },
      { id: "0006", name: "참기름", amount: 1, unit: "tsp" },
    ],
    steps: [
      { title: "두부 물기 제거", desc: "두부를 키친타월로 감싸 15분 이상 눌러 물기를 완전히 제거한다." },
      { title: "두부 굽기", desc: "팬에 기름 없이 두부를 올려 양면이 황금빛이 될 때까지 중강불로 굽는다." },
      { title: "채소 볶기", desc: "같은 팬에 양파, 브로콜리 순서로 볶는다." },
      { title: "소스 코팅", desc: "저염간장과 참기름을 섞어 두부와 채소에 골고루 코팅한다." },
      { title: "완성", desc: "곤약밥 위에 두부 스테이크와 채소를 올려 완성한다." },
    ],
  },
  {
    id: 3,
    name: "그릭요거트 오버나이트 오트",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    time: 5,
    difficulty: "쉬움",
    category: "diet",
    kcal: 380,
    carb: 48,
    protein: 18,
    fat: 8,
    tags: ["고단백", "저지방", "500kcal미만"],
    desc: "전날 밤 5분이면 완성! 아침을 바꾸는 마법의 오버나이트 오트",
    altIngredients: [{ original: "꿀", alt: "알룰로스" }, { original: "일반 우유", alt: "무지방 우유" }],
    ingredients: [
      { id: "0001", name: "오트밀", amount: 50, unit: "g" },
      { id: "0002", name: "그릭요거트", amount: 100, unit: "g" },
      { id: "0003", name: "무지방 우유", amount: 100, unit: "ml" },
      { id: "0004", name: "블루베리", amount: 50, unit: "g" },
      { id: "0005", name: "아몬드", amount: 10, unit: "g" },
      { id: "0006", name: "알룰로스", amount: 1, unit: "tbsp" },
    ],
    steps: [
      { title: "재료 혼합", desc: "유리 용기에 오트밀, 그릭요거트, 무지방 우유, 알룰로스를 넣고 잘 섞는다." },
      { title: "냉장 보관", desc: "뚜껑을 닫고 냉장고에서 최소 8시간 (하룻밤) 보관한다." },
      { title: "토핑", desc: "아침에 꺼내 블루베리와 아몬드를 올려 완성한다." },
    ],
  },
  {
    id: 4,
    name: "연어 아보카도 포케볼",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    time: 15,
    difficulty: "쉬움",
    category: "diet",
    kcal: 490,
    carb: 35,
    protein: 35,
    fat: 20,
    tags: ["고단백", "오메가3", "500kcal미만"],
    desc: "하와이안 포케볼에서 영감 받은 영양 만점 한끼. 오메가3가 풍부한 연어로 건강하게",
    altIngredients: [{ original: "흰쌀밥", alt: "현미밥" }, { original: "일반 간장", alt: "저염간장" }],
    ingredients: [
      { id: "0001", name: "생연어", amount: 150, unit: "g" },
      { id: "0002", name: "현미밥", amount: 150, unit: "g" },
      { id: "0003", name: "아보카도", amount: 0.5, unit: "개" },
      { id: "0004", name: "오이", amount: 0.5, unit: "개" },
      { id: "0005", name: "에다마메", amount: 50, unit: "g" },
      { id: "0006", name: "저염간장", amount: 1, unit: "tbsp" },
      { id: "0007", name: "참기름", amount: 0.5, unit: "tsp" },
      { id: "0008", name: "와사비", amount: 1, unit: "약간" },
    ],
    steps: [
      { title: "연어 마리네이드", desc: "연어를 한입 크기로 자르고 저염간장, 참기름을 섞어 5분간 재운다." },
      { title: "채소 준비", desc: "아보카도와 오이를 깍둑썰기한다. 에다마메는 데쳐놓는다." },
      { title: "볼 완성", desc: "현미밥을 그릇에 담고 연어, 아보카도, 오이, 에다마메를 올린다." },
      { title: "마무리", desc: "와사비와 남은 마리네이드 소스를 뿌려 완성한다." },
    ],
  },
  {
    id: 5,
    name: "감자 크림 뇨끼",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    time: 40,
    difficulty: "어려움",
    category: "normal",
    kcal: 620,
    carb: 75,
    protein: 15,
    fat: 28,
    tags: ["이탈리안", "크리미", "위로음식"],
    desc: "손으로 직접 빚는 뇨끼의 쫄깃함과 진한 크림소스의 만남",
    altIngredients: [],
    ingredients: [
      { id: "0001", name: "감자", amount: 400, unit: "g" },
      { id: "0002", name: "밀가루", amount: 120, unit: "g" },
      { id: "0003", name: "계란 노른자", amount: 1, unit: "개" },
      { id: "0004", name: "생크림", amount: 200, unit: "ml" },
      { id: "0005", name: "파마산 치즈", amount: 50, unit: "g" },
      { id: "0006", name: "버터", amount: 20, unit: "g" },
      { id: "0007", name: "마늘", amount: 2, unit: "쪽" },
    ],
    steps: [
      { title: "감자 삶기", desc: "감자를 껍질째 삶아 으깨고 식힌다." },
      { title: "반죽", desc: "으깬 감자에 밀가루, 계란 노른자, 소금을 넣어 부드럽게 반죽한다. 과반죽 금지!" },
      { title: "뇨끼 빚기", desc: "반죽을 긴 막대 모양으로 밀어 2cm 간격으로 자른다. 포크로 무늬를 낸다." },
      { title: "삶기", desc: "끓는 소금물에 뇨끼를 넣고 떠오르면 30초 후 건진다." },
      { title: "크림소스", desc: "버터에 마늘을 볶고 생크림을 넣어 졸인다. 파마산 치즈를 넣어 완성한다." },
      { title: "마무리", desc: "뇨끼와 크림소스를 버무려 접시에 담고 파마산 치즈를 더 뿌린다." },
    ],
  },
  {
    id: 6,
    name: "마파두부 덮밥",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80",
    time: 20,
    difficulty: "보통",
    category: "normal",
    kcal: 540,
    carb: 65,
    protein: 24,
    fat: 18,
    tags: ["중식", "매콤", "간단"],
    desc: "얼얼하게 매콤한 쓰촨풍 마파두부를 집에서 간단하게",
    altIngredients: [],
    ingredients: [
      { id: "0001", name: "두부", amount: 300, unit: "g" },
      { id: "0002", name: "돼지고기 다짐육", amount: 100, unit: "g" },
      { id: "0003", name: "두반장", amount: 2, unit: "tbsp" },
      { id: "0004", name: "굴소스", amount: 1, unit: "tbsp" },
      { id: "0005", name: "마늘", amount: 3, unit: "쪽" },
      { id: "0006", name: "생강", amount: 1, unit: "조각" },
      { id: "0007", name: "대파", amount: 1, unit: "대" },
      { id: "0008", name: "참기름", amount: 1, unit: "tsp" },
      { id: "0009", name: "쌀밥", amount: 200, unit: "g" },
    ],
    steps: [
      { title: "두부 준비", desc: "두부를 2cm 깍둑썰기하고 끓는 물에 살짝 데쳐 간수를 뺀다." },
      { title: "향신료 볶기", desc: "기름을 달구고 마늘, 생강, 대파 흰 부분을 볶아 향을 낸다." },
      { title: "고기 볶기", desc: "다짐육을 넣고 색이 변할 때까지 볶은 후 두반장을 넣는다." },
      { title: "조리기", desc: "물 200ml와 굴소스를 넣고 두부를 넣어 5분간 약불로 졸인다." },
      { title: "마무리", desc: "참기름을 넣고 밥 위에 올려 대파 녹색 부분으로 garnish한다." },
    ],
  },
  {
    id: 7,
    name: "에그 클라우드 토스트",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
    time: 15,
    difficulty: "쉬움",
    category: "normal",
    kcal: 280,
    carb: 22,
    protein: 14,
    fat: 14,
    tags: ["브런치", "간단", "인스타감성"],
    desc: "SNS에서 화제! 구름처럼 폭신한 에그 클라우드 토스트",
    altIngredients: [],
    ingredients: [
      { id: "0001", name: "식빵", amount: 2, unit: "장" },
      { id: "0002", name: "계란", amount: 2, unit: "개" },
      { id: "0003", name: "파마산 치즈", amount: 2, unit: "tbsp" },
      { id: "0004", name: "소금·후추", amount: 1, unit: "약간" },
    ],
    steps: [
      { title: "흰자 분리", desc: "계란을 흰자와 노른자로 분리한다. 노른자는 깨지지 않게 조심!" },
      { title: "머랭 만들기", desc: "흰자에 소금 한 꼬집을 넣고 단단한 뿔이 생길 때까지 힘차게 휘핑한다." },
      { title: "치즈 섞기", desc: "머랭에 파마산 치즈를 넣고 가볍게 섞는다." },
      { title: "굽기", desc: "식빵 위에 머랭을 올리고 가운데에 노른자를 올린다. 200도 오븐에서 6~8분 굽는다." },
      { title: "완성", desc: "후추를 뿌려 즉시 서빙한다. 빨리 먹을수록 폭신함이 살아있다!" },
    ],
  },
  {
    id: 8,
    name: "단호박 두부 수프",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    time: 30,
    difficulty: "쉬움",
    category: "diet",
    kcal: 220,
    carb: 28,
    protein: 12,
    fat: 6,
    tags: ["저칼로리", "비건", "500kcal미만"],
    desc: "달콤한 단호박과 부드러운 두부가 만나 만들어내는 따뜻한 위로 한 그릇",
    altIngredients: [{ original: "생크림", alt: "두유" }],
    ingredients: [
      { id: "0001", name: "단호박", amount: 300, unit: "g" },
      { id: "0002", name: "두부", amount: 150, unit: "g" },
      { id: "0003", name: "양파", amount: 0.5, unit: "개" },
      { id: "0004", name: "채수", amount: 400, unit: "ml" },
      { id: "0005", name: "두유", amount: 100, unit: "ml" },
      { id: "0006", name: "올리브오일", amount: 1, unit: "tsp" },
    ],
    steps: [
      { title: "단호박 준비", desc: "단호박을 전자레인지에 5분 돌린 후 껍질을 제거하고 자른다." },
      { title: "볶기", desc: "냄비에 올리브오일을 두르고 양파가 투명해질 때까지 볶는다." },
      { title: "끓이기", desc: "단호박과 채수를 넣고 15분간 끓인다. 단호박이 완전히 무를 때까지." },
      { title: "블렌딩", desc: "핸드블렌더로 곱게 간다. 두유와 두부를 넣고 다시 한번 갈아준다." },
      { title: "마무리", desc: "소금으로 간을 맞추고 따뜻하게 서빙한다. 호박씨로 장식하면 예쁘다." },
    ],
  },
];

const DIET_TAGS = ["전체", "저탄고지", "고단백", "저칼로리", "저탄수화물", "저지방", "500kcal미만", "비건", "오메가3"];
const DIFFICULTIES = { 쉬움: "🟢", 보통: "🟡", 어려움: "🔴" };
const NAV_ITEMS = [
  { id: "home", label: "홈", icon: "🏠" },
  { id: "diet", label: "다이어트", icon: "🥗" },
  { id: "normal", label: "일반 레시피", icon: "🍳" },
  { id: "register", label: "레시피 등록", icon: "✏️" },
];

/* ─────────────────────────────────────────────
   UTILITY COMPONENTS
───────────────────────────────────────────── */
const Tag = ({ label }) => (
  <span style={{
    display: "inline-block",
    background: "rgba(90,142,68,0.12)",
    color: "#4a7c35",
    border: "1px solid rgba(90,142,68,0.25)",
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.02em",
  }}>{label}</span>
);

const NutritionBar = ({ label, value, max, color }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
      <span style={{ fontSize: 12, color: "#666", fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 12, color: "#333", fontWeight: 700 }}>{value}g</span>
    </div>
    <div style={{ height: 6, background: "#f0ede8", borderRadius: 3, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: `${Math.min((value / max) * 100, 100)}%`,
        background: color,
        borderRadius: 3,
        transition: "width 0.8s ease",
      }} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   RECIPE CARD
───────────────────────────────────────────── */
const RecipeCard = ({ recipe, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(recipe)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.15)" : "0 4px 20px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
          loading="lazy"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
        }} />
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.92)", borderRadius: 12, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#333" }}>
          ⏱ {recipe.time}분
        </div>
        {recipe.category === "diet" && (
          <div style={{ position: "absolute", top: 12, left: 12, background: "#5a8e44", borderRadius: 12, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#fff" }}>
            다이어트 🥗
          </div>
        )}
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <span style={{ color: "#fff", fontSize: 12 }}>{DIFFICULTIES[recipe.difficulty]} {recipe.difficulty}</span>
        </div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Noto Serif KR', serif" }}>{recipe.name}</h3>
        <p style={{ margin: "0 0 12px", fontSize: 12.5, color: "#777", lineHeight: 1.5 }}>{recipe.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
          {recipe.tags.slice(0, 3).map(t => <Tag key={t} label={t} />)}
        </div>
        {recipe.category === "diet" && (
          <div style={{ display: "flex", gap: 12, paddingTop: 12, borderTop: "1px solid #f0ede8" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#e07c3a" }}>{recipe.kcal}</div>
              <div style={{ fontSize: 10, color: "#999" }}>kcal</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#5a8e44" }}>{recipe.protein}g</div>
              <div style={{ fontSize: 10, color: "#999" }}>단백질</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#4a7abf" }}>{recipe.carb}g</div>
              <div style={{ fontSize: 10, color: "#999" }}>탄수화물</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#c4845a" }}>{recipe.fat}g</div>
              <div style={{ fontSize: 10, color: "#999" }}>지방</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   RECIPE DETAIL
───────────────────────────────────────────── */
const RecipeDetail = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(1);
  const [activeStep, setActiveStep] = useState(null);

  const scale = servings;
  const nutriData = [
    { subject: "단백질", A: recipe.protein, fullMark: 60 },
    { subject: "탄수화물", A: recipe.carb, fullMark: 100 },
    { subject: "지방", A: recipe.fat, fullMark: 60 },
    { subject: "칼로리", A: recipe.kcal / 10, fullMark: 80 },
  ];
  const pieData = [
    { name: "탄수화물", value: recipe.carb * 4, color: "#4a7abf" },
    { name: "단백질", value: recipe.protein * 4, color: "#5a8e44" },
    { name: "지방", value: recipe.fat * 9, color: "#c4845a" },
  ];

  const formatAmount = (amount) => {
    const val = amount * scale;
    return val % 1 === 0 ? val : val.toFixed(1);
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", paddingBottom: 60 }}>
      {/* Hero */}
      <div style={{ position: "relative", borderRadius: "0 0 32px 32px", overflow: "hidden", marginBottom: 0 }}>
        <img src={recipe.image} alt={recipe.name} style={{ width: "100%", height: 300, objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 12, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 14, color: "#333" }}>← 뒤로</button>
        <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
            {recipe.tags.map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "'Noto Serif KR', serif" }}>{recipe.name}</h1>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.6 }}>{recipe.desc}</p>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Quick Info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "24px 0" }}>
          {[["⏱", "조리시간", `${recipe.time}분`], ["📊", "난이도", recipe.difficulty], ["🔥", "칼로리", `${recipe.kcal} kcal`]].map(([icon, label, val]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 16, padding: "14px 12px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #f0ede8" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#333" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Nutrition Chart */}
        {recipe.category === "diet" && (
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #f0ede8" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>📊 영양 성분 분석</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <NutritionBar label="탄수화물" value={recipe.carb * scale} max={100} color="#4a7abf" />
                <NutritionBar label="단백질" value={recipe.protein * scale} max={60} color="#5a8e44" />
                <NutritionBar label="지방" value={recipe.fat * scale} max={60} color="#c4845a" />
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef7f0", borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#999" }}>총 칼로리</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#e07c3a" }}>{recipe.kcal * scale}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>kcal</div>
                </div>
              </div>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={3} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${Math.round(v)}kcal`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: -8 }}>
                  {pieData.map(d => (
                    <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#666" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Serving Calculator */}
        <div style={{ background: "#fff", borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #f0ede8" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>🥄 재료 (인분 조절)</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setServings(Math.max(1, servings - 1))} style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid #5a8e44", background: "transparent", color: "#5a8e44", fontWeight: 800, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#333", minWidth: 30, textAlign: "center" }}>{servings}</span>
              <button onClick={() => setServings(servings + 1)} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: "#5a8e44", color: "#fff", fontWeight: 800, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              <span style={{ fontSize: 12, color: "#999" }}>인분</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {recipe.ingredients.map(ing => (
              <div key={ing.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f9f7f4", borderRadius: 10 }}>
                <span style={{ fontSize: 13, color: "#555" }}>{ing.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>{formatAmount(ing.amount)}{ing.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alt Ingredients */}
        {recipe.altIngredients.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, #f0f7eb, #e8f4e1)", borderRadius: 20, padding: 20, marginBottom: 20, border: "1px solid rgba(90,142,68,0.2)" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "#3d6b28" }}>🔄 건강한 대체 식재료</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recipe.altIngredients.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ background: "#fff", borderRadius: 10, padding: "6px 12px", fontSize: 13, color: "#777", textDecoration: "line-through" }}>{item.original}</span>
                  <span style={{ color: "#5a8e44", fontSize: 18, fontWeight: 700 }}>→</span>
                  <span style={{ background: "#5a8e44", borderRadius: 10, padding: "6px 12px", fontSize: 13, color: "#fff", fontWeight: 700 }}>{item.alt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>👨‍🍳 조리 순서</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recipe.steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                style={{
                  background: activeStep === i ? "linear-gradient(135deg, #f0f7eb, #e8f4e1)" : "#fff",
                  border: `2px solid ${activeStep === i ? "#5a8e44" : "#f0ede8"}`,
                  borderRadius: 16,
                  padding: "16px 18px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: activeStep === i ? "0 4px 20px rgba(90,142,68,0.15)" : "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: activeStep === i ? "#5a8e44" : "#f0ede8",
                    color: activeStep === i ? "#fff" : "#999",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 14, flexShrink: 0, transition: "all 0.25s",
                  }}>{i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: activeStep === i ? "#3d6b28" : "#333" }}>{step.title}</div>
                </div>
                {activeStep === i && (
                  <p style={{ margin: "12px 0 0 44px", fontSize: 14, color: "#4a4a4a", lineHeight: 1.7 }}>{step.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   REGISTER PAGE
───────────────────────────────────────────── */
const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", time: "", difficulty: "쉬움", category: "diet", kcal: "", protein: "", carb: "", fat: "", tags: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 22, color: "#1a1a1a" }}>레시피가 등록되었어요!</h2>
      <p style={{ color: "#888" }}>소중한 레시피를 공유해 주셔서 감사합니다.</p>
      <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, background: "#5a8e44", color: "#fff", border: "none", borderRadius: 14, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>다른 레시피 등록하기</button>
    </div>
  );

  const InputStyle = { width: "100%", padding: "12px 14px", border: "1.5px solid #e8e3dc", borderRadius: 12, fontSize: 14, color: "#333", outline: "none", background: "#fff", boxSizing: "border-box" };
  const LabelStyle = { fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 6, display: "block" };

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 16px 60px" }}>
      <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 22, color: "#1a1a1a", marginBottom: 4 }}>레시피 등록 ✍️</h1>
      <p style={{ color: "#999", fontSize: 13, marginBottom: 28 }}>나만의 건강 레시피를 공유해보세요!</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={LabelStyle}>요리명 *</label>
          <input style={InputStyle} placeholder="예: 닭가슴살 샐러드" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={LabelStyle}>조리 시간 (분) *</label>
            <input style={InputStyle} type="number" placeholder="30" value={form.time} onChange={e => set("time", e.target.value)} />
          </div>
          <div>
            <label style={LabelStyle}>난이도 *</label>
            <select style={InputStyle} value={form.difficulty} onChange={e => set("difficulty", e.target.value)}>
              {["쉬움", "보통", "어려움"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={LabelStyle}>카테고리 *</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[["diet", "🥗 다이어트"], ["normal", "🍳 일반"]].map(([val, label]) => (
              <button key={val} onClick={() => set("category", val)} style={{ flex: 1, padding: "10px", border: `2px solid ${form.category === val ? "#5a8e44" : "#e8e3dc"}`, borderRadius: 12, background: form.category === val ? "#f0f7eb" : "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", color: form.category === val ? "#3d6b28" : "#888" }}>{label}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={LabelStyle}>요리 설명</label>
          <textarea style={{ ...InputStyle, resize: "vertical", minHeight: 80 }} placeholder="요리를 간단히 소개해주세요" value={form.desc} onChange={e => set("desc", e.target.value)} />
        </div>
        <div style={{ background: "#f9f7f4", borderRadius: 16, padding: 16 }}>
          <label style={{ ...LabelStyle, marginBottom: 12 }}>🔥 영양 정보</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["kcal", "칼로리 (kcal)"], ["protein", "단백질 (g)"], ["carb", "탄수화물 (g)"], ["fat", "지방 (g)"]].map(([k, lbl]) => (
              <div key={k}>
                <label style={{ ...LabelStyle, fontSize: 12 }}>{lbl}</label>
                <input style={InputStyle} type="number" placeholder="0" value={form[k]} onChange={e => set(k, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label style={LabelStyle}>다이어트 태그 (쉼표로 구분)</label>
          <input style={InputStyle} placeholder="예: 고단백, 저탄수화물, 500kcal미만" value={form.tags} onChange={e => set("tags", e.target.value)} />
        </div>
        <button
          onClick={() => form.name && form.time && setSubmitted(true)}
          style={{ background: form.name && form.time ? "#5a8e44" : "#c5c5c5", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontSize: 16, fontWeight: 800, cursor: form.name && form.time ? "pointer" : "not-allowed", transition: "background 0.2s", marginTop: 8 }}
        >레시피 등록하기 🚀</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   RECIPE LIST PAGE
───────────────────────────────────────────── */
const RecipeListPage = ({ category, setDetail }) => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("전체");

  const filtered = useMemo(() => {
    return RECIPES.filter(r => {
      const matchCat = category === "all" ? true : r.category === category;
      const matchTag = activeTag === "전체" ? true : r.tags.includes(activeTag);
      const q = search.toLowerCase();
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.name.toLowerCase().includes(q)) || r.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchTag && matchSearch;
    });
  }, [category, activeTag, search]);

  const tags = category === "diet" ? DIET_TAGS : ["전체", "이탈리안", "중식", "브런치", "간단", "매콤", "위로음식", "인스타감성"];

  return (
    <div>
      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
        <input
          style={{ width: "100%", padding: "14px 14px 14px 46px", border: "2px solid #e8e3dc", borderRadius: 16, fontSize: 14, color: "#333", outline: "none", background: "#fff", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          placeholder="재료명이나 요리명으로 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Tag Filter */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20, scrollbarWidth: "none" }}>
        {tags.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: `2px solid ${activeTag === tag ? "#5a8e44" : "#e8e3dc"}`, background: activeTag === tag ? "#5a8e44" : "#fff", color: activeTag === tag ? "#fff" : "#666", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
            {tag}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 14, fontSize: 13, color: "#999" }}>레시피 {filtered.length}개</div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🥕</div>
          <p style={{ color: "#aaa", fontSize: 15 }}>검색 결과가 없어요</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map(r => <RecipeCard key={r.id} recipe={r} onClick={setDetail} />)}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const HomePage = ({ setPage, setDetail }) => {
  const featured = RECIPES.filter(r => r.category === "diet").slice(0, 3);
  const stats = [
    { label: "다이어트 레시피", value: RECIPES.filter(r => r.category === "diet").length, icon: "🥗" },
    { label: "평균 칼로리", value: `${Math.round(RECIPES.filter(r => r.category === "diet").reduce((a, r) => a + r.kcal, 0) / RECIPES.filter(r => r.category === "diet").length)}kcal`, icon: "🔥" },
    { label: "전체 레시피", value: RECIPES.length, icon: "📚" },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ borderRadius: 24, background: "linear-gradient(135deg, #3d6b28 0%, #5a8e44 50%, #7ab55c 100%)", padding: "36px 28px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -40, right: 40, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "relative" }}>
          <p style={{ margin: "0 0 6px", color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>건강한 식탁을 위한</p>
          <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: "'Noto Serif KR', serif", lineHeight: 1.3 }}>다이어트 레시피<br />찾기 🥗</h1>
          <p style={{ margin: "0 0 22px", color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.6 }}>칼로리 걱정 없이 맛있게!<br />영양 가득 레시피를 지금 찾아보세요.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setPage("diet")} style={{ background: "#fff", color: "#3d6b28", border: "none", borderRadius: 14, padding: "12px 22px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>다이어트 레시피 →</button>
            <button onClick={() => setPage("normal")} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 14, padding: "12px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>일반 레시피</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "14px 12px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0ede8" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#5a8e44" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Featured */}
      <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1a1a1a", fontFamily: "'Noto Serif KR', serif" }}>⭐ 추천 다이어트 레시피</h2>
        <button onClick={() => setPage("diet")} style={{ background: "none", border: "none", color: "#5a8e44", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>전체보기 →</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
        {featured.map(r => <RecipeCard key={r.id} recipe={r} onClick={setDetail} />)}
      </div>

      {/* Quick filter */}
      <div style={{ background: "linear-gradient(135deg, #fef7f0, #fdf0e6)", borderRadius: 20, padding: 20, border: "1px solid rgba(224,124,58,0.15)" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 800, color: "#b85e2a" }}>⚡ 빠른 필터</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {DIET_TAGS.slice(1).map(tag => (
            <button key={tag} onClick={() => setPage("diet")} style={{ padding: "8px 14px", borderRadius: 20, border: "2px solid rgba(224,124,58,0.25)", background: "rgba(255,255,255,0.7)", color: "#b85e2a", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [detail, setDetail] = useState(null);

  const handleSetDetail = (recipe) => { setDetail(recipe); window.scrollTo(0, 0); };
  const handleBack = () => { setDetail(null); };

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif", background: "#f9f7f4", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&family=Noto+Serif+KR:wght@400;700;900&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { display: none; } button { font-family: inherit; }`}</style>

      {/* Header */}
      {!detail && (
        <header style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setPage("home")}>
              <span style={{ fontSize: 22 }}>🥦</span>
              <span style={{ fontSize: 17, fontWeight: 900, color: "#3d6b28", fontFamily: "'Noto Serif KR', serif" }}>그린레시피</span>
            </div>
            <nav style={{ display: "flex", gap: 4 }}>
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => setPage(item.id)} style={{ padding: "6px 12px", borderRadius: 10, border: "none", background: page === item.id ? "#5a8e44" : "transparent", color: page === item.id ? "#fff" : "#777", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>
                  <span style={{ display: "block" }}>{item.icon}</span>
                  <span style={{ fontSize: 10 }}>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </header>
      )}

      {/* Content */}
      <main style={{ maxWidth: 700, margin: "0 auto", padding: detail ? "0" : "20px 16px 80px" }}>
        {detail ? (
          <RecipeDetail recipe={detail} onBack={handleBack} />
        ) : page === "home" ? (
          <HomePage setPage={setPage} setDetail={handleSetDetail} />
        ) : page === "diet" ? (
          <>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 22, color: "#1a1a1a", marginTop: 0, marginBottom: 4 }}>🥗 다이어트 레시피</h1>
            <p style={{ color: "#aaa", fontSize: 13, marginBottom: 22 }}>저칼로리, 고단백 건강식 모음</p>
            <RecipeListPage category="diet" setDetail={handleSetDetail} />
          </>
        ) : page === "normal" ? (
          <>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 22, color: "#1a1a1a", marginTop: 0, marginBottom: 4 }}>🍳 일반 레시피</h1>
            <p style={{ color: "#aaa", fontSize: 13, marginBottom: 22 }}>맛있고 다양한 요리 레시피</p>
            <RecipeListPage category="normal" setDetail={handleSetDetail} />
          </>
        ) : page === "register" ? (
          <RegisterPage />
        ) : null}
      </main>

      {/* Bottom Nav (mobile) */}
      {!detail && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-around", padding: "8px 0 calc(8px + env(safe-area-inset-bottom))", zIndex: 100 }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 16px", border: "none", background: "none", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: page === item.id ? "#5a8e44" : "#bbb" }}>{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
