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
  const hexWithoutHash = (value[0] == '#') ? value.substring(1) : value;
  
  if (!validateHexLength(hexWithoutHash)) {
    clearResults();
    return;
  }
  
  const hexLowercased = hexWithoutHash.toLowerCase();
  const hexFullLength = fullLengthValueForAnalyzing(hexLowercased);
  const hexFullLengthForDisplay = hexLowercased;

  const red = getColorFraction(hexFullLength[0]+hexFullLength[1]);
  const grn = getColorFraction(hexFullLength[2]+hexFullLength[3]);
  const blu = getColorFraction(hexFullLength[4]+hexFullLength[5]);
  
  var alp = getColorFraction(hexFullLength[6]+hexFullLength[7]);
  if (alp == "255/255") {
    alp = "1"
  }

  if (red == null || grn == null || blu == null || alp == null) {
    clearResults();
    return;
  }

  $("#results").show();
  
  // SwiftUI
  
  $("#color-literal-code").html(`Color(#colorLiteral(red: ${red}, green: ${grn}, blue: ${blu}, alpha: ${alp})) // #${hexFullLengthForDisplay}`);
  
  if (alp == "1") {
    $("#color-code").html(`Color(red: ${red}, green: ${grn}, blue: ${blu}) // #${hexFullLengthForDisplay}`);
  } else {
    $("#color-code").html(`Color(red: ${red}, green: ${grn}, blue: ${blu}, opacity: ${alp}) // #${hexFullLengthForDisplay}`);
  }
  
  // UIKit

  $("#uicolor-literal-code").html(`#colorLiteral(red: ${red}, green: ${grn}, blue: ${blu}, alpha: ${alp}) // #${hexFullLengthForDisplay}`);
  
  $("#uicolor-code").html(`UIColor(red: ${red}, green: ${grn}, blue: ${blu}, alpha: ${alp}) // #${hexFullLengthForDisplay}`);
  
  $("#uicolor-objective-c-code").html(`[UIColor colorWithRed:${red} green:${grn} blue:${blu} alpha:${alp}]; // #${hexFullLengthForDisplay}`);

  $(".color-preview.active").css("border-color", "black");
  $(".color-preview.active").css("background-color", "#"+hexFullLengthForDisplay);
}

function validateHexLength(hex) {
  if (hex.length == 8 | hex.length == 6 || hex.length == 3) {
    return true;
  }

  return false;
}

// 3 and 6 become 8
function fullLengthValueForAnalyzing(value) {
  if (value.length == 8) {
    return value;
  } else if (value.length == 6) {
    return `${value}ff`;
  } else if (value.length == 3) {
    const r = value[0];
    const g = value[1];
    const b = value[2];
    return `${r}${r}${g}${g}${b}${b}ff`
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
