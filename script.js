let tablazat = document.querySelector('table');
let tbody = document.querySelector('table tbody');
tbody.innerHTML='';
let torles = document.querySelector('#torles');
const form = document.querySelector("form");

let records = [];
let stored = localStorage.getItem("data");
if(stored) records = JSON.parse(stored);

document.querySelector('button').onclick = function(evt)
{
    evt.preventDefault();
    let todo =
    {
        id: Math.random().toString(16).slice(2),
        cim: document.getElementById('cim').value,
        leiras: document.getElementById('leiras').value,
        felelosneve: document.getElementById('felelosneve').value,
        felelosemail: document.getElementById('felelosemail').value,
        hatarido: document.getElementById('hatarido').value,
        prioritas: document.getElementById('prioritas').value
    }
    
    records.push(todo);
    UpdateTable();

    localStorage.setItem("data", JSON.stringify(records));
    
    console.log(todo);
    document.querySelector('form').reset();
};
 
function UpdateTable(){
    let html = '';
    for(let [index, record]of records.entries()){
        html+= `<tr><td id="td${index}cim" contenteditable='true'>${record.cim}</td>
        <td id="td${index}leiras" contenteditable='true'>${record.leiras}</td>
        <td id="td${index}felelosneve" contenteditable='true'>${record.felelosneve}</td>
        <td id="td${index}felelosemail" contenteditable='true'>${record.felelosemail}</td>
        <td id="td${index}hatarido" contenteditable='true'>${record.hatarido}</td>
        <td>${record.prioritas}</td>
        <td><button id="delete${index}">törlés</button></td>
        <td><button id="save${index}">mentés</button></td></tr>`;
    }
    tbody.innerHTML = html;
    for(let [index, record] of records.entries()){
        let btn = document.querySelector(`#delete${index}`)
        btn.addEventListener("click", ()=>{
            records = records.filter(r => r.id !== record.id)
            UpdateTable()
            localStorage.setItem("data", JSON.stringify(records));
        });
        let btn2 = document.querySelector(`#save${index}`)
        btn2.addEventListener("click", ()=>{
            console.log(records[index])
            let cim = document.querySelector(`#td${index}cim`)
            records[index].cim = cim.innerText
            localStorage.setItem("data", JSON.stringify(records))
            //
            let leiras = document.querySelector(`#td${index}leiras`)
            records[index].leiras = leiras.innerText
            localStorage.setItem("data", JSON.stringify(records))
            //
            let felelosneve = document.querySelector(`#td${index}felelosneve`)
            records[index].felelosneve = felelosneve.innerText
            localStorage.setItem("data", JSON.stringify(records))
            //
            let felelosemail = document.querySelector(`#td${index}felelosemail`)
            records[index].felelosemail = felelosemail.innerText
            localStorage.setItem("data", JSON.stringify(records));
            
            
        });
    }
};
UpdateTable();



document.addEventListener("submit", (e)=>{
    e.preventDefault();
    let hiba = hibasE();

    if(hiba){
        tbody.innerHTML="";
        for(const h of hibak){
            let ujElem = document.createElement("td");
            ujElem.innerHTML = h;
            ujElem.onmouseenter = () =>{
                setTimeout(() => {
                    ujElem.style.display="none";
                }, 1000);   
            }
            list.appendChild(ujElem);
        }
        form.classList.remove("helyes")
        form.classList.remove("inputFolyamatban")
        form.classList.add("hibas")
    
    }else{
        form.classList.remove("hibas")
        form.classList.remove("inputFolyamatban")
        form.classList.add("helyes")
}
})

let idozito; 
form.addEventListener("input", ()=>{
    clearTimeout(idozito)
    form.classList.add("inputFolyamatban")
    idozito = setTimeout(() => {
        form.classList.remove("inputFolyamatban")
    }, 2000);

})


function hibasE(){
    let hibak = [];
    if(form.nev.value === ''){
        hibak.push("A cím nem lehet üres!")
    }
    if(form.leiras.value === ''){
        hibak.push("A leírás nem lehet üres!")
    }
    if(form.felelosneve.value === ''){
        hibak.push("A felelős neve nem lehet üres!")
    }
    if(form.felelosemail.value === ''){
        hibak.push("Az email cím nem lehet üres!")
        if(felelosemail.value === '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'){

        }
    }

    if(hibak.length === 0){
        return false;
    }else{
        return(hibak)
    }
}



//Delegálás
function delegal(szulo, gyerek, mikor, mit){
    function esemenyKezelo(esemeny){
        let esemenyCelja    = esemeny.target;
        let esemenyKezeloje = this;
        let legkozelebbiKeresettElem = esemenyCelja.closest(gyerek);

        if(esemenyKezeloje.contains(legkozelebbiKeresettElem)){
            mit(esemeny, legkozelebbiKeresettElem);
        }
    }


    szulo.addEventListener(mikor, esemenyKezelo);
}

// Kijelölés kézzel 
function kijelol(esemeny, elem){
    elem.classList.toggle('kijelolve');
}
delegal(tablazat, 'tr', 'click', kijelol);


