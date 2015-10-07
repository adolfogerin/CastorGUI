﻿var CASTORGUI = CASTORGUI || {};
var guiElements = [];

var objectCreate = function(proto) { //Alternative aux anciens navigateurs qui ne dispose pas de la methode Object.create()
	function construct() { }
	construct.prototype = proto;
	return new construct();
};
var Extends = function(ChildClass, ParentClass) { // ClassB (child) herite de classA (parent)
	ChildClass.prototype = Object.create(ParentClass.prototype) || objectCreate(ParentClass.prototype);
	ChildClass.prototype.constructor = ChildClass;
};

(function()
{     
	CASTORGUI.GUIManager = function(canvas, css) {		
		this.canvasCss = css;
		this.canvas = canvas;		
		this.groups = [];
		this.guiVisible = true;
		this.style = null;
		this.head = document.head || document.getElementsByTagName('head')[0] || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		if(this.head == null) {
			this.header = document.createElement('head');
			this.head.appendChild(this.header);
		}				
		this.addStyle(this.canvasCss);
    };
	
	CASTORGUI.GUIManager.prototype.addGuiElements = function(elem)
	{
		guiElements.push(elem);
	};
	
	CASTORGUI.GUIManager.prototype.addStyle = function(css)
	{
		if(this.style) {
			this.head.removeChild(this.getElementById("styleGUI")); 
			this.canvasCss = this.canvasCss+css;
		} else {
			this.canvasCss = this.canvasCss;
		}
		this.style = document.createElement('style');
		this.style.type = 'text/css';
		this.style.media = 'screen';
		this.style.id = "styleGUI";
		if (this.style.styleSheet){
			this.style.styleSheet.cssText = this.canvasCss;
		} else {
			this.style.appendChild(document.createTextNode(this.canvasCss));
		}
		this.head.appendChild(this.style);		
	};
	
	CASTORGUI.GUIManager.prototype.fadeOut = function(el) {
		el.style.opacity = 1;
		(function fade_moin() {
			if ((el.style.opacity -= 0.1) < 0.1) {
				el.style.display = "none";
				el.style.opacity = 0;
			} else if(el.style.opacity > 0) {
				requestAnimationFrame(fade_moin);
			}
		})();
	};

	CASTORGUI.GUIManager.prototype.fadeIn = function(el){
		el.style.opacity = 0;
		el.style.display = "block";
		(function fade_plus() {
			var val = parseFloat(el.style.opacity);
			if (!((val += 0.1) > 0.9)) {
				el.style.opacity = 1;
				requestAnimationFrame(fade_plus);
			}
		})();
	};
	
	CASTORGUI.GUIManager.prototype.getElementById = function(id) {
		return document.getElementById(id);
    };
	
	CASTORGUI.GUIManager.prototype.getCanvasOrigine = function() {
        var offsets = this.canvas.getBoundingClientRect(),
		offsetsTop = offsets.top || 0,
		offsetsLeft = offsets.left || 0;
		return {top:offsetsTop, left:offsetsLeft};
    };
	
	CASTORGUI.GUIManager.prototype.getCanvasWidth = function() {
		var offsets = this.canvas.getBoundingClientRect(),
		offsetsWidth = offsets.width || 0,
		offsetsHeight = offsets.height || 0;
		return {width:offsetsWidth, height:offsetsHeight};
	};
		
    CASTORGUI.GUIManager.prototype.dispose = function() {
		var that = this;		
		guiElements.forEach(function(e) {			
			if(that.getElementById(e.id)) {
				that.html.removeChild(that.getElementById(e.id));
			}
		});	
		return;
    };
   
    CASTORGUI.GUIManager.prototype.setVisible = function(bool, fade) {
		var display;
		var that = this;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.guiVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.guiVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { 
			guiElements.forEach(function(e) {	
				that.getElementById(e.id).style.display = display;
			});
		}		
    };	
	
	CASTORGUI.GUIManager.prototype.isVisible = function() {
		return this.guiVisible;
    };
	
})();
