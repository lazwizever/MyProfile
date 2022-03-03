function ItemDetails(itemCode,description,customerQTY,unitPrice,discount){
    var __itemCode = itemCode;
    var __description = description;
    var __customerQTY = customerQTY;
    var __unitPrice = unitPrice;
    var __discount = discount;


    this.getItemCode = function (){
        return __itemCode;
    }

    this.setItemCode = function (id){
        __itemCode = id;
    }

    this.getItemDescription = function (){
        return __description;
    }

    this.setItemDescription = function (description){
        __description = description;
    }

    this.getCustomerQTY = function (){
        return __customerQTY;
    }

    this.setCustomerQTY = function (qty){
        __customerQTY = qty;
    }

    this.getUnitPrice = function (){
        return __unitPrice;
    }

    this.setUnitPrice = function (unitPrice){
        __unitPrice = unitPrice;
    }

    this.getDiscount = function (){
        return __discount;
    }

    this.setDiscount = function (discount){
        __discount = discount;
    }



}