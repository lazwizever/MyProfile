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
                clearTextFields();
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
    $("#inputnewId").val("");
    $("#custName").val("");
    $("#custAddress").val("");
    $("#inputCity").val("");
    $("#postalCode").val("");
}

function generateCustomerId() {

    if (customerArray.length !== 0) {
        var cusId = customerArray[customerArray.length - 1].getCustomerId();
        let splitTxt = cusId.split("C", 2);
        let newCusId = parseInt(splitTxt[1]) + 1;
        console.log(newCusId);

        if (parseInt(newCusId) <= 9) {
            $("#inputnewId").val("C00" + newCusId);

        } else if (parseInt(newCusId) <= 99) {
            $("#inputnewId").val("C0" + newCusId);

        } else if (parseInt(newCusId) <= 99) {
            $("#inputnewId").val("C" + newCusId);
        }
    } else {
        $("#inputnewId").val("C001");
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
            clearTextFields();
        }
    }
    loadCustomerDetailsToTbl();
    generateCustomerId();
}



$("#btnCustomerRegister").click(function () {
    saveCustomer();

});

$("#btnCustomerDelete").click(function () {
    deleteCustomer();
});

$("#btnUpdateCustomer").click(function () {
    updateCustomer();
    generateCustomerId();
});
