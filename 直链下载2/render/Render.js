function Render (jq) {
	this.$=jq;
};

Render.prototype.css = function(dom,name,value){
	this.$(dom).css(name,value);
	return this;
};

Render.prototype.attr = function(dom,name,value){
	this.$(dom).attr(name,value);
	return this;
};

module.exports=Render;