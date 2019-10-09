class Canvas {
    constructor(canvas) {
        this.canvas = document.querySelector("#canvas"); //on sélectionne le canvas
        this.draw = false; // souris non appuyé 
        this.context = this.canvas.getContext('2d'); //context qui va permettre de dessiner à l'intérieur de la balise 
        this.annul = document.querySelector('#annule'); // bouton annuler
        this.confirm = document.querySelector('#confirmez'); // bouton je confirme!
        this.radius = 1; //épaisseur du point
        this.context.lineWidth = this.radius * 2; // épaisseur du trait
        this.window = window;
        this.annull(); //...
        this.confirme(); //...
    }

    initCanvas() { // initiation des actions de la souris appuyé, non appuyé, en tracé

        this.canvas.addEventListener('mousedown', this.mouseDown); // Activé une fois chaque fois que vous appuyez sur le bouton (gauche) de la souris. 
        this.window.addEventListener('mouseup', this.mouseUp); // Activé une fois chaque fois que le bouton (gauche) de la souris est relâché.
        this.canvas.addEventListener('mousemove', this.putPoint); // Activé chaque fois que la souris est déplacée, quel que soit l'état du bouton. 
        // évènements tactiles
        //initiation des actions tactiles
        this.canvas.addEventListener('touchstart', this.engage);
        this.canvas.addEventListener('touchmove', this.point);
        this.canvas.addEventListener('touchend', this.desengage);
    }

    putPoint(e) { // méthode pour dessiner à l'emplacement de notre choix

        if (this.draw) {

            this.context.lineTo(e.offsetX, e.offsetY);
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI * 2); //defini le 1er point en forme de cercle à chaque clic*/
            this.context.fill(); //rempli le trait
            this.context.beginPath();
            this.context.moveTo(e.offsetX, e.offsetY);

        }
    }

    mouseDown() { // souris appuyé dessin

        this.draw = true;
        //bouton Je confirme visible clic sur canvas (mouseDown true)
        document.querySelector('#confirmez').style.visibility = 'initial'
    }

    mouseUp() { // survol souris non appuyé 
        this.draw = false;
        this.context.beginPath(); // se desengage du chemin precedent prêt pour un nouveau chemin (trait)
    }

    annull() { // bouton Annuler au clic avec clearRect()
        this.annul.addEventListener('click', () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        //bouton Je confirme hidden si clic sur Annuler
        document.querySelector('#confirmez').style.visibility = 'hidden'

        });
    }

    confirme() { //bouton Je confirme
        this.confirm.addEventListener('click', () => {
        document.querySelector('#timer').style.visibility = 'initial'

        })
    }

    point(e) { //méthode point de départ signature tactile
        e.preventDefault();
        let touch = e.changedTouches[0];
        let topPossign = document.getElementById("signature").offsetTop;
        let leftPossign = document.getElementById("signature").offsetLeft;
        
        if (this.draw) {
            this.context.lineTo(touch.clientX - leftPossign, touch.clientY - topPossign + 750);// ajustement de la distance du dessin entre premier touché et le tracé en pixel par rapport au document signature
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(touch.clientX - leftPossign, touch.clientY - topPossign + 750, this.radius, 0, Math.PI * 2);
            this.context.fill();
            this.context.beginPath();
            this.context.moveTo(touch.clientX - leftPossign, touch.clientY - topPossign + 750);
        }

    }

    engage(e) { //méthode touch dessin tactile
        e.preventDefault();
        this.draw = true;

        //bouton Je confirme visible clic sur canvas (mouseDown true)
        document.querySelector('#confirmez').style.visibility = 'initial'
    }

    desengage() { // méthode touch up tactile
        this.draw = false;
        this.context.beginPath(); // se desengage du chemin precedent prêt pour un nouveau chemin (trait)
    }
}
export default Canvas;