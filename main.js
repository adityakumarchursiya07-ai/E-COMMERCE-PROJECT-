const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories";
const productsContainer = document.querySelector("#products-container");
const categoryFilters = document.querySelector("#category-filters");
const searchInput = document.querySelector("#search-input");
const wishlistCount = document.querySelector("#wishlist-count");
const cartCount = document.querySelector("#cart-count");
const cartContainer = document.querySelector("#cart-container")


async function fetchProducts(url) {
  productsContainer.innerHTML = "Loading";

  const response = await fetch(url);
  const data = await response.json();

  renderProduct(data.products);
}
let allCategoris = [];
let wishlistproducts = [];
async function fetchcategoris() {
  const response = await fetch(CATEGORY_API);
  const data = await response.json();
  allCategoris = [{ name: "all", slug: "all", url: API }, ...data];

  rendercategories();
}
async function loadProdctPage() {
  const productdetailcontainer = document.querySelector(
    "#product-detail-container",
  );
  if (!productdetailcontainer) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id);
  const url = `https://dummyjson.com/products/${id}`;
  productdetailcontainer.innerHTML = "Loading....";
  const response = await fetch(url);
  const data = await response.json();
  if (data.message) {
    productdetailcontainer.textContent = "Failed to load Products";
    return;
  }
  const { thumbnail, category, price, rating, reviews, title, description } =
    data;
  const div = `  
        
        <div class="bg-white border border-slate-200 rounded-lg p-8 flex items-center justify-center min-h-[350px] md:min-h-[440px]">
          <img 
            src=${thumbnail} 
            alt=${title} 
            class="max-h-96 max-w-full object-contain"
          >
        </div>

        <div class="flex flex-col">
          <div>
            <span class="inline-block text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              ${category} 
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
           ${title} 
          </h1>

          <div class="flex items-center gap-1 mb-4">
            <div class="flex items-center" aria-label="2.6 out of 5 stars">
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="ml-2 text-sm text-slate-500 font-medium">
              ${rating}  (${reviews.length}  reviews)
            </span>
          </div>

          <div class="mb-6">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">
             ${cobvertToINR(price)} 
            </span>
          </div>
          

          <div class="border-t border-b border-slate-200 py-6 mb-6">
            <p class="text-slate-600 text-base leading-relaxed">
${description}             </p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            <div class="flex items-center border border-slate-300 rounded-md bg-white w-fit">
              <button 
                type="button" 
                id="qty-minus" 
                class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-md transition"
                aria-label="Decrease quantity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>

              <span id="qty-value" class="w-12 text-center text-sm font-semibold text-slate-900 select-none">
                1
              </span>

              <button 
                type="button" 
                id="qty-plus" 
                class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-md transition"
                aria-label="Increase quantity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>

            <button 
              type="button" 
              id="add-to-cart-btn" 
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-md shadow-sm transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Add to Cart</span>
            </button>

            <button 
              type="button" 
              id="add-to-wishlist-btn" 
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-teal-700 text-teal-700 hover:bg-teal-50 font-medium py-2.5 px-6 rounded-md shadow-sm transition"
            >
              <svg id="wishlist-btn-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span id="wishlist-btn-text">Add to Wishlist</span>
            </button>
          </div>
    </div>
        </div>
      `;
  productdetailcontainer.innerHTML = div;
  const qtyValue = document.querySelector("#qty-value")
  // console.log(qtyValue);
  document.querySelector("#qty-plus").addEventListener("click", (e) => {
    e.stopPropagation()
    qtyValue.textContent = Number(qtyValue.textContent) + 1
  });
  document.querySelector("#qty-minus").addEventListener("click", (e) => {
    e.stopPropagation();
    if (Number(qtyValue.textContent) <= 1) {
    }
    else {
      qtyValue.textContent = Number(qtyValue.textContent) - 1
    }
  });





  const addtoWishListBtn = document.querySelector("#add-to-wishlist-btn");
  const addtoCartBtn = document.querySelector("#add-to-cart-btn");
  addtoWishListBtn.addEventListener("click", (e) => {
    addToWishList(data)
  })


  addtoCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart({ ...data, quantity: Number(qtyValue.textContent) })
  });



}
function renderProduct(product) {
  productsContainer.innerHTML = " ";

  if (product.length > 0) {
    product.forEach((p) => {
      let article = document.createElement("article");
      article.className =
        "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition";
      card = ` 
         
          <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
            <img src=${p.thumbnail}
              alt=  ${p.title} class="max-h-full max-w-full object-contain" loading="lazy">
          </div>
          <div class="flex-grow flex flex-col">
            <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              ${formtCategory(p.category)}
            </span>
            <h2 class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2" title=  ${p.title}>
              ${p.title}
            </h2>
            <div class="mt-auto pt-2">
              <span class="text-lg font-bold text-slate-900">
               ₹${cobvertToINR(p.price)}
              </span>
            </div>
            <a href="product-details.html?id=${p.id}"
              class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition">
              View Details
            </a>
          </div>
      
    `;

      article.innerHTML = card;
      productsContainer.append(article);
      // productsContainer.innerHTML = card;
    });
  } else {
    productsContainer.innerHTML = "product NOT found";
  }
}

