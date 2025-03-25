'use strict'

async function AnimesRanking() {
    const divPrincipal = document.getElementById('conteudo')
    const container = document.getElementById("anime-container")

    const response = await fetch("https://api.jikan.moe/v4/top/anime")
    const data = await response.json()
    const animeList = data.data

    container.innerHTML = "" // Limpa o conteúdo antes de adicionar novos itens

    animeList.slice(0, 10).forEach(anime => { 
        const card = document.createElement("div")
        card.className = "anime-card"

        const img = document.createElement("img")
        img.src = anime.images.jpg.image_url
        img.alt = anime.title

        const title = document.createElement("h3")
        title.textContent = anime.title

        card.appendChild(img)
        card.appendChild(title)
        container.appendChild(card)
    })
    
    divPrincipal.appendChild(container) // Adiciona o container ao divPrincipal
}

AnimesRanking()
