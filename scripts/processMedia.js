/*
    
*/

const ffmpeg = require('@ffmpeg/ffmpeg')
const minimist = require('minimist')
const path = require('path')
const argv = minimist(process.argv.slice(2))
const fs = require('fs')