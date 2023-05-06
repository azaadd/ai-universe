const loadAiTools = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayCards(data.data.tools, dataLimit);
}

const displayCards = (cards, dataLimit) =>{
    const cardsContainer = document.getElementById('tool-container');

    cardsContainer.innerHTML = '';

    // start spinner loader...
    toggleSpinner(true);

    // display 6 Ai card tools only. 
    const showAll = document.getElementById('show-all');
    if(dataLimit && cards.length > 6){
        cards = cards.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // creating display cards
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
            <div class="h-100 w-auto card p-4">
                <img src="${card.image}" class="card-img-top mx-auto rounded sizes" alt="...">
                <div class="card-body">
                    <h5 class="card-title mb-4">Features</h5>
                    <span class="card-text">1. ${card.features[0]}</span><br>
                    <span class="card-text">2. ${card.features[1]}</span><br>
                    <span class="card-text">3. ${card.features[2]}</span><br>
                </div>
                <hr class="mx-3">
                <div class="d-flex  justify-content-between">
                    <div>
                        <h5 class="list-group-item mb-3 ms-3">${card.name}</h5>
                        <div class="ms-3">
                            <i class="fa-regular fa-calendar"></i>
                            <span class="ms-2">${card.published_in}</span>
                        </div>
                    </div>
                    <button onclick="loadAiToolDetails('${card.id}')" class="btn btn-light rounded-5 me-3 h-75 mt-3 text-center" data-bs-toggle="modal" data-bs-target="#toolDetailModal"><i class="fa-solid red fa-arrow-right text-center"></i></button>
                    
                </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
    });

    // stop spinner loader...
    toggleSpinner(false);
};


const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    toggleSpinner(true);
    loadAiTools();
})


const loadAiToolDetails = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayToolDetail(data.data);
}


const displayToolDetail = (tool) =>{

    
        const modalCardDescription = document.getElementById('card-description');
        modalCardDescription.innerText = `${tool.description ? tool.description : "No description found"}`;
                        
}

loadAiTools(6);