function onSubmit() {
    var regularExpressions = {
      ipAddress:
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      ipAddressWithSubnet:
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d+$/,
      fqdn: /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i,
    };
  
    var validations = [
      {
        fieldName: "ip_address",
        error:
          "Expected format: 10.1.2.3, 192.1.2.0 - 192.1.3.255 or 172.2.3.0/24",
        rules: [
          regularExpressions.ipAddress,
          regularExpressions.ipAddressWithSubnet,
        ],
      },
    ];
  
    // @param validation - The validation to apply
    // @returns - True if validation passed, false otherwise
    function isValid(validation) {
      var formValue = g_form.getValue(validation.fieldName);
  
      var isValidArray = [];
      validation.rules.forEach(function (r) {
        var parsedValue = parseFormValue(formValue);
  
        if (Array.isArray(parsedValue)) {
          isValidArray.push(
            parsedValue
              .map(function (v) {
                return r.test(v);
              })
              .reduce(function (res, cur) {
                return res && cur;
              }, true)
          );
        } else {
          isValidArray.push(r.test(parsedValue));
        }
      });
  
      return isValidArray.reduce(function (res, cur) {
        return res || cur;
      }, false);
    }
  
    // @param value - The value to be parsed
    // @returns - An array if the value was a range or list, otherwise the initial value
    function parseFormValue(value) {
      if (value.includes("-")) {
        return value.split("-").map(function (v) {
          return v.trim();
        });
      }
  
      if (value.includes(",")) {
        return value.split(",").map(function (v) {
          return v.trim();
        });
      }
  
      return value;
    }
  
    var errors = [];
    validations.forEach(function (v) {
      var isMandatory = g_form.isMandatory(v.fieldName);
  
      if (isMandatory && !isValid(v)) {
        errors.push({
          fieldName: v.fieldName,
          error: v.error,
        });
      }
    });
  
    if (errors.length > 0) {
      g_form.submitted = false;
  
      errors.forEach(function (e) {
        g_form.showErrorBox(e.fieldName, e.error, false);
      });
  
      return false;
    } else {
      return true;
    }
  }
  