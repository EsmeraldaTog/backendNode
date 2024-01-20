console.log("socket")

const socket = io()


socket.on("products", products=>{


  
const template= products.map(product=>


    `
   <div class=" w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
    <div class="card w-full bg-base-100 shadow-xl p-2">
    <figure class="px-10 pt-10">
      <img src=${product.photo} alt="Shoes" class="rounded-xl w-auto h-32" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${product.title}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <h2 class="card-title">${product.price}</h2>
      <div class="card-actions">
        <button class="btn btn-primary">Agregar al Carrito</button>
      </div>
      </div>
    </div>
  </div>
  
  `
)
.join("");
  document.querySelector(".productsSection").innerHTML = template;




});