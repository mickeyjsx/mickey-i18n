/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { LocaleProvider, Select } from 'antd'
import getProvider from 'mickey-i18n'
import antdEn from 'antd/lib/locale-provider/en_US'
import localEn from 'react-intl/locale-data/en'
import localZh from 'react-intl/locale-data/zh'
import 'antd/dist/antd.min.css'
import en from './locales/en.json'
import zh from './locales/zh.json'
import './App.css'

const Option = Select.Option
const langs = {
  zh: {
    locale: 'zh-CN',
    display: '简体中文',
    messages: zh,
    antd: null,
    data: localZh,
  },
  en: {
    locale: 'en-US',
    display: 'English',
    messages: en,
    antd: antdEn,
    data: localEn,
  },
}


export default class App extends React.Component {
  state = {
    lang: langs.zh.locale,
  }

  onLangChange = (lang) => {
    this.setState({ lang })
  }


  render() {
    const { lang } = this.state
    const region = lang.toLowerCase().split(/[_-]+/)[0]
    const locales = langs[region] || langs[lang] || langs.zh
    const I18nProvider = getProvider(region, langs)
    return (
      <LocaleProvider locale={locales.antd}>
        <I18nProvider lang={region} locales={langs}>
          <div id="counter-app">
            <div>
              选择语言<Select onChange={this.onLangChange} value={this.state.lang}>
                {
                  Object.keys(langs).map(key => (
                    <Option key={langs[key].locale} value={langs[key].locale}>
                      {langs[key].display}
                    </Option>
                  ))
                }
              </Select>
            </div>
          </div>
        </I18nProvider>
      </LocaleProvider>
    )
  }
}
