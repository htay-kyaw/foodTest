function welcomeIntro() {
    const welcomeContainer = document.querySelector(".welcomeContainer");
    welcomeContainer.innerHTML = `
      <div class="welcome">
           <div class="welcontent">
              <h1>HELLO.👋 WELCOME</h1>
              <h2>MY FOOD DILVERY APP</h2>
              <img src="content/photo/foodLogo.png"></img>
           </div>
      </div>
    `
    const welcome = document.querySelector(".welcome");
    welcome.style.top = `-${welcome.offsetHeight}px`;
    setTimeout(() => {
        welcome.style.top = `0px`;
    }, 1000);
    setTimeout(() => {
        welcome.style.left = `-${welcome.offsetWidth}px`;
    }, 3000);
};

function updateUiForPage() {
    const pages = document.querySelectorAll(".page");
    const drops = document.querySelectorAll(".drop");
    const nextButton = document.getElementById("next");
    const skipButton = document.getElementById("skip");
    const dropContainer = document.querySelector(".dropContainer");
    const buttonContainer = document.querySelector(".buttonContainer");

    let currentPage = 1;
    function updatePage() {
        pages.forEach(page => {
            page.classList.remove("active");
        });
        drops.forEach(drop => {
            drop.style.backgroundColor = "";
        });

        document.getElementById(`page${currentPage}`).classList.add("active");
        document.getElementById(`drop${currentPage}`).style.backgroundColor = "black";
        if (currentPage === 4) {
            dropContainer.style.display = "none";
            buttonContainer.style.display = "none";
        }
    };
    skipButton.addEventListener("click", () => {
        currentPage = 4;
        updatePage();
    });
    nextButton.addEventListener("click", () => {
        currentPage = currentPage < 4 ? currentPage + 1 : 1;
        updatePage();
    });
    updatePage();
};

const videoInFirstPage = () => {
    const videoTag = document.querySelector(".video");
    const playButton = document.querySelector(".fa-play");
    const pauseButton = document.querySelector(".fa-pause");
    const currentProgess = document.querySelector("#currentProgess");
    const backTag = document.querySelector(".fa-angle-left");
    const forwardTag = document.querySelector(".fa-angle-right");

    const videos = [
        { name: "content/video/steak.mp4" },
        { name: "content/video/drink.mp4" },
        { name: "content/video/noodle.mp4" }
    ];
    let currentVideoIndex = 0;
    let playing = true;

    if (currentVideoIndex < videos.length) {
        videoTag.src = videos[currentVideoIndex].name;
    };
    let duration = 0;
    videoTag.addEventListener("loadeddata", () => {
        duration = videoTag.duration;
    });
    videoTag.addEventListener("timeupdate", () => {
        const currentTime = videoTag.currentTime;
        const progessWidth = currentProgess.parentElement.offsetWidth;
        currentProgess.style.width = (progessWidth / duration) * currentTime.toString() + "px";

        if (currentTime === duration) {
            playing = false;
            playAndPause();
        }
    });
    playButton.addEventListener("click", () => {
        videoTag.play();
        playing = true;
        playAndPause();

    });
    pauseButton.addEventListener("click", () => {
        videoTag.pause();
        playing = false;
        playAndPause();
    })
    const playAndPause = () => {
        if (playing) {
            playButton.style.display = "none";
            pauseButton.style.display = "block";
        } else {
            playButton.style.display = "block";
            pauseButton.style.display = "none";
        }
    }

    let playIndex = 0;
    if (playIndex === 0) {
        backTag.style.visibility = "hidden";
    }
    forwardTag.addEventListener("click", () => {
        backTag.style.visibility = "visible";
        playIndex += 1;
        videoTag.src = videos[playIndex].name;
        videoTag.play();
        playing = true;
        playAndPause();
        if (playIndex === videos.length - 1) {
            forwardTag.style.visibility = "hidden";
            return;
        }
    });
    backTag.addEventListener("click", () => {
        forwardTag.style.visibility = "visible";
        playIndex -= 1;
        videoTag.src = videos[playIndex].name;
        videoTag.play();
        playing = true;
        playAndPause();
        if (playIndex === 0) {
            backTag.style.visibility = "hidden";
            return;
        };
    })
};
videoInFirstPage();

