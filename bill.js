
var itemDetails=sessionStorage.getItem('itemDet');
var customerDetails=sessionStorage.getItem('customerDetails');
var itemDetails=JSON.parse(itemDetails);
var customerDetails=JSON.parse(customerDetails);
//console.log(itemDetails)
//console.log(customerDetails);

var totalDiscount=0,totalTax=0,totalCGST=0,totalSGST=0,totalTotal=0;
window.onload = function() {
  
    var d = new Date();
    
    document.getElementById("todayDate").innerHTML = d.getDate() +"/"+ d.getMonth()+"/"+d.getFullYear();
   
    
for(var i=0;i<itemDetails.length;i++){
        var object=itemDetails[i];
        var col1="<td style='text-align:left;'>"+object.name+" "+object.size.toString()+"</td>";
        var col2="<td >"+object.hsn+"</td>";
        var col3="<td>"+object.quantity+"</td>";
        var col4="<td>"+object.rate+"</td>";
        var col5="<td>"+object.discount+"</td>";
        var col6="<td>"+object.taxable+"</td>";
        var col7="<td>"+object.sgst+"</td>";
        var col8="<td>"+object.cgst+"</td>";
        var col9="<td>"+object.total+"</td>";
        var row="<tr class='rows'>"+col1+col2+col3+col4+col5+col6+col7+col8+col9+"</tr>";
        $(".tableBody").append(row);
    }
    for(var i=0;i<itemDetails.length;i++){
        var object=itemDetails[i];
        totalDiscount+=object.discount;
        totalTax+=object.taxable;
        totalCGST+=object.cgst;
        totalSGST+=object.sgst;
        totalTotal+=object.total;
   }
    document.getElementById("discount").innerHTML+=customerDetails.discount+"%";
    document.getElementById("customerName").innerHTML=customerDetails.name;
    document.getElementById("customerGst").innerHTML=customerDetails.gst;
    document.getElementById("totalDiscount").innerHTML=totalDiscount.toFixed(2);
    document.getElementById("totalTax").innerHTML=totalTax.toFixed(2);
    document.getElementById("totalSGST").innerHTML=totalSGST.toFixed(2);
    document.getElementById("totalCGST").innerHTML=totalCGST.toFixed(2);
    document.getElementById("totalTotal").innerHTML=totalTotal.toFixed(2);

    document.getElementById("taxableAmount").innerHTML=totalTax.toFixed(2);
    document.getElementById("grandTax").innerHTML=(totalSGST+totalCGST).toFixed(2);
    document.getElementById("grandTotal").innerHTML=totalTotal.toFixed(2);
}