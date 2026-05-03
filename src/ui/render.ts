export function renderApp() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("App root not found");

  app.innerHTML = `
    <div class="app-container">
      <header class="app-header">
        <h1>SARweb</h1>
        <p>Welcome to SARweb, your go-to solution for generating training rotations for search and rescue dogs.<br>There is a minimum of 4 and a maximum of 7 participants. A rotation table will be generated for all participants, with one dog participating in each round.</p>
        <br />
        <p>Enter (human) participant names:</p>
    </header>
      
      <div id="name-form" class="form-container"></div>
      
      <button id="generate-btn" class="btn-primary">Create table</button>
      
      <div id="error" class="error-message"></div>
      <div id="result"></div>
    </div>
  `;
}