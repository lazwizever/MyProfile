function OrderDetails(orderId,cusId,itemId,orderDate,itemArray){
    var __orderId = orderId;
    var __cusId = cusId;
    var __itemId = itemId;
    var __orderDate = orderDate;
    var itemDetailsArray = new Array();


    this.getOrderId = function (){
        return __orderId;
    }

    this.setOrderId = function (oId){
        __orderId = oId;
    }

    this.getCusId = function (){
        return __cusId;
    }

    this.setCusId = function (cId){
        __cusId = cId;
    }

    this.getOrdItemId = function (){
        return __itemId;
    }

    this.setOrdItemId = function (iId){
        __itemId = iId;
    }

    this.getOrdDate = function (){
        return __orderDate;
    }

    this.setOrdDate = function (oDate){
        __orderDate = oDate;
    }

    this.getItemArray = function (){
        return itemDetailsArray;
    }

    this.setItemArray = function (itemArray){
        itemDetailsArray = itemArray;
    }


}