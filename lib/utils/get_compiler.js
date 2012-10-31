require('coffee-script');

var path = require('path'),
    readdirp = require('readdirp');

module.exports = function(file_type){
  result = false;

  // look in core first
  require('../compilers').all.forEach(function(compiler){
    if (compiler.settings.file_type == file_type) { result = compiler; }
  });

  // then look in the plugins folder
  var plugin_path = path.join(current_directory + '/vendor/plugins');

  readdirp({ root: plugin_path, fileFilter: '*.js' }, function(err, res){
    res.files.forEach(function(file){
      var compiler = require(path.join(plugin_path, file));
      if (compiler.settings.file_type == file_type) { result = compiler; }
    }
  }

  return result
}