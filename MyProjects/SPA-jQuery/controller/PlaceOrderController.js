setItemDetailsFromItemCode();


function loadAllItemIds(){
    for (let i = 0; i < itemArray.length; i++) {
        $("#cmbItemIds").append(new Option(itemArray[i].getItemId()));
    }
}

function setItemDetailsFromItemCode(){
    $("#cmbItemIds").on("change",function(){

        let itemId = $(this).find('option:selected').text();

        for (let i = 0; i < itemArray.length; i++) {
            if (itemId === itemArray[i].getItemId()){

                $("#qTY").val(itemArray[i].getQtyOnHand());
                $("#discount").val(itemArray[i].getDiscount());
                $("#unitPrices").val(itemArray[i].getUnitPrize());
                $("#description").val(itemArray[i].getItemDescription());

            }
        }
    });
}

function generateOrderId(){
    if (ordersArray.length !== 0){
        var orderId = ordersArray[ordersArray.length-1].getOrderId();
        let splitTxt = orderId.split("O",2);
        let newOrderId = parseInt(splitTxt[1]) + 1;

        if (parseInt(newOrderId) <= 9){
            $("#orderId").val("O00" + newOrderId);

        }else if (parseInt(newOrderId) <= 99){
            $("#orderId").val("O0" + newOrderId);

        }else if (parseInt(newOrderId) <= 99){
            $("#orderId").val("O" + newOrderId);
        }
    }else {
        $("#orderId").val("O001").css('font-weight', 'bold');
    }
}

function clearPlaceOrderFields(){
    $("#cmbItemIds").val("");
    $("#description").val("");
    $("#custQTY").val("");
    $("#unitPrices").val("");
    $("#discount").val("");
}

function loadOrderDetailsToTbl(){
    $("#placeOrderTable>tr").off("click");
    $("#placeOrderTable>tr").off("dblclick");


    for (let i of itemDetailsArray) {
        let row = `<tr><td>${i.getItemId()}</td><td>${i.getItemDescription()}</td><td>${i.getCustomerQTY()}</td><td>${i.getUnitPrice()}</td><td>${i.getDiscount()}</td></tr>`;
        $("#placeOrderTable").append(row);

    }


}

function saveOrder(){

    $("#placeOrderTable>tr").off("click");

    let itemId = $("#cmbItemIds").val();
    let description = $("#description").val();
    let cusQTY = $("#custQTY").val();
    let unitPrices = $("#unitPrices").val();
    let itemDiscount = $("#discount").val();


    $("#placeOrderTable").empty();

    var order = new Order(itemId,description,cusQTY,unitPrices,itemDiscount);
    ordersArray.push(order);
    clearPlaceOrderFields();

    generateOrderId();

    alert("Order has been successful");
}





$("#btnPlaceOrder").click(function (){
    generateOrderId();
    saveOrder();
});

