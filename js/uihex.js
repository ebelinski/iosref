(function() {
  "use strict";

  // Accepts an optional "#" or "0x" prefix followed by 3, 6, or 8 hex digits.
  var HEX_PATTERN = /^(?:#|0x)?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

  var input;
  var results;
  var activePreview;

  var outputs = {
    colorLiteral: null,
    color: null,
    uicolorLiteral: null,
    uicolor: null,
    uicolorObjectiveC: null
  };

  document.addEventListener("DOMContentLoaded", function() {
    input = document.getElementById("hex-value");
    results = document.getElementById("results");
    activePreview = document.querySelector(".color-preview.active");

    outputs.colorLiteral = document.getElementById("color-literal-code");
    outputs.color = document.getElementById("color-code");
    outputs.uicolorLiteral = document.getElementById("uicolor-literal-code");
    outputs.uicolor = document.getElementById("uicolor-code");
    outputs.uicolorObjectiveC = document.getElementById("uicolor-objective-c-code");

    // On page load, focus on hex value input.
    input.focus();

    // "input" rather than "keyup" so that pasting with the mouse and browser
    // autofill are picked up too.
    input.addEventListener("input", function() {
      processValue(this.value);
    });

    // Process any value already present, e.g. after a browser restores form
    // state on reload.
    processValue(input.value);

    document.addEventListener("click", function(event) {
      var button = event.target.closest("[data-clipboard-target]");
      if (button) {
        copyFromTarget(button.getAttribute("data-clipboard-target"));
      }
    });
  });

  function processValue(value) {
    var match = HEX_PATTERN.exec(value.trim());

    if (!match) {
      clearResults();
      return;
    }

    var hex = match[1].toLowerCase();
    var expanded = expandToEightDigits(hex);

    var red = getColorFraction(expanded.substring(0, 2));
    var grn = getColorFraction(expanded.substring(2, 4));
    var blu = getColorFraction(expanded.substring(4, 6));
    var alp = getColorFraction(expanded.substring(6, 8));

    results.style.display = "block";

    // SwiftUI

    setText(outputs.colorLiteral,
      "Color(#colorLiteral(red: " + red + ", green: " + grn + ", blue: " + blu + ", alpha: " + alp + ")) // #" + hex);

    if (alp === 1) {
      setText(outputs.color,
        "Color(red: " + red + ", green: " + grn + ", blue: " + blu + ") // #" + hex);
    } else {
      setText(outputs.color,
        "Color(red: " + red + ", green: " + grn + ", blue: " + blu + ", opacity: " + alp + ") // #" + hex);
    }

    // UIKit

    setText(outputs.uicolorLiteral,
      "#colorLiteral(red: " + red + ", green: " + grn + ", blue: " + blu + ", alpha: " + alp + ") // #" + hex);

    setText(outputs.uicolor,
      "UIColor(red: " + red + ", green: " + grn + ", blue: " + blu + ", alpha: " + alp + ") // #" + hex);

    setText(outputs.uicolorObjectiveC,
      "[UIColor colorWithRed:" + red + " green:" + grn + " blue:" + blu + " alpha:" + alp + "]; // #" + hex);

    activePreview.style.borderColor = "black";
    activePreview.style.backgroundColor = "#" + hex;
  }

  function clearResults() {
    results.style.display = "none";

    activePreview.style.borderColor = "white";
    activePreview.style.backgroundColor = "white";
  }

  function setText(element, text) {
    element.textContent = text;
  }

  /// Expands a 3- or 6-digit hex value to the 8-digit RRGGBBAA form.
  ///
  /// - Parameter hex: A validated string of 3, 6, or 8 hex digits.
  ///
  /// - Returns: A string of 8 hex digits.
  function expandToEightDigits(hex) {
    if (hex.length === 8) {
      return hex;
    } else if (hex.length === 6) {
      return hex + "ff";
    }

    return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + "ff";
  }

  /// Converts a two-digit hexadecimal value to its 0–1 fraction, rounded to
  /// three decimal places. (E.g. "ff" to 1, "80" to 0.502.)
  ///
  /// - Parameter hex: A string containing two hexadecimal digits.
  ///
  /// - Returns: A number between 0 and 1.
  function getColorFraction(hex) {
    return Math.round(parseInt(hex, 16) / 255 * 1000) / 1000;
  }

  function copyFromTarget(selector) {
    var target = document.querySelector(selector);
    if (!target) return;

    var text = target.textContent;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(function() {
        copyUsingSelection(target);
      });
    } else {
      copyUsingSelection(target);
    }
  }

  function copyUsingSelection(target) {
    var selection = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand("copy");
    } catch (error) {
      // Nothing further we can do; leave the text selected so it can be
      // copied manually.
      return;
    }

    selection.removeAllRanges();
  }
})();
