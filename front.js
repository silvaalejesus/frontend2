/*pegar a lista de filmes na api
inserir os filmes dentro da lista
criar os elementos
inserir na ul
*/

const topFilmes = document.querySelector(".top-filmes");
const filmes = document.querySelector(".filmes");
const categorias = document.querySelectorAll(".buttons-category .generos")
let movies = [];
let generos = [];


/*fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR')
.then((result)=>{
    return result.json();
}).then((result)=>{
    for(let i = 0; i < 5; i ++){
        topMovies.push(result.results[i]);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = result.results[i].poster_path;
        li.append(img);
        const button = document.createElement('button');
        button.innerText = "Sacola"
        const span = document.createElement('span');
        span.innerText = `R$ ${result.results[i].price}`;
        button.append(span);
        li.append(button);
        topFilmes.append(li);
        console.log(i);
    }

    console.log(result)
})*/

function criarElementoDeFilme(filme) {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${filme.poster_path}">
        <button>Sacola <span>R$ ${filme.price}</span></button>
    `;

    return li;
}

fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR')
.then((result)=>{
    return result.json();
}).then((result)=>{
    for (let i = 0; i < 5; i++) {
        const filme = result.results[i];
    
        const li = criarElementoDeFilme(filme);

        topFilmes.append(li);
    }

    for (let i = 0; i < 20; i++) {
        const filme = result.results[i];
        movies.push(filme);
        const li = criarElementoDeFilme(filme);

        filmes.append(li);
    }

    console.log(result)
});

fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR')
.then((resposta)=>{
    return resposta.json();
}).then((resposta)=>{
    /*pecorrer a lista de ids
     comparar se os ids sao iguais
     se for adicionar ao botao de genero especifico aquele id
     --como adiconar os filmes de cada genero ao link do site?
     --se a comparação está corretar?    
    */
    // for(let i = 0; i<resposta.genres.length; i++){
    //     if(resposta.genres[i].id === result.genre_ids['0']){
    //     }
    // }
    generos = resposta.genres;

    for (const categoria of categorias) {
        const genero = generos.filter(genero=>genero.name === categoria.innerText)[0];
        //console.log(genero, categoria);
        categoria.addEventListener("click",()=>{
            let generoId = genero.id;
            filmes.innerHTML = "";
            for(const filme of movies){
                if(filme.genre_ids.includes(generoId)){
                    filmes.append(criarElementoDeFilme(filme));
                }
            }

        })
    };

    document.querySelector(".buttons-category .todos").addEventListener("click", ()=>{
        filmes.innerHTML = "";
            for(const filme of movies){
                filmes.append(criarElementoDeFilme(filme));
            }
    })
    console.log(resposta)
})