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

  const iconContainer = document.createElement("div");
  iconContainer.className = "input-icon";
  // Dog icon
  iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width="18" height="18"><path d="M298.06,224,448,277.55V496a16,16,0,0,1-16,16H368a16,16,0,0,1-16-16V384H192V496a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V282.09C58.84,268.84,32,233.66,32,192a32,32,0,0,1,64,0,32.06,32.06,0,0,0,32,32ZM544,112v32a64,64,0,0,1-64,64H448v35.58L320,197.87V48c0-14.25,17.22-21.39,27.31-11.31L374.59,64h53.63c10.91,0,23.75,7.92,28.62,17.69L464,96h64A16,16,0,0,1,544,112Zm-112,0a16,16,0,1,0-16,16A16,16,0,0,0,432,112Z"/></svg>`;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "name-input";
  input.placeholder = `Participant ${index}`;

  input.addEventListener("input", updateGenerateButtonState);

  row.appendChild(iconContainer);
  row.appendChild(input);
  return row;
}

function createExtraRow(): HTMLDivElement {
  const row = document.createElement("div");
  row.className = "extra-name-row";
  row.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> <span>Click to add another name</span>`;

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