

let productList = [
    {
        id: `0`,
        name: "Apple Airpods",
        price: 40,
        img: "./images//airpods.jpg"
    },

    {
        id: `1`,
        name: "Amazon Alexa",
        price: 60,
        img: "./images//alexa.jpg"
    },

    {
        id: `2`,
        name: "Canon Camera",
        price: 200,
        img: "./images//camera.jpg"
    },

    {
        id: `3`,
        name: "Logitech Mouse",
        price: 50,
        img: "./images//mouse.jpg"
    },

    {
        id: `4`,
        name: "Apple Iphone",
        price: 400,
        img: "./images//phone.jpg"
    },

    {
        id: `5`,
        name: "Sony Playstation",
        price: 300,
        img: "./images//playstation.jpg"
    },

]


let cartList = JSON.parse(localStorage.getItem("cartList")) || []

console.log("cartList", cartList)

let totalCartPrice = JSON.parse(localStorage.getItem("totalCartPrice")) || 0


function generateHtmlForProducts() {

    let prodcutContainer = document.querySelector("#productContainer")

    let html = "";


    productList.forEach((product, index) => {

        html += ` <div class="card mx-2 my-3" style="width: 18rem;">
        <img src=${product.img} class="card-img-top" alt="...">
        <div class="card-body text-center">
            <h5 class="card-title text-secondary text-center my-3">${product.name}
            </h5>
            <h5 class="card-title text-primary text-center">&#36; ${product.price}</h5>
            <a href="#" id=${product.id} onClick="addToCart(this.id)" class="btn btn-success my-3">Add To Cart</a>
        </div>
    </div>`


    })



    prodcutContainer.innerHTML = html;

}

generateHtmlForProducts()




function addToCart(id) {


    let product = productList.filter(item => item.id === id)


    let isProductInCart = cartList.filter(item => {
        return item.id === id

    })


    let updatedCartList = [];


    if (isProductInCart.length > 0) {

        updatedCartList = cartList.map((prod, index) => {

            if (prod.id === id) {

                totalCartPrice = totalCartPrice - prod.totalPrice;

                prod.qty = 1

                prod.totalPrice = prod.price

                totalCartPrice = totalCartPrice + prod.totalPrice;

                localStorage.setItem("totalCartPrice", JSON.stringify(totalCartPrice))

                return prod;

            } else {
                return prod;
            }
        })

    } else {
        updatedCartList = [...cartList];

        product[0].qty = 1

        product[0].totalPrice = product[0].price;

        totalCartPrice = totalCartPrice + product[0].totalPrice;

        localStorage.setItem("totalCartPrice", JSON.stringify(totalCartPrice))

        updatedCartList.push(product[0]);
    }



    cartList = updatedCartList

    localStorage.setItem("cartList", JSON.stringify(cartList))



    // document.getElementById("toastTitle").innerHTML = isProductInCart[0].name + " Added to the cart"
    const toastLiveExample = document.getElementById('liveToast')
    const toast = new bootstrap.Toast(toastLiveExample)


    toast.show()


}


