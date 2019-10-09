class ApiOpenData { // class récupération des datas api Decaux

    constructor() {

        this.stations = []; // tableau vide pour récupérer data 


    }

    fetchData(url) { // méthode qui renvoit une promesse avec en argument l'URL decaux
        return fetch(url)//return la promesse que renvoit le fetch
            .then(res => res.json()) //reponse JSON
            .then(data => this.recData(data)) // renvoit la fonction recData qui enregistre les données demandées
            .catch(err => console.error(err)); // catch error au cas où...
        }

    recData(datas) { //méthode pour récuperer dans un tableau this.station = []; juste les datas dont nous avons besoin pour chaque station
        datas.map(data => {
            this.stations.push({//on push toutes les infos dont on a besoin dans le this.station
                number: data.number,
                latLng: data.position,
                name: data.name,
                Adresse: data.address,
                Velos_dispos: data.available_bikes,
                Places_dispos: data.available_bike_stands

            });

        });

        
        return this.stations; //on return le tableau; si cela de passe mal on catch l'erreur

    }


}

export default ApiOpenData;