const logInContainer = document.querySelector(".logInContainer");
const signUpContainer = document.querySelector(".signUpContainer");

document.getElementById("signUpForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = {
        name: name,
        phoneNumber: phone,
        email: email,
        password: password,
    };
    const userJSOn = JSON.stringify(newUser);
    localStorage.setItem("user", userJSOn);
    localStorage.setItem("userAcc", "entered");
    document.querySelector(".pagesContainer").remove();
    document.querySelector(".page3Container").style.display = "block";
    profile();
    alert("sign up successful!");


});

const products = [
    { name: "burger", img: "content/photo/burger.jpg", price: "5", id: "0", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "cheeseBurger", img: "content/photo/burger2.jpg", price: "9", id: "1", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "camboBurger", img: "content/photo/burger&tomato.jpg", price: "12", id: "2", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "noodle", img: "content/photo/food.jpg", price: "4", id: "3", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "friedRice", img: "content/photo/food2.jpg", price: "6", id: "4", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "pizza", img: "content/photo/pizza.jpg", price: "7", id: "5", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "meatPizza", img: "content/photo/pizza2.jpg", price: "8", id: "6", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
    { name: "steak", img: "content/photo/steak.jpg", price: "11", id: "7", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatibus reiciendis hic iure possimus rem ipsum magnam deleniti unde fugiat a, ad voluptates tempora iste in! Incidunt, earum atque. Ratione." },
];
const searchInput = document.getElementById("searchInput");
const searchListContainer = document.querySelector(".searchListContainer");

let filtered = [];
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter") {
        navigation(event.key);
        return;
    }
    searchListContainer.innerHTML = "";
    const userSearch = event.target.value.toLowerCase();
    if (userSearch.length === 0) {
        searchListContainer.style.display = "none";
        return;
    }
    filtered = products.filter(product => {
        return product.name.toLowerCase().includes(userSearch);
    });
    if (filtered.length > 0) {
        searchListContainer.style.display = "block";
        for (let i = 0; i < filtered.length; i++) {
            const product = filtered[i];
            const searchList = document.createElement("div");
            searchList.classList.add("searchList");
            // searchList.id = filtered[i].id;

            searchList.innerHTML = `
                <div class="productNameInSl">${filtered[i].name}</div>
                <img src="${filtered[i].img}" class="productImgInSl"/>
            `
            searchList.addEventListener("click", () => {
                showProductDetail(product);
            })
            searchListContainer.append(searchList);
        }

    }

});

let indexToSelect = -1;
const navigation = (key) => {
    Array.from(searchListContainer.children).forEach(child => {
        child.style.backgroundColor = "";
        child.style.color = "";
    })

    if (key === "ArrowDown") {
        indexToSelect = (indexToSelect + 1) % filtered.length;
        selected();
    } else if (key === "ArrowUp") {
        indexToSelect = (indexToSelect - 1 + filtered.length) % filtered.length;
        selected();
    } else {
        console.log(filtered[indexToSelect])
    }
};

function selected() {
    const selected = document.getElementById(filtered[indexToSelect].id);
    selected.style.backgroundColor = "blue";
    selected.style.color = "white";

};

const productGrid = document.querySelector(".product-grid");
const modalProduct = document.querySelector(".modalProduct");
const profilePage = document.getElementById("profileContainer");
const favoritePage = document.getElementById("favoriteContainer");
const orderSummaryPage = document.getElementById("orderSummaryContainer");

