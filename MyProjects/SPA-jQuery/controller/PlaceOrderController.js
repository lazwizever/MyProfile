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

    $("#orderId").val("");
    $("#customerName").val("");
    $("#itemCodes").val("");
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

    let orderId = $("#orderId").val();
    let customerId = $("#customerId").val();
    let itemCode = $("#itemCodes").val();
    let orderDate = $("#oDate").val();


    $("#placeOrderTable").empty();

    /*var order = new Order(orderId,itemCode,customerId,orderDate);
    ordersArray.push(order);
*/

    /*---------Item details for an Order---------------*/
    var itemDetailsForOrder = new ItemDetails(itemId,description,cusQTY,unitPrices,itemDiscount);
    itemDetailsArray.push(itemDetailsForOrder);


    var obOrderDetails =  new OrderDetails(orderId,customerId,orderDate,itemDetailsArray);
    orderDetailsArray.push(obOrderDetails);



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



$("#btnPlaceOrder").click(function (){
    generateOrderId();
    placeOrder();
});

$("#btnSearchOrder").click(function (){

    let obOrder = searchPlaceOrder($("#txtSearchOrder").val());

    if (obOrder){

        for (let i = 0; i < orderDetailsArray.length; i++) {
            for (let j = 0; j < customerArray.length; j++) {


                    $("#orderId").val(obOrder.getOrderId());
                    $("#customerId").val(obOrder.getCusId());
                    $("#customerName").val(customerArray[i].getCustomerName());
                    $("#itemCodes").val(obOrder.getItemArray(i));
                    $("#oDate").val(obOrder.getOrdDate());

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