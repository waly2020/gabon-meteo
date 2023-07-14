const sectionMeteo = document.getElementById("meteo");
let btns = [];
let pages = [];
let jour = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
let mois = ["Jan.", "Fev.", "Mar.", "Avr.", "Mai.", "Juin", "Juil.", "Aou.", "Sep.", "Oct.", "Nov.", "Dec."];
let journee = ["Matin", "Apres-midi", "Soir", "Nuit"];

let loader = true;

const key = "7dff8c59c3153f57f1c78397f6c66e3a";
let villes = ["libreville", "moanda", "koulamoutou", "franceville", "okondja", "ndjole", "owendo", "ntoum", "kango", "cocobeach", "lambarene", "fougamou", "mouila", "ndende", "mbigou", "tchibanga", "mayumba", "makokou", "booue", "mekambo", "port-gentil", "omboue", "gamba", "oyem", "bitam", "bitam", "mitzic", "medouneu"];



for (let i = 0; i < villes.length; i++) {
    let ville = villes[i];
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&units=metric&appid=${key}`).then(res => {
        if (res.ok) {
            res.json().then(currentData => {
                // console.log(ville,currentData.dt);
                let d = new Date(currentData.dt * 1000);
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville},GA&lang=fr&units=metric&appid=${key}`).then(resHistorie => {
                    if (resHistorie.ok) {
                        if(i >= villes.length - 8){
                            document.querySelector(".loader").classList.add("active");
                        }
                        resHistorie.json().then(historie => {
                            const heurs = () => {
                                let dts = "";
                                for (let i = 0; i < 5; i++) {
                                    let heur = historie.list[i];
                                    let dtt = new Date(heur.dt * 1000);
                                    dts += `
                                    <div class="data-tmp">
                                       <p class="titre-data">${dtt.getHours() < 10 ? "0" + dtt.getHours() : dtt.getHours()}h : ${dtt.getMinutes() < 10 ? "0" + dtt.getMinutes() : dtt.getMinutes()}m</p>
                                       <p class="degre-tmp">${Math.floor(heur.main.temp)}°</p>
                                       <img src="https://openweathermap.org/img/w/${heur.weather[0].icon}.png" alt="temperature" class="data-tmp-img">
                                    </div>
                                    `;
                                }
                                return dts;
                            }
                            const jours = () => {
                                let dts = "";
                                for (let i = 0; i < 36; i += 8) {
                                    let jourHis = historie.list[i];
                                    let dtt = new Date(jourHis.dt * 1000);
                                    dts += `
                                    <div class="data-tmp">
                                      <p class="titre-data">${jour[dtt.getDay()]} ${dtt.getDate()}</p>
                                      <p class="degre-tmp">${Math.floor(jourHis.main.temp)}°</p>
                                      <img src="https://openweathermap.org/img/w/${jourHis.weather[0].icon}.png" alt="temperature" class="data-tmp-img">
                                      <p class="sous-degre">${jourHis.weather[0].description}</p>
                                    </div>
                                    `;
                                }
                                return dts;
                            }
                            const maintenant = () => {
                                let dts = "";
                                let iTab = 0;
                                for (let i = 0; i < 7; i += 2) {
                                    let now = historie.list[i];
                                    let dtt = new Date(now.dt * 1000);
                                    dts += `
                                    <div class="data-tmp">
                                      <p class="titre-data">${journee[iTab]}</p>
                                      <p class="degre-tmp">${Math.floor(now.main.temp)}°</p>
                                      <img src="https://openweathermap.org/img/w/${now.weather[0].icon}.png" alt="temperature" class="data-tmp-img">
                                      <p class="sous-degre">${now.weather[0].description}</p>
                                    </div>
                                    `;
                                    iTab++;
                                }
                                return dts;
                            }
                            sectionMeteo.innerHTML += `
                        <div class="items">
            <div class="heade-item-meteo">
                <img src="https://meteo-app-gabon.netlify.app/backItem.jpg" alt="design" class="back-img">
                <div class="head-item-meteo-content">
                    <div class="head-item-meteo-texte">
                        <h2>${currentData.name}</h2>
                        <h3>${jour[d.getDay()]} ${d.getDate()} ${mois[d.getMonth()]} ${d.getFullYear()}</h3>
                    </div>
                    <div class="head-item-meteo-img">
                        <div class="head-temp">
                            <img src="https://openweathermap.org/img/w/${currentData.weather[0].icon}.png" alt="temperature" class="inc-temp">
                        <h2>${Math.floor(currentData.main.temp)}°</h2>
                        </div>
                        <p>${currentData.weather[0].description}</p>
                    </div>
                </div>
            </div>

            <div class="onglet">
                <button data-item="${i}" data-active="1" class="active">Aujourd'hui</button>
                <button data-item="${i}" data-active="2">Par heure</button>
                <button data-item="${i}" data-active="3">Quotidien</button>
            </div>
            <!--  -->
            <div data-item="${i}" data-active="1" class="maintenant datas-temps active">

                ${maintenant()}

            </div>
            <!--  -->
            <!--  -->
            <div data-item="${i}" data-active="2" class="heurs-temp datas-temps">
               ${heurs()}
            </div>
            <!--  -->
            <!--  -->
            <div data-item="${i}" data-active="3" class="quotidien-tmp datas-temps">

                ${jours()}

            </div>
            <!--  -->

        </div>
                        `;
                            btns = document.querySelectorAll(".onglet > button");
                            pages = document.querySelectorAll(".datas-temps");
                            addDinamique();
                        })
                    } else {
                        console.log(resHistorie.status);
                    }
                }).catch(err => {
                    console.log(err);
                })
            })
        } else {
            console.log(res);
        }
    }).catch(err => {
        console.log(ville, " n'as pas pue etre trouver");
    })

    
}
