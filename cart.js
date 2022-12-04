
let cartList = JSON.parse(localStorage.getItem("cartList"))


let totalCartPrice = JSON.parse(localStorage.getItem("totalCartPrice")) || 0


console.log("cartList", cartList)


function generateHtmlForCart() {

    let cartContainer = document.querySelector("#cartContainer")

    let htmlForCart = ""


    if (cartContainer.innerHTML !== null) {
        cartList.forEach((item, index) => {

            htmlForCart += `<div class="card mb-4" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${item.img} class="img-fluid rounded-start h-100" alt="...">
                </div>
                <div class="col-md-8">

                    <div class="row container">

                        <div class="card-body col-10">
                            <h5 class="card-title">${item.name} </h5>

                            <div class="row mt-4">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected value=${item.qty}>Qty: ${item.qty}</option>
                                        <option value=1>1</option>
                                        <option value=2>2</option>
                                        <option value=3>3</option>
                                        <option value=4>4</option>
                                    </select>
                                </div>

                                <div class="col">
                                    <button id=${item.id} name=${index}
                                        onClick="updateCartList(this.id,this.name)"
                                        class="btn btn-primary">Update</button>
                                </div>

                            </div>

                            <div class="mt-3">
                                <h5 class="text-success">&#36;${item.price} <i class="fa-solid fa-xmark"> </i>
                                ${item.qty} <i class="fa-solid fa-equals"></i> &#36; ${item.price * item.qty}
                                </h5>
                            </div>


                        </div>

                        <div class="col-2 my-auto text-center">
                            <i id=${item.id} onClick="removeProduct(this.id)" class="fa-solid fa-trash fa-lg"></i>
                        </div>


                    </div>

                </div>


            </div>
        </div>`

        })



        if (cartList.length > 0) {

            cartContainer.innerHTML = htmlForCart;

            document.querySelector("#cartTotalContainer").innerHTML = `<div>
            <h2 class="mb-4 text-secondary">Cart Total</h2>
            <div class="card text-primary">
                <div class="card-body">
                    <div class="row my-1">
                        <div class="col">No. Of Products:</div>
                        <div class="col">${cartList.length}</div>
                    </div>
    
                    <div class="row my-1">
                        <div class="col">Price:</div>
                        <div class="col">&#36;${totalCartPrice}</div>
                    </div>
    
                    <div class="row">
                        <div class="col">Shipping:</div>
                        <div class="col">free</div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col">Total Amount:</div>
                        <div class="col">&#36;${totalCartPrice}</div>
                    </div>
                </div>
            </div>
        </div>`
        } else {
            cartContainer.innerHTML = `<div class="alert alert-primary" role="alert">
            Cart is empty!
          </div>`

            document.querySelector("#cartTotalContainer").innerHTML = ``
        }

    }





}

generateHtmlForCart()





function updateCartList(id, index) {

    let qt = document.querySelectorAll("#cartContainer select")[index].value

    Number(qt)

    let updatedCartList = cartList.map((item) => {

        if (item.id === id) {

            totalCartPrice = totalCartPrice - item.totalPrice;

            item.qty = qt;

            item.totalPrice = item.price * qt;

            totalCartPrice = totalCartPrice + item.totalPrice;

            localStorage.setItem("totalCartPrice", JSON.stringify(totalCartPrice))

            return item

        } else {
            return item;
        }

    })


    cartList = updatedCartList

    localStorage.setItem("cartList", JSON.stringify(updatedCartList))

    generateHtmlForCart()


}


function removeProduct(id) {

    let updatedCartList = cartList.filter((item, index) => {

        if (item.id === id) {
            totalCartPrice = totalCartPrice - item.totalPrice
            localStorage.setItem("totalCartPrice", JSON.stringify(totalCartPrice))
            return false
        } else {
            return true;
        }
    })

    cartList = updatedCartList;

    localStorage.setItem("cartList", JSON.stringify(cartList))

    generateHtmlForCart()
}




