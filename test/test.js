'use strict'
var assert = require('chai').assert
var should = require('chai').should()
var describe = require('mocha').describe
var it = require('mocha').it
var queryUrl = require('../queryurl')

describe('Query Url', () => {
  it('/lowongan-kerja-software-engineer-di-jakarta-barat', (done) => {
    var query = queryUrl.getKeywordFromUrl({
      url: '/lowongan-kerja-software-engineer-di-jakarta-barat'
    })
    should.exist(query.q)
    should.exist(query.location)
    assert.equal(query.q, 'software engineer')
    assert.equal(query.location, 'jakarta barat')            
  	done()
  })
  it('/lowongan-kerja-programmer', (done) => {
    var query = queryUrl.getKeywordFromUrl({
      url: '/lowongan-kerja-programmer'
    })
    should.exist(query.q)
    should.not.exist(query.location)
    assert.equal(query.q, 'programmer')
    done()
  })
  it('/q-designer-l-jakarta-jobs', (done) => {
    var query = queryUrl.getKeywordFromUrl({
      url: '/q-designer-l-jakarta-jobs'
    })
    should.exist(query.q)
    assert.equal(query.q, 'designer')
    should.exist(query.location)
    assert.equal(query.location, 'jakarta')    
    done()
  })
  it('/l-jakarta-jobs', (done) => {
    var query = queryUrl.getKeywordFromUrl({
      url: '/l-jakarta-jobs'
    })
    should.exist(query.q)
    assert.equal(query.q, '')
    should.exist(query.location)
    assert.equal(query.location, 'jakarta')    
    done()
  })
})