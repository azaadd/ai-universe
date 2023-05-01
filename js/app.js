const loadAiTools = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools);
}

const displayTools = tools =>{
    console.log(tools);
    const toolsContainer = document.getElementById('tool-container');
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
            <div class="card p-3">
                <img src="${tool.image}" class="card-img-top mx-auto rounded sizes" alt="...">
                <div class="card-body">
                    <h5 class="card-title mb-4">Features</h5>
                    <span class="card-text">1. ${tool.features[0]}</span><br>
                    <span class="card-text">2. ${tool.features[1]}</span><br>
                    <span class="card-text">3. ${tool.features[2]}</span><br>
                </div>
                <hr class="mx-3">
                <div class="d-flex  justify-content-between">
                    <div>
                        <h5 class="list-group-item mb-3 ms-3">${tool.name}</h5>
                        <div class="ms-3">
                            <i class="fa-regular fa-calendar"></i>
                            <span class="ms-2">11/01/2022</span>
                        </div>
                    </div>
                    <button class="btn btn-light rounded-4 me-3 h-25 mt-3"><i class="fa-solid red fa-arrow-right"></i></button>
                </div>
            </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });
}


loadAiTools();