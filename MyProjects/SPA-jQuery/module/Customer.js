function Customer(id,name,address,city,province,postalCode){
    var __id = id;
    var __name = name;
    var __address = address;
    var __city = city;
    var __province = province;
    var __postalCode = postalCode;


    this.getCustomerId = function (){
        return __id;
    }

    this.setCustomerId = function (cusId){
        __id = cusId;
    }


    this.getCustomerName = function (){
        return __name;
    }

    this.setCustomerName = function (cusName){
        __name = cusName;
    }


    this.getCustomerAddress = function (){
        return __address;
    }

    this.setCustomerAddress = function (cusAddress){
        __address = cusAddress;
    }


    this.getCustomerCity = function (){
        return __city;
    }

    this.setCustomerCity = function (cusCity){
        __city = cusCity;
    }


    this.getCustomerProvince = function (){
        return __province;
    }

    this.setCustomerProvince = function (province){
        __province = province;
    }


    this.getCustomerPostalCode = function (){
        return __postalCode;
    }

    this.setCustomerPostalCode = function (postalCode){
        __postalCode = postalCode;
    }
}










