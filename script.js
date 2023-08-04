const cart_nav=document.querySelector('#nav_open')
const cart=document.querySelector('.cart')
const cart_close=document.getElementById('cart-closer')

cart_nav.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})
cart_close.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})

document.addEventListener('DOMContentLoaded',loadFood);
function loadFood(){
    loadContent();
}

function loadContent(){
    let btnRemove=document.querySelectorAll('#btn-delete');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    })      
    let Qty=document.querySelectorAll('.cart-quantity');
    Qty.forEach((intput)=>{
        intput.addEventListener('change',changeQty);
    })

    let btnadd=document.querySelectorAll('#addcart');
    console.log(btnadd)
    btnadd.forEach((btn)=>{
        btn.addEventListener('click',addcontent);
    })

    updatetotal()
    let placebtn=document.querySelector('.btn-buy');
    placebtn.addEventListener('click',handle)
}

function removeItem(){
    if(confirm('Are you delete this item ')){
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemlist=itemlist.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    }

    
}

function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}

function handle(){
    if(itemlist.length<=0){
        alert("No item Pleace Add  to cart")
    }
    else{
        const cartcontent=cart.querySelector('.cart-content');
        cartcontent.innerHTML="";
        alert("Your Order Placed");
        itemlist=[];
        loadContent()
    }
}

let itemlist=[]

function addcontent(){
    let lap=this.parentElement;
    console.log(lap.querySelector('#lname').innerHTML)
    console.log(lap.querySelector('#lprice').innerHTML)
    console.log(lap.querySelector('.card-img-top').src)
    let title=lap.querySelector('#lname').innerHTML;
    let price=lap.querySelector('#lprice').innerHTML;
    let image=lap.querySelector('.card-img-top').src;

    let newproduct={
        title,price,image
    }

    //already
    if (itemlist.find((el)=>el.title == newproduct.title)){
        alert("Product already added in card");
        return;
    }
    else{
        itemlist.push(newproduct )
    }
    let newlaptop=creatcartlaptop(title,price,image);
    let element=document.createElement('div');
    element.innerHTML= newlaptop;
    let cards=document.querySelector('.cart-content');
    cards.append(element);
    loadContent();

}

function creatcartlaptop(title,price,image){
    return `<div class="cart-box">
    <img src="${image}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <button class="btn btn-white text-danger" id="btn-delete"> <i class="fa-solid fa-trash"></i></button>
</div>`;
}

function updatetotal(){
    const carditem=document.querySelectorAll('.cart-box');
    const totalvalue=document.querySelector('.total-price');
    let total=0;
    carditem.forEach(product=>{
        let priceelementname=product.querySelector('.cart-price');
        let price=parseFloat(priceelementname.innerHTML.replace("Rs.",""));
        console.log(price)
        let qty=product.querySelector(".cart-quantity").value;
        console.log(qty)
        total+=(price*qty);
        console.log(total)
        product.querySelector('.cart-amt').innerText="Rs." + price * qty;
})
      totalvalue.innerHTML='Rs.' + total;
}