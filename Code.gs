var ch = 'A';
var JSONObject = {};

var cache = CacheService.getScriptCache();

/*******************************************/
/*        publish Message to rmq           */
/*******************************************/
function publishMessage(fname = "ma", pic = "abcdefghi", reqEmail = "mmm@mm.com", phone = "", address = "", event = "Weight", userName, password) {
  // Replace these values with your own RabbitMQ configuration
  var rabbitmqHost = "b-48c245d6-5bad-420c-abf2-1fb71dc2fca3.mq.ap-southeast-2.amazonaws.com";
  var rabbitmqPort = "15671";
  var rabbitmqUsername = userName;//"admin";
  var rabbitmqPassword = password;//"rabbit1@12345";
  var rabbitmqVirtualHost = "/";
  var rabbitmqExchange = "my_exchange";
  var rabbitmqRoutingKey = "my_routing_key";


  var cache = CacheService.getScriptCache();
  JSONObject = cache.get('JSONObject');
  // Replace this message with your own message
  var message = getSheetJson(fname, pic, reqEmail, event);

  var result = SpreadsheetApp.getUi().alert("Do you want to continue?", message, SpreadsheetApp.getUi().ButtonSet.YES_NO);

  if (result == SpreadsheetApp.getUi().Button.YES) {
    var payload = {
      "properties": {
        "content_type": "text/plain"
      },
      "routing_key": rabbitmqRoutingKey,
      "payload": message,
      "payload_encoding": "string"
    };

    var options = {
      "method": "post",
      "payload": JSON.stringify(payload),
      "headers": {
        "Authorization": "Basic " + Utilities.base64Encode(rabbitmqUsername + ":" + rabbitmqPassword),
        "Content-Type": "application/json"
      }
    };

    // Construct the URL with the correct format
    var url = "https://" + rabbitmqHost + ":" + rabbitmqPort + "/api/exchanges/" + encodeURIComponent(rabbitmqVirtualHost) + "/" + encodeURIComponent(rabbitmqExchange) + "/publish";

    try {
      UrlFetchApp.fetch(url, options);
      SpreadsheetApp.getUi().alert("Published successfully!");
    } catch (e) {
      SpreadsheetApp.getUi().alert("There was an error publishing the message. Please check your username and password.");
    }
  }
  else { SpreadsheetApp.getUi().alert("Not Published !!!"); }
}

/*******************************************/
/*                    menu                 */
/*******************************************/
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('CSV Publisher')
    .addItem('Publish an Event', 'showSidebar')
    .addToUi();
}
/*******************************************/
/*          pre-fill the form data         */
/*******************************************/
function showSidebar() {
  var ui = SpreadsheetApp.getUi();
  var email = Session.getEffectiveUser().getEmail();
  var self = ContactsApp.getContact(email);


  var html = HtmlService.createTemplateFromFile('Page');
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

  html.name = name;



  var output = html.evaluate();
  output.setTitle('Producer Information');
  ui.showSidebar(output);
  SpreadsheetApp.getActiveSheet().clearContents();

}

