'use strict'
/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    }
  }
}
