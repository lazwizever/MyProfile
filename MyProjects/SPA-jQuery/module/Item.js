function Item(itemId,description,packSize,unitPrice,qtyOnHand,discount){
    var __itemId = itemId;
    var __description = description;
    var __packSize = packSize;
    var __unitPrice = unitPrice;
    var __qtyOnHand = qtyOnHand;
    var __discount = discount;


    this.getItemId = function (){
        return __itemId;
    }

    this.setItemId = function (id){
         __itemId = id;
    }

    this.getItemDescription = function (){
        return __description;
    }

    this.setItemDescription = function (itemDescription){
        __description = itemDescription;
    }

    this.getPackSize = function (){
        return __packSize;
    }

    this.setPackSize = function (itemPackSize){
        __packSize = itemPackSize;
    }

    this.getUnitPrize = function (){
        return __unitPrice;
    }

    this.setUnitPrize = function (itemUnitPrize){
        __unitPrice = itemUnitPrize;
    }

    this.getQtyOnHand = function (){
        return __qtyOnHand;
    }

    this.setQtyOnHand = function (itemQtyOnHand){
        __qtyOnHand = itemQtyOnHand;
    }

    this.getDiscount = function (){
        return __discount;
    }

    this.setDiscount = function (itemDiscount){
        __discount = itemDiscount;
    }
}