function formtCategory(category) {
  return category.replace("-", " ");
}

function rendercategories(currrentCategry = "all") {
  categoryFilters.innerHTML = " ";
  // let allCategoris = [{ name: "all", slug: "all", url: API }, ...categories];
  allCategoris.forEach(({ name, slug, url }) => {
    let button = document.createElement("button");
    if (currrentCategry === slug) {
      button.className =
        "px-4 py-1.5 rounded-md text-sm font-medium bg-teal-700 capitalize text-white transition";
    } else {
      button.className =
        "px-4 py-1.5 rounded-md text-sm font-medium bg-white text-slate-700 border border-slate-300  hover:bg-slate-100 transition";
    }
    // button.className = "px-4 py-1.5 rounded-md text-sm font-medium bg-white text-slate-700 border border-slate-300 capitalize hover:bg-slate-100 transition";
    button.type = "button";
    button.textContent = name;
    button.dataset.category = slug;
    button.dataset.url = url;
    categoryFilters.append(button);
  });
}

function cobvertToINR(price) {
  return (price * 96.33).toFixed(2);
}

function getItem(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}



function addToWishList(data) {
  const wishlistproducts = getItem("wishlist");
  const isexsit = wishlistproducts.some((p) => p.id === data.id);
  if (!isexsit) {
    setItem("wishlist", [data, ...wishlistproducts]);
  }
  updateWishListCount();

}

