/*
---
description:     ZebraTable

authors:
  - David Walsh (http://davidwalsh.name)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - ZebraTable
...
*/
var ZebraTable = new Class({
	/* implements */
	Implements: [Options],

	/* options */
	options: {
		elements: 'table.list-table',
		cssEven: 'even',
		cssOdd: 'odd',
		cssHighlight: 'highlight',
		cssMouseEnter: 'mo'
	},

	/* initialization */
	initialize: function(options) {
		/* set options */
		this.setOptions(options);

                self.selected = [];
		/* zebra-ize! */
		$$(this.options.elements).each(function(table) {
			this.zebraize(table);
		},this);
	},

	/* a method that does whatever you want */
	zebraize: function(table) {
		/* for every row in this table... */
		table.getElements('tr').each(function(tr,i) {
			/* check to see if the row has th's
				if so, leave it alone
				if not, move on */
			if(tr.getFirst().get('tag') != 'th') {
				/* set the class for this based on odd/even */
				var self = this, klass = i % 2 ? self.options.even : self.options.odd;
				/* start the events! */
				tr.addClass(klass).addEvents({
					/* mouseenter */
					mouseenter: function () {
						if(!tr.hasClass(self.options.cssHighlight)) tr.addClass(self.options.cssMouseEnter).removeClass(klass);
					},
					/* mouseleave */
					mouseleave: function () {
						if(!tr.hasClass(self.options.cssHighlight)) tr.removeClass(self.options.cssMouseEnter).addClass(klass);
					},
					/* click */
					click: function() {
            self.selected.each(function(el) {
							if(el.hasClass(self.options.cssMouseEnter)) el.removeClass(self.options.cssMouseEnter);
						});
						
						if(e.control) {
							if(self.selected.every(function(el) {return el != tr;})) self.selected.push(tr);
							else self.selected = self.selected.filter(function(el) {return el != tr;})	
						}	
						else {
							self.selected = [];
							self.selected.push(tr);
						}	
						
						self.selected.each(function(el) {
							el.addClass(self.options.cssMouseEnter);
						});						
					}
				});
			}
		},this);
	}
});