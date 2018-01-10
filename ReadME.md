# CountDownTimer
Start coundown with ease using this javascript file.

## Installation
- Download the file 'countdowntimer.js' and include it in your html file
```html
<head>
    <title></title>
    <script src="./countdowntimer.js"></script>
</head>
```

## Configuration
- Attach date to any element using this attribute 'dct-date' with the date as value '2018 01 20'
```html
    <p dct-date="2017 01 20"></p>
```
- Set the element to display the count down as follows
```html
    <p>Days: <span cdt-days></span></p>
    <p>Hours: <span cdt-hours></span></p>
    <p>Minutes <span cdt-minutes></span></p>
    <p>Seconds: <span cdt-seconds></span></p>
```
Note that month should start with 0 and not 1.
This means January is 0 and February is 1 making December 11

- Start the countdown
```html
    <script>
        DCT.start();
    </script>
```
Then all is set, sit back and see your count down in action.