function loadwishListPage() {
  const wishlistContainer = document.querySelector("#wishlist-container");
  if (!wishlistContainer) {
    return;
  }
  const wishlistproducts = getItem("wishlist");
  const outerdiv = document.createElement("div");
  outerdiv.className = "bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden shadow-sm";
  if (!wishlistproducts.length) {
    wishlistContainer.innerHTML = ` <div class="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto my-8">
        <div class="w-16 h-16 mx-auto mb-4 text-slate-300 flex items-center justify-center">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-800 mb-2">Your wishlist is empty</h2>
        <p class="text-slate-500 text-sm mb-6">Looks like you haven't saved any products to your wishlist yet.</p>
        <a href="index.html"
          class="inline-flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-6 py-2.5 rounded-md transition text-sm">
          Start Shopping
        </a>
      </div>`
    return;
  }
  wishlistContainer.innerHTML = "";
  wishlistproducts.forEach((data) => {
    const { title, thumbnail, price, id } = data;
    const div = document.createElement("div");
    div.className = "p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"

    const card = `<div class="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">
              <img 
                src=${thumbnail}
                alt="Nike Air Jordan 1 Red And Black" 
                class="max-h-full max-w-full object-contain"
              >
            </div>
            <div class="min-w-0 flex-1">
              <a 
                href="product-details.html?id=${id}" 
                class="text-sm font-semibold text-slate-900 hover:text-teal-700 line-clamp-2 transition" 
                title=${title}
              >
${title}              </a>
              <p class="text-sm font-bold text-slate-900 mt-1">₹${cobvertToINR(price)}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <button 
              type="button" 
              data-id=${id}
              class="wishlist-add-cart-btn inline-flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Add to Cart</span>
            </button>
            
            <button 
              type="button" 
                 data-id=${id}
              class="wishlist-remove-btn inline-flex items-center justify-center gap-1.5 text-slate-500 hover:text-red-600 border border-slate-300 hover:border-red-300 text-sm font-medium py-2 px-3 rounded transition"
              title="Remove from Wishlist"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Remove from Wishlist</span>
            </button>
          </div>`;
    div.innerHTML = card;
    outerdiv.append(div)
  });
  wishlistContainer.append(outerdiv)

  wishlistContainer.addEventListener('click', (e) => {
    e.stopPropagation()
    updateWishListCount()



    const removeWishlistBTN = e.target.closest(".wishlist-remove-btn")
    const addToCartBTN = e.target.closest(".wishlist-add-cart-btn")

    if (removeWishlistBTN) {
      const removeproductId = Number(removeWishlistBTN.dataset.id);

      const filterItems = getItem("wishlist").filter(({ id }) => id !== removeproductId)
      setItem("wishlist", filterItems)
      updateWishListCount()
      loadwishListPage()

    }
    if (addToCartBTN) {
      const productId = Number(addToCartBTN.dataset.id);
      const data = getItem("wishlist").find(({ id }) => id === productId);
      addToCart({ ...data, quantity: 1 });
    }


  });
}
function addToCart(data) {
  const cartPtoducts = getItem("cart");
  if (cartPtoducts.length) {
    const isexsit = cartPtoducts.find((p) => p.id === data.id);
    if (isexsit) {
      const filterProduct = cartPtoducts.map((item) => {
        if (item.id === isexsit.id) {
          return {
            ...item,
            quantity: Number(data.quantity) + Number(isexsit.quantity)
          };
        };
        return item;
      })
      setItem("cart", filterProduct);
    }
    else {
      setItem("cart", [data, ...cartPtoducts]);
    }
  }
  else {
    setItem("cart", [data]);
  }
  updatecartCount()
}
function updateWishListCount() {
  wishlistCount.textContent = getItem("wishlist").length;
}

function updatecartCount() {
  cartCount.textContent = getItem("cart").reduce((acc, curr) => {
    return acc + Number(curr.quantity);
  }, 0)
}

