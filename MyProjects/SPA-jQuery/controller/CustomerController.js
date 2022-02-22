
/*------------------Adding customer Details To Table--------------------*/

$("#btnCustomerRegister").click(function (){

    alert("Customer has been added successfully");

    $("#customerTable>tr").off("click");

    let customerId = $("#inputnewId").val();
    let customerName = $("#custName").val();
    let customerAddress = $("#custAddress").val();
    let city = $("#inputCity").val();
    let province = $("#province").val();
    let postalCode = $("#postalCode").val();


    /*-----------------Adding values to table---------------------*/

    let row = `<tr><td>${customerId}</td><td>${customerName}</td><td>${customerAddress}</td><td>${city}</td><td>${postalCode}</td></tr>`;
    $("#customerTable").append(row);

    /*------------------------------------------------------------*/


    var customer = {
        cusId : customerId,
        cusName : customerName,
        cusAddress : customerAddress,
        cusCity : city,
        cusProvince : province,
        cusPostalCode : postalCode,
    }

    customerArray.unshift(customer);

    /*------------Clear text fields---------------*/
    $("#inputnewId").val("");
    $("#custName").val("");
    $("#custAddress").val("");
    $("#inputCity").val("");
    $("#postalCode").val("");
    /*------------------------------------------------------------*/


    /*-------------Delete Customer-------------------------*/

    $("#customerTable>tr").dblclick(function (){
        confirmMessage = confirm("Do you really want to remove this customer...?");

        if (confirmMessage){
            for (let i = 0; i < customerArray.length; i++) {
                if ( $(this).children(":eq(0)").text() == customerArray[i].cusId) {
                    customerArray.splice(i, 1);

                    $("#customerTable>tr").remove();
                    $("#custName").val("");
                    $("#inputnewId").val("");
                    $("#custName").val("");
                    $("#custAddress").val("");
                    $("#inputCity").val("");
                    $("#postalCode").val("");
                }
            }
        }
    });

    /*-----------------------------------------------------*/


    /*----------Set table values to text fields------------------*/

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
    /*------------------------------------------------------------*/

});

/*--------------------------------------------------------------------------------------------------*/



/*-------------------Delete Customer-----------------------------------*/

$("#btnCustomerDelete").click(function (){
    confirmMessage = confirm("Do you really want to remove this customer...?");

    if (confirmMessage){
        for (let i = 0; i < customerArray.length; i++) {
            if ( $(this).children(":eq(0)").text() == customerArray[i].cusId) {
                customerArray.splice(i, 1);

                $("#customerTable>tr").remove();
                $("#custName").val("");
                $("#inputnewId").val("");
                $("#custName").val("");
                $("#custAddress").val("");
                $("#inputCity").val("");
                $("#postalCode").val("");
            }
        }
    }

});


