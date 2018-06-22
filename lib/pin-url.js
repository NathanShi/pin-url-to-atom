'use babel';

import PinUrlView from './pin-url-view';
import { CompositeDisposable } from 'event-kit';

export default {
  config: {
    linksArray: {
      title: 'List of links',
      type: 'string',
      default: 'https://facebook.com;',
      description: 'Separate labels with ";"',
      order: 1
    },
    labelsArray:{
      title: 'List of labels',
      type: 'string',
      default: 'Facebook;',
      description: 'Separate labels with ";"',
      order: 2
    },
    colorsArray:{
      title: 'List of colors',
      type: 'string',
      default: '#3B5998;',
      description: 'Separate labels with ";"',
      order: 3
    },
    leftOrRight:{
      title: 'Left or right',
  		type: 'string',
  		default: 'Left',
      enum: ['Left', 'Right'],
  		description: 'Pin URLs to left or right',
  		order: 4
    }
  },

  pinUrlView: null,
  subscriptions: null,
  statusBar: null,

  activate() {
    this.pinUrlView = new PinUrlView();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that showConfigs
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pin-url:showConfig': () => this.showConfig()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.pinUrlView.destroy();
  },

  consumeStatusBar (statusBar) {
    links = atom.config.get('pin-url.linksArray').split(';');
		labels = atom.config.get('pin-url.labelsArray').split(';');
		colors = atom.config.get('pin-url.colorsArray').split(';');
    pos =  atom.config.get('pin-url.leftOrRight')
    this.pinUrlView.initialize(statusBar, links, labels, colors, pos);
  },

  showConfig() {
    atom.workspace.open('atom://config/packages/pin-url');
  }

};
