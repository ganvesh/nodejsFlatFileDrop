var tsv = require('C:/Program Files/nodejs/node_modules/npm/node_modules/tsv');
var dateFormat = require('C:/Program Files/nodejs/node_modules/npm/node_modules/dateformat');
var express = require('C:/Program Files/nodejs/node_modules/npm/node_modules/express');
var bodyParser = require('C:/Program Files/nodejs/node_modules/npm/node_modules/body-parser');
var request = require('C:/Program Files/nodejs/node_modules/npm/node_modules/request');
var http = require('http');
var fs = require('fs');
var app = express();
var port = 1091;

app.use(bodyParser.json());

app.use(function(error, req, res, next) {
	if(error instanceof SyntaxError) {		
		console.log(req.body);
		var message = { 
			code: 400,
      		message: 'Payload is expected in JSON',
      		date: getCurrentDateTime(),	
		}
		res.status(400).send(message);
	}
});


app.route('/po')
.post(function(req,res){
	
var fieldValue = req.body["poNumToItemsMap"]; 


var Parser = tsv.Parser;
var TAB = new Parser("\t", { header: false });
var successList = [];
var errorList = [];
var FILE_SENDER_DUNS = "006092860";
var FILE_RECEIVER_DUNS = "006092860";
var FILE_MESSAGE_TYPE = "DiscreteOrder";
var FILE_VERSION = "1.0";
var FILE_SITEID = "JUA";
var CURRENT_TIME = getCurrentDateTime();
console.log(JSON.stringify(fieldValue));
var	response = ''; 
var appcount = 0;
		for(var i=0;i<Object.keys(fieldValue).length; i++){

	
			var jsonMapping = {"0":"OrderNumber","1":"Status","2":"Message","3":"OrderCreationDate","4":"OrderStatus","5":"OrderPriority","6":"CustomerID","7":"CustomerDescription","8":"CustomerDUNS","9":"CustomerDUNS4","10":"CustomerTaxNumber","11":"CustomerAddressDescriptor","12":"CustomerAddress1","13":"CustomerAddress2","14":"CustomerAddress3","15":"CustomerAddress4","16":"CustomerAddress5","17":"CustomerCity","18":"CustomerCounty","19":"CustomerState","20":"CustomerCountry","21":"CustomerZip","22":"SupplierID","23":"SupplierDescription","24":"SupplierDUNS","25":"SupplierDUNS4","26":"SupplierAddressDescriptor","27":"SupplierAddress1","28":"SupplierAddress2","29":"SupplierAddress3","30":"SupplierAddress4","31":"SupplierAddress5","32":"SupplierCity","33":"SupplierCounty","34":"SupplierState","35":"SupplierCountry","36":"SupplierZip","37":"BuyerCode","38":"BuyerContact","39":"BuyerName","40":"BuyerEmail","41":"SupplierEmail","42":"DeliveryTerm","43":"PaymentTerms","44":"TotalOrderAmount","45":"IncoTerms","46":"CustomerOrderNotes","47":"SupplierOrderNotes","48":"BillTo","49":"BillToAddressDescriptor","50":"BillToAddress1","51":"BillToAddress2","52":"BillToAddress3","53":"BillToAddress4","54":"BillToAddress5","55":"BillToCity","56":"BillToCounty","57":"BillToState","58":"BillToCountry","59":"BillToZip","60":"RemitToAddressDescriptor","61":"RemitToAddress1","62":"RemitToAddress2","63":"RemitToAddress3","64":"RemitToAddress4","65":"RemitToAddress5","66":"RemitToCity","67":"RemitToCounty","68":"RemitToState","69":"RemitToCountry","70":"RemitToZip","71":"BuyerContactPhone","72":"BuyerContactFax","73":"OrderType","74":"FlexPOHeader4","75":"FlexPOHeader5","76":"FlexPOHeader6","77":"FlexPOHeader7","78":"FlexPOHeader8","79":"FlexPOHeader9","80":"FlexIntPOHeader1","81":"FlexIntPOHeader2","82":"FlexIntPOHeader3","83":"FlexIntPOHeader4","84":"FlexIntPOHeader5","85":"FlexFloatPOHeader1","86":"FlexFloatPOHeader2","87":"FlexFloatPOHeader3","88":"FlexFloatPOHeader4","89":"FlexFloatPOHeader5","90":"FlexDatePOHeader1","91":"FlexDatePOHeader2","92":"FlexDatePOHeader3","93":"FlexDatePOHeader4","94":"FlexDatePOHeader5","95":"LineID","96":"LineStatus","97":"CustomerItemID","98":"CustomerItemDescription","99":"SupplierItemID","100":"SupplierItemDescription","101":"UnitPrice","102":"PriceBasis","103":"PaymentCurrency","104":"TotalLineAmount","105":"uOM","106":"CustomerOrderLineNotes","107":"SupplierOrderLineNotes","108":"DrawingVersion","109":"DrawingNumber","110":"ItemCategory","111":"ShipToLocation","112":"FlexPOLine5","113":"FlexPOLine6","114":"FlexPOLine7","115":"FlexPOLine8","116":"FlexPOLine9","117":"FreeItemFlag","118":"FlexIntPOLine2","119":"FlexIntPOLine3","120":"FlexIntPOLine4","121":"FlexIntPOLine5","122":"FlexFloatPOLine1","123":"FlexFloatPOLine2","124":"FlexFloatPOLine3","125":"FlexFloatPOLine4","126":"FlexFloatPOLine5","127":"FlexDatePOLine1","128":"FlexDatePOLine2","129":"FlexDatePOLine3","130":"FlexDatePOLine4","131":"FlexDatePOLine5","132":"RequestID","133":"RequestStatus","134":"Action","135":"RequestQty","136":"RequestDate","137":"RequestedShipDate","138":"Carrier","139":"CustomerSite","140":"ShipToAddressDescriptor","141":"ShipToAddress1","142":"ShipToAddress2","143":"ShipToAddress3","144":"ShipToAddress4","145":"ShipToAddress5","146":"ShipToCity","147":"ShipToCounty","148":"ShipToState","149":"ShipToCountry","150":"ShipToZip","151":"RefOrderType","152":"RefOrderID","153":"RefOrderLineID","154":"RefOrderRequestID","155":"RefCustomerID","156":"RefSupplierID","157":"FlexPORequest1","158":"FlexPORequest2","159":"FlexPORequest3","160":"FlexPORequest4","161":"FlexPORequest5","162":"FlexPORequest6","163":"FlexPORequest7","164":"FlexPORequest8","165":"FlexPORequest9","166":"FlexIntPORequest1","167":"FlexIntPORequest2","168":"FlexIntPORequest3","169":"FlexIntPORequest4","170":"FlexIntPORequest5","171":"FlexFloatPORequest1","172":"FlexFloatPORequest2","173":"FlexFloatPORequest3","174":"FlexFloatPORequest4","175":"FlexFloatPORequest5","176":"FlexDatePORequest1","177":"FlexDatePORequest2","178":"FlexDatePORequest3","179":"FlexDatePORequest4","180":"FlexDatePORequest5","181":"PromiseID","182":"PromiseQty","183":"PromiseDate","184":"PromisedShipDate","185":"SupplierSite","186":"ShipFromAddressDescriptor","187":"ShipFromAddress1","188":"ShipFromAddress2","189":"ShipFromAddress3","190":"ShipFromAddress4","191":"ShipFromAddress5","192":"ShipFromCity","193":"ShipFromCounty","194":"ShipFromState","195":"ShipFromCountry","196":"ShipFromZip","197":"FlexPOPromise1","198":"FlexPOPromise2","199":"FlexPOPromise3","200":"FlexPOPromise4","201":"FlexPOPromise5","202":"FlexPOPromise6","203":"FlexPOPromise7","204":"FlexPOPromise8","205":"FlexPOPromise9","206":"FlexIntPOPromise1","207":"FlexIntPOPromise2","208":"FlexIntPOPromise3","209":"FlexIntPOPromise4","210":"FlexIntPOPromise5","211":"Flex_Float_PO_Promise1","212":"FlexFloatPOPromise2","213":"FlexFloatPOPromise3","214":"FlexFloatPOPromise4","215":"FlexFloatPOPromise5","216":"FlexDatePOPromise1","217":"FlexDatePOPromise2","218":"FlexDatePOPromise3","219":"FlexDatePOPromise4","220":"FlexDatePOPromise5","221":"Rev","222":"ShipToCustomerID"};
			var tabArr = [];
			for(var k=0;k<fieldValue[Object.keys(fieldValue)[i]].length;k++){
				var tabObj = {};
					for(var j=0;j<Object.keys(jsonMapping).length; j++){
								
								var genVal = fieldValue[Object.keys(fieldValue)[i]][k][jsonMapping[Object.keys(jsonMapping)[j]]];
								tabObj[jsonMapping[Object.keys(jsonMapping)[j]]] = (genVal == undefined) ? "":genVal;
					}
					tabArr.push(tabObj);
			}
			//console.log(tabArr);
			
			
		var poNumber = Object.keys(fieldValue)[i];	
		var fileName = Object.keys(fieldValue)[i]+'-'+FILE_SENDER_DUNS+'_'+FILE_RECEIVER_DUNS+'_'+FILE_MESSAGE_TYPE+'_'+FILE_VERSION+'_'+FILE_SITEID+'_'+CURRENT_TIME;
		fs.writeFile(fileName+'.txt', TAB.stringify(tabArr), function (err) {
		if (err) {
			response = {		
					code: 423,
					message: 'PO processing failed for poNumber:'+Object.keys(fieldValue)[i],
					date : getCurrentDateTime()
				};
			throw err;
			errorList.push(poNumber);
		}else{
			console.log('PO text file generated PO:'+fileName);
			successList.push(poNumber);
				response = {		
						code: 200,
						message: 'PO processed successfully.',
						date : getCurrentDateTime()
					};
				
				var req = request.post('http://gtstaging.controls.johnsoncontrols.com/E2OPOC?filename='+fileName, function (err, resp, body) {
					  if (err) {
					    console.log('Error!');
					  } else {
					    console.log('URL: ' + body);
					  }
					});
					var form = req.form();
					form.append('file', TAB.stringify(tabArr), {
						  filename: fileName,
						  contentType: 'text/plain'
						});
		}
		var count = Object.keys(fieldValue).length-1;
		if(count == appcount){
			res.send({
				"errorList": errorList,
				"successList":successList
			});
		}
		appcount++;
		});
}

		
}) 

// http://gtstaging.controls.johnsoncontrols.com/E2OPOC?filename=4370055.006092860_006092860_DiscreteOrder_1.0_JUA_20160824051635108.txt 
app.listen(port, function(){
console.log('Server is running now. Address http://localhost:%s',port);
});

function getCurrentDateTime(){
	var now = new Date();
	var formattedDate = dateFormat(now,'yyyymmddHHMMssms');
	return formattedDate;
}






