$(document).ready(function() {
  // On page load, focus on hex value input
  $("input#hex-value").focus();

  // On hex value input change, process its value
  $("#hex-value").keyup(function() {
    processValue(this.value);
  });

  new Clipboard('.btn');
});

function processValue(rawValue) {
  var newValue = "";

  if (((rawValue.length == 7 || rawValue.length == 4) && rawValue[0] == '#') || ((rawValue.length == 6 || rawValue.length == 3) && rawValue[0] != '#')) {
    if (rawValue[0] == '#') {
      newValue = rawValue.substring(1);
    } else {
      newValue = rawValue;
    }

    newValue = newValue.toLowerCase();

    if (newValue.length == 3) {
      newValue = newValue[0]+newValue[0]+newValue[1]+newValue[1]+newValue[2]+newValue[2];
    }

    var red = getColorValue(newValue[0]+newValue[1]);
    var grn = getColorValue(newValue[2]+newValue[3]);
    var blu = getColorValue(newValue[4]+newValue[5]);

    if (isNaN(red) || isNaN(grn) || isNaN(blu)) {
      clearResults();
    } else {
      $("#results").show();

      $("#swift-code").html("UIColor(red: "+red+", green: "+grn+", blue: "+blu+", alpha: 1) // #"+newValue);
      $("#objective-c-code").html("[UIColor colorWithRed:"+red+" green:"+grn+" blue:"+blu+" alpha:1]; // #"+newValue);

      $(".color-preview.active").css("border-color", "black");
      $(".color-preview.active").css("background-color", "#"+newValue);
    }
  } else {
    clearResults();
  }
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
