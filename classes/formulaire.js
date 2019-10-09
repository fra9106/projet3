import Canvas from "/projet3/classes/canvas.js";
import Timer from "/projet3/classes/timer.js";
import MyMap from "/projet3/classes/MyMap.js";

class Formulaire {
    constructor(form) {
        this.boutReserver = document.querySelector('#reserver'); // initialisation bouton reserver
        this.boutConfirm = document.querySelector('#confirmez');//initialisation bouton confirmer
        this.signature = document.querySelector('#signature');//initialisation bouton signature
        this.boutAnnulerForm = document.querySelector('#annulerForm');//initialisation bouton Annuler le formulaire
        this.boutTimer = document.querySelector('#annuler');//initialisation bouton Annuler timer
        this.form = document.querySelector('#form');//récupération div form
        this.timer = document.querySelector('#timer');//récupération div timer
        this.nom = document.getElementById('Nom');//récupération Nom
        this.prenom = document.getElementById('Prenom');//récupération Prénom
        this.inscription = document.querySelector('.inscription');//récupération class inscription Nom/Prénom
        this.formInit();// initiation méthode de gestion d'évenements des différents formulaires
        this.recInfos();// initiation méthode de gestion d'enregistrement nom prénom en localStorage

    }

    recInfos() { // méthode de gestion d'enregistrement nom prénom en localStorage
    this.boutReserver.addEventListener('click', () => {
        if (this.inscription.value.length < 2) {
            this.signature.style.visibility = 'hidden'
            alert('Merci de taper vos nom et prénom !')

        } else {
            this.signature.style.visibility = 'initial'
        }

        localStorage.setItem('Nom', this.nom.value);
        localStorage.setItem('Prenom', this.prenom.value);

        });
    }

    formInit() { // méthode de gestion d'initiation et d'évenements des différents formulaires
    
                // évenement bouton réserver
                this.boutReserver.addEventListener('click', () => {
                // gestion cache/apparition infos : signature
                document.querySelector('#signature').style.visibility = 'initial'
                this.boutConfirm.style.visibility = 'hidden'
                // évenement bouton confirmez (signature)
                this.boutConfirm.addEventListener('click', () => {

                    this.StationReserve = sessionStorage.getItem("StationClick");

                    // évènement au cas où une réservation est déjà en cours
                    if (sessionStorage.getItem("Minutes") != null && sessionStorage.getItem("Secondes") != null) {
                        alert('Attention vous êtes sur le point de refaire une réservation à la station : ' + this.StationReserve + ' !\nLa réservation en cours sera donc annulée et remplacée par celle-ci.')
                        sessionStorage.setItem('StationReserve', this.StationReserve);
                        clearInterval(this.compteur);
                        
                    }
                    // gestion cache/apparition infos des différents formulaires
                    document.querySelector('#timer').style.visibility = 'initial'
                    if (this.timer.style.visibility = 'initial') {
                        this.boutTimer.style.visibility = 'initial'
                        this.signature.style.visibility = 'hidden'
                        this.form.style.visibility = 'hidden'
                        document.querySelector('#infos_station').style.visibility = 'hidden'
                        this.boutConfirm.style.visibility = 'hidden'
                        document.querySelector('#map').style.width = "100%"

                    }

                });

            }

            );
        //bouton "Annuler le formulaire"
        this.boutAnnulerForm.addEventListener('click', () => {

            document.querySelector('#form').style.visibility = 'hidden'
            document.querySelector('#infos_station').style.visibility = 'hidden'
            this.signature.style.visibility = 'hidden'
            this.boutConfirm.style.visibility = 'hidden'

        });
    }
}

export default Formulaire;