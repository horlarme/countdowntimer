var CDT = {
    /**
     * Get an element based on attribute or tag
     * using css selector
     * @param string data
     */
    pick : function(data){
        return document.querySelector('[cdt-' + data + ']');
    },
        
    /**
     * Update the DOM
     */
    updateDOM : function(){
        var hours   = CDT.pick('hours') || false,
            minutes = CDT.pick('minutes') || false,
            days    = CDT.pick('days') || false,
            seconds = CDT.pick('seconds') || false,
            date    = new Date(CDT.pick('date').attributes['cdt-date'].value);

        remaining = (CDT.daysBetween(new Date(), date));
        
        hours.innerText = remaining.hours;
        days.innerText = remaining.days;
        minutes.innerText = remaining.minutes;
        seconds.innerText = remaining.seconds;

        return true;
    },
    
    /**
     * Code snapshot from 
     * https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
     * Modified to suit my need
     * @param Date date1 The current date or start date
     * @param Date date2 The stop date or second date
     */
    daysBetween : function ( date1, date2 ) 
    {
        //Get 1 day in milliseconds
        var one_day=1000*60*60*24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        //take out milliseconds
        difference_ms = difference_ms/1000;
        var seconds = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60; 
        var minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60; 
        var hours = Math.floor(difference_ms % 24);  
        var days = Math.floor(difference_ms/24);
        
        return {
                    days    : days,
                    hours   : hours,
                    minutes : minutes,
                    seconds : seconds
                };
    },

    /**
     * Start the countdown
     */
    start : function(){
        setInterval(function(){
            CDT.updateDOM();
        }, 1000)
    }
}