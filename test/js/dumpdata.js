function dumpModernizr(){
  var str = '';
  dumpModernizr.old = dumpModernizr.old || {};

    for (var prop in Modernizr) {

      // skip previously done ones.
      if (dumpModernizr.old[prop]) continue;
      else dumpModernizr.old[prop] = true;
                
      if (typeof Modernizr[prop] === 'function') continue;
      
      if (~TEST.inputs.indexOf(prop)) {
        str += '<li><b>'+prop+'{}</b><ul>';
        for (var field in Modernizr[prop]) {
          str += '<li class="' + (Modernizr[prop][field] ? 'yes' : '') + '">' + field + ': ' + Modernizr[prop][field] + '</li>';
        }
        str += '</ul></li>';
      } else {
        str += '<li  id="'+prop+'" class="' + (Modernizr[prop] ? 'yes' : '') + '">' + prop + ': ' + Modernizr[prop] + '</li>';
      }
  }
  return str;
}


function grabFeatDetects(){
  // thx github.js
  gh.object("Modernizr", "Modernizr").blobAll('master', function (data) { 
    
    var filenames = [];

    for (var file in data.blobs){
      var match = file.match(/^feature-detects\/(.*)/);
      if (!match) continue;
      filenames.push('../' + match[0]);
    }

    var jqxhrs = filenames.map(function(filename){
      return jQuery.getScript(filename);
    });

    jQuery.when.apply(jQuery, jqxhrs).done(resultsToDOM);

  });
}

function resultsToDOM(){
  var modOutput = document.createElement('div'),
      ref = document.getElementById('qunit-testresult') || document.getElementById('qunit-tests');

  modOutput.className = 'output';
  modOutput.innerHTML = dumpModernizr();
  if (Modernizr.csscolumns) ref.parentNode.insertBefore(modOutput, ref);
}

resultsToDOM();

grabFeatDetects();


