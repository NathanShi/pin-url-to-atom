/** @babel */
/** @jsx etch.dom */

import {Disposable} from 'atom'
import etch from 'etch'

export default class PinUrlItem {
  constructor(props) {
    this.props = props
    etch.initialize(this)
  }

  update(props) {
    this.props = props
    return etch.update(this)
  }

  onLabelChanged() {
    this.props.onLabelChanged(document.getElementById(`${this.props.name}input_label`).value)
  }

  onLinkChanged() {
    console.log(this.props)
    console.log(document.getElementById(`${this.props.name}input_link`).value)
    this.props.onLinkChanged(document.getElementById(`${this.props.name}input_link`).value)
  }

  onColorChanged() {
    this.props.onColorChanged(document.getElementById(`${this.props.name}input_color`).value)
  }

  onRemove() {
    this.props.onRemove()
  }

  render() {
    return (
      <atom-panel class='padded native-key-bindings'>
        <div class="inset-panel padded block">
          <input type="text" class="input-text inline-block label" id={`${this.props.name}input_label`} value={ this.props.label || "" } placeholder="No label" onchange={() => this.onLabelChanged()}></input>
          <input type="text" class="input-text inline-block link" id={`${this.props.name}input_link`} value={ this.props.link || "" } placeholder="No link" onchange={() => this.onLinkChanged()}></input>
          <input type="color" class="input-color inline-block" id={`${this.props.name}input_color`} value={ this.props.color || "#000000" } onchange={() => this.onColorChanged()}></input>
          <span class="remove icon icon-trashcan inline-block" onClick={() => this.onRemove()} value="Remove"/>
          </div>
      </atom-panel>
    )
  }
}
