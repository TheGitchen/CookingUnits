CookingUnits
===================

A simple JS library for converting ingredient amounts. Supports custom density for converting between weight and volume, and also supports basic formatting of numbers as fractions.

There are two functions:

```  JavaScript
CookingUnits.convert(amount, fromUnit, toUnit [, gravity]);
CookingUnits.format(amount);
```

===================

### CookingUnits.convert(amount, fromUnit, toUnit [, gravity])

CookingUnits.convert(amount, fromUnit, toUnit [, gravity]) takes the numeric value of one unit into a numeric value of the other unit.

- *amount* - the numeric amount
- *fromUnit* - the unit you are starting with
- *toUnit* - the unit you want to convert to
- *gravity* _(optional)_ - if converting between weight and volume, this is the density of the ingredient

**EXAMPLE:**


``` JavaScript

// convert 34 tsp to tbsp
var a = CookingUnits.convert(34, "tsp", "tbsp");

// convert between weight and ounces
// In this case, flour has a density of 0.59911

var d = CookingUnits.convert(20, "oz", "c", 0.59911);
results += "20 oz. flour is " + CookingUnits.fraction(d) + " cups<br/>";
// 20 oz. flour is 4 cups

var e = CookingUnits.convert(4.5, "c", "oz", 0.59911);
results += "4.5 cups flour is " + CookingUnits.fraction(e) + " oz.<br/>";
// 4.5 cups flour is 22 ½ oz.

```


===================

### CookingUnits.fraction(amount)

CookingUnits.fraction(amount) attempts to format the number into a string containing HTML fractions.

- *amount* - the numeric amount

**EXAMPLE:**

``` JavaScript

var results = "34 tsp is " + CookingUnits.fraction(a) + " tbsp";
// 34 tsp is 11 ⅓ tbsp

```



#### SUPPORTED UNITS

* "tsp": teaspoons
* "tbsp": tablespoons
* "floz": fluid ounces (US)
* "c": cups (US)
* "p": pints (US)
* "q": quarts (US)
* "gal": gallons (US)
* "ml": milliliters
* "l": liters
* "oz": ounces (US)
* "lb": pounds (US)
* "g" : grams
* "kg" : kilograms
