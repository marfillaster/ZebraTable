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
		var rows =  $chk(table.getElement('tbody')) ? table.getElement('tbody').getElements('tr') : table.getElements('tr');
		rows.each(function(tr,i) {
			/* check to see if the row has th's
				if so, leave it alone
				if not, move on */
			if(tr.getFirst().get('tag') != 'th') {
				/* set the class for this based on odd/even */
				var self = this, klass = i % 2 ? self.options.even : self.options.odd;
				if(!tr.hasClass(klass)) tr.addClass(klass);
				

				
				/* start the events! */
				tr.addClass(klass).addEvents({
					/* mouseenter */
					mouseenter: function () {
						tr.addClass(self.options.cssHighlight);
					},
					/* mouseleave */
					mouseleave: function () {
						tr.removeClass(self.options.cssHighlight)
						
					},
					/* click */
					click: function(e) {
						self.selected.each(function(el) {
							if(el.hasClass(self.options.cssMouseEnter)) el.removeClass(self.options.cssMouseEnter);
						});
						
						if(e.control) {
							if(self.selected.every(function(el) {return el != tr})) self.selected.push(tr);
							else self.selected = self.selected.filter(function(el) {return el != tr});								
						}	
						else {
							self.selected = [];
							self.selected.push(tr);
						}	
						self.selected.each(function(el) {el.addClass(self.options.cssMouseEnter)});
					}
				});
			}
		},this);
	}
});