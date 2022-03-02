generateItemIds();

function saveItem(){
    $("#customerTable>tr").off("click");

    let itemCode = $("#itemCode").val();
    let itemDescription = $("#inputDescription").val();
    let packSize = $("#packSize").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#inputQTy").val();
    let discount = $("#inputDiscount").val();


    $("#itemTable").empty();

    var item = new Item(itemCode,itemDescription,packSize,unitPrice,qty,discount);
    itemArray.push(item);
    clearItemTextFields();

    generateItemIds();
    loadItemDetailsToTbl();
    alert("Item has been added successfully");


}

function loadItemDetailsToTbl(){
    $("#itemTable>tr").off("click");
    $("#itemTable>tr").off("dblclick");

    for (let i of itemArray) {
        let row = `<tr><td>${i.getItemId()}</td><td>${i.getItemDescription()}</td><td>${i.getPackSize()}</td><td>${i.getUnitPrize()}</td><td>${i.getQtyOnHand()}</td><td>${i.getDiscount()}</td></tr>`;
        $("#itemTable").append(row);

    }


/*-----Delete Item Details When Double Clicking----*/

    $("#itemTable>tr").dblclick(function (){
        confirm("Do you really want to remove this item...?");

        for (let i = 0; i < itemArray.length; i++) {
            if ( $(this).children(":eq(0)").text() == itemArray[i].getItemId()) {
                itemArray.splice(i, 1);

                $(this).remove();
                clearItemTextFields();
            }
        }
    });



/*-----Set item details to tbl--------*/

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

function generateItemIds(){
    if (itemArray.length !== 0){
        var itemId = itemArray[itemArray.length-1].getItemId();
        let splitTxt = itemId.split("I",2);
        let newItemId = parseInt(splitTxt[1]) + 1;

        if (parseInt(newItemId) <= 9){
            $("#itemCode").val("I00" + newItemId);

        }else if (parseInt(newItemId) <= 99){
            $("#itemCode").val("I0" + newItemId);

        }else if (parseInt(newItemId) <= 99){
            $("#itemCode").val("I" + newItemId);
        }
    }else {
        $("#itemCode").val("I001").css('font-weight', 'bold');
    }
}

function clearItemTextFields(){
    $("#itemCode").val("");
    $("#inputDescription").val("");
    $("#packSize").val("");
    $("#unitPrice").val("");
    $("#inputQTy").val("");
    $("#inputDiscount").val("");
}

function deleteItem(){
    confirm("Do you really want to remove this customer...?");

    $("#itemTable").empty();
    for (let i = 0; i < itemArray.length; i++) {
        if ($("#itemCode").val() == itemArray[i].getItemId()) {
            itemArray.splice(i, 1);

            clearItemTextFields();
        }
    }
    loadItemDetailsToTbl();
    generateItemIds();
}

function updateItem(){

    $("#itemTable>tr").off("click");

    let itemCode = $("#itemCode").val();
    let itemDescription = $("#inputDescription").val();
    let packSize = $("#packSize").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#inputQTy").val();
    let discount = $("#inputDiscount").val();


    $("#itemTable>tr").empty();
    for (let i = 0; i < itemArray.length; i++) {
        if ( $("#itemCode").val() === itemArray[i].getItemId()) {
            itemArray.splice(i, 1);

            clearItemTextFields();
        }
    }


    var item = new Item(itemCode,itemDescription,packSize,unitPrice,qty,discount);
    itemArray.push(item);

    loadItemDetailsToTbl();
    alert("Item has been successfully updated");

}




$("#btnItemRegister").click(function (){
    saveItem();
    generateItemIds();
});

$("#btnItemDelete").click(function (){
    deleteItem();
});

$("#btnItemUpdate").click(function (){
    updateItem();
    generateItemIds();
});


/*------Validations--------*/

var regExItemCode = /^(I-)[0-9]{3,5}$/;
var regExDescription = /^([A-z0-9/,\s]{3,})$/;
var regExPackSize = /^([0-9]{1,10})$/;
var regExUnitPrice = /^([0-9.]{1,})$/;
var regExQty = /^([0-9]{1,10})$/;
var regExDiscount = /^([0-9.]{1,})$/;

$("#itemCode").keyup(function (e) {
    let input = $("#itemCode").val();

    if (regExItemCode.test(input)) {
        $("#error0").text("");
        $("#itemCode").css('border', '2px solid green');

        $("#itemCode").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#inputDescription").focus();
            }
        });
    } else {
        $("#itemCode").css('border', '2px solid red');
        $("#error0").text("Wrong format : " + input);
    }
});

$("#inputDescription").keyup(function (e) {
    let input = $("#inputDescription").val();

    if (regExDescription.test(input)) {
        $("#error01").text("");
        $("#inputDescription").css('border', '2px solid green');

        $("#inputDescription").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#packSize").focus();
            }
        });
    } else {
        $("#inputDescription").css('border', '2px solid red');
        $("#error01").text("Wrong format : " + input);
    }
});

$("#packSize").keyup(function (e) {
    let input = $("#packSize").val();

    if (regExPackSize.test(input)) {
        $("#error02").text("");
        $("#packSize").css('border', '2px solid green');

        $("#packSize").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#unitPrice").focus();
            }
        });
    } else {
        $("#packSize").css('border', '2px solid red');
        $("#error02").text("Wrong format : " + input);
    }
});

$("#unitPrice").keyup(function (e) {
    let input = $("#unitPrice").val();

    if (regExUnitPrice.test(input)) {
        $("#error03").text("");
        $("#unitPrice").css('border', '2px solid green');

        $("#unitPrice").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#inputQTy").focus();
            }
        });
    } else {
        $("#unitPrice").css('border', '2px solid red');
        $("#error03").text("Wrong format : " + input);
    }
});

$("#inputQTy").keyup(function (e) {
    let input = $("#inputQTy").val();

    if (regExQty.test(input)) {
        $("#error04").text("");
        $("#inputQTy").css('border', '2px solid green');

        $("#inputQTy").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#inputDiscount").focus();
            }
        });
    } else {
        $("#inputQTy").css('border', '2px solid red');
        $("#error04").text("Wrong format : " + input);
    }
});

$("#inputDiscount").keyup(function (e) {
    let input = $("#inputDiscount").val();

    if (regExDiscount.test(input)) {
        $("#error05").text("");
        $("#inputDiscount").css('border', '2px solid green');
    } else {
        $("#inputDiscount").css('border', '2px solid red');
        $("#error05").text("Wrong format : " + input);
    }
});
