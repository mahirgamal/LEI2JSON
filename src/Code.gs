var ch = 'A';
var JSONObject = {};
var jsonSchema = "";

var cache = CacheService.getScriptCache();

/*******************************************/
/*             generate Message             */
/*******************************************/
function generateMessage(fname = "ma", pic = "abcdefghi", reqEmail = "mmm@mm.com", phone = "", address = "", eventName) {

   //SpreadsheetApp.getUi().alert(eventName);
   var cache = CacheService.getScriptCache();
   JSONObject = cache.get('JSONObject');
   // Replace this message with your own message
   if(!checkInvalidValues()){
   var sheet = SpreadsheetApp.getActiveSheet();
   var message = parseToJSON(sheet, fname, pic, reqEmail, phone, address, eventName);
   if(message.length === 0)
   {
    SpreadsheetApp.getUi().alert('There was an error', 'Error in generating JSON.\nPlease refer to the notes in the column header for more details.',SpreadsheetApp.getUi().ButtonSet.OK);
    return ['',0]
   }
   else
    return [customStringify(message),1];
   }
   else
   {
    SpreadsheetApp.getUi().alert('There was an error','Cells highlighted in red do not follow the schema format.\nPlease refer to the notes in the column header for more details.',SpreadsheetApp.getUi().ButtonSet.OK);
    return ['',0]
   }
}
/*******************************************/
/*                save Message             */
/*******************************************/
function saveMessage(saveOption,message) {
  
   if (saveOption === SpreadsheetApp.getUi().Button.YES) {
         // Save the JSON file locally on the user's computer
         var fileName = "message.json"; // Set the desired file name
         var mimeType = "application/json"; // Set the MIME type for JSON
         var blob = Utilities.newBlob(message, mimeType, fileName);

         var fileUrl = "data:text/json;charset=utf-8," + encodeURIComponent(message);
         var anchor = "<a href='" + fileUrl + "' download='" + fileName + "'>Click here to download the JSON file</a>";
         var htmlOutput = HtmlService.createHtmlOutput(anchor).setWidth(300).setHeight(100);
         SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Save JSON File");
      } else if (saveOption === SpreadsheetApp.getUi().Button.NO) {
         // Save the JSON file on Google Drive
         var file = DriveApp.createFile("data.json", message, "application/json");

         // Display a confirmation message after saving the file
         if (file) {
            SpreadsheetApp.getUi().alert("File saved successfully on Google Drive!");
         } else {
            SpreadsheetApp.getUi().alert("Failed to save the file.");
         }
      }
   
}
/*******************************************/
/*                    menu                 */
/*******************************************/
function onOpen() {
    
   SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('LEI2JSON')
      .addItem('Generate JSON Message', 'showSidebar')
      .addToUi();
   
}
/*******************************************/
/*          pre-fill the form data         */
/*******************************************/
function showSidebar() {
   var ui = SpreadsheetApp.getUi();
   var email = "prod.beef@beef.com"//Session.getEffectiveUser().getEmail();
   var self = ContactsApp.getContact(email);


   var html = HtmlService.createTemplateFromFile('Page.html');

   html.email = email;

   var name = "x";
   if (self) {
      // Prefer given name, if that's available
      name = self.getGivenName();
      // But we will settle for the full name
      if (!name)
         name = self.getFullName();

   }
   // If they don't have themselves in Contacts, return the bald userName.
   else {
      name = Session.getEffectiveUser().getUsername();

   }

   html.name = "Producer A.Beef";//name;
   html.address = "123 Street, City, 0000";//name;
   html.phone = "+61412345678";//name;
   


   var output = html.evaluate();
   output.setTitle('Livestock Event Information Sheet to JSON');
   ui.showSidebar(output);
   clearSpreadsheet();
}
/*******************************************/
/*        event build template             */
/*******************************************/
function buildTemplate(json) {
  
  

    clearSpreadsheet();
   
   
   var eventName = JSON.parse(json).description;
   var obj = JSON.parse(json);
   var keys = getKeys(obj);
   //console.log(keys);
   var jObject = [];

   /**************************************************** */

   //var JSONObject = {};
   var arr = [];
   for (var i = 0; i < keys.length; i++) {
      //console.log(keys[i]);
      y = keys[i].split('.');
      //console.log(y.length);

      const jsonObject = {};
      const properties = y;
      let current = jsonObject;
      properties.forEach((property, index) => {
         if (!current[property]) {
            current[property] = {};
         }
         current = current[property];
         if (index === properties.length - 2) {
            current[properties[index + 1]] = "";
         }
      });


      var str = JSON.stringify(jsonObject);

      str = str.replace(/:\{\}\}/g, '');
      let lastIndex = str.lastIndexOf('{');
      str = str.substring(0, lastIndex) + str.substring(lastIndex + 1);
      //console.log(str);
      arr.push(JSON.parse(str));
   }


   /******************************** */

   const merged = {};

   arr.forEach(obj => {
      for (const key in obj) {
         if (key in merged) {
            Object.assign(merged[key], mergeProperties(obj[key], merged[key]));
         } else {
            merged[key] = obj[key];
         }
      }
   });


   JSONObject = merged;
   jObject.push(JSONObject);
   //console.log(JSON.stringify(jObject));
   JSONObject = JSON.stringify(jObject)
   //SpreadsheetApp.getUi().alert(JSONObject);
   cache.put('JSONObject', JSONObject,3600);
   cache.put('JSONSCHEMA', json,3600);
   //}
   
   

   return eventName;
}
/*******************************************/
/*        Merge JSON Properties            */
/*******************************************/
function mergeProperties(obj1, obj2) {
   const mergedObj = {};
   for (const key in obj1) {
      if (key in obj2) {
         mergedObj[key] = mergeProperties(obj1[key], obj2[key]);
      } else {
         mergedObj[key] = obj1[key];
      }
   }
   for (const key in obj2) {
      if (!(key in obj1)) {
         mergedObj[key] = obj2[key];
      }
   }
   return mergedObj;
}
/*******************************************/
/*              get json method            */
/*******************************************/
function getKeys(object) {
   var str = '';
  var sheet=SpreadsheetApp.getActiveSheet();
  
   function iter(o, p) {
      if (Array.isArray(o)) {
         return;
      }
      if (o && typeof o === 'object') {
         var keys = Object.keys(o);
         //console.log(keys + " - " + keys.length);
         if (keys.length) {

            keys.forEach(function (k) {
               if (k == "displayName") {
                  var range=sheet.getRange(str +ch + "2:" + ch );
                  p.push(o[k]);
                  sheet.getRange(str + ch + (1)).setValue(o[k]);
                  if ("enum" in o) {
                    var enumValues = o["enum"];
                    var rule = SpreadsheetApp.newDataValidation().requireValueInList(enumValues).setAllowInvalid(false).setHelpText('Please select a value from the dropdown list.').build();
                    range.setDataValidation(rule);
                  }
                  if ("type" in o) {
                    var type = o["type"];
                    var format;
                    if ("format" in o) {
                      format = o["format"];
                    }
                    switch(type) {
                        case "string":
                          if (format == "email") {
                            var emailRule = SpreadsheetApp.newDataValidation().requireTextIsEmail().build();
                            range.setDataValidation(emailRule);
                          } else if (format == "uri") {
                            var urlRegex = "https?://.+";
                            var urlRule = SpreadsheetApp.newDataValidation().requireTextMatchesPattern(urlRegex).build();
                            range.setDataValidation(urlRule);
                          } else if (format == "date-time") {
                             var date = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).setHelpText('Please Enter correct date format (dd/MM/yyyy HH:mm:ss or dd/MM/yyy).').build();
                             range.setDataValidation(date);
                             range.setNumberFormat("dd/MM/yyyy HH:mm:ss");
                          } else if (format == "date") {
                            var date = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).setHelpText('Please Enter correct date format (dd/MM/yyy).').build();
                            range.setDataValidation(date);
                            range.setNumberFormat("dd/MM/yyyy");
                          } else if (format == "time") {
                            var timeRegex = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$";
                            var timeRule = SpreadsheetApp.newDataValidation().requireTextMatchesPattern(timeRegex).setAllowInvalid(false).setHelpText('Please Enter correct time format (HH:mm:ss).').build();
                            range.setDataValidation(timeRule);
                            range.setNumberFormat("HH:mm:ss");
                          } else if (format == "hostname") {
                            // No specific validation for hostname in Google Sheets
                          } else if (format == "ipv4" || format == "ipv6") {
                            var ipv4Regex = "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$";
                            var ipv4Rule = SpreadsheetApp.newDataValidation().requireTextMatchesPattern(ipv4Regex).setAllowInvalid(false).setHelpText('Please Enter correct IPV4 format.').build();
                            range.setDataValidation(ipv4Rule);
                          }
                          break;
                          
                        case "number":
                        case "integer":
                          if (format == "float" || format == "double") {
                            range.setNumberFormat("0.00");
                          } 
                          var numberRule = SpreadsheetApp.newDataValidation().requireNumberGreaterThan(0).setAllowInvalid(false).setHelpText('Please Enter correct number format').build();
                          range.setDataValidation(numberRule);
                          break;
                          
                        case "boolean":
                          range.insertCheckboxes();
                          break;
                          
                        case "null":
                          // No specific validation for null
                          break;
                          
                        case "array":
                          // No specific validation for array in Google Sheets
                          break;
                          
                        case "object":
                          // No specific validation for object in Google Sheets
                          break;
                          
                        default:
                          // No specific validation for unknown types
                          break;
                    }
                  }
                  sheet.getRange(str + ch + (1)).setNote(o["description"]);
                  ch = String.fromCharCode(ch.charCodeAt(0) + 1);
                  if (ch > 'Z' && str == '') {
                     ch = 'A';
                     str = 'A'
                  } else
                  if (ch > 'Z' && str != '') {
                     ch = 'A';
                     str = String.fromCharCode(str.charCodeAt(0) + 1);
                  }
               }
               //if(k=='properties')

               iter(o[k], p.concat(k));

            });
         }
         return;
      }
      result.push(p.join('.'));
   }
   var result = [];
   iter(object, []);

   result.splice(0, 6);
   //x = [...new Set(x)];
   //console.log(result);
   var z = [];
   for (var i = 0; i < result.length; i++) {

      var y = result[i] + '';
      if (y.includes('displayName')) {
         y = y.split('.properties.').join('.');
         y = y.replace('.displayName', '');
         y = y.replace('items.', '');
         y = y.replace('.type', '');
         y = y.replace('.description', '');
         y = y.replace('.format', '');
         y = y.replace('.pattern', '');
         y = y.replace('.additionalProperties', '');
         y = y.replace('.const', '');
         y = y.replace('.minimum', '');

         z.push(y);


         //console.log(y);
      }
   }


   result = [...new Set(z)];
   return result;
}
/**********************************************/
/*                parseToJSON                 */
/**********************************************/
function parseToJSON(sheet = SpreadsheetApp.getActiveSheet(), fname = "ma", pic = "abcdefghi", reqEmail = "mmm@mm.com", phone, address, event = "Weight") {
    try {
        var startTime = new Date().getTime();

        // Get JSONObject
        var JSONObject = JSON.parse(cache.get('JSONObject'))[0];

        JSONObject["source"] = {
            "id": JSONObject.source?.id || "",
            "ip_address": JSONObject.source?.ip_address || "0.0.0.0"
        };

        JSONObject.message["eventName"] = JSONObject.eventName || event;
        JSONObject.message.item["itemType"] = "Animal";

        JSONObject["owner"] = {
            "givenName": JSONObject.owner?.givenName || fname,
            "familyName": JSONObject.owner?.familyName || fname,
            "email": JSONObject.owner?.email || reqEmail,
            "telephone": JSONObject.owner?.telephone || phone,
            "address": JSONObject.owner?.address || address,
            "id": JSONObject.owner?.id || pic
        };

        // Fetch all data in one call
        var data = sheet.getDataRange().getValues();
        var key = data[0];

        var endTime = new Date().getTime();
        var xtime = endTime - startTime;

        var jObject = [];



            for (var i = 1; i < data.length; i++) {
                var tempJSON = JSON.parse(JSON.stringify(JSONObject)); // deep copy

                for (var j = 0; j < data[i].length; j++) {
                    var value = data[i][j];
                    if (key[j].includes('Date')) {
                        value = Utilities.formatDate(value, "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
                    }
                    tempJSON = JSON.parse(JSON.stringify(tempJSON), (k, v) => v == key[j] ? value : v);
                }
                jObject.push(tempJSON);
            }
    } catch (error) {
      console.log(error);
        return "[]";
    }

    return jObject;
}

/************************************************/
/*           validation with LEI schema       */
/**********************************************/


function validate(message) {

//SpreadsheetApp.getUi().alert(message);

  for (let i = 0; i <= 11; i++) {
   var startTime = new Date().getTime(); // Capture the start time
   var options = {
      'method': 'POST', // Replace with the HTTP method of your API
      'contentType': 'application/json',
      'payload': message,
      'muteHttpExceptions': true
   };



   var response = UrlFetchApp.fetch('https://efca-58-178-254-235.ngrok.io/valid', options);
   //13.55.120.110
   Logger.log(response.getContentText()); // Replace with how you want to handle the response
   
    var endTime = new Date().getTime(); // Capture the end time
    var executionTime = endTime - startTime; // Calculate the execution time
    log+=executionTime+"\n"
  }

  SpreadsheetApp.getUi().alert('Execution time of Validate: \n' + log + ' milliseconds');
   return response.getContentText();
}
/***********************************************/
/*          clear the spreadsheet             */
/**************************************** *****/
function clearSpreadsheet() {
   console.time("clearSpreadsheet");
   var sheet = SpreadsheetApp.getActiveSheet();
   sheet.clearContents();
   sheet.clearNotes();
   sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).clearDataValidations();
   sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setBackground(null);
   console.timeEnd("clearSpreadsheet");

}
/**********************************************/
/*     check Invalid Values in spreadsheet    */
/**********************************************/
function checkInvalidValues() {
  var flag=false;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()); // Adjust the range as needed
  var values = range.getValues();
  var validations = range.getDataValidations();

  for (var i = 0; i < validations.length; i++) {
    for (var j = 0; j < validations[i].length; j++) {
      var validation = validations[i][j];
      var value = values[i][j];
      
      if (validation !== null) {
        var criteria = validation.getCriteriaType();
        var args = validation.getCriteriaValues();

        if (!isValid(value, criteria, args)) {
          sheet.getRange(i + 1, j + 1).setBackground("red");
          flag=true;
        }
        else
        sheet.getRange(i + 1, j + 1).setBackground(null);
      }
    }
  }
  return flag;
}