function loadCart() {
  if (!cartContainer) {
    return;
  }

  let cardData = getItem("cart");
  cartContainer.innerHTML = "";

  if (!cardData.length) {
    cartContainer.innerHTML = `<div class="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto my-8">
        <div class="w-16 h-16 mx-auto mb-4 text-slate-300 flex items-center justify-center">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-800 mb-2">Your cart is empty</h2>
        <p class="text-slate-500 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
        <a href="index.html" class="inline-flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-6 py-2.5 rounded-md transition text-sm">
          Start Shopping
        </a>
      </div>`
    return;
  }
  const mainDiv = document.createElement("div")
  mainDiv.className = "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start";


  const div1 = document.createElement("div")
  div1.className = "lg:col-span-2 bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden shadow-sm";
  let totalPrice = 0;
  cardData.forEach(item => {
    const { id, thumbnail, title, price, quantity } = item;
    console.log(title);
    totalPrice = totalPrice + price * quantity;
    const divItem = document.createElement("div")
    divItem.className = "p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
    divItem.innerHTML = ` <div class="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">
                <img src="${thumbnail}"
                  alt="${title}" class="max-h-full max-w-full object-contain">
              </div>
              <div class="min-w-0 flex-1">
               <a href="product-details.html?id=${id}"
                  class="text-sm font-semibold text-slate-900 hover:text-teal-700 line-clamp-2 transition"
                  title="${title}">
                 "${title}"
                </a>
                <p class="text-xs text-slate-500 mt-1">₹${cobvertToINR(price)} each</p>
              </div>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto shrink-0">
              <div class="flex items-center border border-slate-300 rounded bg-white">
                <button type="button"data-id=${id}
                  class="cart-qty-minus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l transition"
                  aria-label="Decrease quantity">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="w-8 text-center text-xs font-semibold text-slate-800 select-none">${quantity}</span>
                <button type="button"data-id=${id}
                  class="cart-qty-plus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r transition"
                  aria-label="Increase quantity">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
              <div class="w-20 text-right">
                <span class="text-sm font-bold text-slate-900">₹${(Number(quantity) * cobvertToINR(price)).toFixed(2)}</span>
              </div>
              <button type="button"
                class="cart-wishlist-btn text-slate-400 hover:text-teal-700 p-1.5 rounded transition"
                title="Add to Wishlist" aria-label="Add to Wishlist">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
              </button>
              <button type="button" class="cart-remove-btn text-slate-400 hover:text-red-600 p-1.5 rounded transition"
                title="Remove from cart" aria-label="Remove item">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
              </button>
            </div>`

    divItem.addEventListener('click', (e) => {
      // e.preventDefault()/
      e.stopPropagation()
      const removeCartBtn = e.target.closest(".cart-remove-btn");
      const cartWishListBtn = e.target.closest(".cart-wishlist-btn")
      if (removeCartBtn) {
        const filterProducts = getItem("cart").filter(({ id: itemId }) => itemId !== id)
        setItem("cart", filterProducts)
        updatecartCount()
        loadCart()
      }


      if (cartWishListBtn) {
        addToWishList(item)
      }
    })

    div1.append(divItem)

  });


  const div2 = document.createElement("div")
  div2.className = "bg-white border border-slate-200 rounded-lg p-6 shadow-sm sticky top-24";
  div2.innerHTML = ` <h2 class="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Order Summary
          </h2>

          <div class="flex items-center justify-between text-base font-semibold text-slate-900 mb-6">
            <span>Total Amount</span>
            <span class="text-xl font-bold text-teal-700">₹${cobvertToINR(totalPrice)}</span>
          </div>

          <button type="button" id="checkout-btn"
            class="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-4 rounded-md shadow-sm transition text-center">
            Proceed to Checkout
          </button>`
  mainDiv.append(div1, div2)
  cartContainer.append(mainDiv)

  cartContainer.querySelectorAll(".cart-qty-minus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const span = e.currentTarget.nextElementSibling;
      let value = Number(span.textContent)
      if (value <= 1) {
        // removeFromCart()
      }
      else {
        span.textContent = value - 1;
        updatecartItemquantity(id, span.textContent)

      }

    })
  })
  cartContainer.querySelectorAll(".cart-qty-plus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const span = e.currentTarget.previousElementSibling;
      const id = e.currentTarget.dataset.id;
      span.textContent = Number(span.textContent) + 1
      updatecartItemquantity(id, span.textContent)
    })
  })
}

function updatecartItemquantity(id, quantity) {
  const cartPtoducts = getItem("cart");
  const filterProduct = cartPtoducts.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...item,
        quantity,
      };
    };
    return item;
  })
  setItem("cart", [data, ...filterProduct]);
  loadCart()
}

function init() {
  loadwishListPage();
  if (categoryFilters) {
    categoryFilters.addEventListener("click", (e) => {
      e.stopPropagation();
      const element = e.target;

      if (element.type) {
        const category = element.dataset.category;
        const url = element.dataset.url;
        // element.className = "px-4 py-1.5 rounded-md text-sm font-medium bg-teal-700 capitalize text-white transition";
        rendercategories(category);
        fetchProducts(url);
      }
    });
  }
  if (productsContainer) {
    productsContainer.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    fetchProducts(API);

    fetchcategoris();
  }
  loadProdctPage();
  loadwishListPage()
  updatecartCount();
  updateWishListCount();
  loadProdctPage()
  loadwishListPage();
  loadCart();
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      e.stopPropagation;
      let value = searchInput.value;
      const url = `https://dummyjson.com/products/search?q=${value}`;
      fetchProducts(url);
    });
  }


}
init()
