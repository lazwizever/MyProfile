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
    $("#cmbItemIds").empty()
    $("#description").val("");
    $("#custQTY").val("");
    $("#unitPrices").val("");
    $("#discount").val("");

    $("#orderId").val("");
    $("#customerName").val("");
    $("#itemCodes").empty();
    $("#customerId").empty();
    $("#oDate").val("");

}

function loadOrderDetailsToTbl(){
    $("#placeOrderTable>tr").off("click");
    $("#placeOrderTable>tr").off("dblclick");


    for (let i of itemDetailsArray) {
        let row = `<tr><td>${i.getOrderItemCode()}</td><td>${i.getOrderItemDescription()}</td><td>${i.getOrderCustomerQTY()}</td><td>${i.getOrderUnitPrice()}</td><td>${i.getOrderItemDiscount()}</td></tr>`;
        $("#placeOrderTable").append(row);
    }
}

function placeOrder(){

    $("#placeOrderTable>tr").off("click");

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

    /*var order = new Order(orderId,itemCode,customerId,orderDate);
    ordersArray.push(order);
*/

    /*---------Item details for an Order---------------*/
    var itemDetailsForOrder = new ItemDetails(itemId,description,cusQTY,unitPrices,itemDiscount);
    itemDetailsArray.push(itemDetailsForOrder);



    orderCalculation();
    clearPlaceOrderFields();
    generateOrderId();
    loadOrderDetailsToTbl();
    alert("Order has been place successful");
}

function setCurrentDate(){
    var d = new Date();
    var strDate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();

    $("#oDate").val(strDate);
}

function setCustomerDetailsFromCusId(){
    $("#customerId").on("change",function(){

        let cusId = $(this).find('option:selected').text();

        for (let i = 0; i < customerArray.length; i++) {
            if (cusId === customerArray[i].getCustomerId()){

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





$("#btnPlaceOrder").click(function (){
    generateOrderId();
    placeOrder();
});

$("#btnSearchOrder").click(function (){

    let obOrder = searchPlaceOrder($("#txtSearchOrder").val());

    if (obOrder){

        for (let i = 0; i < orderDetailsArray.length; i++) {
            for (let j = 0; j < customerArray.length; j++) {

                var itemArrayss = obOrder.getItemArray();

                for (let k = 0; k < itemArrayss.length; k++) {

                    $("#orderId").val(obOrder.getOrderId());
                    $("#customerId").append(new Option(customerArray[j].getCustomerId()));
                    $("#customerName").val(customerArray[j].getCustomerName());
                    $("#itemCodes").append(new Option(itemArrayss[k].getOrderItemCode()));
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
