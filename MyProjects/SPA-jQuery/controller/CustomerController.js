function saveCustomer(){

    $("#customerTable>tr").off("click");

    let customerId = $("#inputnewId").val();
    let customerName = $("#custName").val();
    let customerAddress = $("#custAddress").val();
    let city = $("#inputCity").val();
    let province = $("#province").val();
    let postalCode = $("#postalCode").val();


    for (let i = 0; i < customerArray.length; i++) {
        if ($("#inputnewId").val() == customerArray[i].getCustomerId()) {
            alert("This customer has been added added");

        }else {
            alert("Customer has been added successfully");
            var customer = new Customer(customerId,customerName,customerAddress,city,province,postalCode);
            customerArray.push(customer);
        }
    }


    /*-----------------Adding values to table---------------------*/

    let row = `<tr><td>${customerId}</td><td>${customerName}</td><td>${customerAddress}</td><td>${city}</td><td>${postalCode}</td></tr>`;
    $("#customerTable").append(row);

    /*------------------------------------------------------------*/

}

function clearTextFields(){
    $("#inputnewId").val("");
    $("#custName").val("");
    $("#custAddress").val("");
    $("#inputCity").val("");
    $("#postalCode").val("");
}

function setCustomerDetailsToFields(){
    $("#customerTable>tr").click(function(){

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

function deleteCustomerDoubleClickRow(){
    $("#customerTable>tr").dblclick(function (){
       confirm("Do you really want to remove this customer...?");

            for (let i = 0; i < customerArray.length; i++) {
                if ( $(this).children(":eq(0)").text() == customerArray[i].getCustomerId()) {
                    customerArray.splice(i, 1);

                    $(this).remove();

                    $("#custName").val("");
                    $("#inputnewId").val("");
                    $("#custName").val("");
                    $("#custAddress").val("");
                    $("#inputCity").val("");
                    $("#postalCode").val("");
                }
            }
    });
}



/*------------------Save Customer--------------------*/

$("#btnCustomerRegister").click(function (){
    saveCustomer();
    clearTextFields();
    setCustomerDetailsToFields();
    deleteCustomerDoubleClickRow();

});

/*--------------------------------------------------------------------------------------------------*/




/*-------------------Delete Customer-----------------------------------*/

$("#btnCustomerDelete").click(function () {
    confirm("Do you really want to remove this customer...?");

                for (let i = 0; i < customerArray.length; i++) {
                    if ($("#inputnewId").val() == customerArray[i].getCustomerId()) {
                        customerArray.splice(i, 1);

                        clearTextFields();
                    }
                }
});

/*---------------------------------------------------------------------*/






/*------------------------Update Customer---------------------------------------*/

function updateCustomer(){
    alert("Customer has been successfully updated");

    $("#customerTable>tr").off("click");

    let customerId = $("#inputnewId").val();
    let customerName = $("#custName").val();
    let customerAddress = $("#custAddress").val();
    let city = $("#inputCity").val();
    let province = $("#province").val();
    let postalCode = $("#postalCode").val();


    for (let i = 0; i < customerArray.length; i++) {
        if ( $(this).children(':nth-child(1)').text() == customerArray[i].cusId) {
            customerArray.splice(i, 1);
        }
    }


    /*-----------------Adding values to table---------------------*/

    let row = `<tr><td>${customerId}</td><td>${customerName}</td><td>${customerAddress}</td><td>${city}</td><td>${postalCode}</td></tr>`;
    $("#customerTable").append(row);

    /*------------------------------------------------------------*/


    var Customer = {
        cusId : customerId,
        cusName : customerName,
        cusAddress : customerAddress,
        cusCity : city,
        cusProvince : province,
        cusPostalCode : postalCode,
    }

    customerArray.push(Customer);

}


$("#btnUpdateCustomer").click(function (){
    updateCustomer();
});

/*------------------------------------------------------------------------------*/