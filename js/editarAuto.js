const url = 'http://localhost:4000/autos';

(function(){

    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');
    const colorInput = document.getElementById('color');
    const añoInput = document.getElementById('año');
    const precioInput = document.getElementById('precio');

    const idInput = document.getElementById('id');

    const alertaError = document.createElement('h3');

    document.addEventListener('DOMContentLoaded',async function(){
        const parametroURL = new URLSearchParams(window.location.search);

        const idAuto = parametroURL.get('id');

       const auto =  await obtenerAuto(idAuto);

       mostrarAuto(auto);
      
       const formulario = document.getElementById('formulario');

       formulario.addEventListener('submit',validarAuto);



    });

    function mostrarError(mensaje){

        alertaError.innerHTML = `<span>${mensaje}</span>`;
        formulario.appendChild(alertaError)

        setTimeout(() => {
            alertaError.remove()
        },3000);
    };

    async function obtenerAuto(id){
       
        const resultado = await fetch(`${url}/${id}`)
        const auto = await resultado.json();

       return auto;
    }


    function mostrarAuto(auto){
        const {marca, modelo, color, año, precio, id} = auto;
        
            marcaInput.value = marca;
            modeloInput.value = modelo;
            colorInput.value = color;
            añoInput.value = año;
            precioInput.value = precio;

            idInput.value = id;

    }

    function validarAuto(e){
        e.preventDefault();

        const auto = {
            marca : marcaInput.value,
            modelo: modeloInput.value,
            color: colorInput.value,
            año: añoInput.value,
            precio: precioInput.value,
            id: parseInt(idInput.value)
        };

        if(!validacion(auto)){
            mostrarError("Todos los campos son obligatorios");
            return
        }

        editarAuto(auto)
    }

    function validacion(obj){
        return Object.values(obj).every(input => input !== '');
    };

    async function editarAuto(auto){

        await fetch(`${url}/${auto.id}`, {
            method: 'PUT',
            body: JSON.stringify(auto),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = 'index.html';

    }
})()