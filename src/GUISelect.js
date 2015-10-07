﻿var CASTORGUI = CASTORGUI || {};

(function() {
   
    CASTORGUI.GUISelect = function (id, options, guimanager, callback, append) {
    
		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.canvasCss);
		
		if(append == null || append == undefined) { append = true; }
		
		this.id = id;	
		this.className = options.className || "";
		this.html = document.body || document.getElementsByTagName('body')[0];	
		this.selectPosition = {x:options.x, y:options.y};
		this.selectSize = {width:options.w, height:options.h};
		this.zIndex = options.zIndex || 1;
		this.selectVisible = true;
		this.onChangeSelectoptions = callback || false;
		
		if(append == true) {
			this.addElement(append);
		}
	};

	Extends(CASTORGUI.GUISelect, CASTORGUI.GUIManager);
	
	CASTORGUI.GUISelect.prototype.addElement = function(append, element)  {
		var select = document.createElement("select");		
		select.style.width = this.selectSize.width+"px";
		select.style.height = this.selectSize.height+"px";		
		select.style.top = (this.selectPosition.y + this.getCanvasOrigine().top)+"px";
		select.style.left = (this.selectPosition.x + this.getCanvasOrigine().left)+"px";
		select.style.position = "absolute";
		select.id = this.id;	
		select.name = this.id;
		select.className = this.className;
		select.style.zIndex = this.zIndex;
		select.onchange = this.onChangeSelectoptions;
		
		if(append == true) {
			this.html.appendChild(select);	
		} else {
			element.appendChild(select);
		}
		this.addGuiElements(select);
    };	
	
	CASTORGUI.GUISelect.prototype.addOptions = function(value, text) {
		var options = document.createElement("options");
		options.value = value;
		options.innerHTML = text;
		this.getElementById(this.id).appendChild(options);
	};

	CASTORGUI.GUISelect.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };
   
    CASTORGUI.GUISelect.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.selectVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.selectVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUISelect.prototype.isVisible = function() {
		return this.selectVisible;
    };

})();
