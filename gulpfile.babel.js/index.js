import gulp from 'gulp';
import { watcher } from './tasks/watch';
import { deleteCssDir, buildCss } from './tasks/css';
import { deleteJsDistDir, buildJs, buildJsAll } from './tasks/js';
import { browsersync } from './tasks/browsersync';
import { webp } from './tasks/img';

//Default
exports.default = gulp.series(watcher, browsersync);
//build CSS&JS
exports.build = gulp.series(
  deleteCssDir,
  deleteJsDistDir,
  buildCss,
  buildJsAll
  );
//画像処理系
exports.webp = webp;
