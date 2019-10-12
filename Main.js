import MyMap from '/projet3/classes/MyMap.js';
import ApiOpenData from '/projet3/classes/ApiOpenData.js';
import Diaporama from "/projet3/classes/Diaporama.js";
import Canvas from "/projet3/classes/Canvas.js";
import Formulaire from "/projet3/classes/Formulaire.js";
import Timer from "/projet3/classes/Timer.js";

class Main{

    constructor(){

const tabImages = ['images/image1.jpg', 'images/carte.png', 'images/reservez.png', 'images/signature.png', 'images/decompte.png', 'images/image3.jpg']; // déclaration contante contenant le tableau images
const tabTexte = ["Cristolib : mode d'emploi...", 'Choisissez votre station...', 'Réservez...', 'Signez...', 'Vous avez 20mn pour retirer votre vélo...', '...Et cristolibez en toute liberté !']; // déclaration constante contenant le tableau texte

// instanciation diaporama
const Slid = new Diaporama(document.getElementById('slide'), document.getElementById('textSlider'), tabImages, tabTexte, "left", "right", "pause", "play")

Slid.clickButton(); // fin du diaporama

//instanciation de la classe Canvas par la création de l'objet signature
const signature = new Canvas(); 
//évènements souris
document.querySelector("#canvas").addEventListener('mousedown', function() {
    signature.mouseDown();
});
document.querySelector("#canvas").addEventListener('mouseup', function() {
    signature.mouseUp();
});
document.querySelector("#canvas").addEventListener('mousemove', function(e) {
    signature.putPoint(e);
});
//évènements tactile
document.querySelector("#canvas").addEventListener('touchstart', function(e) {
    signature.engage(e);
});
document.querySelector("#canvas").addEventListener('touchmove', function(e) {
    signature.point(e);
});
document.querySelector("#canvas").addEventListener('touchend', function() {
    signature.desengage();
});

// création variable API_URL_OPENDATA avec url api DECAUX
var API_URL_OPENDATA = 'https://api.jcdecaux.com/vls/v1/stations?contract=creteil&apiKey=6fa465c2f5655792819a294f33e66be3c3b58ec6'; 

const config = {
    latLng: [48.7833, 2.4667],//coordonnées carte
    zoom: 13//zoom carte
};

//apparition / et cahe des formulaires de réservation par ordre
document.querySelector('#infos_station').style.visibility = 'initial'
document.querySelector('#form').style.visibility = 'hidden'
document.querySelector('#timer').style.visibility = 'hidden'
document.querySelector('#signature').style.visibility = 'hidden'

// instanciation de la carte
var map = L.map('map').setView(config.latLng, config.zoom);
// instanciation myMap
var myMap = new MyMap(map);
// instanciation objet api qui nous servira pour le fetchDatas un peu plus bas
var api = new ApiOpenData();
// instanciation objet okStation de la class Formulaire
const okStation = new Formulaire();

// condition pour rechargement page en gardant une réservation en cours
if (sessionStorage.getItem("Minutes") != null && sessionStorage.getItem("Secondes") != null) {
    const countDown = new Timer(sessionStorage.getItem("Minutes"), sessionStorage.getItem("Secondes"));
    countDown.displayTimer();
    document.querySelector('#timer').style.visibility = 'initial'
    document.querySelector('#annuler').style.visibility = 'initial'
} else {
    const countDown = new Timer(20, 0);
}

//instanciation objet counDown de la class Timer
const countDown = new Timer(20, 0);

document.addEventListener('DOMContentLoaded', () => { // au chargement du document on boucle sur l'initialisation de la carte
    myMap.initMap();// ensuite on charge les markers les pop-up ainsi que leur informations 

    api.fetchData(API_URL_OPENDATA) //il fetch la data à travers l'api Decaux
    .then(stations => {//il prends les stations qui lui ont étés renvoyées, et il boucle à travers ttes les stations pour créer nos markers
            var markers = new L.MarkerClusterGroup(); // groupement des markers
            var messagePopUp = "";
            stations.forEach(station => { // forEach pour l'affichage des infos de chaque station dans les popUp

                messagePopUp = `

                Stand : ${station.name}<br>
                Adresse : ${station.Adresse}<br>
                Vélos disponibles : ${station.Velos_dispos}<br>
                Places disponibles : ${station.Places_dispos}`;

                markers.addLayer(myMap.createMarker(station.number, station.name, station.Adresse, station.Velos_dispos, station.Places_dispos, station.latLng, messagePopUp, true));

            });
            myMap.myMap.addLayer(markers);

        });

});

    }
}

let appli = new Main();



