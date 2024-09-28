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
  const hexWithoutPrefix = (value[0] == '#') ? value.substring(1) : value[1] == 'x' ? value.substring(2) : value;
  
  if (!validateHexLength(hexWithoutPrefix)) {
    clearResults();
    return;
  }
  
  const hexLowercased = hexWithoutPrefix.toLowerCase();
  const hexFullLength = fullLengthValueForAnalyzing(hexLowercased);
  const hexFullLengthForDisplay = hexLowercased;

  const red = getColorInt(hexFullLength[0]+hexFullLength[1]);
  const grn = getColorInt(hexFullLength[2]+hexFullLength[3]);
  const blu = getColorInt(hexFullLength[4]+hexFullLength[5]);
  const alp = getColorInt(hexFullLength[6]+hexFullLength[7]);

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

/// Converts a hexadecimal value to integer. (E.g. F1 to 241)
///
/// - Parameter hex: A string containing a hexadecimal value.
///
/// - Returns: A string containing the decimal value.
function getColorInt(hex) {
  const colorValue = parseInt(hex, 16);
  
  if (colorValue < 0 || colorValue > 255) {
    return null;
  }
  
  const colorValueFraction = colorValue / 255;
  const colorValueFractionRounded = Math.round(colorValueFraction * 1000) / 1000;

  return colorValueFractionRounded;
}
