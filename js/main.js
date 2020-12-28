const urlApi = "http://192.168.1.40:8080";

const getLinks = document.querySelector('[data-links');
const getHome = document.querySelector('[data-home]');
const dataMain = document.querySelector('[data-main]');


const listarLinks =  () =>{
    return fetch(urlApi+'/links').then(response=>{
        return response.json();
    }).then(json=>{
        return json;
    })
    
}

getLinks.addEventListener('click', event=>{

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
getHome.addEventListener('click', event=>{
    event.preventDefault();

    getPage('home.html', 'js/home.js');
    
        
})
function getPage(pageFile, scritpFile){
    fetch(pageFile)
    .then(res => res.text())
    .then(text =>  {
        dataMain.innerHTML=text;
        if(scritpFile !== null){
            getScript(scritpFile);
        }     
    })
}
function getScript(scriptFile){
        var script = document.createElement('script');
        script.src = scriptFile;
        dataMain.appendChild(script);
}



function showResponse(id ,url,minilink){
    
    const conteudoLinha =         
            `   <div class="form-linha title-box">
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