import gulp from 'gulp';
import { globs, paths } from '../config.js';
//エラーでgulpが終了するのを止める
import plumber from 'gulp-plumber';
//webp生成
import gulpWebp from 'gulp-webp';
import rename from 'gulp-rename';

//WebPへ変換
function webp() {
  return gulp
  .src(globs.toWebp,{
    allowEmpty : true,
    since      : gulp.lastRun(webp)
  })
  .pipe(rename((path) => {
    path.basename += path.extname;
  }))
  .pipe(gulpWebp())
  .pipe(gulp.dest(paths.imageDir));
}
exports.webp = webp;
