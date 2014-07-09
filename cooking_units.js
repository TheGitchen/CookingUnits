var CookingUnits = (function() {

    var me = {};

    // master list of units and their conversions
    var UNITS = {
        "tsp": {
            "type": "volume",
            "measure": "us",
            "conversion": 1.0
        },
        "tbsp": {
            "type": "volume",
            "measure": "us",
            "conversion": 3.0
        },
        "floz": {
            "type": "volume",
            "measure": "us",
            "conversion": 6.0
        },
        "c": {
            "type": "volume",
            "measure": "us",
            "conversion": 48.0
        },
        "p": {
            "type": "volume",
            "measure": "us",
            "conversion": 96.0
        },
        "q": {
            "type": "volume",
            "measure": "us",
            "conversion": 192.0
        },
        "gal": {
            "type": "volume",
            "measure": "us",
            "conversion": 768.0
        },
        "ml": {
            "type": "volume",
            "measure": "metric",
            "conversion": 0.202884
        },
        "l": {
            "type": "volume",
            "measure": "metric",
            "conversion": 202.884
        },
        "oz": {
            "type": "weight",
            "measure": "us",
            "conversion": 1.0
        },
        "lb": {
            "type": "weight",
            "measure": "us",
            "conversion": 16.0
        },
        "g": {
            "type": "weight",
            "measure": "metric",
            "conversion": 0.035274
        },
        "kg": {
            "type": "weight",
            "measure": "metric",
            "conversion": 35.274
        }
    };

    // when changing ingredient amounts between weight and volume, you have to know the density
    // of the ingredient.  This table is a starting point for that exploration, and typically the
    // conversions are based at sea level and while not all are precise to the number of decimal places
    // required for scientific accuracy, they work pretty well for cooking.

    var DENSITY = {
        "flour": 0.59911,
        "water": 1,
        "eggs": 1,
        "egg_whites": 0.84211,
        "egg_yolks": 1.28378,
        "fat": 0.95,
        "sugar": 1.587,
        "butter": 0.95864,
        "cornstarch": 0.96065,
        "cream": 1.01,
        "oil": 0.91572,
        "vinegar": 1.006,
        "chocolate": 0.9581
    };

    // HTML characters for fractions and their decimal equivalents
    var FRACTIONS = {
        "&#188;": 0.1250,
        "&#189;": 0.5000,
        "&#190;": 0.7500,
        "&#8531;": 0.3333,
        "&#8532;": 0.6667,
        "&#8533;": 0.2000,
        "&#8534;": 0.4000,
        "&#8535;": 0.6000,
        "&#8536;": 0.8000,
        "&#8537;": 0.1666,
        "&#8538;": 0.8333,
        "&#8539;": 0.1250,
        "&#8540;": 0.3750,
        "&#8541;": 0.6250,
        "&#8542;": 0.8750
    };

    // quick lookup if a unit is a weight
    function isWeight(unit) {
        if (UNITS.hasOwnProperty(unit)) {
            return (UNITS[unit].type == "weight");
        } else {
            return false;
        }
    }

    // quick lookup if a unit is a volume
    function isVolume(unit) {
        if (UNITS.hasOwnProperty(unit)) {
            return (UNITS[unit].type == "volume");
        } else {
            return false;
        }
    }


    // convert between units
    // amount is a number
    // fromUnit is a valid key from UNITS
    // toUnit is a valid key from UNITS
    // gravity is number representing the density of the ingredient.
    //   this is optional if conversion is weight-to-weight or volume-to-volume.
    me.convert = function(amount, fromUnit, toUnit, gravity) {

        if (UNITS.hasOwnProperty(fromUnit) && UNITS.hasOwnProperty(toUnit)) {

            var newAmount = amount;
            if (fromUnit != toUnit) {

                if ((isWeight(fromUnit) && isWeight(toUnit)) || (isVolume(fromUnit) && isVolume(toUnit))) {

                    newAmount = amount * UNITS[fromUnit].conversion / UNITS[toUnit].conversion;

                } else {

                    if ((gravity == undefined) || (gravity == 0)) {
                        gravity = 1.0;
                    }

                    if (isVolume(toUnit)) {

                        // convert fromUnit to grams
                        var tempGramWeight = (amount / UNITS["g"].conversion) * UNITS[fromUnit].conversion;
                        var tempVolume = tempGramWeight / gravity;
                        // now it's a vol to vol conversion
                        newAmount = (tempVolume / UNITS[toUnit].conversion) * UNITS["ml"].conversion;

                    } else if (isWeight(toUnit)) {

                        // convert fromUnit to milliliters
                        var tempmLVolume = (amount / UNITS["ml"].conversion) * UNITS[fromUnit].conversion;
                        var tempWeight = tempmLVolume * gravity;
                        // now it's a weight to weight conversion
                        newAmount = (tempWeight / UNITS[toUnit].conversion) * UNITS["g"].conversion;

                    }

                }
            }

            return newAmount;

        } else {

            return false;

        }

    };

    // format the number for display
    // amount is a number
    // unit is a valid key from UNITS
    // by default, this function rounds the float to the number of decimal places specified (defaults to 2)
    // however, if you have enabled fractions and the measurement is not metric, then it will attempt to match
    // the value to one of 15 existing HTML characters for fractions

    me.fraction = function(amount) {

      var baseNum = Math.floor(amount);
      var remainder = amount - baseNum;

      if (remainder < 0.01) {
          return baseNum;
      }

      var fraction = "";

      for (var html in FRACTIONS) {
          var diff = Math.abs(FRACTIONS[html] - remainder);
          if (diff <= 0.001) {
              fraction = html;
          }
      }

      if (fraction == "") {
          return amount;
      } else {
          if (baseNum >= 1) {
            result = baseNum + " " + fraction;
          } else {
            return fraction;
          }
      }

      return result;

    }

    return me;

}());
