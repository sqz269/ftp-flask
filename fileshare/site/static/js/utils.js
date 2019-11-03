/**
 * Send a XHR Request to a specific url with data
 * @param {string} url the URL to send the XHR Request to 
 * @param {object} data the data that will be send with the request
 * @param {Function} callBack the function that will be called upon the XHR is done
 * @param {string} contentType the Conetent-Type header value (default application/json)
 * @param {string} method the method of the requestion (POST, DELETE etc.) (default POST)
 * @param {boolean} debug if extra infomation will be needed when the request is completed
 */
function sendPostRequest(url, data, callBack, contentType = "application/json", method = "POST", debug = false)
{
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (debug)
                console.log(`XHR Completed; Status: ${xhr.status} | Response: ${xhr.responseText}`);
            callBack(xhr.status, xhr.responseText);
        }
    };
    xhr.send(data);
}

/**
 * Replace a class with another class only if it exists
 * @param {string} element jQuery Selector for the element that will have it's class replaced
 * @param {string} srcClass the class with be replaced
 * @param {string} dstClass the class will be replacing the replaced class
 */
function switchClass(element, srcClass, dstClass)
{
    if ($(element).hasClass(srcClass))
        $(element).removeClass(srcClass).addClass(dstClass);
}

/**
 * Add class to the element if it hasn't exist already
 * 
 * @param {string} elementSelector : JQuery selector for the element
 * @param {string} addClass : Class to be added
 */
function addClassIfNotExist(elementSelector, addClass) {
    if (!($(elementSelector).hasClass(addClass))) {
        $(elementSelector).addClass(addClass);
    }
}

/**
 * Read a cookie with name
 * @param {string} name name of the cookie
 * 
 * @returns {string} the cookie value with the name
 */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}