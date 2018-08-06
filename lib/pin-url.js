'use babel';

import PinUrlView from './pin-url-view';
import PinUrlEditView from './pin-url-edit-view';
import { CompositeDisposable } from 'event-kit';

export default {
  config: {
    leftOrRight:{
      title: 'Left or right',
  		type: 'string',
  		default: 'Left',
      enum: ['Left', 'Right'],
  		description: 'Pin URLs to left or right',
  		order: 1
    },
    links: {
      title: 'Link JSONs',
      description: 'Configure your URLs here',
      type: 'string',
      default: '[{"name":"Config 1","label":"https://facebook.com/favicon.ico","link":"https://facebook.com","color":"#e0fcf0"}]',
      order: 2
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

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pin-url:editConfig': () => this.editConfig()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.pinUrlView.destroy();
  },

  consumeStatusBar (statusBar) {
    pos =  atom.config.get('pin-url.leftOrRight')
    urls = JSON.parse(atom.config.get('pin-url.links'));
    this.pinUrlView.initialize(statusBar, urls);
  },

  showConfig() {
    atom.workspace.open('atom://config/packages/pin-url');
  },

  editConfig(){
    let tbev = new PinUrlEditView('atom://pin-url-edit-view')
    atom.workspace.open(tbev)
  }

};
