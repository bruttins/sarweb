const MIN_NAMES = 4;
const MAX_NAMES = 7;

export function renderNameForm() {
  const formRoot = document.querySelector<HTMLDivElement>("#name-form");
  if (!formRoot) throw new Error("Name form root not found");

  formRoot.innerHTML = "";

  for (let i = 0; i < MIN_NAMES; i++) {
    formRoot.appendChild(createNameInput(i + 1));
  }

  formRoot.appendChild(createExtraRow());
}

export function getNameValues(): string[] {
  const inputs = document.querySelectorAll<HTMLInputElement>(".name-input");
  return Array.from(inputs).map((input) => input.value);
}

export function hasEnoughRequiredNames(): boolean {
  const inputs = document.querySelectorAll<HTMLInputElement>(".name-input");
  const firstFour = Array.from(inputs).slice(0, MIN_NAMES);
  return firstFour.every((input) => input.value.trim().length > 0);
}

function createNameInput(index: number): HTMLDivElement {
  const row = document.createElement("div");
  row.className = "name-row";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "name-input";
  input.placeholder = `Participant ${index}`;

  input.addEventListener("input", updateGenerateButtonState);

  row.appendChild(input);
  return row;
}

function createExtraRow(): HTMLDivElement {
  const row = document.createElement("div");
  row.className = "extra-name-row";
  row.textContent = "Click to add another name";
  row.style.opacity = "0.4";
  row.style.cursor = "pointer";
  row.style.marginTop = "8px";

  row.addEventListener("click", handleAddRowClick);

  return row;
}

function handleAddRowClick(event: MouseEvent) {
  const target = event.currentTarget as HTMLDivElement;
  const formRoot = document.querySelector<HTMLDivElement>("#name-form");
  if (!formRoot) throw new Error("Name form root not found");

  const currentInputs = formRoot.querySelectorAll("input.name-input").length;
  if (currentInputs >= MAX_NAMES) return;

  const newInputRow = createNameInput(currentInputs + 1);
  target.replaceWith(newInputRow);

  const newInput = newInputRow.querySelector<HTMLInputElement>("input");
  newInput?.focus();

  if (currentInputs + 1 < MAX_NAMES) {
    formRoot.appendChild(createExtraRow());
  }

  updateGenerateButtonState();
}

function updateGenerateButtonState() {
  const button = document.querySelector<HTMLButtonElement>("#generate-btn");
  if (!button) return;

  button.disabled = !hasEnoughRequiredNames();
}