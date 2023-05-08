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

    // modal card description
        const modalCardDescription = document.getElementById('card-description');
        modalCardDescription.innerText = `${tool.description ? tool.description : "No description found"}`;

    // modal card price
        const modalCardPricing1 = document.getElementById('modal-card-price1');
        modalCardPricing1.innerText = `${tool.pricing ? tool.pricing[0].price : "Free of Cost/"}`; 

        const modalCardPricing2 = document.getElementById('modal-card-price2');
        modalCardPricing2.innerText = `${tool.pricing ? tool.pricing[1].price : "Free of Cost/"}`; 

        const modalCardPricing3 = document.getElementById('modal-card-price3');
        modalCardPricing3.innerText = `${tool.pricing ? tool.pricing[2].price : "Free of Cost"}`; 

        // modal card plan
        const modalCardPlaning1 = document.getElementById('modal-card-plan1');
        modalCardPlaning1.innerText = `${tool.pricing ? tool.pricing[0].plan : "Basic"}`; 

        const modalCardPlaning2 = document.getElementById('modal-card-plan2');
        modalCardPlaning2.innerText = `${tool.pricing ? tool.pricing[1].plan : "Pro"}`; 

        const modalCardPlaning3 = document.getElementById('modal-card-plan3');
        modalCardPlaning3.innerText = `${tool.pricing ? tool.pricing[2].plan : "Enterprise"}`; 

        // modal features
        const modalFeatures1 = document.getElementById('model-feature1');
        modalFeatures1.innerText = `${tool.features ? tool.features[1].feature_name : "No data found"}`;

        const modalFeatures2 = document.getElementById('model-feature2');
        modalFeatures2.innerText = `${tool.features ? tool.features[2].feature_name : "No data found"}`;

        const modalFeatures3 = document.getElementById('model-feature3');
        modalFeatures3.innerText = `${tool.features ? tool.features[3].feature_name : "No data found"}`;

        // modal integration
        const modalIntegration1 = document.getElementById('model-integration1');
        modalIntegration1.innerText = `${tool.integrations ? tool.integrations[0] : "No data found"}`;

        const modalIntegration2 = document.getElementById('model-integration2');
        modalIntegration2.innerText = `${tool.integrations ? tool.integrations[1] : "No data found"}`;

        const modalIntegration3 = document.getElementById('model-integration3');
        modalIntegration3.innerText = `${tool.integrations ? tool.integrations[2] : "No data found"}`;
    
        // modal image
        

}

loadAiTools(6);