const mainBtn = document.getElementById("main-btn");
const searchForm = document.getElementById("searchForm");
const searchInp = document.getElementById("searchInput");
const shinyBtn = document.getElementById("shinyBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pidEl = document.getElementById("pokemon-id");
const pnameEl = document.getElementById("pokemon-name");
const pimgEl = document.getElementById("pokemon-image");
const typesEl = document.getElementById("types");
const descEl = document.getElementById("description");
const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const abilEl = document.getElementById("abilities");

let currentId = 25;
let shiny = false;

function setTypes(types) {
    typesEl.innerHTML = "";
    types.forEach(t => {
        const span = document.createElement("span");
        const name = t.type.name;
        span.className = `type ${name}`;
        span.textContent = name;
        typesEl.appendChild(span);
    });
}
function setAbilities(abilities) {
    abilEl.innerHTML = "";
    abilities.forEach(a => {
        const pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = a.ability.name;
        abilEl.appendChild(pill);
    });
}
function spriteFrom(data, shinyFlag) {
    const normal = data.sprites.front_default;
    const shinyS = data.sprites.front_shiny;
    return shinyFlag ? (shinyS || normal) : (normal || shinyS);
}

async function fetchPokemon(query) {
    let q = String(query).trim().toLowerCase();
    if (!q) return;

    if (!isNaN(q)) {
        q = String(parseInt(q, 10));
    }

    mainBtn.classList.add("active");

    let data;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
        if (!res.ok) throw new Error("Pokémon não encontrado direto.");
        data = await res.json();
    } catch {
        try {
            const allRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
            const allData = await allRes.json();
            const match = allData.results.find(p => p.name.includes(q));
            if (!match) throw new Error("Pokémon não encontrado.");
            const mres = await fetch(match.url);
            data = await mres.json();
        } catch {
            throw new Error("Pokémon não encontrado.");
        }
    }

    let text = "Sem descrição disponível.";
    try {
        const sres = await fetch(data.species.url);
        if (sres.ok) {
            const sdata = await sres.json();
            const entry = sdata.flavor_text_entries.find(e => e.language.name === "en");
            if (entry) text = entry.flavor_text.replace(/\n|\f/g, " ");
        }
    } catch { /* ignora erro de species */ }

    currentId = data.id;
    pidEl.textContent = `#${String(data.id).padStart(3, "0")}`;
    pnameEl.textContent = data.name.toUpperCase();
    pimgEl.src = spriteFrom(data, shiny);
    pimgEl.alt = `Sprite de ${data.name}`;
    setTypes(data.types);
    descEl.textContent = text;
    heightEl.textContent = `${(data.height / 10).toFixed(1)} m`;
    weightEl.textContent = `${(data.weight / 10).toFixed(1)} kg`;
    setAbilities(data.abilities);
}


searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        shiny = false;
        shinyBtn.textContent = "✨ Ver Shiny";
        await fetchPokemon(searchInp.value || currentId);
    } catch (err) {
        alert(err.message);
    }
});

shinyBtn.addEventListener("click", async () => {
    shiny = !shiny;
    shinyBtn.textContent = shiny ? "Ver Normal" : "✦︎ Ver Shiny ✦︎";
    await fetchPokemon(currentId);
});

prevBtn.addEventListener("click", async () => {
    if (currentId > 1) { shiny = false; shinyBtn.textContent = "✦︎ Ver Shiny ✦︎"; await fetchPokemon(currentId - 1); }
});
nextBtn.addEventListener("click", async () => {
    shiny = false; shinyBtn.textContent = "✦︎ Ver Shiny ✦︎"; await fetchPokemon(currentId + 1);
});

fetchPokemon(currentId).catch(() => { });

document.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  const isTyping = active && (
    active.tagName === "INPUT" ||
    active.tagName === "TEXTAREA" ||
    active.isContentEditable
  );
  if (isTyping) return;

  if (e.key === "ArrowLeft") {
    // prev
    if (typeof prevBtn.click === "function") prevBtn.click();
  } else if (e.key === "ArrowRight") {
    // next
    if (typeof nextBtn.click === "function") nextBtn.click();
  }
});


/* === Swipe (touch) simples para mobile/webapp === */

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

const SWIPE_MIN_DISTANCE = 50; // px mínimos para considerar swipe
const SWIPE_MAX_TIME = 500;    // ms máximos para considerar swipe rápido

function isInteractiveElement(el) {
  // evita interceptar gestos quando o alvo é input/select/textarea/button ou dentro da search-box
  return !!(el && el.closest && el.closest("input, textarea, select, button, .search-box"));
}

document.addEventListener("touchstart", (ev) => {
  if (ev.touches.length > 1) return; // ignora multi-touch
  if (isInteractiveElement(ev.target)) return; // não ativa se estiver digitando/pressionando algo
  const t = ev.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchStartTime = ev.timeStamp;
}, { passive: true });

document.addEventListener("touchend", (ev) => {
  // changedTouches oferece o touch final
  const t = ev.changedTouches[0];
  if (!t) return;
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  const dt = ev.timeStamp - touchStartTime;

  // descarta se foi vertical ou muito lento ou curto
  if (dt > SWIPE_MAX_TIME) return;
  if (Math.abs(dx) < Math.abs(dy)) return;      // provavelmente scroll vertical
  if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;

  if (dx > 0) {
    // swipe para a direita -> mostrar anterior
    if (typeof prevBtn.click === "function") prevBtn.click();
  } else {
    // swipe para a esquerda -> mostrar próximo
    if (typeof nextBtn.click === "function") nextBtn.click();
  }
}, { passive: true });
