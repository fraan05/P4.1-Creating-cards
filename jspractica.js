/**
 * This code is just to read the json file. Don't worry about it. We will see it in detail in next sectioins
 * Write your own code in the procesarJSON function
 */

/**
 * Este código es solo para leeer el archivo json. No os preocupéis por él, lo veremos y lo analizaremos en próximos capítulos
 * Escribir vuestro código en la función procesarJSON
 */

fetch("./data/heroes.json")
  .then(res => res.json())
  .then(data => renderHeroes(data))
  .catch(err => console.error(err));

  //Layout
function renderHeroes(data) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const row = document.createElement("div");
  row.className = "row g-4 p-4";
  //Loop heeroes
  for (let hero of data.data.results) {
    const col = document.createElement("div");
    col.className = "col-md-3";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const img = document.createElement("img");
    img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    img.alt = hero.name;
    img.className = "card-img-top";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title text-center";
    title.textContent = hero.name;

    const desc = document.createElement("p");
    desc.className = "card-text";
    desc.textContent = hero.description || "No description available.";

    const accordionId = `accordion-${hero.id}`;
    const accordion = document.createElement("div");
    accordion.className = "accordion mt-2";
    accordion.id = accordionId;
    accordion.innerHTML = `
      ${accordionItem("Comics", hero.comics.items, accordionId, 1)}
      ${accordionItem("Series", hero.series.items, accordionId, 2)}
      ${accordionItem("Stories", hero.stories.items, accordionId, 3)}
      ${accordionItem("Events", hero.events.items, accordionId, 4)}
      ${accordionItem("URLs", hero.urls, accordionId, 5, true)}
    `;

    body.append(title, desc, accordion);
    card.append(img, body);
    col.append(card);
    row.append(col);
  }
    main.append(row);
}

//Accordion section
function accordionItem(title, items, parent, index, isUrl = false) {
  const collapseId = `${parent}-collapse${index}`;
  let content = "<p>No data available.</p>";

  if (items && items.length > 0) {
    const list = items.map(item =>
      isUrl
        ? `<li><a href="${item.url}" target="_blank">${item.type}</a></li>`
        : `<li>${item.name}</li>`
    ).join("");
    content = `<ul>${list}</ul>`;
  }

  return `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target="#${collapseId}">
          ${title}
        </button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#${parent}">
        <div class="accordion-body">${content}</div>
      </div>
    </div>
  `;
}
