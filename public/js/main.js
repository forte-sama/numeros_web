
moment().locale("es");
var current = "tab_3dias";

$(document).ready(function() {
    const db = firebase.database();

    // boton para publicar
    const btn_publish = $("#btn_publish");

    function validarArregloNumeros(numeros) {
        var arregloNumerosValidos = numeros.filter((n) => { return n >= 0 && n <= 99; });
        var todosEstanEnRango = arregloNumerosValidos.length === numeros.length;
        var conteoDeOcurrencias = [];
        numeros.forEach((x) => {
            if(conteoDeOcurrencias[x]) {
                conteoDeOcurrencias[x]++;
            }
            else {
                conteoDeOcurrencias[x] = 1;
            }
        });
        var numerosSeRepiten = conteoDeOcurrencias.find((x) => { return x > 1; }) != undefined;
        // numeros seran validos cuando todos esten en el rango jugable y no hayan repetidos
        return (todosEstanEnRango && !numerosSeRepiten);
    }

    function submitNumeros3Dias() {
        // obtener valor de todos los inputs relevantes
        var ifechas = $("form#_3dias input[name=fecha]");
        var fechas = {
            inicio: ifechas.get(0).value,
            fin: ifechas.get(1).value
        };
        var inumeros = $("form#_3dias input[type=number]");
        var numeros = [inumeros.get(0).value,inumeros.get(1).value,
                        inumeros.get(2).value,inumeros.get(3).value];

        // validar y transformar fechas a formato user friendly
        var fechasValidas = true;
        // fechas seran validas cuando la inicial sea antes que la final, y ambas sean fechas validas
        fechasValidas     = moment(fechas.inicio).isBefore(moment(fechas.fin));
        
        if(fechasValidas) {
            fechas.inicio = moment(fechas.inicio).format("D-MM-YYYY");
            fechas.fin    = moment(fechas.fin).format("D-MM-YYYY");
        }

        // validar numeros
        var numerosValidos = validarArregloNumeros(numeros);

        // subirlos
        if(fechasValidas && numerosValidos) {
            // subir nuevos datos a db
            db.ref("/_3dias").set({
                desde: fechas.inicio,
                hasta: fechas.fin,
                numeros: numeros
            }).then(function() {
                // notificar a usuario
                $("#success_modal").modal("open");

                $("input[name=fecha]").removeClass("invalid").addClass("valid");
            });
        }
        else {
            // mostrar errores
            Materialize.toast("Favor de verificar e intentar de nuevo.", 15431);
            // errores de las fechas
            if(!fechasValidas) {
                $("input[name=fecha]").removeClass("valid").addClass("invalid");
                Materialize.toast("Las fechas no son validas.", 15431);
            }
            // errores de los numeros
            if(!numerosValidos) {
                Materialize.toast("Revisar numeros, hay algo incorrecto", 15431);                    
            }                
        }
    }

    function submitBaseDelDia() {
        // obtener valor de todos los inputs relevantes
        var ifechas = $("form#form_base_dia input[name=fecha_base_dia]");
        var fechas = {
            inicio: ifechas.get(0).value,
            fin: ifechas.get(1).value
        };
        var inumeros_piramide = $("form#form_base_dia input[name=piramide_base_dia]");
        var numeros_piramide  = [inumeros_piramide.get(0).value,inumeros_piramide.get(1).value,
                                 inumeros_piramide.get(2).value,inumeros_piramide.get(3).value,inumeros_piramide.get(4).value];
        var inumeros_virados = $("form#form_base_dia input[name=numero_virado]");
        var numeros_virados  = [inumeros_virados.get(0).value,inumeros_virados.get(1).value,
                                inumeros_virados.get(2).value,inumeros_virados.get(3).value];

        // validar y transformar fechas a formato user friendly
        var fechasValidas = true;
        // fechas seran validas cuando la inicial sea antes que la final, y ambas sean fechas validas
        fechasValidas = moment(fechas.inicio).isBefore(moment(fechas.fin));
        
        console.log(numeros_piramide);
        console.log(numeros_virados);
        console.log(fechas);

        if(fechasValidas) {
            fechas.inicio = moment(fechas.inicio).format("D-MM-YYYY");
            fechas.fin    = moment(fechas.fin).format("D-MM-YYYY");
        }
        // validar numeros
        var numerosPiramideValidos = validarArregloNumeros(numeros_piramide);
        var numerosViradosValidos  = validarArregloNumeros(numeros_virados);
        var numerosValidos = (numerosPiramideValidos && numerosViradosValidos);

        // subirlos
        if(fechasValidas && numerosValidos) {
            //preparar numeros virados
            var check_virados = $("form#form_base_dia input[name=virado_base_dia]");
            for(var i=0; i<4; i++) {
                if(check_virados.get(i).checked) {
                    numeros_virados[i] = numeros_virados[i] + "V";
                }
            }
            // subir nuevos datos a db
            db.ref("/_base_dia").set({
                desde: fechas.inicio,
                hasta: fechas.fin,
                piramide: numeros_piramide,
                virados: numeros_virados
            }).then(function() {
                // notificar a usuario
                $("#success_modal").modal("open");

                $("input[name=fecha]").removeClass("invalid");
            });
        }
        else {
            // mostrar errores
            Materialize.toast("Favor de verificar e intentar de nuevo.", 15431);
            // errores de las fechas
            if(!fechasValidas) {
                $("input[name=fecha]").removeClass("valid").addClass("invalid");
                Materialize.toast("Las fechas no son validas.", 15431);
            }
            // errores de los numeros
            if(!numerosValidos) {
                Materialize.toast("Revisar numeros de la base del dia, hay algun dato incorrecto.", 15431);                    
            }                
        }
    }

    function submitLinkVideo() {
        console.log("Link del video");
    }

    btn_publish.click(function(e) {
        e.preventDefault();
        
        if(current === "tab_3dias") {
            submitNumeros3Dias();
        }
        else if(current === "tab_base_dia") {
            submitBaseDelDia();
        }
        else if(current === "tab_link_video") {
            submitLinkVideo();
        }
    });

    // cambiar valor de tab actual siempre
    function changeCurrentTab(value) {
        current = value;

        if (current === "tab_3dias") {
            btn_publish.text("Publicar numeros 3 dias");
        }
        else if (current === "tab_base_dia") {
            btn_publish.text("Publicar base del dia");
        }
        else if(current === "tab_link_video") {
            btn_publish.text("Modificar Video Mostrado");            
        }
    }
    $("li.tab a").click(function(e) {
        var newValue = $(this).attr("id");
        changeCurrentTab(newValue);
    });
    
    // corroborar tab actual
    changeCurrentTab($("li.tab a.active").attr("id"));

    // activar dropdowns
    $('.dropdown-button').dropdown({
        constrainWidth: true
    });
    
    // activar tabs
    $("ul.tabs").tabs();

    // activar modals
    $('.modal').modal();

    // activar boton de cierre de sesion
    $("#signout").click(function(e) {
        e.preventDefault();

        firebase.auth().signOut();
    });
});