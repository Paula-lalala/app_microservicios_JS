let modificarEstudiante = () => {}; 
let eliminarEstudiante = () => {};
let mostrarEstudiante = () => {}; 
let redirigirActividades = () => {}; 
let datos = () => {};  

$(document).ready(function(){ 
    let codigoEstudianteModificar = 1; 
    let modificar = -1; 
    mostrarEstudiante = function(){ 
    $.ajax({ 
        method: 'get', 
        url: 'http://localhost:8000/estudiantes', 
    }).done((response) => { 
        const dataJson = JSON.parse(response);
        const Estudiantes = dataJson.data; 
        const table = document.getElementById('EstudiantesTb'); 
        const tbody = table.getElementsByTagName('tbody')[0]; 
        let html = ''; 
        Estudiantes.forEach(Estudiante => { 
            html += '<tr>';
            html += '   <td>' + Estudiante.codigo +'</td>';
            html += '   <td>' + Estudiante.nombres +'</td>';
            html += '   <td>' + Estudiante.apellidos +'</td>';
            html += '   <td>';
            html += '       <button onclick="modificarEstudiante(' + Estudiante.codigo + ')">MODIFICAR</button>';
            html += '   </td>';
            html += '   <td>';
            html += '       <button onclick="eliminarEstudiante(' + Estudiante.codigo + ')" >ELIMINAR</button>';
            html += '   </td>';
            html += '   <td>';
            html += '      <button onclick="redirigirActividades(' + Estudiante.codigo + ')" >NOTAS</button>'; 
            html += '   </td>';
            html += '<tr>';
        });
        tbody.innerHTML = html;
        console.log(dataJson);
    }).fail((error) => {
        console.error(error);
    })
 }

    redirigirActividades = function(Estudiantecodigo){
        codigo = Estudiantecodigo;
        var url = "actividades.html?codigo=" + encodeURIComponent(codigo);
        window.location.href = url;
    }

    mostrarEstudiante();

    document.getElementById('Guardar').addEventListener('click', ()=>{
    let formulario = document.forms['formularioEstudiante'];
    let codigo = formulario['codigo'].value;
    let nombres = formulario['nombres'].value;
    let apellidos = formulario['apellidos'].value;
    
    if(modificar == -1){
        $.ajax({
            url: 'http://localhost:8000/estudiantes', 
            method: 'post', 
            data:{
                codigo: codigo,
                nombres: nombres, 
                apellidos: apellidos
            }
        }).done(response =>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data ;
            alert(msg); 
            mostrarEstudiante(); 
        });
    } else {
        $.ajax({
            url: 'http://localhost:8000/estudiantes/'+codigoEstudianteModificar,
            method: 'put',
            data:{
                codigo: codigo, 
                nombres: nombres, 
                apellidos: apellidos
            }
        }).done(response =>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data;
            alert(msg);
            mostrarEstudiante()
            modificar = -1
        })
  
    }   

    document.getElementById('codigo')
        .setAttribute('value', '')
    document.getElementById('nombres')
        .setAttribute('value', '')
    document.getElementById('apellidos')
        .setAttribute('value', '')
    document.getElementById('formularioEstudiante').reset()
    })

    modificarEstudiante = function(Estudiantecodigo){
        codigoEstudianteModificar = Estudiantecodigo
        $.ajax({
            url: 'http://localhost:8000/estudiantes/'+codigoEstudianteModificar,
            method: 'get',
        }).done(response =>{
            const dataJson = JSON.parse(response);
            const estudiantes= dataJson.data;
            document.getElementById('codigo').setAttribute('value',estudiantes.codigo)
            document.getElementById('nombres').setAttribute('value', estudiantes.nombres)
            document.getElementById('apellidos').setAttribute('value', estudiantes.apellidos)
            })
        modificar = 1
    }    


    eliminarEstudiante = function(Estudiantecodigo){
        codigoEstudianteModificar = Estudiantecodigo
        $.ajax({
            url: 'http://localhost:8000/estudiantes/'+codigoEstudianteModificar,
            method: 'delete',
        }).done(response =>{
            const dataJson = JSON.parse(response)
            const msg = dataJson.data 
            alert(msg)
            mostrarEstudiante()
        })
    }

    })