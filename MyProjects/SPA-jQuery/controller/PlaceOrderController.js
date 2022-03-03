setItemDetailsFromItemCode();


function loadAllItemIds(){
    for (let i = 0; i < itemArray.length; i++) {
        $("#cmbItemIds").append(new Option(itemArray[i].getItemId()));
    }
}

function setItemDetailsFromItemCode(){
    $("#cmbItemIds").on("change",function(){

        let itemId = $(this).find('option:selected').text();

        for (let i = 0; i < itemArray.length; i++) {
            if (itemId === itemArray[i].getItemId()){

                $("#qTY").val(itemArray[i].getQtyOnHand());
                $("#discount").val(itemArray[i].getDiscount());
                $("#unitPrices").val(itemArray[i].getUnitPrize());
                $("#description").val(itemArray[i].getItemDescription());

            }
        }
    });
}

function generateOrderId(){
    if (itemArray.length !== 0){
        var itemId = itemArray[itemArray.length-1].getItemId();
        let splitTxt = itemId.split("I",2);
        let newItemId = parseInt(splitTxt[1]) + 1;

        if (parseInt(newItemId) <= 9){
            $("#itemCode").val("I00" + newItemId);

        }else if (parseInt(newItemId) <= 99){
            $("#itemCode").val("I0" + newItemId);

        }else if (parseInt(newItemId) <= 99){
            $("#itemCode").val("I" + newItemId);
        }
    }else {
        $("#itemCode").val("I001").css('font-weight', 'bold');
    }
}

