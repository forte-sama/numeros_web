
function changeContainerTo(container, targetPage) {
    // transicion para animacion de espera
    container.fadeToggle(250, function() {
        // presentar animacion de espera
        container.load("/load.html", function() {
            // transicion para animacion pantalla principal
            container.fadeToggle(250, function() {
                setTimeout(() => {
                    // presentar animaciones para pantalla principal
                    container.fadeToggle(250, function() {
                        // presentar pantalla principal
                        container.load(targetPage, function() {
                            container.fadeToggle(250);
                        });
                    })
                }, 1500);
            });
        });
    });
}

$(document).ready(() => {
    const $container = $("div#container");
    const db = firebase.database();

    // animar de acuerdo a estado de autenticacion
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            changeContainerTo($container, "/main.html");
        }
        else {
            changeContainerTo($container, "/login.html");
        }
    });
});
