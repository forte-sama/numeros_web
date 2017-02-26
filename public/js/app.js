
$(document).ready(() => {
    const $container = $("div#container");

    // sign-in
    // firebase.auth().signOut();
    // firebase.auth().signInWithEmailAndPassword("mrcesar9402@gmail.com","jolopero1");

    // var db = firebase.database();

    // animar de acuerdo a estado de autenticacion
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            // transicion para animacion de espera
            $container.fadeToggle(250, function() {
                // presentar animacion de espera
                $container.load("/load.html", function() {
                    // transicion para animacion pantalla principal
                    $container.fadeToggle(250, function() {
                        setTimeout(() => {
                            // presentar animaciones para pantalla principal
                            $container.fadeToggle(250, function() {
                                // presentar pantalla principal
                                $container.load("/main.html", function() {
                                    $container.fadeToggle(250);
                                });
                            })
                        }, 1500);
                    });
                });
            });
        }
        else {
            // transicion para animacion de espera
            $container.fadeToggle(250, function() {
                // presentar animacion de espera
                $container.load("/load.html", function() {
                    // transicion para animacion pantalla login
                    $container.fadeToggle(250, function() {
                        setTimeout(() => {
                            // presentar animaciones para pantalla login
                            $container.fadeToggle(250, function() {
                                // presentar pantalla login
                                $container.load("/login.html", function() {
                                    $container.fadeToggle(250);
                                });
                            })
                        }, 1500);
                    });
                });
            });
        }
    });
});
