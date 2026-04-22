import { processNames } from "../domain/names";
import { createRotation } from "../domain/rotation";
import { renderRotationTable } from "./table";
import { getNameValues, hasEnoughRequiredNames } from "./nameForm";

function showError(error: HTMLDivElement, result: HTMLDivElement, message: string) {
  error.textContent = message;
  result.innerHTML = "";
}

function showResult(
  error: HTMLDivElement,
  result: HTMLDivElement,
  element: HTMLElement
) {
  error.textContent = "";
  result.replaceChildren(element);
}

export function setupEvents() {
  const button = document.querySelector<HTMLButtonElement>("#generate-btn");
  const error = document.querySelector<HTMLDivElement>("#error");
  const result = document.querySelector<HTMLDivElement>("#result");

  if (!button || !error || !result) {
    throw new Error("Missing UI elements");
  }

  button.disabled = true;

  button.addEventListener("click", () => {
    if (!hasEnoughRequiredNames()) {
      showError(error, result, "Please fill in the first 4 names.");
      return;
    }

    const processed = processNames(getNameValues().join(","));

    if (!processed.ok) {
      showError(error, result, processed.error);
      return;
    }

    const rounds = createRotation(processed.names);
    showResult(error, result, renderRotationTable(rounds));
  });
}