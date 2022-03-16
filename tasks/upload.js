var gulp     = require('gulp');
var shopify  = require('@bva/gulp-shopify-upload');
var watch    = require('gulp-watch');
var path     = require('path');
const fs     = require('fs')
const dotenv = require('dotenv')
var envPath = process.env.ENV 
? path.resolve(__dirname, '../.env.' + process.env.ENV) 
: path.resolve(__dirname, '../.env');

if(envPath && fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

var config = [
  process.env.PASSWORD,
  process.env.URL,
  process.env.THEME_ID
];

const options = {
  basePath: 'dist/',
};

gulp.task('upload:deploy', () => {
  return gulp.src(['dist/**/*']).pipe(shopify(...config, options));
});

gulp.task('upload:watch', () => {
  return watch(['dist/**/*']).pipe(shopify(...config, options));
});
