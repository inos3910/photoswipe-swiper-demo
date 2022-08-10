//Task:Watch
import gulp            from 'gulp'
import { globs }       from '../config'
import { buildCss }    from './css'
import { buildJs }     from './js'
import { reload }      from './html'
import { browsersync, browsersyncStream } from './browsersync'

const watcher = (done) => {
  gulp.watch(globs.sass, buildCss);
  gulp.watch(globs.js, buildJs);
  gulp.watch(globs.html, reload);
  done();
}

exports.watcher = watcher;