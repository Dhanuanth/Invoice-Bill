class customer  {
    constructor(name,gst,discount){
        this.name=name;
        this.gst=gst;
        this.discount=discount;
    }
}
class collections  {

    constructor(name,rate,discount,size,quantity){
        this.name=name;
        this.hsn=6;
        this.rate=rate;
        this.size=size;
        this.quantity=quantity;
        this.discount=parseFloat((rate * quantity * discount / 100).toFixed(2));
        this.taxable=parseFloat((rate * quantity - this.discount).toFixed(2));
        this.cgst=parseFloat((this.taxable*(2.5/100)).toFixed(2));
        this.sgst=parseFloat((this.taxable*(2.5/100)).toFixed(2));
        this.total=parseFloat((this.taxable + this.sgst + this.cgst).toFixed(2));
    }
 }
var customerName;
var discount;
var item;
var gst;
var itemDetails=[];
/////

$(document).ready(function(){

    $(".customerName option").click(function(){

         customerName=$('.customerName').val();

         fetch('objects.json')
      .then(response => response.json())
      .then(data => {

                for(var i=0;i<data.customers.length;i++){

                    if(customerName==data.customers[i].name){
                             discount=data.customers[i].discount;
                             sessionStorage.setItem('customerDetails',JSON.stringify(data.customers[i]));
                              break;
                    }
                }
        });
        $('.customerName').prop('disabled', true);
    });


     $('.addRow').click(function(){
            var object;
            var size=[];
            var tempItem=$('.itemName').val();
            var tempQuantity=$('.itemQuantity').val();
              $('#check input').each(function(){
                if(this.checked==true){
                        size.push(this.id);
                 }
            });
            fetch('objects.json')
            .then(response => response.json())
             .then(data => {

                for(var i=0;i<data.items.length;i++){

                    if(tempItem==data.items[i].name){
                              var item=data.items[i];

                                object=new collections(item.name,item.rate,discount,size,tempQuantity);

                                itemDetails.push(object);
                                var col1="<td style='text-align:left;'>"+object.name+" "+object.size.toString()+"</td>";
                                var col2="<td>"+object.hsn+"</td>";
                                var col3="<td>"+object.quantity+"</td>";
                                var col4="<td>"+object.rate+"</td>";
                                var col5="<td>"+object.discount+"</td>";
                                var col6="<td>"+object.taxable+"</td>";
                                var col7="<td>"+object.sgst+"</td>";
                                var col8="<td>"+object.cgst+"</td>";
                                var col9="<td>"+object.total+"</td>";
                                var row="<tr class='rows' onclick='lookup(this)'>"+col1+col2+col3+col4+col5+col6+col7+col8+col9+"</tr>";
                                $(".itemTable tbody").append(row);

                                break;
                    }
                }
        });

                        $(".itemName").prop("selectedIndex", -1);
                        $('#check :checkbox:enabled').prop('checked', false);
                        $('.itemQuantity').val('');
     });

                window.lookup=function(e){
                document.getElementById('here').scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                 });
                $(".itemTable").addClass("disabledbutton");
               if(e.style.backgroundColor != "grey"){
                        e.style.backgroundColor = "grey";
                        $(".itemDetails").css("background-color","#8eb8b5");
                        $(".deleteRow").css("display","inline");
                        $(".editRow").css("display","inline");
                        $(".addRow").css("display","none");
                    }
                else{
                         e.style.backgroundColor = "";
                         $(".itemDetails").css("background-color","");
                         $(".deleteRow").css("display","none");
                         $(".editRow").css("display","none");
                         $(".addRow").css("display","inline")
                         return;
                }
                $('.itemQuantity').val(e.cells[2].innerHTML);
                var size=[];
                var sizes=e.cells[0].innerHTML.split(' ')[1];
                 for(var i=0;i<sizes.split(',').length;i++){
                    size.push(sizes.split(',')[i]);
                 }
              $('#check input').each(function(){
                if(size.includes(this.id)){
                        this.checked=true;
                 }
                 else{
                 this.checked=false;
                 }
            });
            $(".editRow").click(function(){
                        $(".itemTable").removeClass("disabledbutton");
                        e.style.backgroundColor = "";
                         $(".itemDetails").css("background-color","");
                         $(".deleteRow").css("display","none");
                         $(".editRow").css("display","none");
                         $(".addRow").css("display","inline")
                        var object;
                        var size=[];
                        var tempItem=$('.itemName').val();
                        var tempQuantity=$('.itemQuantity').val();
                          $('#check input').each(function(){
                            if(this.checked==true){
                                    size.push(this.id);
                             }
                        });
                        /////////
                             fetch('objects.json')
                        .then(response => response.json())
                         .then(data => {

                            for(var i=0;i<data.items.length;i++){

                                if(tempItem==data.items[i].name){
                                          var item=data.items[i];

                                            object=new collections(item.name,item.rate,discount,size,tempQuantity);

                                            itemDetails[e.rowIndex-1]=object;
                                            var col1="<td style='text-align:left;'>"+object.name+" "+object.size.toString()+"</td>";
                                            var col2="<td>"+object.hsn+"</td>";
                                            var col3="<td>"+object.quantity+"</td>";
                                            var col4="<td>"+object.rate+"</td>";
                                            var col5="<td>"+object.discount+"</td>";
                                            var col6="<td>"+object.taxable+"</td>";
                                            var col7="<td>"+object.sgst+"</td>";
                                            var col8="<td>"+object.cgst+"</td>";
                                            var col9="<td>"+object.total+"</td>";
                                            var row="<tr class='rows' onclick='lookup(this)'>"+col1+col2+col3+col4+col5+col6+col7+col8+col9+"</tr>";
                                            e.innerHTML=row;

                                            break;
                                }
                            }
                    });
                        $(".itemName").prop("selectedIndex", -1);
                        $('#check :checkbox:enabled').prop('checked', false);
                        $('.itemQuantity').val('');
            });

            $(".deleteRow").click(function(){

                $(".itemTable").removeClass("disabledbutton");
                itemDetails.splice(e.rowIndex-1, 1)
                e.remove();
                        $(".itemName").prop("selectedIndex", -1);
                        $('#check :checkbox:enabled').prop('checked', false);
                        $('.itemQuantity').val('');
            });
     }
    $('.bill').click(function(){

        sessionStorage.setItem('itemDet',JSON.stringify(itemDetails));
        window.location.href="bill.html";

    });

});