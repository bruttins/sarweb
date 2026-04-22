export function renderApp() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("App root not found");

  app.innerHTML = `
    <h1>SARweb</h1>
    <p>Enter participant names separated by commas.</p>
    <div id="name-form"></div><br />
    <button id="generate-btn">Create table</button>
    <div id="error"></div>
    <div id="result"></div>
  `;
}