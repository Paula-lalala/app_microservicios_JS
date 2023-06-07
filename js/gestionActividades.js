let modificarActividad = () => {}; 
let eliminarActividad = () => {};
let mostrarActividad = () => {};
let datos = () => {};  
let idActividadModificar = 1; 
let modificar = -1; 

$(document).ready(function(){
    var codigoEstudiante = localStorage.getItem('codigoEstudiante');
    var nombres = localStorage.getItem('nombreEstudiante');
    
    document.getElementById('codigo').innerText = codigoEstudiante;
    document.getElementById('nombres').innerText = nombres;
    mostrarActividad = function(){
         
    $.ajax({ 
        method: 'get', 
        url: 'http://localhost:8000/actividades', 
    }).done((response) => { 
        const dataJson = JSON.parse(response);
        const Actividades = dataJson.data; 
        const table = document.getElementById('ActividadesTb'); 
        const tbody = table.getElementsByTagName('tbody')[0]; 
        let html = ''; 
        let sumatoria = 0;
        let count = 0;
            Actividades.forEach(Actividad => {
              if(Actividad.codigoEstudiante == codigoEstudiante){
              html += '<tr>';
              html += '   <td>' + Actividad.id + '</td>';
              html += '   <td>' + Actividad.descripcion + '</td>';
              html += '   <td>' + Actividad.nota + '</td>';
              html += '   <td>' + Actividad.codigoEstudiante + '</td>';
              html += '   <td>';
              html += '       <button onclick="modificarActividad(' + Actividad.id + ')">MODIFICAR</button>';
              html += '   </td>';
              html += '   <td>';
              html += '       <button onclick="eliminarActividad(' + Actividad.id + ')" >ELIMINAR</button>';
              html += '   </td>';
              html += '<tr>';
              sumatoria += parseFloat(Actividad.nota)
              count += 1;
                }
            });
        let promedio = sumatoria/count;
        if (promedio >= 0) {
            if (promedio >= 3) {
                document.getElementById('promedio').innerText = '¡Felicidades! Estás pasando la materia con: ' + promedio;
                document.getElementById('promedio').className = 'paso';
                promedio = 0;
            } else {
                document.getElementById('promedio').innerText = 'Lo sentimos, estás perdiendo la materia con: ';
                document.getElementById('Nprom').innerText = promedio;
                document.getElementById('Nprom').className = 'perdio';
                promedio = 0;
            }
        } else {

            document.getElementById('promedio').innerText = 'No hay notas';
            document.getElementById('promedio').classList.remove('perdio');
            document.getElementById('promedio').classList.remove('paso');
        }
        tbody.innerHTML = html;
        console.log(dataJson);
    }).fail((error) => {
        console.error(error);
    })
 }

    mostrarActividad();

    document.getElementById('Guardar').addEventListener('click', ()=>{
    let formulario = document.forms['formularioActividad'];
    let descripcion = formulario['descripcion'].value;
    let nota = formulario['nota'].value;
    
    if(modificar == -1){
        $.ajax({
            url: 'http://localhost:8000/actividades', 
            method: 'post', 
            data:{
                descripcion: descripcion, 
                nota: nota,
                codigoEstudiante: codigoEstudiante
            }
        }).done(response =>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data ;
            alert(msg); 
            mostrarActividad(); 
        });
    } else {
        $.ajax({
            url: 'http://localhost:8000/actividades/'+idActividadModificar,
            method: 'put',
            data:{
                descripcion: descripcion, 
                nota: nota,
                codigoEstudiante: codigoEstudiante
            }
        }).done(response =>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data;
            alert(msg);
            mostrarActividad()
            modificar = -1
        })
  
    }   

    document.getElementById('descripcion')
        .setAttribute('value', '')
    document.getElementById('nota')
        .setAttribute('value', '')
    document.getElementById('formularioActividad').reset()
    })

    modificarActividad = function(Actividadid){
        idActividadModificar = Actividadid
        $.ajax({
            url: 'http://localhost:8000/actividades/'+idActividadModificar,
            method: 'get',
        }).done(response =>{
            const dataJson = JSON.parse(response);
            const actividades= dataJson.data;
            document.getElementById('descripcion').setAttribute('value', actividades.descripcion)
            document.getElementById('nota').setAttribute('value', actividades.nota)
            })
        modificar = 1
    }    


    eliminarActividad = function(Actividadid){
        idActividadModificar = Actividadid
        $.ajax({
            url: 'http://localhost:8000/actividades/'+idActividadModificar,
            method: 'delete',
        }).done(response =>{
            const dataJson = JSON.parse(response)
            const msg = dataJson.data 
            alert(msg)
            mostrarActividad()
        })
    }

    })