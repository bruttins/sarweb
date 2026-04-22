import type { Round } from "../domain/rotation";

export function renderRotationTable(rounds: Round[]): HTMLTableElement {
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid black";

  const headerRow = document.createElement("tr");
  const headers = ["Round", "Helper 1", "Trainee / Observer", "Helper 2", "Idle"];

  for (const label of headers) {
    const th = document.createElement("th");
    th.style.border = "1px solid black";
    th.style.padding = "4px 8px";

    if (label === "Trainee / Observer") {
      th.append("Trainee");
      th.appendChild(document.createElement("br"));
      const em = document.createElement("em");
      em.textContent = "Observer";
      th.appendChild(em);
    } else {
      th.textContent = label;
    }

    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  rounds.forEach((round, index) => {
    const row = document.createElement("tr");

    const roundCell = document.createElement("td");
    roundCell.textContent = String(index + 1);
    roundCell.style.border = "1px solid black";
    roundCell.style.padding = "4px 8px";
    row.appendChild(roundCell);

    const helper1Cell = document.createElement("td");
    helper1Cell.textContent = round.helper1;
    helper1Cell.style.border = "1px solid black";
    helper1Cell.style.padding = "4px 8px";
    row.appendChild(helper1Cell);

    const roleCell = document.createElement("td");
    roleCell.style.border = "1px solid black";
    roleCell.style.padding = "4px 8px";

    roleCell.append(round.trainee);
    roleCell.appendChild(document.createElement("br"));
    const observerName = document.createElement("em");
    observerName.textContent = round.observer;
    roleCell.appendChild(observerName);

    row.appendChild(roleCell);

    const helper2Cell = document.createElement("td");
    helper2Cell.textContent = round.helper2;
    helper2Cell.style.border = "1px solid black";
    helper2Cell.style.padding = "4px 8px";
    row.appendChild(helper2Cell);

    const idleCell = document.createElement("td");
    idleCell.textContent = round.idle?.length ? round.idle.join(", ") : "none";
    idleCell.style.border = "1px solid black";
    idleCell.style.padding = "4px 8px";
    row.appendChild(idleCell);

    table.appendChild(row);
  });

  return table;
}