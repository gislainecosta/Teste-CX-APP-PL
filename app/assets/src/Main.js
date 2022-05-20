import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

client.on("app.registered", (e) => {
  document.getElementById("button-cep").addEventListener("click", Core.searchCEP);
  document.getElementById("button-tickets").addEventListener("click", Core.listTickets);
});


const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
  <div id="main-content">
    <p>Insira o CEP</p>
    
    <section>
      <input name="cep" id="input-cep" type="text" maxlength="8" placeholder="Digite somente números"/>
      <button id="button-cep">Consultar CEP</button>
    </section>
    
    <button id="button-tickets">Listar Tickets</button>

    <section>
      <p>Tickets anteriores</p>
      <ol id="ticket-list">
      </ol>
    </section>
  </div>`;

  App.innerHTML = appBody;
};

export default Main;
