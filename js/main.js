const urlApi = "http://192.168.1.40:8080";
const formCadastrarLink = document.querySelector('[data-form]')


formCadastrarLink.addEventListener('submit', event =>{
    event.preventDefault();

    const url = event.target.querySelector('[data-url]').value;
    const minilink = event.target.querySelector("[data-minilink]").value;
    
    cadastrarMiniLink(url,minilink).then(exibe =>{
        showResponse(exibe.id_link,url,minilink);
        
    })
})

const cadastrarMiniLink = (url,minilink)=>{
    const json = JSON.stringify({
        nome: 'Novo Link', 
        url: url,
        minilink: minilink
        
    })

    return fetch(urlApi+'/links', {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: json
    }).then( response =>{
        let message = "Error ".concat(response.status);
        if(response.ok){
            message = "Mini Link cadastrado com sucesso";
        }
        return response.json();
    }).catch( error =>{
        alert("Error: "+error);
        console.log(error);
        return error;
    })
}

function showResponse(id ,url,minilink){
    const dataMain = document.querySelector('[data-main]');
    const conteudoLinha =         
            `  
                <div class="form-linha">
                    Link Cadastrado com sucesso
                </div>  
                <div class="form-linha">
                    ID: ${id}
                </div>
                <div class="form-linha">
                    URL: ${url}
                </div>
                <div class="form-linha">
                    MiniLink: ${minilink}
                </div>
               `;
        const linha = document.createElement('div');
        linha.className = "container";
        linha.innerHTML = conteudoLinha;
        dataMain.appendChild(linha);
}

