function loading() {
    document.getElementById("loadingContainer").style.display = "none";
}
window.onload = loading;

let search = document.getElementById('search');
let searchResult = document.getElementById('searchResult');
let buttonGotoData = document.getElementById('buttonGoToData');

let e = document.querySelector("div");
let eVector = e.querySelectorAll(".element");
let aVector = e.querySelectorAll(".atomicNumber");
let sVector = e.querySelectorAll(".symbol");
let nVector = e.querySelectorAll(".name");
let mVector = e.querySelectorAll(".mass");

for (let i = 0; i < totalElements; i++) {
    
    let idStr = eVector[i].id.split('-');
    aVector[i].innerHTML = parseInt(idStr[1]);
    nVector[i].innerHTML = elements[idStr[1] - 1]["portuguese"];
    sVector[i].innerHTML = elements[idStr[1] - 1]["symbol"];
    mVector[i].innerHTML = elements[idStr[1] - 1]["mass"];

    applyPreferences();

    document.getElementById("e-" + idStr[1]).setAttribute('onclick', 'selectElement(this.id)');

    if (elements[idStr[1] - 1]["portuguese"].length > 7) nVector[i].style.fontSize = '9px';

}

// Aplica transparencia em todos os elementos da tabela
function allElementsOpaque() {

    for (let i = 1; i <= totalFamilies; i++) {
        let j = (i < 10 ? "0" + i : i);
        document.getElementById("c-" + j).style.opacity = "0.2";
        document.getElementById("c-" + j).style.transition = "0.5s";
    }
    for (let i = 1; i <= totalElements; i++) {
        let j = (i < 10 ? "00" + i : (i < 100) ? "0" + i : i);
        document.getElementById("e-" + j).style.opacity = "0.2";
        document.getElementById("e-" + j).style.transition = "0.5s";
    }
}

// Evidencia a parte inferior da tabela
function selectSubTableGroup() {
    
    allElementsOpaque();

    let e = document.querySelectorAll(".subElement");
    
    for (let i = 0; i < e.length; i++) 
        document.getElementById(e[i].id).style.opacity = "1";
}

// Evidencia o elemento selecionado
function selectElement(id) {

    if (!selectedElement) {

        allElementsOpaque();

        let e = elements[id.split('-')[1] - 1];
        selectElementPeriod(e['period']);
        selectElementGroup(e['group']);
        selectFamily('c-' + e['classification'], false);

        document.getElementById(id).style.opacity = '1';

        buttonGotoData.style.display = 'block';

        selectedElement = true;
    }
    else {
        selectedElement = false;

        undoSelection();
        undoShowPeriodNum();
        undoshowGroupNum();

        buttonGotoData.style.display = 'none';
    }
}

// Metodos para alterar o scroll do mouse quando um elemento ou botao é selecionado
function goToElementDataContainer() {

    let container = document.getElementById('elementDataContainer');
    container.scrollIntoView();
    
    buttonGotoData.style.display = 'none';
}
function goToTable() {

    undoShowPeriodNum();
    undoshowGroupNum();

    let container = document.getElementById('title');
    container.scrollIntoView(); 

    selectedElement = false;
    undoSelection();
    
} 

// Evidencia o grupo selecionado pelo numGroup
function selectGroup(id) {
       
    if (!selectedElement) {

        allElementsOpaque();

        id = id.split('-')[1];
        
        if (id == "03") selectSubTableGroup();
        
        let eIngrup = document.querySelectorAll("#g-" + id + " .element");
        
        for (let i = 0; i < eIngrup.length; i++)
            document.getElementById(eIngrup[i].id).style.opacity = "1";
    }
}
// Evidencia o grupo correspondente ao elemento selecionado
function selectElementGroup(num) {

    num = (num < 10 ? "0" + num : num );

    let group = document.getElementById('ng-' + num).style;
    group.background = "#B4FAFF";
    group.borderRadius = "7px";
    group.transition = "0.5s";
    group.opacity = "1";
    group.color = "blue";
}

// Evidencia o periodo selecionado pelo numPeriod
function selectPeriod(id) {
       
    if (!selectedElement) {

        allElementsOpaque();

        id = id.split('-')[1];
        
        if (id == "6" || id == "7" || id == "8") selectSubTablePeriod(id, true);
        
        let eInPeriod = document.querySelectorAll(".period-" + id);
        
        for (let i = 0; i < eInPeriod.length; i++) 
            document.getElementById(eInPeriod[i].id).style.opacity = "1";
    }
}
// Evidencia o periodo correspondente ao elemento selecionado
function selectElementPeriod(num) {

    let period = document.getElementById('np-' + num).style;
    period.background = "#B4FAFF";
    period.borderRadius = "7px";
    period.transition = "0.5s";
    period.opacity = "1";
    period.color = "blue";
}

// Evidencia elementos na parte inferior da tabela quanto seu respectivo grupo é selecionado
function selectSubTablePeriod(id, difference) { // A diferenca define se sera subtraido 5
    
    if (!selectedElement) {

        allElementsOpaque();

        let period = document.querySelectorAll("#p-" + (difference ? id - 5 : id) + " .subElement");
        
        for (let i = 0; i < period.length; i++) 
            document.getElementById(period[i].id).style.opacity = "1";
    }
}

