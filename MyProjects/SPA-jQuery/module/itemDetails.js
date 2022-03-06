function ItemDetails(itemCode,description,customerQTY,unitPrice,total){
    var __itemCode = itemCode;
    var __description = description;
    var __customerQTY = customerQTY;
    var __unitPrice = unitPrice;
    var __total = total;


    this.getOrderItemCode = function (){
        return __itemCode;
    }

    this.setItemCode = function (id){
        __itemCode = id;
    }

    this.getOrderItemDescription = function (){
        return __description;
    }

    this.setOrderItemDescription = function (description){
        __description = description;
    }

    this.getOrderCustomerQTY = function (){
        return __customerQTY;
    }

    this.setOrderCustomerQTY = function (qty){
        __customerQTY = qty;
    }

    this.getOrderUnitPrice = function (){
        return __unitPrice;
    }

    this.setOrderUnitPrice = function (unitPrice){
        __unitPrice = unitPrice;
    }

    this.getItemTotal = function (){
        return __total;
    }

    this.setItemTotal = function (total){
        __total = total;
    }



}