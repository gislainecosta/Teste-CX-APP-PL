import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});


const Main = async () => {
  const functions = Core
  const App = document.getElementById("app");
  let appBody = `
  <div id="main-content">
    <p>Insira o CEP</p>
    
    <section>
      <input type="number" id="cep" name="cep" placeholder="CEP" />
      <button onClick=''>Consultar CEP</button>
    </section>
    
    <button onClick=''>Listar Tickets</button>
  </div>`;

  App.innerHTML = appBody;
};

export default Main;