products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    // productDiv.id = index;

    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-Img">
      <div class="product-content">
            <div>
              <div class="product-name">${product.name} </div>
              <div class="product-price">${"$ " + product.price}</div>
            </div>
             <i class="fas fa-heart favorite-icon" data-index="${index}"></i>
      </div>
     
    `
    productGrid.appendChild(productDiv);

    let favoriteProduct = [];
    productDiv.addEventListener("click", (event) => {
        if (event.target.classList.contains("favorite-icon")) {
            const index = event.target.getAttribute("data-index");
            event.target.classList.toggle('active');

            const product = products[index];

            if (favoriteProduct.includes(product)) {
                removeFavoritePageFun(product);
            } else {
                favoriteProduct.push(product);
                favoritePageFun(product);
            }


        }
    })
    const productImg = productDiv.querySelector(".product-Img");
    productImg.addEventListener('click', () => {
        document.querySelector(".page3Container").style.display = "none";
        showProductDetail(product);
    })
});

function favoritePageFun(product) {
    const favPagContainer = document.createElement("div");
    favPagContainer.classList.add("favPagContainer");
    favPagContainer.setAttribute("data-index", product.id);
    favPagContainer.innerHTML += `
    <div class="favPagContainer">
        <img src="${product.img}"/>
        <div>
           <h1>${product.name}</h1>
           <h3>${"$ " + product.price}</h3>
        </div>
         <i class="fas fa-heart"></i>
    </div>
 `
    favoritePage.append(favPagContainer);
    favPagContainer.addEventListener("click", () => {
        showProductDetail(product);
    })
};

function removeFavoritePageFun(product) {
    document.querySelectorAll(".favPagContainer").forEach(item => {
        const itemIndex = item.getAttribute("data-index");
        if (itemIndex == product.id) {
            item.remove();
        }
    })
};

function profile() {
    const getStorageEnter = localStorage.getItem("userAcc");
    if (getStorageEnter === "entered") {
        const newUserFormLocalStorage = localStorage.getItem("user");
        const newUserJSobject = JSON.parse(newUserFormLocalStorage);
        const profilePageTag = document.createElement("div");
        profilePageTag.classList.add("profile");
        profilePageTag.innerHTML = `
            <h1>Profile</h1>
            <div class="nameInPro">
               <div>
                   <h2>Name</h2>
                   <h1>${newUserJSobject.name}</h1>
               </div>
               <i class="fa-solid fa-pen"></i>
            </div>
            <div class="emailInPro">
               <div>
                 <h2>Email</h2>
                 <h1>${newUserJSobject.email}</h1>
               </div>
               <i class="fa-solid fa-pen"></i>
            </div>
            <div class="numInPro">
               <div>
                  <h2>Mobile number</h2>
                  <h1>${newUserJSobject.phoneNumber}</h1>
               </div>
               <i class="fa-solid fa-pen"></i>
            </div>
            <button class="m-auto mt-5 bg-primary text-white fs-3 fw-bold" onclick="logOutFun()">Log Out</button>
        `
        profilePage.append(profilePageTag);
    }


};

function showProductDetail(product) {
    document.querySelector(".page3Container").style.display = "none";
    const overLayProduct = document.createElement("div");
    overLayProduct.classList.add("overLayProduct");
    overLayProduct.innerHTML = `
        <div class="overLayContainer container">
            <div class="fa-solid fa-angle-left" id="backHome" onclick="backHomeFun()"></div>
            <img src="${product.img}" />
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <div class="rangeAndCount">
                <div class="range">
                    <h4 class="py-3">Spicy Level</h4>
                    <input type="range" id="rangeInput" min="1" max="10" value="1">
                    <div class="d-flex justify-content-between">
                       <div class="mild">Mild</div>
                       <div id="spicyValue">1</div> 
                       <div class="hot">Hot</div>
                    </div>
                </div>
                <div class="portion">
                    <i class="fa-solid fa-minus" id="minusBtn"></i>
                    <div id="portionCount">1</div> 
                    <i class="fa-solid fa-plus" id="plusBtn"></i>
                </div>
            </div>
            <div class="przAndAdd">
                <div id="totalPrice" class="price">${"$ " + product.price}</div>
                <div class="addToCard">Add To Cart</div>
            </div>
        </div>
    `;
    modalProduct.append(overLayProduct);

    let selectedSpicyLevel = 1;
    let portionCount = 1;
    let basePrice = product.price;
    let totalPrice = basePrice;

    const rangeInput = document.getElementById("rangeInput");
    const spicyValue = document.getElementById("spicyValue");
    const minusBtn = document.getElementById("minusBtn");
    const portinoDisplay = document.getElementById("portionCount");
    const plusBtn = document.getElementById("plusBtn");
    const totalPriceDisplay = document.getElementById("totalPrice");

    rangeInput.addEventListener("input", () => {
        selectedSpicyLevel = rangeInput.value;
        spicyValue.textContent = selectedSpicyLevel;
    });
    minusBtn.addEventListener("click", () => {
        if (portionCount > 1) {
            portionCount--;
            updatePrice();
        }
    });
    plusBtn.addEventListener("click", () => {
        portionCount++;
        updatePrice();
    });
    function updatePrice() {
        totalPrice = basePrice * portionCount;
        portinoDisplay.textContent = portionCount;
        totalPriceDisplay.textContent = `$ ${totalPrice}`;
    };
    overLayProduct.querySelector(".addToCard").addEventListener("click", () => {
        const userSelection = {
            basePrice: product.price,
            productImg: product.img,
            productPrice: totalPrice,
            productName: product.name,
            spicyLevel: selectedSpicyLevel,
            portionCount: portionCount
        };

        setTimeout(() => {
            modalProduct.innerHTML += `
            <div class="reviewContainer">
                <div class="countInReview">${userSelection.portionCount}</div>
                <div class="review">Review Your Food</div>
            </div>
        `
        }, 400);

        forOrderSummaryPage(userSelection);
    })
};

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("reviewContainer")) {
        modalProduct.innerHTML = "";
        document.querySelector("#homePageContainer").classList.remove("active");
        document.querySelector(".page3Container").style.display = "block";
        document.querySelector("#orderSummaryContainer").classList.add("active");
    }
});

function forOrderSummaryPage(userSelection) {
    const sumContainer = document.createElement("div");
    sumContainer.classList.add("sumContainer", "container");
    sumContainer.innerHTML = `
           <div class="imgAndCou">
                <img src="${userSelection.productImg}"/>
                <div class="countAndName">
                    <h1>${userSelection.productName}</h1>
                    <div class="countContainer">
                        <i class="fa-regular fa-trash-can trash"></i>
                        <i class="fa-solid fa-minus minusInSum"></i>
                        <div class="countSumDisplay">${userSelection.portionCount}</div>
                        <i class="fa-solid fa-plus plusInSum"></i>
                    </div>
                </div>
           </div>
           <div class="spicy">Spicy Level: 🔥${userSelection.spicyLevel}</div>
           <div class="d-flex">
              <div class="fs-1 pe-3">Price: $</div>
              <div class="sumPrice">${userSelection.productPrice}</div>
           </div>
    `
    orderSummaryPage.append(sumContainer);

    let countInSum = userSelection.portionCount;
    let priceInSum = userSelection.productPrice;
    let totalPriceInSum = priceInSum;

    const trash = sumContainer.querySelector(".trash");
    const minusInSum = sumContainer.querySelector(".minusInSum");
    const plusInSum = sumContainer.querySelector(".plusInSum");
    const countSumDisplay = sumContainer.querySelector(".countSumDisplay");
    const sumPrice = sumContainer.querySelector(".sumPrice");

    const total=document.querySelector(".total");
    total.innerHTML=`
       <div class="totalContainer">
                 <div class="d-flex justify-content-between">
                  <h1>Total Product Count:</h1>
                  <div class="countAll"></div>
               </div>
               <div class="d-flex justify-content-between mb-4">
                 <h1>Total Price:</h1>
                 <div class="priceAll"></div>
               </div>
               <div class="orderBtn">Order Now</div>
           </div>
    `
    updateForTotal();

    if (countInSum > 1) {
        trash.style.display = "none";
        minusInSum.style.display = "block";
    }
    minusInSum.addEventListener("click", () => {
        if (countInSum > 1) {
            countInSum--;
            updatePriceInSum();
        }
    });

    plusInSum.addEventListener("click", () => {
        trash.style.display = "none";
        minusInSum.style.display = "block";
        countInSum++;
        updatePriceInSum();
    });
    trash.addEventListener("click", () => {
        sumContainer.remove();
        updateForTotal();
    })
    function updatePriceInSum() {
        totalPriceInSum = userSelection.basePrice * countInSum;
        sumPrice.textContent = `${totalPriceInSum}`;
        countSumDisplay.textContent = countInSum;
        if (countInSum == 1) {
            trash.style.display = "block";
            minusInSum.style.display = "none";
        }
        updateForTotal();
    }
   
    function updateForTotal() {
        const allSumContainer=document.querySelectorAll(".sumContainer");
        let totalProductCount = 0;
        let totalPriceAll=0;

        allSumContainer.forEach(container => {
            const countDisplay=container.querySelector(".countSumDisplay").textContent;
            const priceDisplay=container.querySelector(".sumPrice").textContent;
            totalProductCount += parseInt(countDisplay);
            totalPriceAll += parseFloat(priceDisplay);
        });
        document.querySelector(".countAll").textContent=totalProductCount;
        document.querySelector(".priceAll").textContent=`$ ${totalPriceAll}`;
    }
    total.querySelector(".orderBtn").addEventListener("click",() => {
        alert(new Date().toLocaleString()+"\n"+"Order Was Successfully!! ♨︎ ♨︎ ♨︎ ♨︎ ♨︎");
    });

};

function backHomeFun() {
    modalProduct.innerHTML = "";
    document.querySelector(".page3Container").style.display = "block";
};

function navigateTo(pageId) {
    document.querySelectorAll(".page3").forEach(pg3 => {
        pg3.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");

};

function logOutFun() {
    document.querySelector(".page3Container").style.display = "none";
    const logIn = document.querySelector(".logIn");
    logIn.innerHTML = `
         <div class="logInContainer">
            <h1>Log In</h1>
            <form id="logInForm">
              <label for="email">Email:</label>
              <input type="email" id="logInEmail" name="email" />

              <label for="password">Password:</label>
              <input type="password" id="logInPassword" name="password" />

              <button type="submit">Log In</button>
            </form>
          </div>
    `
    document.getElementById("logInForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const logInEmail=document.getElementById("logInEmail").value;
        const logInPassword=document.getElementById("logInPassword").value;
        const newUserFormLocalStorage = localStorage.getItem("user");
        const newUserJSobject = JSON.parse(newUserFormLocalStorage);
        if (logInEmail === newUserJSobject.email && logInPassword === newUserJSobject.password) {
            logIn.innerHTML="";
            document.querySelector(".page3Container").style.display = "block";
        } else {
            alert("password is wrong");
        }
    });
};
profile();

window.addEventListener("load", () => {
    const getStorageEnter = localStorage.getItem("userAcc");
    const getLogIn=localStorage.getItem("log");
    if (getStorageEnter !== "entered") {
        welcomeIntro();
        setTimeout(() => {
            document.querySelector(".pagesContainer").style.display = "block";
        }, 3000);
        updateUiForPage();
    } else if (getStorageEnter === "entered") {
        welcomeIntro();
        document.querySelector(".pagesContainer").remove();
        setTimeout(() => {
            document.querySelector(".page3Container").style.display = "block";
        }, 3000);

    }
});

