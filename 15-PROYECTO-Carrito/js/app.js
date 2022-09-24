//variables
const carrito=document.querySelector('#carrito')
const contenidoCarrito=document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito')
const listaCursos=document.querySelector('#lista-cursos')

let articulosCarrito=[];

cargarEventListener();
function cargarEventListener(){
  // cuando agregas un curso agregando
  listaCursos.addEventListener('click',agregarCurso);
  // Elimina cursos del carrito
  carrito.cargarEventListener('click',eliminarCurso)
}

// funciones
function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado=e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}
//elimina un curo del carrito
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId=e.target.getAttribute('data-id')
    // Elimina  del arreglo del articulos carrito
    articulosCarrito=articulosCarrito.filter(curso=>curso.id !==cursoId)
    
    carritoHTML();//iterar sobre el carrito y mostrar su HTML
  }
}

//Lee el contenido del HTML al que le dimos click
function leerDatosCurso(curso){
  // console.log(curso)
  // Crear un objeto con el contenido del curso
  const infoCurso={
    imagen:curso.querySelector('img').src,
    titulo:curso.querySelector('h4').textContent,
    precio:curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1
  }
  // revisa si un elemento ya existe e el carrito
  const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id);
  if(existe){
    // actualizamos la cantidad
    const cursos=articulosCarrito.map(curso=>{
      if(curso.id===infoCurso.id){
        curso.cantidad++;
        return curso;//retorna el objeto actualizado
      }
      else{
        return curso;//rtorna los objetos que no son duplicados
      }
    });
    articulosCarrito=[...cursos]
  }
  else{
    // Agregamos al carrito
    articulosCarrito=[...articulosCarrito,infoCurso]
  }
  //Agrega elementos al arreglo de carrito
  // console.log(articulosCarrito)
  carritoHTML();
}
// Muestra el carrito de compras en el HTML
function carritoHTML(){
  // Limpiar el HTLM
    limpiarHTML()

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach(curso=>{
    const {imagen,titulo,precio,cantidad,id}=curso;
    const row=document.createElement('tr');
    row.innerHTML=`
      <td>
        <img src="${imagen}" width="120">
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a> 
      </td>
    `;
    // Agrega el HTML del carrito en el tbody
    contenidoCarrito.appendChild(row)
  })
}
// Elimmina los curso del tbody
function limpiarHTML(){
  // contenidoCarrito.innerHTML='';
  while(contenidoCarrito.firstChild){
    contenidoCarrito.removeChild(contenidoCarrito.firstChild)
  }
}