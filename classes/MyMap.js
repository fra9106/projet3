import ApiOpenData from '/projet3/classes/ApiOpenData.js';
import Timer from '/projet3/classes/timer.js';

class MyMap {
    constructor(myMap) {

        this.myMap = myMap;




    }
    //initiation de la carte
    initMap() {


        //création du calque image
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.myMap);


    }

    createMarker(number, name, Adresse, Velos_dispos, Places_dispos, latLng, message, open) {
        let velo = L.icon({
            iconUrl: 'images/marqueurVélo.png',
            iconSize: [45, 45]
        })


        let marker = L.marker(latLng, {
            icon: velo
        })

        .bindPopup(message)

        if (open === true) marker.openPopup();


        marker.addEventListener('click', () => { // fetch pour récuperer les infos en temps réel de l'api Decaux par le numéro de chaque station
            fetch('https://api.jcdecaux.com/vls/v3/stations/' + number + '?contract=creteil&apiKey=6fa465c2f5655792819a294f33e66be3c3b58ec6')
            .then(result => result.json())
            .then(json => {



                    // vélos dispo après validation...
                    let validVeloDispo = Number(json.mainStands.availabilities.bikes) - 1 //avec comme argument Number l'adresse de l'info du Json - 1 pour le vélo réservé

                    
                    // affichage des infos dans - Détail de la Station - fraîchement récupérés par stations au click sur le marker
                    document.querySelector('#infos_station').innerHTML = '<p> Station : ' + json.status + ' <br> Numéro : ' + json.number + '<br> Stand : ' + json.name + ' <br> Adresse : ' + json.address + ' <br> Vélos disponibles : ' + json.mainStands.availabilities.bikes + ' <br> Places disponibles : ' + json.mainStands.availabilities.stands + '</p>';
                    document.querySelector('#form').style.visibility = 'initial'
                    document.querySelector('#infos_station').style.visibility = 'initial'
                    //stockage des infos dans le sessionStorage
                    sessionStorage.setItem('StationClick', json.name)
                    sessionStorage.setItem('VeloDispoApresValidation', validVeloDispo)
                    sessionStorage.setItem('Adresse', json.address)



                    // si il n'y a plus de vélos dispos sur la station cliqué, on alert un message
                    if (json.mainStands.availabilities.bikes === 0) {
                        alert('Plus de vélos disponibles ici, cliquez sur une autre station!');
                    }



                })


        });

        return marker;




    };


};
export default MyMap;