/**
 * This code is just to read the json file. Don't worry about it. We will see it in detail in next sectioins
 * Write your own code in the procesarJSON function
 */

/**
 * Este código es solo para leeer el archivo json. No os preocupéis por él, lo veremos y lo analizaremos en próximos capítulos
 * Escribir vuestro código en la función procesarJSON
 */

fetch("./data/heroes.json")
  .then((response) => response.json())
  .then((jsondata) => renderCards(jsondata))
  .catch((e) => console.error(e));

function renderCards(jsondata) {
  const container = document.querySelector("main");
  container.innerHTML = ""; // Clear existing content

  const row = document.createElement("div");
  row.className = "row g-4 p-4"; // spacing and grid

  for (let char of jsondata.data.results) {
    const col = document.createElement("div");
    col.className = "col-md-3"; // 4 cards per row

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const img = document.createElement("img");
    img.src = `${char.thumbnail.path}.${char.thumbnail.extension}`;
    img.className = "card-img-top";
    img.alt = char.name;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title text-center";
    title.textContent = char.name;

    const desc = document.createElement("p");
    desc.className = "card-text";
    desc.textContent =
      char.description || "No description available.";

    // Accordion for details
    const accordionId = `accordion-${char.id}`;
    const accordion = document.createElement("div");
    accordion.className = "accordion mt-2";
    accordion.id = accordionId;

    accordion.innerHTML = `
      ${createAccordionItem("Comics", char.comics.items, accordionId, 1)}
      ${createAccordionItem("Series", char.series.items, accordionId, 2)}
      ${createAccordionItem("Stories", char.stories.items, accordionId, 3)}
      ${createAccordionItem("Events", char.events.items, accordionId, 4)}
      ${createAccordionItem("URLs", char.urls, accordionId, 5, true)}
    `;

    body.append(title, desc, accordion);
    card.append(img, body);
    col.append(card);
    row.append(col);
  }

  container.append(row);
}

function createAccordionItem(title, items, accId, idx, isUrl = false) {
  const collapseId = `${accId}-collapse${idx}`;
  let content = "<p>No data available.</p>";

  if (items && items.length > 0) {
    content = "<ul class='mb-0'>";
    if (isUrl) {
      content += items
        .map(
          (u) => `<li><a href="${u.url}" target="_blank">${u.type}</a></li>`
        )
        .join("");
    } else {
      content += items.map((i) => `<li>${i.name}</li>`).join("");
    }
    content += "</ul>";
  }

  return `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
          ${title}
        </button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#${accId}">
        <div class="accordion-body">${content}</div>
      </div>
    </div>
  `;
}
