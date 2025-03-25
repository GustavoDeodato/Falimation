'use strict'

async function AnimesTemporada() {
    const container = document.getElementById("anime-container")

    const response = await fetch("https://api.jikan.moe/v4/seasons/now")
    const data = await response.json()
    const animeList = data.data

    container.innerHTML = "" 

    animeList.slice(0, 10).forEach(anime => { 
        const card = document.createElement("div")
        card.className = "anime-card"
        card.dataset.animeId = anime.mal_id // Guarda o ID do anime

        const img = document.createElement("img")
        img.src = anime.images.jpg.image_url
        img.alt = anime.title

        const title = document.createElement("h3")
        title.textContent = anime.title

        card.appendChild(img)
        card.appendChild(title)
        container.appendChild(card)

        // Evento de clique para exibir os detalhes do anime
        card.addEventListener("click", () => {
            const animeId = card.dataset.animeId
            DetalhesAnime(animeId) // Chama a função de detalhes
        })
    })
}

async function DetalhesAnime(id) {
    const container = document.getElementById("anime-container") // Usamos o mesmo container
    container.innerHTML = "" // Limpa a tela

    const url = `https://api.jikan.moe/v4/anime/${id}`
    console.log(`Buscando detalhes do anime na URL: ${url}`)

    try {
        const response = await fetch(url)
        const data = await response.json()
        const anime = data.data

        // Criando os elementos dinamicamente
        const detailsDiv = document.createElement("div")
        detailsDiv.className = "anime-detalhes"

        const img = document.createElement("img")
        img.src = anime.images.jpg.image_url
        img.alt = anime.title

        const title = document.createElement("h2")
        title.textContent = anime.title

        const synopsis = document.createElement("p")
        synopsis.textContent = anime.synopsis || "Sem sinopse disponível."

        const backButton = document.createElement("button")
        backButton.textContent = "Voltar"
        backButton.addEventListener("click", () => {
            AnimesTemporada() // Retorna à lista de animes
        })

        // Adicionando os elementos à tela
        detailsDiv.appendChild(img)
        detailsDiv.appendChild(title)
        detailsDiv.appendChild(synopsis)
        detailsDiv.appendChild(backButton)
        container.appendChild(detailsDiv)

    } catch (error) {
        console.error("Erro ao buscar detalhes do anime:", error)
    }
}

AnimesTemporada()
