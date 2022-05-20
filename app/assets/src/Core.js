const client = window.ZAFClient.init()

const searchCEP = () => {
  const cep = document.querySelector("#input-cep").value
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
    })
    .catch(function (e) {
      console.log(`Error request ${e}`);
    });

};

const listTickets = () => {
  client.get('ticket')
  .then((res) => {
    const id = res.ticket.requester.id
    
    client.request(`/api/v2/users/${id}/tickets/requested`).then((res) => {
      console.log(res.tickets);
    })
  })
  .catch(function (e) {
    console.log(`Error request ${e}`);
  });
}

const Core = {
  searchCEP,
  listTickets
};

export default Core;
