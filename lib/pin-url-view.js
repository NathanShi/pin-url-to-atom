'use babel';

const REGEX = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);

class PinUrlView extends HTMLElement{

  initialize (statusBar, links, labels, colors, pos) {
    this.links = links;
		this.labels = labels;
		this.colors = colors;
    this.classList.add('pin-url', 'inline-block');
    this.render();
    if (pos == 'Left'){
      statusBar.addLeftTile({ item: this, priority: 1 });
    }
    else{
      statusBar.addRightTile({ item: this, priority: 1 });
    }
  }

  buildItem(link, label, color) {
		this.hreflink = document.createElement('a');
    this.hreflink.tooltip = atom.tooltips.add(this.hreflink, {title: `${link}`});
		this.hreflink.href = link;
    this.buildIconOrLink(label, color)
		this.appendChild(this.hreflink);
	}

  buildIconOrLink(label, color){
    if (label.match(REGEX)){
      var img = new Image();
      img.src = label;
      img.style.height = '20px';
      img.style.width = '25px';
      this.hreflink.appendChild(img);
    }
    else{
      this.hreflink.classList.add('pin-url-item');
      this.hreflink.text = label == undefined ? 'URL' : label;
      this.hreflink.style.color = color == undefined ? '#000000' : color;
    }
  }

  render() {
		for (const loadLink of this.links) {
			this.buildItem(loadLink, this.labels[this.links.indexOf(loadLink)], this.colors[this.links.indexOf(loadLink)]);
		}
	}

  // Tear down any state and detach
  destroy() {
    this.remove();
  }
}

export default document.registerElement('pin-url', {prototype: PinUrlView.prototype, extends: 'div'});
