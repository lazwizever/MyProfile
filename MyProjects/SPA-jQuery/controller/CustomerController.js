generateCustomerId();

function saveCustomer() {

    let customerId = $("#inputnewId").val();
    let customerName = $("#custName").val();
    let customerAddress = $("#custAddress").val();
    let city = $("#inputCity").val();
    let province = $("#province").val();
    let postalCode = $("#postalCode").val();

    $("#customerTable").empty();

    var customer = new Customer(customerId, customerName, customerAddress, city, province, postalCode);
    customerArray.push(customer);
    clearCustomerTextFields();

    generateCustomerId();
    loadCustomerDetailsToTbl();
    alert("Customer has been added successfully");

}

function loadCustomerDetailsToTbl() {
    $("#customerTable>tr").off("click");
    $("#customerTable>tr").off("dblclick");


    for (let i of customerArray) {
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerCity()}</td><td>${i.getCustomerPostalCode()}</td></tr>`;
        $("#customerTable").append(row);

    }


    /*-----Delete Details When Double Clicking----*/

    $("#customerTable>tr").dblclick(function () {
        confirm("Do you really want to remove this customer...?");

        for (let i = 0; i < customerArray.length; i++) {
            if ($(this).children(":eq(0)").text() == customerArray[i].getCustomerId()) {
                customerArray.splice(i, 1);

                $(this).remove();
                clearCustomerTextFields();
            }
        }
    });


    /*-----Set customer details to tbl--------*/

    $("#customerTable>tr").click(function () {

        let cusId = $(this).children(':nth-child(1)').text();
        $("#inputnewId").val(cusId);

        let cusName = $(this).children(':nth-child(2)').text();
        $("#custName").val(cusName);

        let cusAddress = $(this).children(':nth-child(3)').text();
        $("#custAddress").val(cusAddress);

        let city = $(this).children(':nth-child(4)').text();
        $("#inputCity").val(city);

        let postalCode = $(this).children(':nth-child(5)').text();
        $("#postalCode").val(postalCode);

    });

}

function clearCustomerTextFields() {
    generateCustomerId();
    $("#custName").val("");
    $("#custAddress").val("");
    $("#inputCity").val("");
    $("#postalCode").val("");
    $("#cusForm input").css('border','silver 1px solid');

}

function generateCustomerId() {

    if (customerArray.length !== 0) {
        var cusId = customerArray[customerArray.length - 1].getCustomerId();
        let splitTxt = cusId.split("C", 2);
        let newCusId = parseInt(splitTxt[1]) + 1;

        if (parseInt(newCusId) <= 9) {
            $("#inputnewId").val("C00" + newCusId);

        } else if (parseInt(newCusId) <= 99) {
            $("#inputnewId").val("C0" + newCusId);

        } else if (parseInt(newCusId) <= 99) {
            $("#inputnewId").val("C" + newCusId);
        }
    } else {
        $("#inputnewId").val("C001").css('font-weight', 'bold');;
    }
}

function updateCustomer() {

    $("#customerTable>tr").off("click");

    let customerId = $("#inputnewId").val();
    let customerName = $("#custName").val();
    let customerAddress = $("#custAddress").val();
    let city = $("#inputCity").val();
    let province = $("#province").val();
    let postalCode = $("#postalCode").val();


    $("#customerTable").empty();
    for (let i = 0; i < customerArray.length; i++) {
        if ($("#inputnewId").val() === customerArray[i].getCustomerId()) {
            customerArray.splice(i, 1);

            clearCustomerTextFields();
        }
    }

    var customer = new Customer(customerId, customerName, customerAddress, city, province, postalCode);
    customerArray.push(customer);

    loadCustomerDetailsToTbl();
    alert("Customer has been successfully updated");
}

function deleteCustomer(){
    confirm("Do you really want to remove this customer...?");

    $("#customerTable").empty();
    for (let i = 0; i < customerArray.length; i++) {
        if ($("#inputnewId").val() == customerArray[i].getCustomerId()) {
            customerArray.splice(i, 1);
            clearCustomerTextFields();
        }
    }
    loadCustomerDetailsToTbl();
    generateCustomerId();
}

function searchCustomer(cusId){

    for (let i = 0; i < customerArray.length; i++) {
        if (cusId === customerArray[i].getCustomerId()){
            return customerArray[i];
        }
    }
}



/*-----------Validations--------------*/

var regExCusName = /^([A-z\s]{3,20})$/;
var regExCusAddress = /^([A-z0-9/,\s]{3,})$/;
var regExCity = /^([A-z]{3,20})$/;
var regExPostalCode = /^([0-9]{3,5})$/;


function validateCustomerName(){
    let input = $("#custName").val();

    if (regExCusName.test(input)) {
        $("#error1").text("");
        $("#custName").css('border', '2px solid green');

        $("#custName").keydown(function (e){
            if (e.key == 'Enter'){
                $("#custAddress").focus();
            }
        });
        return true;
    } else {
        $("#custName").css('border', '2px solid red');
        $("#error1").text("Wrong format : "+input);
        return false;
    }
}

$("#custName").keyup(function () {
disableCusRegisterBtn();
});


function validateCusAddress(){
    let input = $("#custAddress").val();

    if (regExCusAddress.test(input)) {
        $("#error2").text("");
        $("#custAddress").css('border', '2px solid green');

        $("#custAddress").keydown(function (e){
            if (e.key == 'Enter'){
                $("#inputCity").focus();
            }
        });
        return true;
    } else {
        $("#custAddress").css('border', '2px solid red');
        $("#error2").text("Wrong format : "+input);
        return false;
    }
}

$("#custAddress").keyup(function () {
    disableCusRegisterBtn();
});


function validateCustomerCity(){

    let input = $("#inputCity").val();

    if (regExCity.test(input)) {
        $("#error3").text("");
        $("#inputCity").css('border', '2px solid green');

        $("#inputCity").keydown(function (e){
            if (e.key == 'Enter'){
                $("#postalCode").focus();
            }
        });
        return true;
    } else {
        $("#inputCity").css('border', '2px solid red');
        $("#error3").text("Wrong format : "+input);
        return false;
    }
}

$("#inputCity").keyup(function () {
    disableCusRegisterBtn();
});


function validateCustomerPostalCode(){
    let input = $("#postalCode").val();

    if (regExPostalCode.test(input)) {
        $("#error4").text("");
        $("#postalCode").css('border', '2px solid green');

        return true;
    } else {
        $("#postalCode").css('border', '2px solid red');
        $("#error4").text("Wrong format : "+input);
        return false;
    }
}

$("#postalCode").keyup(function () {
    disableCusRegisterBtn();
});


function disableCusRegisterBtn(){
    if (validateAll()){
        $("#btnCustomerRegister").attr('disabled', false);
    }else {
        $("#btnCustomerRegister").attr('disabled', true);
    }
}

function isCustomerIdExist(){
    for (let i = 0; i < customerArray.length; i++) {

        if ($("#inputnewId").val() === customerArray[i].getCustomerId()){
            return false;
        }
    }
    return true;
}

function validateAll(){

    if (isCustomerIdExist()){
        if (validateCustomerName()){
            if (validateCusAddress()){
                if (validateCustomerCity()){
                    if (validateCustomerPostalCode()){
                        return true;
                    }else {
                        return false;
                    }
                }else {
                    return false;
                }
            }else {
                return false;
            }

        }else {
            return false;
        }
    }else {
        return false;
    }


}


$("#btnCustomerDelete").click(function () {
    deleteCustomer();
});

$("#btnUpdateCustomer").click(function () {
    updateCustomer();
    generateCustomerId();
});

$("#btnSearchCustomer").click(function (){
    let txtId = $("#txtSearchCustomer").val();

   var obCustomer = searchCustomer(txtId);

   if (obCustomer){
       $("#inputnewId").val(obCustomer.getCustomerId);
       $("#custName").val(obCustomer.getCustomerName());
       $("#custAddress").val(obCustomer.getCustomerAddress());
       $("#inputCity").val(obCustomer.getCustomerCity());
       $("#province").val(obCustomer.getCustomerProvince());
       $("#postalCode").val(obCustomer.getCustomerPostalCode());

   }else {
       clearCustomerTextFields();
       alert("No such a Customer");
   }

});

$("#btnCustomerRegister").click(function (){
    saveCustomer();
    generateCustomerId();
});

$("#btnClearCustomerFields").click(function (){
    clearCustomerTextFields();
});
