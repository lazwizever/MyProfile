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

function setItemDetailsToTbl(){

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

/*------------------Save Item-----------------*/
$("#btnItemRegister").click(function (){
    saveItem();
    clearTextFields();
    setItemDetailsToTbl();
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


function deleteCustomer(){
    confirm("Do you really want to remove this customer...?");

    for (let i = 0; i < customerArray.length; i++) {
        if ($("#inputnewId").val() == customerArray[i].getCustomerId()) {
            customerArray.splice(i, 1);

            clearTextFields();
        }
    }
}