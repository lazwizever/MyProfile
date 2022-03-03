function Order(orderId,itemId,customerId,orderDate){
    var __orderId = orderId;
    var __itemId = itemId;
    var __customerId = customerId;
    var __orderDate = orderDate;


    this.getOrderId = function (){
        return __orderId;
    }

    this.setOrderId = function (oId){
        __orderId = oId;
    }

    this.getItemId = function (){
        return __itemId
    }

    this.setItemId = function (iId){
        __itemId = iId;
    }

    this.getCustomerId = function (){
        return __customerId;
    }

    this.setCustomerId = function (cId){
        __customerId = cId;
    }

    this.getOrderDate = function (){
        return __orderDate;
    }

    this.setOrderDate = function (orderDate){
        __orderDate = orderDate;
    }

}