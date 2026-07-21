const { performance } = require('perf_hooks');

const RECIPES = [];
for (let i = 0; i < 10000; i++) {
  RECIPES.push({
    category: i % 2 === 0 ? 'diet' : 'normal',
    tags: ['고단백', '저탄수화물'],
    name: '닭가슴살 아보카도 샐러드 ' + i,
    ingredients: [{ name: '닭가슴살' }, { name: '아보카도' }]
  });
}

function runBaseline(search, category, activeTag) {
  return RECIPES.filter(r => {
    if (r.category !== category) return false
    if (activeTag !== '전체' && !r.tags.includes(activeTag)) return false
    const q = search.trim().toLowerCase()
    if (!q) return true
    return r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.name.toLowerCase().includes(q)) || r.tags.some(t => t.toLowerCase().includes(q))
  });
}

function runOptimized(search, category, activeTag) {
  const q = search.trim().toLowerCase();
  return RECIPES.filter(r => {
    if (r.category !== category) return false
    if (activeTag !== '전체' && !r.tags.includes(activeTag)) return false
    if (!q) return true
    return r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.name.toLowerCase().includes(q)) || r.tags.some(t => t.toLowerCase().includes(q))
  });
}

const ITERATIONS = 1000;
const search = "  닭가슴살  ";
const category = "diet";
const activeTag = "고단백";

// Warmup
for (let i = 0; i < 100; i++) {
  runBaseline(search, category, activeTag);
  runOptimized(search, category, activeTag);
}

const t0 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  runBaseline(search, category, activeTag);
}
const t1 = performance.now();
console.log(`Baseline: ${t1 - t0} ms`);

const t2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  runOptimized(search, category, activeTag);
}
const t3 = performance.now();
console.log(`Optimized: ${t3 - t2} ms`);
