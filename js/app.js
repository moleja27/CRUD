const url = 'http://localhost:4000/autos';
(function(){

    const listado = document.getElementById('listado-autos');
    let row;
  
    document.addEventListener('DOMContentLoaded', mostrarAutos);

    listado.addEventListener('click', eliminarAuto);

     async function mostrarAutos (){
        const resultado = await fetch(url);
        const autos = await resultado.json();
        
            autos.map(auto => {
            const {marca, modelo, color, año, precio, id} = auto;

             row = document.createElement('tr');

            row.innerHTML += `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${marca} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${modelo}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${color}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${año}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${precio}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-auto.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-client="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>
        `;
        listado.appendChild(row);
        });  
    }

    function eliminarAuto(e){
        if(e.target.classList.contains('eliminar')){
            const autoId = parseInt(e.target.dataset.client);
            const confirmar = confirm("Esta seguro que desea eliminar el Auto");
          
            if(confirmar){
                eliminar(autoId);
            }else{
                alert("Se canceló la aliminación");
            }
        }
    }

    async function eliminar(id){
        await fetch(`${url}/${id}`,{
            method: 'DELETE'
        });
    }
    
})()

