function OrderDetails(orderId){
    var __orderId = orderId;
    var itemDetailsArray = new Array();


    this.getOrderId = function (){
        return __orderId;
    }

    this.setOrderId = function (oId){
        __orderId = oId;
    }

}