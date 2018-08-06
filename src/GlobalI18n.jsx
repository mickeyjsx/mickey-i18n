import React from 'react'
import invariant from 'invariant'
import { injectIntl } from 'react-intl'

let instance = null

export default @injectIntl class GlobalI18n extends React.Component {
  componentWillMount() {
    if (!instance) {
      instance = this
    }
  }

  render() {
    return React.Children.only(this.props.children) // eslint-disable-line
  }
}

export function isAvailable() {
  return instance != null
}

export function getIntl() {
  return isAvailable() ? instance.props.intl : null
}

export function formatMessage(...args) {
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      isAvailable(),
      '`formatMessage` will available after the root component mounted.',
    )
  }

  return getIntl().formatMessage(...args)
}
