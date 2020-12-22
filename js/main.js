const urlApi = "http://192.168.1.40:8080";
const formCadastrarLink = document.querySelector('[data-form]');
const getLinks = document.querySelector('[data-links');
const getHome = document.querySelector('data-home');
const dataMain = document.querySelector('[data-main]');

formCadastrarLink.addEventListener('submit', event =>{
    event.preventDefault();

    const url = event.target.querySelector('[data-url]').value;
    const minilink = event.target.querySelector("[data-minilink]").value;
    
    cadastrarMiniLink(url,minilink).then(exibe =>{
        showResponse(exibe.id_link,normalizedURL(url),minilink);
        
    })
})

const listarLinks =  () =>{
    return fetch(urlApi+'/links').then(response=>{
        return response.json();
    }).then(json=>{
        return json;
    })
    
}

getLinks.addEventListener('click', event=>{

    event.preventDefault();
    dataMain.innerHTML = '';
    const tableLinks = document.createElement('div');
    listarLinks().then(exibe=>{
        if(exibe.response.length >1 ){
            const linha = document.createElement('div');
            exibe.response.forEach(indice=>{
                showResponse(indice.id_link,indice.url,indice.minilink);
            })
        }
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

function normalizedURL(url){
    
    if(url.indexOf('http') <0){
        return 'https://'+url;
    }
    return '';
}