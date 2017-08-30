"use strict";

for (var i=0;i<=5;i++){

    (
        function(i){ // Creo un nuevo lexical scope con un Inmediately Invoked Function Expression
            var x = i;
            setTimeout(
                function timer(){
                    console.log(x);
                },
                1000*x
            );
        }
    )(i);

};

// ECMASCRIPT 2016

for (let e=0;e<=5;e++){
    setTimeout(
        function timer(){
            console.log(e);
        },
        1000*e
    )
}
