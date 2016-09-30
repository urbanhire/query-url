'use strict'
const _ = require('lodash')

exports.getKeywordFromUrl = (params) => {
  var wordPath = _.result(params, 'url').replace(/\//g, '')
  var stopWords = (!_.isEmpty(_.result(params, 'stopWords'))) ? params.stopWords : ['lowongan', 'kerja', 'kota', 'jobs', 'job', 'and', 'or', 'provinsi', 'wilayah']
  // Splitting location and job query
  var splitter = (!_.isEmpty(_.result(params, 'splitter'))) ? params.splitter : ['-di-', '-in-']

  for (var i = 0; i < splitter.length; i++) {
    if (_.result(params, 'url').indexOf(splitter[i]) >= 0) {
      var criteria = _.split(wordPath, splitter[i])
      var q = querySplitter(_.split(_.nth(criteria, 0), '-'))
      var lokasi = querySplitter(_.split(_.nth(criteria, 1), '-'))
      return {
        q: _.replace(q, /\sor|\sand/, ''),
        location: lokasi
      }
    }
  }

  return {
    q: querySplitter(wordPath.split('-')).replace(/\sor|\sand/, '')
  }

  function querySplitter (words) {
    return _.filter(words, (word) => {
      return !_.includes(stopWords, word) && !_.isEmpty(word)
    }).toString().replace(/,/g, ' ')
  }
}