// function showToolsSideBar() {
//   var html = HtmlService.createHtmlOutputFromFile('Index')
//     .setTitle('test');
//   SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
//     .showSidebar(html);
// }
/*******************************************/
/*              event template             */
/*******************************************/
function template(event) {
  SpreadsheetApp.getActiveSheet().clearContents();
  if (event == "Weight") {
    var json = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "",
  "type": "array",
  "items": {
    "description": "The root structure for a packet of data.",
    "type": "object",
    "additionalProperties": false,
    "required": [
      "source",
      "owner",
      "eventDateTime",
      "message"
    ],
    "properties": {
      "eventDateTime": {
        "displayName": "Event Date Time",
        "type": "string",
        "format": "date-time",
        "description": "ISO8601 date and time. MUST contain time zone. UTC recommended."
      },
      "source": {
        "additionalProperties": false,
        "type": "object",
        "description": "The device or software that the event originates from.",
        "required": [
          "ip_address",
          "id"
        ],
        "properties": {
          "ip_address": {
            "type": "string",
            "format": "ipv4",
            "description": "The IP address of the publishing technology."
          },
          "id": {
            "type": "string",
            "description": "Unique identifier on location level in the source system for this device."
          }
        }
      },
      "owner": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id"
        ],
        "properties": {
          "givenName": {
            "type": "string",
            "description": "First name of the person"
          },
          "familyName": {
            "type": "string",
            "description": "Surname of the person"
          },
          "email": {
            "type": "string",
            "description": "Email address",
            "format": "email"
          },
          "id": {
            "type": "string",
            "description": "The property identification code from the owner."
          },
          "telephone": {
            "type": "string",
            "description": "Telephone contact"
          }
        }
      },
      "message": {
        "required": [
          "eventName",
          "item",
          "event"
        ],
        "type": "object",
        "additionalProperties": true,
        "properties": {
          "eventName": {
            "description": "The human and machine readiable unqiue name of the event.",
            "type": "string",
            "const": "cattleMeanWt"
          },
          "item": {
            "type": "object",
            "required": [
              "identifier"
            ],
            "properties": {
              "itemType": {
                "description": "Animal, crop, machine , ...",
                "type": "string",
                "const": "Animal"
              },
              "animal": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "identifier": {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "id": {
                        "displayName": "Tage Type",
                        "type": "string",
                        "description": "The type of the tag for the animal."
                      },
                      "scheme": {
                        "displayName": "Tage No",
                        "type": "string",
                        "description": "The Tag no.(RFID) for the animal."
                      }
                    }
                  },
                  "specie": {
                    "displayName": "Breed",
                    "description": "Buffalo , Cattle , Deer , Elk , Goat , Horse , Pig , Sheep , Camel , Kangaroo",
                    "type": "string"
                  },
                  "gender": {
                    "displayName": "Gender",
                    "description": "Female , FemaleNeuter , Male , MaleCryptorchid , MaleNeuter , Unknown",
                    "type": "string"                 
                  }
                }
              }
            }
          },
          "event": {
            "description": "A mean weight event for cattle.",
            "required": [
              "weight"
            ],
            "additionalProperties": false,
            "type": "object",
            "properties": {
              "weight": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "kind": {
                    "displayName": "Kind",
                    "type": "string",
                    "enum": [
                      "average",
                      "individual"
                    ],
                    "description": "type of measurement"
                  },
                  "measurement": {
                    "displayName": "Measurement",
                    "type": "string",
                    "enum": [
                      "KGM",
                      "GRM",
                      "LBR",
                      "TNE",
                      "MC",
                      "MGM",
                      "ONZ",
                      "PN"
                    ],
                    "description": "measurements for weight e.g. Kilogram, Gram, Pound, Metric Tonne, Microgram, Milligram."
                  },
                  "value": {
                    "displayName": "Value",
                    "type": "number",
                    "format": "double",
                    "description": "The weight observation, in the units specified (usually kilograms)"
                  }
                },
                "description": "The weight observation, in the units specified (usually kilograms)"
              },
              "method": {
                "description": "Method by which the weight is observed. Includes loadcell (loadbars), girth (tape), assessed (visually), walk-over weighing, prediction, imaging (camera/IR), front end weight correlated to whole body, group average (pen/sample weigh).",
                "type": "string",
                "enum": [
                  "StaticLoadCell",
                  "Girth",
                  "Assessed",
                  "WalkOver",
                  "Predicted",
                  "Imaged",
                  "FrontEndCorrelated",
                  "GroupAverage"
                ]
              }
            }
          },
          "session": {
            "type": "object",
            "description": "session details",
            "additionalProperties": false,
            "properties": {
              "sessionID": {
                "type": "string",
                "description": "random number"
              },
              "totalInSession": {
                "type": "integer",
                "description": "total of rfid per pic",
                "minimum": 0
              }
            },
            "required": [
              "sessionID",
              "totalInSession"
            ]
          }
        }
      }
    }
  }
}`;


    var obj = JSON.parse(json);
    var keys = getKeys(obj);
    console.log(keys);
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
    console.log(JSON.stringify(jObject));
    JSONObject = JSON.stringify(jObject)
    //SpreadsheetApp.getUi().alert(JSONObject);
    cache.put('JSONObject', JSONObject);
  }
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
function getSheetJson(fname, pic, reqEmail, event) {

  var sheet = SpreadsheetApp.getActiveSheet();
  //SpreadsheetApp.getUi().alert(JSON.stringify(JSONObject));
  return pasreToJSON(sheet, fname, pic, reqEmail, event);
}

/*******************************************/
/*              get json method            */
/*******************************************/
function getKeys(object) {
  var str = '';
  function iter(o, p) {
    if (Array.isArray(o)) { return; }
    if (o && typeof o === 'object') {
      var keys = Object.keys(o);
      //console.log(keys + " - " + keys.length);
      if (keys.length) {

        keys.forEach(function (k) {
          if (k == 'displayName') {
            p.push(o[k]);
            SpreadsheetApp.getActiveSheet().getRange(str + ch + (1)).setValue(o[k]);
            ch = String.fromCharCode(ch.charCodeAt(0) + 1);
            if (ch > 'Z' && str == '') {
              ch = 'A';
              str = 'A'
            }
            else
              if (ch > 'Z' && str != '') {
                ch = 'A';
                str = String.fromCharCode(str.charCodeAt(0) + 1);
              }
          }
          //if(k=='properties')

          iter(o[k], p.concat(k));

        }
        );
      }
      return;
    }
    result.push(p.join('.'));
  }
  var result = [];
  iter(object, []);


  result.splice(0, 6);
  //x = [...new Set(x)];
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

/***********************************************
 *  parse json back
 **********************************************/

const checkPath = (o, path) => {
  try {
    if (path.includes('.')) {
      if (o.hasOwnProperty(path.split('.')[0])) return checkPath(o[path.split('.')[0]], path.split('.').slice(1).join('.'));
      else return false
    }
    else
      return o.hasOwnProperty(path);
  } catch (error) { return false }

}
/***********************************************
 *  pasreToJSON
 **********************************************/
function pasreToJSON(sheet, fname = "ma", pic = "abcdefghi", reqEmail = "mmm@mm.com", event = "Weight") {
  var jObject = [];
  //JSONObject = {"eventDateTime":"Event Date Time","message":{"item":{"identifier":"RFID"},"event":{"weightx":{"value":"Value"}}}};
  JSONObject = JSON.parse(JSONObject)
  JSONObject = JSONObject[0];
  //SpreadsheetApp.getUi().alert(JSON.stringify(JSONObject));
  //JSONObject=JSON.stringify(JSONObject);
  //SpreadsheetApp.getUi().alert(JSONObject);

  var sourceObject = {};
  sourceObject["id"] = !checkPath(JSONObject, 'source.id') ? "" : JSONObject.source.id;
  sourceObject["ip_address"] = !checkPath(JSONObject, 'source.ip_address') ? "0.0.0.0" : JSONObject.source.ip_address;

  JSONObject["source"] = sourceObject;


  JSONObject.message["eventName"] = !checkPath(JSONObject, 'eventName') ? event : JSONObject.eventName;

  JSONObject.message.item["itemType"] = "Animal";


  var ownerObject = {};
  ownerObject["givenName"] = !checkPath(JSONObject, 'owner.givenName') ? fname : JSONObject.owner.givenName;
  ownerObject["familyName"] = !checkPath(JSONObject, 'owner.familyName') ? fname : JSONObject.owner.familyName;
  ownerObject["email"] = !checkPath(JSONObject, 'owner.email') ? reqEmail : JSONObject.owner.email;
  ownerObject["id"] = !checkPath(JSONObject, 'owner.id') ? pic : JSONObject.owner.id;
  JSONObject["owner"] = ownerObject;

  //console.log(JSON.stringify(ownerObject));
  //console.log(JSON.stringify(JSONObject));

  var strJSON = JSON.stringify(JSONObject);
  sheet = SpreadsheetApp.getActiveSheet();
  var headersRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  //var dataRange = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
  var data = headersRange.getValues();

  //SpreadsheetApp.getUi().alert(JSON.stringify(data));
  //console.log(headersRange.getValues());
  for (var i = 1; i < data.length; i++) {

    strJSON = JSON.stringify(JSONObject);
    for (var j = 0; j < data[i].length; j++) {
      //strJSON = strJSON.replace(data[0][j], data[i][j]);
      if (data[0][j].includes('Date')) {
        var date = Utilities.formatDate(data[i][j], "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");

        strJSON = JSON.stringify(JSON.parse(strJSON, (k, v) => v == data[0][j] ? date : v));
      }
      // else if (data[0][j].includes('Time')) {
      //   var x = data[i][j] == '' ? new Date(new Date().setHours(0, 0, 0, 0)) : data[i][j];
      //   var time = Utilities.formatDate(x, "GMT", "HH:mm:ss'Z'")
      //   strJSON = JSON.stringify(JSON.parse(strJSON, (k, v) => v == data[0][j] ? time : v));
      // }
      // else if (data[0][j].includes('List'))
      //   strJSON = JSON.stringify(JSON.parse(strJSON, (k, v) => v == data[0][j] ? data[i][j].split(',').map(Number) : v));
      else {

        strJSON = JSON.stringify(JSON.parse(strJSON, (k, v) => v == data[0][j] ? data[i][j] : v));
        //console.log(strJSON);
      }

    }
    jObject.push(JSON.parse(strJSON));
  }


  console.log(JSON.stringify(jObject));
  return JSON.stringify(jObject);
}
