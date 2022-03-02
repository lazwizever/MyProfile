function saveItem(){
    $("#customerTable>tr").off("click");

    let itemCode = $("#itemCode").val();
    let itemDescription = $("#inputDescription").val();
    let packSize = $("#packSize").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#inputQTy").val();
    let discount = $("#inputDiscount").val();

    alert("Customer has been added successfully");

    var item = new Item(itemCode,itemDescription,packSize,unitPrice,qty,discount);
    itemArray.push(item);
    generateItemIds();

    /*-----------------Set values for table----------------*/

    let row = `<tr><td>${itemCode}</td><td>${itemDescription}</td><td>${packSize}</td><td>${unitPrice}</td><td>${qty}</td><td>${discount}</td></tr>`;
    $("#itemTable").append(row);
    /*-----------------------------------------------------*/

}

function clearTextFields(){
    $("#itemCode").val("");
    $("#inputDescription").val("");
    $("#packSize").val("");
    $("#unitPrice").val("");
    $("#inputQTy").val("");
    $("#inputDiscount").val("");
}

function setItemDetailsToTxtFields(){

    $("#itemTable>tr").click(function(){

        let itemCode = $(this).children(':nth-child(1)').text();
        $("#itemCode").val(itemCode);

        let description = $(this).children(':nth-child(2)').text();
        $("#inputDescription").val(description);

        let packSize = $(this).children(':nth-child(3)').text();
        $("#packSize").val(packSize);

        let unitPrice = $(this).children(':nth-child(4)').text();
        $("#unitPrice").val(unitPrice);

        let QTY = $(this).children(':nth-child(5)').text();
        $("#inputQTy").val(QTY);

        let discount = $(this).children(':nth-child(6)').text();
        $("#inputDiscount").val(discount);

    });
}

function deleteItem(){
    confirm("Do you really want to remove this customer...?");

    for (let i = 0; i < itemArray.length; i++) {
        if ($("#itemCode").val() == itemArray[i].getItemId()) {
            itemArray.splice(i, 1);

            clearTextFields();
        }
    }
}

function updateItem(){
    alert("Item has been successfully updated");

    $("#itemTable>tr").off("click");

    let itemCode = $("#itemCode").val();
    let itemDescription = $("#inputDescription").val();
    let packSize = $("#packSize").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#inputQTy").val();
    let discount = $("#inputDiscount").val();


    for (let i = 0; i < itemArray.length; i++) {
        if ( $("#itemCode").val() === itemArray[i].getItemId()) {
            itemArray.splice(i, 1);

            clearTextFields();
        }
    }


    var item = new Item(itemCode,itemDescription,packSize,unitPrice,qty,discount);
    itemArray.push(item);


    /*-----------------Adding values to table---------------------*/

    let row = `<tr><td>${itemCode}</td><td>${itemDescription}</td><td>${packSize}</td><td>${unitPrice}</td><td>${qty}</td><td>${discount}</td></tr>`;
    $("#customerTable").append(row);

    /*------------------------------------------------------------*/

}

function generateItemIds(){
    if (itemArray.length !== 0){
        var itemId = itemArray[itemArray.length-1].getItemId();
        let splitTxt = itemId.split("C",2);
        let newItemId = parseInt(splitTxt[1]) + 1;

        if (parseInt(newItemId) <= 9){
            $("#itemIdLabel1").text("I00" + newItemId);

        }else if (parseInt(newItemId) <= 99){
            $("#itemIdLabel1").text("I0" + newItemId);

        }else if (parseInt(newItemId) <= 99){
            $("#itemIdLabel1").text("I" + newItemId);
        }
    }else {
        $("#itemIdLabel1").text("I001")
    }
}

/*------------------Save Item-----------------*/
$("#btnItemRegister").click(function (){
    saveItem();
    generateItemIds();
    clearTextFields();
    setItemDetailsToTxtFields();
});

/*--------------------------------------------*/


$("#itemTable>tr").dblclick(function (){
        confirm("Do you really want to remove this item...?");

        for (let i = 0; i < itemArray.length; i++) {
            if ( $(this).children(":eq(0)").text() == itemArray[i].getItemId()) {
                itemArray.splice(i, 1);

                $(this).remove();
                clearTextFields();
            }
        }
    });


/*-----------------Delete Item----------------*/
$("#btnItemDelete").click(function (){
    deleteItem();
});

/*--------------------------------------------*/


$("#btnItemUpdate").click(function (){
updateCustomer();

});

