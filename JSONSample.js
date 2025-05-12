/*
Looping Through an Unknown JSON Object
Use Case:
- You don't know the keys of a JSON object in advance
- Iterate through and print all key-value pairs
*/

var jsonString = '{"one":1,"two":2,"apple":"orange"}';
var data = JSON.parse(jsonString);

for (var key in data) {
  if (data.hasOwnProperty(key)) {
    gs.info('Field: ' + key + ' | Value: ' + data[key]);
  }
}

/*
Accessing Known Fields in JSON
Use Case:
- You know the structure of the JSON and want to access fields directly
*/
var jsonString = '{"one":1,"two":2,"apple":"orange"}';
var data = JSON.parse(jsonString);

gs.info("One: " + data.one);
gs.info("Two: " + data.two);
gs.info("Apple: " + data.apple);

------------------------------------------------------------