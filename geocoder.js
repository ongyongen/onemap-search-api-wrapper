function geocoder() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var numRows = sheet.getLastRow();
  for (var i = 2; i < numRows+1; i++){
    try{
      var blk = SpreadsheetApp.getActiveSheet().getRange(i, 1).getValue();
      var street = SpreadsheetApp.getActiveSheet().getRange(i, 2).getValue();
      var postal_code = SpreadsheetApp.getActiveSheet().getRange(i, 3).getValue();
      var address = blk + ' ' + street + ' ' + postal_code;
      var url = 'https://developers.onemap.sg/commonapi/search?searchVal='+address+'&returnGeom=Y&getAddrDetails=Y&pageNum=1'
      var params = { 
        headers: { 'Content-Type': "application/json", 'Accept': "application/json"},
        muteHttpExceptions: true,
        method: "GET",
        contentType: "application/json",
        validateHttpsCertificates: false,
        };
      var response = UrlFetchApp.fetch(url,params);
      var fact = JSON.parse(response.getContentText());
      if ([fact.found] == 0){
        var address = 'Not Found'; 
        var postal = 'Not Found'; 
        var lat = 'Not Found'; 
        var lon = 'Not Found'; 
        sheet.getRange(i,2).setValue([address]);
        sheet.getRange(i,3).setValue([postal]);
        sheet.getRange(i,4).setValue([lat]); 
        sheet.getRange(i,5).setValue([lon]);
        }
      else{
        var address = [fact.results[0]['ADDRESS']];
        var postal = "'"+[fact.results[0]['POSTAL']].toString();
        var lat = [fact.results[0]['LATITUDE']]; 
        var lon = [fact.results[0]['LONGITUDE']];
        sheet.getRange(i,2).setValue([address]); 
        sheet.getRange(i,3).setValue([postal]);
        sheet.getRange(i,4).setValue([lat]); 
        sheet.getRange(i,5).setValue([lon]);
      }
    } 
    catch(e){
      sheet.getRange(i,2).setValue('Not Found'); 
      sheet.getRange(i,3).setValue('Not Found');
      sheet.getRange(i,4).setValue(['Not Found']); 
      sheet.getRange(i,5).setValue(['Not Found']);
    }
    
    finally{
      continue 
    }
  }
}
