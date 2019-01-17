(function () {

    /**
     * The main countdowntimer object
     *
     * @type {{}}
     */
    var countdowntimer = {};

    countdowntimer.allowedElementTypes = ['seconds', 'minutes', 'hours', 'days'];

    /**
     * Setting the elements that'll be updated with the time values
     *
     * @param element A CSS selectable identifier
     * @param type  The name of the for the time value that we want to set.
     *              Values: minutes
     *                      seconds
     *                      days
     *                      hours
     */
    countdowntimer.setElement = function (element, type) {
        /**
         * If name is not in the allowed names, we are giving up
         */
        if (countdowntimer.allowedElementTypes.indexOf(type) < 0) {
            this.logger('error', "Specified name '" + type + "' not allowed...")
        }

        /**
         * Document, select the elements for me
         */
        let elements = document.querySelectorAll(element);

        if (elements.length < 1) {
            this.logger("warn", "The element provided '" + element + "' is not found, default will be used and if it too is not found, '" + type + "' will be null");
        }

        this.config[type + "Element"] = elements;

    };

    /**
     * Our own custom logger,
     * although all power to the father console.
     *
     * @param errorType The type of error to produce
     *                  Default: warn
     *                  Values: warn, log and error
     */
    countdowntimer.logger = function (errorType, message) {
        if (errorType == 'error') {
            throw new Error(message);
        } else {
            if (this.config.debug) {
                console[errorType](message);
            }
        }
    }

    /**
     * Get an element based on attribute or tag
     * using css selector
     * @param string data
     */
    countdowntimer.pick = function (data) {
        return document.querySelector('[cdt-' + data + ']');
    };

    /**
     * Update the DOM
     */
    countdowntimer.updateDOM = function () {
        var date = new Date(countdowntimer.config.to);

        remaining = (countdowntimer.daysBetween(new Date(), date));

        countdowntimer.config.hoursElement.forEach(function (hours) {
            hours.innerText = remaining.hours;
        })
        countdowntimer.config.secondsElement.forEach(function (seconds) {
            seconds.innerText = remaining.seconds;
        });
        countdowntimer.config.daysElement.forEach(function (days) {
            days.innerText = remaining.days;
        });
        countdowntimer.config.minutesElement.forEach(function (minutes) {
            minutes.innerText = remaining.minutes;
        })

        return true;
    };

    /**
     * Code snapshot from
     * https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
     * Modified to suit my need
     * @param Date date1 The current date or start date
     * @param Date date2 The stop date or second date
     */
    countdowntimer.daysBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        //take out milliseconds
        difference_ms = difference_ms / 1000;
        var seconds = Math.floor(difference_ms % 60) > 0 ? Math.floor(difference_ms % 60) : 0;
        difference_ms = difference_ms / 60;
        var minutes = Math.floor(difference_ms % 60) > 0 ? Math.floor(difference_ms % 60) : 0;
        difference_ms = difference_ms / 60;
        var hours = Math.floor(difference_ms % 24) > 0 ? Math.floor(difference_ms % 24) : 0;
        var days = Math.floor(difference_ms / 24) > 0 ? Math.floor(difference_ms / 24) : 0;

        countdowntimer.shouldStopTimer = (difference_ms <= 0 ? true : false);


        if (countdowntimer.shouldStopTimer) {

            /**
             * Calling the callback specified by the user if any
             */
            if (countdowntimer.callback != null) {
                countdowntimer.callback();
            }
        }

        return {
            days: (days < 10 ? "0" + days : days),
            hours: hours < 10 ? "0" + hours : hours,
            minutes: minutes < 10 ? "0" + minutes : minutes,
            seconds: seconds < 10 ? "0" + seconds : seconds
        };
    };

    /**
     * Setting callback function
     *
     * @param callable function
     */
    countdowntimer.onFinish = function (callable) {
        countdowntimer.callback = callable;
    }

    /**
     * Start the countdown
     */
    countdowntimer.start = function () {
        var start = setInterval(function () {
                if (countdowntimer.shouldStopTimer) {

                    clearInterval(start);

                } else {
                    countdowntimer.updateDOM();
                }
            }, 1000
        )
    };

    /**
     * Default configuration
     * @type {{daysElement: string, secondsElement: string, debug: boolean, to: number, minutesElement: string, hoursElement: string}}
     */
    countdowntimer.config = {
        to: new Date(new Date().getTime() + 86400000),
        secondsElement: "[cdt-seconds]",
        minutesElement: "[cdt-minutes]",
        hoursElement: "[cdt-hours]",
        daysElement: "[cdt-days]",
        debug: true
    };

    /**
     * A callback function for when time counted down
     */
    countdowntimer.callback = null;

    /**
     * Initializer
     *
     * @param config
     */
    const init = function (config = {}) {
        /**
         * Adding configuration
         */
        for (key in config) {

            if (!countdowntimer.config.hasOwnProperty(key)) continue;

            //Replacing "-" in time string with "/"
            if(key == 'to'){
                countdowntimer.config[key] = config[key].replace(/-/g, "/")
                continue
            }

            countdowntimer.config[key] = config[key]
        }
        countdowntimer.shouldStopTimer = false;

        /**
         * Filling what needs to be filled
         */
        countdowntimer.setElement(config.secondsElement, 'seconds');
        countdowntimer.setElement(config.minutesElement, 'minutes');
        countdowntimer.setElement(config.hoursElement, 'hours');
        countdowntimer.setElement(config.daysElement, 'days');

        /**
         * Returning new instance of the object
         */
        return countdowntimer;
    };

    /**
     * Export
     * @type {function(*=): {}}
     */
    exports.countdowntimer = init;
})()