// Seleciona os elementos com a classificacao escolhida
function selectFamily(idC, showElements) {

    let c = e.querySelectorAll("#classificationsContainer div");
    let idFamily = idC.split("-")[1];

    if (!selectedElement) {

        allElementsOpaque();

        for (let i = 1; i <= totalFamilies; i++) {

            let idStr = c[i].id.split('-')[1];
            
            if (idStr == idFamily) 
                document.getElementById(idC).style.opacity = "1";
        }

        if (showElements) {

            for (let i = 0; i < totalElements; i++) {
                
                let idStr = eVector[i].id.split('-')[1];
            
                if (elements[idStr - 1]["classification"] == idFamily)
                    document.getElementById("e-" + idStr).style.opacity = "1";
            }
        }
    }
}

// Remove a transparencia de todos os elementos da tabela
function undoSelection() {

    if (!selectedElement) { 

        search.value = '';
        searchResult.style.display = 'none'; // Remover resultado de busca se houver

        for (let i = 1; i <= totalFamilies; i++) {
            let id = (i < 10 ? "0" + i : i);
            document.getElementById("c-" + id).style.opacity = "1";
            document.getElementById("c-" + id).style.transition = "0.5s";
        }
        for (let i = 1; i <= totalElements; i++) {
            let id = (i < 10 ? "00" + i : (i < 100) ? "0" + i : i);
            document.getElementById("e-" + id).style.opacity = "1";
            document.getElementById("e-" + id).style.transition = "0.5s";
        }
    }
}   

// Apresenta os numeros dos periodos
function showPeriodNum() {

    for (let i = 1; i <= 8; i++) {

        let div = document.getElementById("np-" + i).style;
        div.background = "#B4FAFF";
        div.borderRadius = "7px";
        div.transition = "0.5s";
        div.color = "blue";
    }
}
function undoShowPeriodNum() {
    
    for (let i = 1; i <= totalPeriods; i++) {

        let div = document.getElementById("np-" + i).style;
        div.background = "white";
        div.borderRadius = "7px";
        div.transition = "0.5s";
        div.color = "gray";
    }
}

// Apresenta os numeros dos grupos
function showGroupNum() {

    for (let i = 1; i <= totalGroups; i++) {

        let div = document.getElementById("ng-" + (i < 10 ? "0" + i : i)).style;
        div.background = "#B4FAFF";
        div.borderRadius = "7px";
        div.transition = "0.5s";
        div.color = "blue";
    }
}
function undoshowGroupNum() {

    for (let i = 1; i <= totalGroups; i++) {

        let div = document.getElementById("ng-" + (i < 10 ? "0" + i : i)).style;
        div.background = "white";
        div.borderRadius = "7px";
        div.transition = "0.5s";
        div.color = "gray";
    }
}

// Funcoes de configuracao

function applyPreferences() {
    
    for (let i = 0; i < totalElements; i++) {

        if (showNumbers) aVector[i].style.opacity = "1";
        else aVector[i].style.opacity = "0";

        if (showMasses) mVector[i].style.opacity = "1";
        else mVector[i].style.opacity = "0";
    }
}

function openSettings() {

    let container = document.getElementById('settingsContainer').style;

    settingsOpen = (settingsOpen ? false : true);

    if (settingsOpen)
        container.display = 'block';
    else 
        container.display = 'none';
}

function setShowNumbers() {

    let query = document.querySelector('div');
    let div = query.querySelector('#showNumbers div div');

    showNumbers = (showNumbers ? false : true);

    if (!showNumbers) {
        let bttn = document.getElementById(div.id);
        bttn.style.background = 'rgb(255, 100, 100';
        bttn.style.transition = '0.3s'; 
        bttn.style.marginRight = '20px';
    }
    else {
        let bttn = document.getElementById(div.id);
        bttn.style.background = 'lightgreen';
        bttn.style.transition = '0.3s';
        bttn.style.marginRight = '0px';
    } 
    applyPreferences();
}

function setShowMasses() {

    let query = document.querySelector('div');
    let div = query.querySelector('#showMasses div div');

    showMasses = (showMasses ? false : true);

    if (!showMasses) {
        let bttn = document.getElementById(div.id);
        bttn.style.background = 'rgb(255, 100, 100';
        bttn.style.transition = '0.3s';
        bttn.style.marginRight = '20px';
    }
    else {
        let bttn = document.getElementById(div.id);
        bttn.style.background = 'lightgreen';
        bttn.style.transition = '0.3s';
        bttn.style.marginRight = '0px';
    } 
    applyPreferences();
}

// Metodo de busca
function searchInTable() {
   
    let totalFound = 0;

    if (search.value != '') {

        allElementsOpaque();
        undoShowPeriodNum();
        undoshowGroupNum();

        for (let i = 0; i < totalElements; i++)
            if (elements[i]['portuguese'].includes(search.value)) totalFound++;

        if (totalFound > 0) {

            selectedElement = true;

            for (let i = 1; i <= totalElements; i++) {
                
                if (elements[i - 1]['portuguese'].includes(search.value)) {

                    let id = (i < 10 ? "e-00" + i : (i < 100 ? "e-0" + i : 'e-' + i));
                    
                    document.getElementById(id).style.opacity = '1';
                    
                    let e = elements[id.split('-')[1] - 1];
                    selectElementPeriod(e['period']);
                    selectElementGroup(e['group']);
                }
            }
            callSearchResult( totalFound + (totalFound > 1 ? ' resultados encontrados' : ' resultado encontrado'));
        }
        else {
            callSearchResult("Nada encontrado!");
            undoSelection();
        }
    }
    else callSearchResult("Digite algo para poder ser buscado!");
}
function callSearchResult(txt) {
    searchResult.style.display = "block";
    searchResult.innerHTML = txt;
}