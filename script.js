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

let currentId = 25;     // Pikachu inicia
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
    const q = String(query).trim().toLowerCase();
    if (!q) return;

    mainBtn.classList.add("active");

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
    if (!res.ok) throw new Error("Pokémon não encontrado.");
    const data = await res.json();

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
    shinyBtn.textContent = shiny ? "Ver Normal" : "✨ Ver Shiny";
    await fetchPokemon(currentId);
});

prevBtn.addEventListener("click", async () => {
    if (currentId > 1) { shiny = false; shinyBtn.textContent = "✨ Ver Shiny"; await fetchPokemon(currentId - 1); }
});
nextBtn.addEventListener("click", async () => {
    shiny = false; shinyBtn.textContent = "✨ Ver Shiny"; await fetchPokemon(currentId + 1);
});

fetchPokemon(currentId).catch(() => { });
