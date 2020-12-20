const url = 'http://localhost:4000/autos';

(function(){
    const formulario = document.querySelector('#formulario');
    
    const alertaError = document.createElement('h3');

    formulario.addEventListener('submit', validarAuto)

    function validarAuto(e){
        e.preventDefault();

        const marca = document.querySelector('#marca').value;
        const modelo = document.querySelector('#modelo').value;
        const color = document.querySelector('#color').value;
        const año = document.querySelector('#año').value;
        const precio = document.querySelector('#precio').value;

        const auto = {
            marca,
            modelo,
            color,
            año,
            precio
        }

        function mostrarError(mensaje){

            alertaError.innerHTML = `<span>${mensaje}</span>`;
            formulario.appendChild(alertaError)

            setTimeout(() => {
                alertaError.remove()
            },3000);
        };
         
       async function nuevoAuto (auto){
                
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(auto),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.href = 'index.html';
           
        }

        if(!validacion(auto)){
            let error = "Todos los campos son obligatorios"
            mostrarError(error);
            return;
        } 

        nuevoAuto(auto)
    }

    function validacion(obj){
        return Object.values(obj).every(input => input !== '');
    };
    
})();