function isValid(value, criteria, args) {
  switch (criteria) {
    case SpreadsheetApp.DataValidationCriteria.DATE_IS_VALID_DATE:
      return !isNaN(Date.parse(value));
    case SpreadsheetApp.DataValidationCriteria.NUMBER_BETWEEN:
      return value >= args[0] && value <= args[1];
    case SpreadsheetApp.DataValidationCriteria.NUMBER_GREATER_THAN:
      return value > args[0];
    case SpreadsheetApp.DataValidationCriteria.NUMBER_GREATER_THAN_OR_EQUAL_TO:
      return value >= args[0];
    case SpreadsheetApp.DataValidationCriteria.NUMBER_LESS_THAN:
      return value < args[0];
    case SpreadsheetApp.DataValidationCriteria.NUMBER_LESS_THAN_OR_EQUAL_TO:
      return value <= args[0];
    case SpreadsheetApp.DataValidationCriteria.NUMBER_NOT_BETWEEN:
      return value < args[0] || value > args[1];
    case SpreadsheetApp.DataValidationCriteria.NUMBER_NOT_EQUAL_TO:
      return value != args[0];
    case SpreadsheetApp.DataValidationCriteria.TEXT_IS_VALID_EMAIL:
      // Add your own email validation logic here
      return true;
    case SpreadsheetApp.DataValidationCriteria.TEXT_IS_VALID_URL:
      // Add your own URL validation logic here
      return true;
    case SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST:
      return args[0].indexOf(value) !== -1;
    default:
      return true;
  }
}



function saveToGoogleDrive(jsonData) {


  var blob = Utilities.newBlob(jsonData, "application/json", "data.json");
  DriveApp.createFile(blob);
  return "File saved successfully!";
}

/***************************************** */
/*******************************************/

// Custom function to serialize individual items
function customSerializeItem(item) {
  if (typeof item === 'number') {
    return item.toString();
  } else if (typeof item === 'string') {
    return `"${item}"`;
  } else if (Array.isArray(item)) {
    return customStringify(item);
  } else if (typeof item === 'object') {
    const keys = Object.keys(item);
    const serializedProps = keys.map(key => `"${key}":${customSerializeItem(item[key])}`).join(',');
    return `{${serializedProps}}`;
  }
  return ''; // Fallback for unsupported types
}

// Custom function to serialize an array
function customStringify(array) {
  let result = '[';
  for (let i = 0; i < array.length; i++) {
    if (i > 0) {
      result += ',';
    }
    result += JSON.stringify(array[i]);
  }
  result += ']';
  return result;
}

