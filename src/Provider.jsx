import React from 'react'
import PropTypes from 'prop-types'
import IntlMessageFormat from 'intl-messageformat'
import memoizeFormatConstructor from 'intl-format-cache'
import { IntlProvider, addLocaleData } from 'react-intl'
import GlobalI18n, { isAvailable, formatMessage } from './GlobalI18n'

let getMessage = null
const getMessageFormat = memoizeFormatConstructor(IntlMessageFormat)
const getValuesAsObject = (values = []) => values.reduce((memo, text, index) => ({
  ...memo,
  [index]: text,
}), {})


export class Provider extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    locales: PropTypes.objectOf(PropTypes.shape({
      locale: PropTypes.string.isRequired,
      data: PropTypes.array,
      messages: PropTypes.object,
    })).isRequired,
    children: PropTypes.element.isRequired,
  }

  componentWillMount() {
    const { lang, locales } = this.props
    const locale = locales[lang]
    if (locale && locale.data) {
      addLocaleData([...locale.data])
    }
  }

  render() {
    const { lang, locales, children } = this.props
    const child = React.Children.only(children)
    const { messages } = locales[lang] || {}

    return (
      <IntlProvider locale={lang} messages={messages}>
        <GlobalI18n>
          {child}
        </GlobalI18n>
      </IntlProvider>
    )
  }
}

export function i18n(id, defaultMessage, values) {
  const hasValues = values && Object.keys(values).length > 0
  const valueObj = hasValues ? getValuesAsObject(values) : {}

  if (isAvailable()) {
    return formatMessage({
      id,
      defaultMessage,
    }, valueObj)
  }

  // fallback
  const message = (getMessage && getMessage(id)) || defaultMessage
  if (hasValues) {
    return getMessageFormat(message).format(valueObj)
  }

  return message
}

export default function getProvider(lang, locales) {
  const locale = locales[lang]
  getMessage = id => locale.messages[id]
  return Provider
}
