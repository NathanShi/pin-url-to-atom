'use babel';

const REGEX = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);

class PinUrlView extends HTMLElement{

  initialize (statusBar, urls) {
    this.urls = urls;
    this.classList.add('pin-url', 'inline-block');
    this.render();
    if (pos == 'Left'){
      statusBar.addLeftTile({ item: this, priority: 1 });
    }
    else{
      statusBar.addRightTile({ item: this, priority: 1 });
    }
  }

  buildItem(url) {
    console.log(url)
		this.hreflink = document.createElement('a');
    this.hreflink.tooltip = atom.tooltips.add(this.hreflink, {title: `${url.link}`});
		this.hreflink.href = url.link;
    this.buildIconOrLink(url.label, url.color)
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
      this.hreflink.classList.add('item');
      this.hreflink.text = label == undefined ? 'URL' : label;
      this.hreflink.style.color = color == undefined ? '#000000' : color;
    }
  }

  render() {
		for (const url of this.urls) {
			this.buildItem(url);
		}
	}

  // Tear down any state and detach
  destroy() {
    this.remove();
  }
}

export default document.registerElement('pin-url', {prototype: PinUrlView.prototype, extends: 'div'});
