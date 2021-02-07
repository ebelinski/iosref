$(document).ready(function() {
  // On page load, focus on hex value input
  $("input#hex-value").focus();

  // On hex value input change, process its value
  $("#hex-value").keyup(function() {
    processValue(this.value);
  });

  new Clipboard('.btn');
});

function processValue(value) {
  if (!validateValueLength(value)) {
    clearResults();
    return;
  }

  const hexWithoutHash = (value[0] == '#') ? value.substring(1) : value;
  const hexLowercased = hexWithoutHash.toLowerCase();
  const hexFullLength = fullLengthValue(hexLowercased);

  const red = getColorFraction(hexFullLength[0]+hexFullLength[1]);
  const grn = getColorFraction(hexFullLength[2]+hexFullLength[3]);
  const blu = getColorFraction(hexFullLength[4]+hexFullLength[5]);

  if (red == null || grn == null || blu == null) {
    clearResults();
    return;
  }

  $("#results").show();
  
  // SwiftUI
  
  $("#color-literal-code").html(`Color(#colorLiteral(red: ${red}, green: ${grn}, blue: ${blu}, alpha: 1)) // #${hexFullLength}`);
  
  $("#color-code").html(`Color(red: ${red}, green: ${grn}, blue: ${blu}) // #${hexFullLength}`);
  
  // UIKit

  $("#uicolor-literal-code").html(`#colorLiteral(red: ${red}, green: ${grn}, blue: ${blu}, alpha: 1) // #${hexFullLength}`);
  
  $("#uicolor-code").html(`UIColor(red: ${red}, green: ${grn}, blue: ${blu}, alpha: 1) // #${hexFullLength}`);
  
  $("#uicolor-objective-c-code").html(`[UIColor colorWithRed:${red} green:${grn} blue:${blu} alpha:1]; // #${hexFullLength}`);

  $(".color-preview.active").css("border-color", "black");
  $(".color-preview.active").css("background-color", "#"+hexFullLength);
}

function validateValueLength(value) {
  if ((value.length == 7 || value.length == 4) && value[0] == '#') {
    return true;
  }

  if ((value.length == 6 || value.length == 3) && value[0] != '#') {
    return true;
  }

  return false;
}

function fullLengthValue(value) {
  if (value.length == 3) {
    return value[0]+value[0] + value[1]+value[1] + value[2]+value[2];
  }

  return value;
}

function clearResults() {
  $("#results").hide();

  $(".color-preview.active").css("border-color", "white");
  $(".color-preview.active").css("background-color", "white");
}

/// Converts a hexadecimal value to integer. (E.g. F1 to 241)
///
/// - Parameter hex: A string containing a hexadecimal value.
///
/// - Returns: A string containing the integer value as a fraction (e.g. 23/255)
function getColorFraction(hex) {
  const parsedInt = parseInt(hex, 16);
  
  if (isNaN(parsedInt) || parsedInt < 0 || parsedInt > 255) {
    return null;
  }
  
  return `${parsedInt}/255`
}
