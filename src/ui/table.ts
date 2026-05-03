import type { Round } from "../domain/rotation";

export function renderRotationTable(rounds: Round[]): HTMLElement {
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";

  const table = document.createElement("table");
  table.className = "rotation-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Round", "Helper 1", "Trainee / Observer", "Helper 2", "Idle"];

  for (const label of headers) {
    const th = document.createElement("th");

    if (label === "Trainee / Observer") {
      th.append("Trainee ");
      const span = document.createElement("span");
      span.textContent = "/ Observer";
      span.style.opacity = "0.7";
      span.style.fontWeight = "normal";
      th.appendChild(span);
    } else {
      th.textContent = label;
    }

    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  rounds.forEach((round, index) => {
    const row = document.createElement("tr");

    const roundCell = document.createElement("td");
    roundCell.textContent = String(index + 1);
    row.appendChild(roundCell);

    const helper1Cell = document.createElement("td");
    helper1Cell.textContent = round.helper1;
    row.appendChild(helper1Cell);

    const roleCell = document.createElement("td");
    
    const traineeSpan = document.createElement("span");
    traineeSpan.textContent = round.trainee;
    roleCell.appendChild(traineeSpan);
    
    roleCell.appendChild(document.createElement("br"));
    
    const observerBadge = document.createElement("span");
    observerBadge.className = "role-badge";
    observerBadge.textContent = "Obs: " + round.observer;
    roleCell.appendChild(observerBadge);

    row.appendChild(roleCell);

    const helper2Cell = document.createElement("td");
    helper2Cell.textContent = round.helper2;
    row.appendChild(helper2Cell);

    const idleCell = document.createElement("td");
    if (round.idle?.length) {
      idleCell.textContent = round.idle.join(", ");
      idleCell.style.color = "var(--text-secondary)";
    } else {
      idleCell.textContent = "-";
      idleCell.style.color = "var(--input-border)";
    }
    row.appendChild(idleCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);
  
  return tableContainer;
}