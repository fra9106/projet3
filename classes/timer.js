class Timer {
    constructor(min, sec) {

        this.min = min;
        this.sec = sec;
        this.boutConfirm = document.querySelector('#confirmez');
        this.boutTimer = document.querySelector('#annuler');
        this.timer = document.querySelector('#timer');
        this.compteur = 0;
        this.start();
        this.boutAnnule();

    }

    displayTimer() {

        this.compteur = setInterval(() => { // on setInterval toutes les secondes 

            this.sec = this.sec - 1;
            sessionStorage.setItem('Secondes', this.sec);
            if (this.sec <= 0) {
                this.min = this.min - 1;
                this.sec = 59;
            }

            if ((this.min >= 0) && (this.sec >= 0)) {
                sessionStorage.setItem('Secondes', this.sec)
                sessionStorage.setItem('Minutes', this.min)
            }
                // affichage de la réservation en bas de la carte
                document.querySelector('.textDecompte').innerHTML = 'Vélo réservé à la station N° ' + sessionStorage.getItem('StationClick') + " " + sessionStorage.getItem('Adresse') + ' par <strong>' + localStorage.getItem('Nom') + ' ' + localStorage.getItem('Prenom') + '</strong>, ' + ' <br> vous avez : ' + sessionStorage.getItem('Minutes') + " mn " + sessionStorage.getItem('Secondes') + " s " + 'pour récupérer votre Cristolib, bonne promenade!' + ' <br> <em>Il reste<em/> ' + sessionStorage.getItem('VeloDispoApresValidation') + ' <em>vélos disponibles après votre réservation<em/> '
                if (this.min < 0) { 
                    document.querySelector('.textDecompte').innerHTML = "Temps Expiré !"
                    clearInterval(this.compteur);
                    this.min = 2; //ATTENTION : TIMER A 2mn SUR CE FICHIER POUR LES BESOINS DE LA DEMO,
                    this.sec = 0;//REGLE A 20mn EN LIGNE SUR https://monpersoweb.fr/projet3/index.html COMME DEMANDE DANS L'ENONCE, MERCI DE VOTRE COMPREHENTION
                    sessionStorage.clear();

                }


            },
            1000) // 1 seconde en milliseconde
    }


    start() {

        this.boutConfirm.addEventListener('click', () => {
            clearInterval(this.compteur);
            this.min = 2;
            this.sec = 0;
                // à la confirmation de la signature, on déclenche le compteur
                this.displayTimer() // on affiche et on fait partir le compteur


            }

            );


    }

    boutAnnule() { //méthode annuler réservation sur le bouton Annuler
        this.boutTimer.addEventListener('click', () => {
            clearInterval(this.compteur);
            sessionStorage.clear();
            this.min = 2;
            this.sec = 0;
            document.querySelector('#timer').style.visibility = 'hidden'
            this.boutTimer.style.visibility = 'hidden'

        });

    }




}

export default Timer;
