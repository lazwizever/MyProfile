generateOrderId();

setItemDetailsFromItemCode();

setCustomerDetailsFromCusId();

setCustomerNameCusId();

function loadAllItemIds(){
    $("#cmbItemIds").empty();
    $("#itemCodes").empty();


    for (let i = 0; i < itemArray.length; i++) {
        $("#cmbItemIds").append(new Option(itemArray[i].getItemId()));
        $("#itemCodes").append(new Option(itemArray[i].getItemId()));
    }
}

function loadAllCustomerIds(){
    $("#customerId").empty();

    for (let i = 0; i < customerArray.length; i++) {
        $("#customerId").append(new Option(customerArray[i].getCustomerId()));
    }
}

function setItemDetailsFromItemCode(){
    $("#cmbItemIds").on("change",function(){

        let itemId = $(this).find('option:selected').text();

        for (let i = 0; i < itemArray.length; i++) {
            if (itemId === itemArray[i].getItemId()){

                $("#itemId").val(itemId);
                $("#qTY").val(itemArray[i].getQtyOnHand());
                $("#discount").val(itemArray[i].getDiscount());
                $("#unitPrices").val(itemArray[i].getUnitPrize());
                $("#description").val(itemArray[i].getItemDescription());

            }
        }
    });
}

function generateOrderId(){
    if (orderDetailsArray.length !== 0){
        var orderId = orderDetailsArray[orderDetailsArray.length-1].getOrderId();
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
    clearItemsFieldsPlaceOrder();

    $("#customerName").val("");
    $("#customerId1").val("");
    $("#customerId").empty();
    $("#oDate").val("");

}

/*function loadOrderDetailsToTbl(){
    $("#placeOrderTable>tr").off("click");
    $("#placeOrderTable>tr").off("dblclick");


    for (let i of itemDetailsArray) {
        let row = `<tr><td>${i.getOrderItemCode()}</td><td>${i.getOrderItemDescription()}</td><td>${i.getOrderCustomerQTY()}</td><td>${i.getOrderUnitPrice()}</td><td>${i.getOrderItemDiscount()}</td></tr>`;
        $("#placeOrderTable").append(row);
    }
}*/

function placeOrder(){

    /*$("#placeOrderTable>tr").off("click");

    let itemId = $("#cmbItemIds").val();
    let description = $("#description").val();
    let cusQTY = $("#custQTY").val();
    let unitPrices = $("#unitPrices").val();
    let itemDiscount = $("#discount").val();

    $("#itemCodes").on("change",function(){
        let itemIds = $(this).find('option:selected').text();
        let orderId = $("#orderId").val();
        let customerId = $("#customerId").val();
        let itemCode = $("#itemCodes").val();
        let orderDate = $("#oDate").val();


        var obOrderDetails =  new OrderDetails(orderId,customerId,itemIds,orderDate,itemDetailsArray);
        orderDetailsArray.push(obOrderDetails);

    });

    $("#placeOrderTable").empty();

    /!*var order = new Order(orderId,itemCode,customerId,orderDate);
    ordersArray.push(order);
*!/

    /!*---------Item details for an Order---------------*!/
    var itemDetailsForOrder = new ItemDetails(itemId,description,cusQTY,unitPrices,itemDiscount);
    itemDetailsArray.push(itemDetailsForOrder);



    orderCalculation();
    clearPlaceOrderFields();
    generateOrderId();
    loadOrderDetailsToTbl();
    alert("Order has been place successful");*/

    let orderId = $("#orderId").val();
    let cusId = $("#customerId").find('option:selected').text();
    let orderDate = $("#oDate").val();


    var tempArray = itemDetailsArray;

    var orderDetails = new OrderDetails(orderId,cusId,orderDate,tempArray);
    orderDetailsArray.push(orderDetails);

    itemDetailsArray = [];
    generateOrderId();
    clearPlaceOrderFields();
    alert("Order has been place successful");

}

function setCustomerDetailsFromCusId(){
    $("#customerId").on("change",function(){

        let cusId = $(this).find('option:selected').text();
        console.log(cusId);

        for (let i = 0; i < customerArray.length; i++) {
            if (cusId === customerArray[i].getCustomerId()){

                $("#customerId1").val(cusId);
                $("#customerName").val(customerArray[i].getCustomerName());
            }
        }
    });

}

function searchPlaceOrder(oId){
    for (let i = 0; i < orderDetailsArray.length; i++) {
        if (oId === orderDetailsArray[i].getOrderId()){
            return orderDetailsArray[i];
        }
    }
}

function setCustomerNameCusId(){
    $("#customerId").on("change",function(){

        let cusId = $(this).find('option:selected').text();

        for (let i = 0; i < customerArray.length; i++) {
            if (cusId === customerArray[i].getCustomerId()){

                $("#customerName").val(customerArray[i].getCustomerName());
            }
        }
    });

}

function updatePlaceOrder(){

    $("#placeOrderTable>tr").off("click");

    let itemId = $("#cmbItemIds").val();
    let description = $("#description").val();
    let cusQTY = $("#custQTY").val();
    let unitPrices = $("#unitPrices").val();
    let itemDiscount = $("#discount").val();


    $("#placeOrderTable>tr").empty();
    for (let i = 0; i < itemDetailsArray.length; i++) {
        if ( $("#cmbItemIds").val() === itemDetailsArray[i].getOrderItemCode()) {
            itemDetailsArray.splice(i, 1);

            clearPlaceOrderFields();
        }
    }


    var itemDetails = new ItemDetails(itemId,description,cusQTY,unitPrices,itemDiscount);
    itemArray.push(itemDetails);

    loadOrderDetailsToTbl();
    alert("Order has been successfully updated");

}

function orderCalculation(){
    let cusQTY = $("#custQTY").val();
    let unitPrice = $("#unitPrices").val();

    var grossTotal = (cusQTY)*(unitPrice);
   $("#grossAmount").val(grossTotal);


   var totalDiscount = $("#discount").val();
   $("#orderDiscount").val(totalDiscount).css('font-weight', 'bold','color', '#4cd137');
   $("#orderDiscount").css('color', '#4cd137');

   var netAmount = (grossTotal) - (totalDiscount);
    $("#netAmount").val(netAmount);

   var balance = ($("#cash").val()) - (netAmount);
   $("#balanceLabel").text(balance);
}

function clearItemsFieldsPlaceOrder(){
    $("#description").val("");
    $("#custQTY").val("");
    $("#qTY").val("");
    $("#unitPrices").val("");
    $("#discount").val("");
}

function setGrossAmount(){

    var grossTotal = 0;
    let itemId = $("#itemId").val();

    for (let i = 0; i < itemDetailsArray.length; i++) {
        if(itemId === itemDetailsArray[i].getOrderItemCode()){

            grossTotal = parseInt(grossTotal) + parseInt(itemDetailsArray[i].getItemTotal());
            $("#grossAmount").val(grossTotal);
        }else{
            grossTotal = parseInt(grossTotal) + parseInt(itemDetailsArray[i].getItemTotal());
            $("#grossAmount").val(grossTotal);
        }

    }


}

function addToCart(){

    let itemId = $("#itemId").val();
    let description = $("#description").val();
    let cusQTY = $("#custQTY").val();
    let unitPrices = $("#unitPrices").val();
    let total = (cusQTY) * (unitPrices);


    for (let i = 0; i < itemDetailsArray.length; i++) {
        if (itemId === itemDetailsArray[i].getOrderItemCode()){

            var newCusQTY = parseInt(itemDetailsArray[i].getOrderCustomerQTY())  + parseInt(cusQTY);
            var newTotal = (newCusQTY) * (unitPrices);

            itemDetailsArray[i].setOrderCustomerQTY(newCusQTY);
            itemDetailsArray[i].setItemTotal(newTotal);
            clearItemsFieldsPlaceOrder();
            loadTable();
            return;
        }

    }


    var itemDetails = new ItemDetails(itemId,description,cusQTY,unitPrices,total);
    itemDetailsArray.push(itemDetails);
    clearItemsFieldsPlaceOrder();
    loadTable();
    setGrossAmount();
}

function loadTable(){

    $("#placeOrderTable").empty();

    for (let i of itemDetailsArray) {
        let row = `<tr><td>${i.getOrderItemCode()}</td><td>${i.getOrderItemDescription()}</td><td>${i.getOrderCustomerQTY()}</td><td>${i.getOrderUnitPrice()}</td><td>${i.getItemTotal()}</td></tr>`;
        $("#placeOrderTable").append(row);
    }


    /*-----------------Set cart details when clicking-----------------------*/

    $("#placeOrderTable>tr").off('click')

    $("#placeOrderTable>tr").click(function (){

        let itemCode = $(this).children(':nth-child(1)').text();
        $("#itemId").val(itemCode);

        let description = $(this).children(':nth-child(2)').text();
        $("#description").val(description);


        let cusQTY = $(this).children(':nth-child(3)').text();
        $("#custQTY").val(cusQTY);


        let unitPrice = $(this).children(':nth-child(4)').text();
        $("#unitPrices").val(unitPrice);


        for (let i = 0; i < itemArray.length; i++) {
            if ($("#itemId").val() === itemArray[i].getItemId()){
                $("#qTY").val(itemArray[i].getQtyOnHand());
            }
            continue;
        }


    });
}




$("#btnPlaceOrder").click(function (){
    generateOrderId();
    placeOrder();
    clearPlaceOrderFields();
});

$("#btnSearchOrder").click(function (){

    let obOrder = searchPlaceOrder($("#txtSearchOrder").val());

    if (obOrder){

        let cusId = $("#customerId1").val();

        for (let i = 0; i < orderDetailsArray.length; i++) {
            for (let j = 0; j < customerArray.length; j++) {

                if (cusId === customerArray[j].getCustomerId()){

                    $("#orderId").val(obOrder.getOrderId());
                    $("#customerId").append(new Option(customerArray[j].getCustomerId()));
                    $("#customerName").val(customerArray[j].getCustomerName());
                    $("#oDate").val(obOrder.getOrdDate());
                }
            }

            /*$("#cmbItemIds").val(obOrder.getOrderDate());
            $("#oDate").val(obOrder.getOrderDate());
            $("#oDate").val(obOrder.getOrderDate());
            $("#oDate").val(obOrder.getOrderDate());
            $("#oDate").val(obOrder.getOrderDate());*/
        }
    }

    /*for (let i = 0; i < customerArray.length; i++) {
        if (obOrder.getCustomerId() === customerArray[i].getCustomerId()){
            $("#customerId").val(customerArray[i].getCustomerId());
        }
    }*/

});

$("#btnUpdateOrder").click(function (){
    generateOrderId();
    updatePlaceOrder();
});


$("#addToCart").click(function (){

    addToCart();


    /*$("#placeOrderTable>tr").off("click");

    let itemId = $("#cmbItemIds").val();
    let description = $("#description").val();
    let cusQTY = $("#custQTY").val();
    let unitPrices = $("#unitPrices").val();
    let itemDiscount = $("#discount").val();

    $("#itemCodes").on("change",function(){
        let itemIds = $(this).find('option:selected').text();
        let orderId = $("#orderId").val();
        let customerId = $("#customerId").val();
        let itemCode = $("#itemCodes").val();
        let orderDate = $("#oDate").val();


        var obOrderDetails =  new OrderDetails(orderId,customerId,itemIds,orderDate,itemDetailsArray);
        orderDetailsArray.push(obOrderDetails);

    });

    $("#placeOrderTable").empty();

    /!*var order = new Order(orderId,itemCode,customerId,orderDate);
    ordersArray.push(order);
*!/

    /!*---------Item details for an Order---------------*!/
    var itemDetailsForOrder = new ItemDetails(itemId,description,cusQTY,unitPrices,itemDiscount);
    itemDetailsArray.push(itemDetailsForOrder);



    orderCalculation();
    clearPlaceOrderFields();
    generateOrderId();
    loadOrderDetailsToTbl();
    alert("Order has been place successful");*/
});



/*-------------Set netAmount----------------*/

$("#orderDiscount").keyup(function (){

    let discount = parseInt($("#orderDiscount").val());
    let grossAmount = parseInt($("#grossAmount").val());

    $("#netAmount").val(grossAmount - discount);
});


/*--------------Set balance----------------*/

$("#cash").keyup(function (){

    let cash = parseInt($("#cash").val());
    let netAmount = $("#netAmount").val();

    $("#balanceLabel").text(cash - netAmount);

});
