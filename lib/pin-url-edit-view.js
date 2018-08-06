'use babel';
/** @jsx etch.dom */

import etch from 'etch';
import PinUrlItem from './pin-url-item';
import {Disposable} from 'atom';

export default class PinUrlEditView {

  constructor({uri}) {
    this.uri = uri
    etch.initialize(this)
  }

  update() {}

  destroy() {
    return etch.destroy(this)
  }

  labelChanged(newLabel, obj) {
    let oldConfig = JSON.parse(atom.config.get('pin-url.links'))
    let newElementIndex = 0
    Object.values(oldConfig).map((e, i) => {
      if(e.name == obj.name) {
        newElementIndex = i
      }
    })
    let newElement = obj
    newElement.label = newLabel
    oldConfig[newElementIndex] = newElement
    atom.config.set('pin-url.links', JSON.stringify(oldConfig))
  }

  colorChanged(newColor, obj) {
    let oldConfig = JSON.parse(atom.config.get('pin-url.links'))
    let newElementIndex = 0
    Object.values(oldConfig).map((e, i) => {
      if(e.name == obj.name) {
        newElementIndex = i
      }
    })
    let newElement = obj
    newElement.color = newColor
    oldConfig[newElementIndex] = newElement
    atom.config.set('pin-url.links', JSON.stringify(oldConfig))
  }

  linkChanged(newLink, obj) {
    let oldConfig = JSON.parse(atom.config.get('pin-url.links'))
    let newElementIndex = 0
    Object.values(oldConfig).map((e, i) => {
      if(e.name == obj.name) {
        newElementIndex = i
      }
    })
    let newElement = obj
    newElement.link = newLink
    oldConfig[newElementIndex] = newElement
    atom.config.set('pin-url.links', JSON.stringify(oldConfig))
  }

  remove(i) {
    const oldConfig = JSON.parse(atom.config.get('pin-url.links'))
    oldConfig.splice(i, 1)
    atom.config.set('pin-url.links', JSON.stringify(oldConfig))
    etch.update(this)
  }

  addNewConfig() {
    const oldConfig = JSON.parse(atom.config.get('pin-url.links'))
    const newConfig = oldConfig.concat({
      name: 'Config_' + Date.now(),
      label: 'Google',
      link: 'https://www.google.com/',
      color: '#000000'
    })
    atom.config.set('pin-url.links', JSON.stringify(newConfig))
    etch.update(this)
  }

  render() {
    if (JSON.parse(atom.config.get('pin-url.links'))) {
      return (
        <div class="edit-panel">
          <h1>Current links on StatusBar:</h1>
          <span class="edit-add icon icon-plus" onClick={() => this.addNewConfig()} value="Add new URL"/>
          {
            Object.values(JSON.parse(atom.config.get('pin-url.links'))).map((obj, i) => {
              return <PinUrlItem
                name = {obj.name}
                label = {obj.label}
                link = {obj.link}
                color = {obj.color}
                onLabelChanged = {(newLabel) => this.labelChanged(newLabel, obj)}
                onLinkChanged = {(newLink) => this.linkChanged(newLink, obj)}
                onColorChanged = {(newColor) => this.colorChanged(newColor, obj)}
                onRemove = {() => this.remove(i)}
              />
            })
          }
        </div>
      )
    } else {
      return (
        <p>Please reload</p>
      )
    }
  }

  serialize() {
    return {deserializer: this.constructor.name, uri: this.getURI()}
  }

  getURI() {
    return this.uri
  }

  getTitle() {
    return 'Pin Url Editor'
  }

  onDidChangeTitle() {
    return new Disposable(function() {})
  }

  onDidChangeModified() {
    return new Disposable(function() {})
  }

}
