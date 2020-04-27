function myReady(fn){
    //myReady is used to avoid binding function with element which is not already loaded (null pointer error)
    // For modern browser, bind logic callback function to DOMContentLoaded event to make sure every business
    // logic runs after the dom is fully loaded. This is the standard way.
    if ( document.addEventListener ) {
        document.addEventListener("DOMContentLoaded", fn, false);
    } else {
        IEContentLoaded(fn);
    }

    //For IE, version 8 and below, simulate the DOMContentLoaded event
    function IEContentLoaded (fn) {
        var d = window.document;
        var done = false;

        //make sure the user callback function run only once with init()
        var init = function () {
            if (!done) {
                done = true;
                fn();
            }
        };

        (function () {
            try {
                // throw error if DOM tree is not fully loaded, use the famous IE hack: doScroll()
                d.documentElement.doScroll('left');
            } catch (e) {
                // execute every 50ms
                setTimeout(arguments.callee, 50);
                return;
            }
            // DOM tree ready，call the callback function now
            init();
        })();

        //monitor the load status of document
        d.onreadystatechange = function() {
            // if the dom is ready, execute the callback now
            if (d.readyState == 'complete') {
                d.onreadystatechange = null;
                init();
            }
        }
    }
}
