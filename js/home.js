const formCadastrarLink = document.querySelector('[data-form]');    
formCadastrarLink.addEventListener('submit', event =>{
    event.preventDefault();
    
    const url = event.target.querySelector('[data-url]').value;
    const minilink = event.target.querySelector("[data-minilink]").value;
    
    cadastrarMiniLink(url,minilink).then(exibe =>{
        showResponse(exibe.id_link,normalizedURL(url),minilink);
        
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
        alert(message);
        return response.json();
    }).catch( error =>{
        alert("Error: "+error);
        console.log(error);
        return error;
    })
}