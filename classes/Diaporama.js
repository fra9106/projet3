class Diaporama {


    constructor(image, texte, tImage, tText, idLeft, idRight, idPause, idPlay) {
        this.image = image
        this.tabloImages = tImage
        this.tabloText = tText
        this.left = document.getElementById(idLeft)
        this.right = document.getElementById(idRight)
        this.pause = document.getElementById(idPause)
        this.play = document.getElementById(idPlay)
        this.interval = 0 // va permettre de mémoriser la valeur des intervales de temps
        this.time = 5000 // timer à 5000 milisecondes = 5 sec
        this.positionImage = 0 // premier indice du tableau: 1ère photo 
        this.texte = texte
    }

    //méthode prev 
    prev() {
        this.positionImage--; // décrémentation de la variable positionImage pour recul
        if (this.positionImage < 0) { // position image inférieur à 0 (nous sortons de bornes du tableau)
            this.positionImage = this.tabloImages.length - 1 // en fin de parcours nous renvoit à la taille du tableau -1  pour repartir à l'indice 0
        }
        this.image.src = this.tabloImages[this.positionImage] //affiche l'image en cours
        this.texte.textContent = this.tabloText[this.positionImage];
    }

    //méthode next     
    next() {
        this.positionImage++; // incrémentation de la variable positionImage pour avance
        if (this.positionImage > this.tabloImages.length - 1) {
            this.positionImage = 0 //après avoir parcourru la totalité des photos du tableau, on repart sur la photo à l'indice 0 donc du début
        }
        this.image.src = this.tabloImages[this.positionImage] //affiche l'image en cours
        this.texte.textContent = this.tabloText[this.positionImage];
    }

    //méthode pause au clavier avec clearInterval()   
    Pause() {
        clearInterval(this.interval);

    }

    //méthode play au clavier
    lecture() {
        clearInterval(this.interval);
        this.changeImage();
    }

    //méthode play automatique avec setInterval()
    changeImage() {
        this.interval = setInterval(() => {
            this.next()
        }, this.time);
    }

    //initialisation des boutons avec la méthode addEventListener() au click 
    clickButton() {
        this.right.addEventListener('click', () => this.next());
        this.left.addEventListener('click', () => this.prev());
        this.play.addEventListener('click', () => this.changeImage());
        this.pause.addEventListener('click', () => {
            clearInterval(this.interval);
        })
        this.changeImage()

        // Commandes next: -> prev: <- pause: "Pause" et lecture: "Entrer" au clavier 
        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) {
                this.next();
            } else if (e.keyCode == 39) {
                this.next(false);
            } else if (e.keyCode == 19) {
                this.Pause();
            } else if (e.keyCode == 13) {
                this.lecture();
            }

        });
    }
}
export default Diaporama;