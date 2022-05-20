const client = ZAFClient.init();

let ticket_id
let requester_id


const getTicketInfo = async () => {
  try {
    const result = await client.get('ticket')
    ticket_id = result.ticket.id
    requester_id = result.ticket.requester.id
  } catch (e) {
    console.log(`Error request ${e}`);
  }
}

const searchCEP = async () => {
  document.querySelector(".loading-container").style.display = "inline"
  const cep = document.querySelector("#input-cep").value

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const address = await response.json();

    const body = {
      ticket: {
        comment: {
          html_body: `<p style="color: red; font-weight: 800; color: #04363c; font-size: 1rem; text-align: center;">Endereço</p>
               <p>${address.logradouro}, ${address.complemento}</p>
               <p>${address.bairro}, ${address.localidade}/${address.uf}</p>
               <p>${address.cep}</p>`
        }
      }
    }

    client.request({
      method: 'PUT',
      url: `/api/v2/tickets/${ticket_id}`,
      contentType: 'application/json',
      data: JSON.stringify(body),
      secure: true
    }).then(function (data) {
      console.log("Ticket update successfully")
      document.querySelector(".loading-container").style.display = "none"
    }).catch(function (e) {
      console.log(`Error request ${e}`);
      document.querySelector(".loading-container").style.display = "none"
    })

  } catch (e) {
    console.log(`Error request ${e}`);
  }
};

const listTickets = async () => {
  try {
    const result = await client.request(`/api/v2/users/${requester_id}/tickets/requested`)
    
    const tickets = result.tickets
    const list = tickets.map(function (ticket) {
      return `<li><b>Título:</b> ${ticket.subject}</li>`;
    })

    document.getElementById('ticket-list').innerHTML = list;

  } catch (e) {
    console.log(`Error request ${e}`);
  }
}

const Core = {
  searchCEP,
  listTickets,
  getTicketInfo
};

export default Core;
