import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
  Core.getTicketInfo()
});

client.on("app.registered", (e) => {
  document.getElementById("button-cep").addEventListener("click", Core.searchCEP);
  document.getElementById("button-tickets").addEventListener("click", Core.listTickets);
});


const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
  <div id="main-content">
    <section style="display: none" class='loading-container'>
      <img src='../images/loading.gif' alt='loading'/>
    </section>
    
    <h1>Insira um comentário com Endereço</h1>
    
    <section>
      <input name="cep" id="input-cep" type="text" maxlength="8" placeholder="CEP (somente números)"/>
      <button id="button-cep">Inserir Endereço</button>
    </section>

    <section class='tickets-list'>
      <h1>Listar tickets anteriores</h1>
      <button id="button-tickets">Gerar Lista</button>
      <ol id="ticket-list">
      </ol>
    </section>
  </div>`;

  App.innerHTML = appBody;
};

export default Main;
