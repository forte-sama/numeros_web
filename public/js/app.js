
function showLoggedOutUI() {
    Materialize.toast("No hay na de sesion",5000);
}

function showLoggedInUI() {
    Materialize.toast("Inicie sesion",5000);
}

// check authentication state
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        showLoggedInUI();
        // inicio sesion
        // presentar animaciones para pantalla principal
            // transicion para animacion de espera
            // presentar animacion de espera
            // transicion para animacion pantalla principal
            // presentar pantalla principal
        // habilitar todos los eventos
    }
    else {
        // cerrar sesion
        // presentar animaciones para pantalla login
            // transicion para animacion de espera
            // presentar animacion de espera
            // transicion para animacion pantalla login
            // presentar pantalla login
        // deshabilitar todos los eventos
        showLoggedOutUI();
    }
});

$(document).ready(() => {
    $("div#container").load("testz.html", () => {
        // Materialize.toast(email.attr("class"), 10000);
    });

    // sign-in
    firebase.auth().signOut();
    // firebase.auth().signInWithEmailAndPassword("mrcesar9402@gmail.com","jolopero1");

    var db = firebase.database();

    db.ref("/_base_dia/piramide").set([5,4,3,2,1]);
});
