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
var Cafe; if(!Cafe) Cafe = {};
if(!Cafe.path) Cafe.path = {};
if(!Cafe.currentPath) Cafe.currentPath = null;
if(!Cafe.controllers) Cafe.controllers = {};

/*
 *
 * Init function
 *
 */
Cafe.init = function(path, context, config) {
	
	Cafe.DOMReady.add(function (){
		
		if(!context) { context = document.body; }
		
		Cafe.route(path);
		Cafe.run(context);
	});
	
	
};

/*
 *
 * Route function
 *
 */
Cafe.route = function(path) {
	if(typeof(path) == 'string') {
		var parts = Cafe.trim(path,'/').toLowerCase().split('/');
		if(!parts || !parts.length){return false;}
		if(!parts[0] || !parts[0].length) {
			parts[0] = 'default';
		}
		path = parts;
	}
	
	if(!Cafe.hasController(path.join('/'))) {
		return false;
	}
	
	Cafe.currentPath = path.join('/');
	
};

/*
 *
 * Run function
 *
 */
Cafe.run = function(context) {
	
	Cafe.runController(context);
	
};

/*
 *
 * Push controllers to cafe
 *
 */
Cafe.push = function(controllers) {
	
	for (var name in controllers) {
		controller = Cafe.trim(name,'/').toLowerCase();
		Cafe.controllers[controller] = controllers[name];
	}
	
};

/*
 *
 * Run the current controller
 *
 */
Cafe.runController = function(context) {
	
	if(Cafe.currentPath && Cafe.controllers[Cafe.currentPath]) {
		Cafe.controllers[Cafe.currentPath].call(Cafe, context);
	}
	
};

/*
 *
 * Check if controller exists
 *
 */
Cafe.hasController = function(path) {
	
	return !Cafe.controllers[path.toLowerCase()] ? false:true;
	
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



// http://kevin.vanzonneveld.net
// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   improved by: mdsjack (http://www.mdsjack.bo.it)
// +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
// +      input by: Erkekjetter
// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +      input by: DxGx
// +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
// +    tweaked by: Jack
// +   bugfixed by: Onno Marsman
Cafe.trim = function(str, charlist) {
    var whitespace,l=0,i=0;str+="";charlist?(charlist+="",whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1")):whitespace=" \n\r\t\u000c\u000b\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";l=str.length;for(i=0;i<l;i++)if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(i);break}l=str.length;for(i=l-1;i>=0;i--)if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(0,i+1);break};return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

/*!
 * DOMReady
 *
 * Cross browser object to attach functions that will be called
 * immediatly when the DOM is ready.
 *
 * @version   1.0
 * @author    Victor Villaverde Laan
 * @link      http://www.freelancephp.net/domready-javascript-object-cross-browser/
 * @license   MIT license
 */
Cafe.DOMReady=function(){var b=[],e=!1,d=null,c=function(a){if(typeof a=="string")return function(){eval(a)};return a},f=function(){e=!0;for(var a=0;a<b.length;a++)try{b[a]()}catch(c){d&&d(c)}};this.setOnError=function(a){d=c(a);return this};this.add=function(a){a=c(a);e?a():b[b.length]=a;return this};window.addEventListener?document.addEventListener("DOMContentLoaded",function(){f()},!1):function(){if(document.uniqueID||!document.expando){var a=document.createElement("document:ready");try{a.doScroll("left"),
f()}catch(b){setTimeout(arguments.callee,0)}}}();return this}();