'use babel';

class PinUrlView extends HTMLElement{

  initialize (statusBar) {
    this.links = atom.config.get('pin-url.linksArray').split(';');
		this.labels = atom.config.get('pin-url.labelsArray').split(';');
		this.colors = atom.config.get('pin-url.colorsArray').split(';');
    this.classList.add('pin-url', 'inline-block');
    this.render();
    statusBar.addLeftTile({ item: this, priority: 1 });
  }

  buildItem(link, label, color) {
		this.xlink = document.createElement('a');
		this.xlink.href = link;
		this.xlink.classList.add('pin-url-item');
		this.xlink.text = label;
		this.xlink.style.color = color
		this.appendChild(this.xlink);
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