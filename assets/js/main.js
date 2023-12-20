var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var addbtn = document.getElementById("addbtn");
var updatabtn = document.getElementById("updatabtn");
var searchInput = document.getElementById("search");
var error = document.getElementById("errorMassage");
var priceError = document.getElementById("errorMassagePrice");
var categoryError = document.getElementById("errorMassageCategory");
var descriptionError = document.getElementById("errorMassageDescription");
var productContainer;

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProduct(productContainer);
} else {
  productContainer = [];
}
// Function to Add Product
function checkProductData() {
  var productNameValue = productName.value.trim();
  var productPriceValue = productPrice.value.trim();
  var productCategoryValue = productCategory.value.trim();
  var productDescriptionValue = productDescription.value.trim();

  if (
    productNameValue === "" ||
    productPriceValue === "" ||
    productCategoryValue === "" ||
    productDescriptionValue === ""
  ) {
    window.alert("You can't add a product with empty fields.");
    return false;
  }

  return true;
}
function addProduct() {
  if (!checkProductData()) {
    return;
  }

  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };
  productContainer.push(product);
  console.log(productContainer);
  localStorage.setItem("products", JSON.stringify(productContainer));
  clearForm();
  displayProduct(productContainer);
}
// Function to clear Form
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}
function displayProduct(productList, searchTerm) {
  // console.log(searchTerm);
  var cartona = ``;
  if (productList.length === 0) {
    cartona = `<tr><td colspan="7"><div class="alert alert-danger">No products found.</div></td></tr>`;
  } else {
    for (var i = 0; i < productList.length; i++) {
      cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${
          searchTerm
            ? productList[i].name
                .toLowerCase()
                .replace(
                  searchTerm.toLowerCase(),
                  `<span class="text-danger fw-bolder">${searchTerm}</span>`
                )
            : productList[i].name
        }</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td><button onclick="setFormForUpdate(${i}) "; class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i}) "; class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
  }
  document.getElementById("tbodyTable").innerHTML = cartona;
  var btnDelete = document.getElementById("deleteAll");
  if (productList.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll ()" class="mb-3 btn-product-delete w-100"><span>Delete All</span><i></i></button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

// Function to delete product
function deleteProduct(deleteItem) {
  productContainer.splice(deleteItem, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProduct(productContainer);
}
// Function to delete all product
function deleteAll() {
  localStorage.clear();
  productList = [];
  displayProduct(productList);
}
// Set Form For Update
var x;
function setFormForUpdate(updateIndex) {
  x = updateIndex;
  productName.value = productContainer[updateIndex].name;
  productPrice.value = productContainer[updateIndex].price;
  productCategory.value = productContainer[updateIndex].category;
  productDescription.value = productContainer[updateIndex].description;
  updatabtn.classList.replace("d-none", "d-inline-block");
  addbtn.classList.add("d-none");
}
// Function to Update Product
function updateProduct() {
  productContainer[x].name = productName.value;
  productContainer[x].price = productPrice.value;
  productContainer[x].category = productCategory.value;
  productContainer[x].description = productDescription.value;
  localStorage.setItem("products", JSON.stringify(productContainer));
  clearForm();
  displayProduct(productContainer);
  updatabtn.classList.replace("d-inline-block", "d-none");
  addbtn.classList.replace("d-none", "d-inline-block");
}
// Function to search
function searchAboutData() {
  var term = searchInput.value;
  // console.log(term);
  var searchList = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchList.push(productContainer[i]);
    }
  }
  displayProduct(searchList, term);
}
function validateProductName() {
  var regex = /^[A-Z][a-z]{2,11}( [A-Z][a-z]{2,11})?$/;
  if (regex.test(productName.value) == true) {
    error.classList.replace("d-block", "d-none");
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    return true;
  } else {
    error.classList.replace("d-none", "d-block");
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    return false;
  }
}
function validateProductPrice() {
  var regex = /^(?:[0-5]?[0-9]{1,4}|6[0-4][0-9]{3}|65000)$/;
  if (regex.test(productPrice.value) == true) {
    priceError.classList.replace("d-block", "d-none");
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
  } else {
    priceError.classList.replace("d-none", "d-block");
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    return false;
  }
}
function validateProductCategory() {
  var regex = /^(laptop|TV|phone|watch)$/i;
  if (regex.test(productCategory.value.trim())) {
    categoryError.classList.replace("d-block", "d-none");
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    return true;
  } else {
    categoryError.classList.replace("d-none", "d-block");
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    return false;
  }
}
function validateProductDescription() {
  var regex = /^.{1,100}$/;
  if (regex.test(productDescription.value)) {
    descriptionError.classList.replace("d-block", "d-none");
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid");
    return true;
  } else {
    descriptionError.classList.replace("d-none", "d-block");
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");
    return false;
  }
}
