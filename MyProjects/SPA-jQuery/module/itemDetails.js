function ItemDetails(itemCode,description,customerQTY,unitPrice,discount){
    var __itemCode = itemCode;
    var __description = description;
    var __customerQTY = customerQTY;
    var __unitPrice = unitPrice;
    var __discount = discount;


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

    this.getOrderItemDiscount = function (){
        return __discount;
    }

    this.setOrderItemDiscount = function (discount){
        __discount = discount;
    }



}