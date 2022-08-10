import {paths} from '../config';
import browserSync from 'browser-sync';

function browsersync(done) {
  browserSync.init({
    proxy        : paths.serverDir,
    open         : 'external'
  });
  done();
}
exports.browsersync = browsersync;

function browsersyncStream(done){
  browserSync.reload({
    stream: true
  });
  done();
}
exports.browsersyncStream = browsersyncStream;