/*
 *
 * Café
 *
 * A javascript class that helps you organise your code using the MVC model
 *
 * @author David Mongeau-Petitpas <dmp@commun.ca>
 * @version 0.1
 *
 *
 */
var Cafe = { 

	/*
	 *
	 * Init function
	 *
	 */
	'init' : function() {
		
	}
};

/*
 *
 * Check if jQyery is loaded
 *
 */
Cafe.hasjQuery = function(){return (jQuery)?true:false;};

/*
 *
 * Simple extend function
 *
 */
Cafe.extend = function(obj1,obj2) {
	if(Cafe.hasjQuery()) {
		return jQuery.extend(obj1,obj2); 
	}
	
	if (arguments.length > 2) {
		for (var a = 1; a < arguments.length; a++) {
			extend(obj1, arguments[a]);
		}
	} else {
		for (var i in obj2) {
			obj1[i] = obj2[i];
		}
	}
	return obj1;
};