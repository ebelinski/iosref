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

  var valueWithoutHash = (value[0] == '#') ? value.substring(1) : value;
  var valueLowercased = valueWithoutHash.toLowerCase();
  var valueFullLength = fullLengthValue(valueLowercased);

  var red = getColorValue(valueFullLength[0]+valueFullLength[1]);
  var grn = getColorValue(valueFullLength[2]+valueFullLength[3]);
  var blu = getColorValue(valueFullLength[4]+valueFullLength[5]);

  if (isNaN(red) || isNaN(grn) || isNaN(blu)) {
    clearResults();
    return;
  }

  $("#results").show();

  $("#swift-code").html("UIColor(red: "+red+", green: "+grn+", blue: "+blu+", alpha: 1) // #"+newValue);
  $("#objective-c-code").html("[UIColor colorWithRed:"+red+" green:"+grn+" blue:"+blu+" alpha:1]; // #"+newValue);

  $(".color-preview.active").css("border-color", "black");
  $(".color-preview.active").css("background-color", "#"+newValue);
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

  $(".color-preview.active").css("border-color", "white");
  $(".color-preview.active").css("background-color", "white");
}

function getColorValue(hex) {
  newValue = parseInt(hex, 16);
  newValue = newValue / 255;
  newValue = Math.round(newValue * 1000) / 1000;

  return newValue;
}
