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

  const red = getColorValue(hexFullLength[0]+hexFullLength[1]);
  const grn = getColorValue(hexFullLength[2]+hexFullLength[3]);
  const blu = getColorValue(hexFullLength[4]+hexFullLength[5]);

  if (isNaN(red) || isNaN(grn) || isNaN(blu)) {
    clearResults();
    return;
  }

  $("#results").show();

  $("#swift-color-literal-code").html("#colorLiteral(red: "+red+", green: "+grn+", blue: "+blu+", alpha: 1)");
  $("#swift-code").html("UIColor(red: "+red+", green: "+grn+", blue: "+blu+", alpha: 1) // #"+hexFullLength);
  $("#objective-c-code").html("[UIColor colorWithRed:"+red+" green:"+grn+" blue:"+blu+" alpha:1]; // #"+hexFullLength);
  $("#c-sharp-code").html("new UIColor(red: "+red+"f green: "+grn+"f blue: "+blu+"f alpha: 1.0f]; // #"+hexFullLength);

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
  $("#swift-code").html("");
  $("#objective-c-code").html("");
  $("#c-sharp-code").html("");

  $(".color-preview.active").css("border-color", "white");
  $(".color-preview.active").css("background-color", "white");
}

function getColorValue(hex) {
  const colorValue = parseInt(hex, 16);
  const colorValueFraction = colorValue / 255;
  const colorValueFractionRounded = Math.round(colorValueFraction * 1000) / 1000;

  return colorValueFractionRounded;
}
