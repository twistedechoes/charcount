function __wc_refresh() {
  $('#__wc_display').dialog('open');
  __wc_closed = false;
}

// True means used closed the wc dialog.
var __wc_closed = false;

javascript:(function(){
  // Function: finds selected text on document d.
  // @return the selected text or null
  function f(d){
    var t;
    if (d.getSelection) t = d.getSelection();
    else if(d.selection) t = d.selection.createRange();
    if (t.text != undefined) t = t.text;
    if (!t || t=='') {
      var a = d.getElementsByTagName('textarea');
      for (var i = 0; i < a.length; ++i) {
        if (a[i].selectionStart != undefined && a[i].selectionStart != a[i].selectionEnd) {
          t = a[i].value.substring(a[i].selectionStart, a[i].selectionEnd);
          break;
        }
      }
    }
    return t;
  };
  // Function: finds selected text in document d and frames and subframes of d
  // @return the selected text or null
  function g(d){
    var t;
    try{t = f(d);}catch(e){};
    if (!t || t == '') {
      var fs = d.getElementsByTagName('frame');
      for (var i = 0; i < fs.length; ++i){
        t = g(fs[i].contentDocument);
        if(t && t.toString() != '') break;
      }
      if (!t || t.toString() == '') {
        fs = d.getElementsByTagName('iframe');
        for (var i = 0; i < fs.length; ++i){
          t = g(fs[i].contentDocument);
          if(t && t.toString() != '') break;
        }
      }
    }
    return t;
  };

  function u() {
    var t= g(document);
    display(t);
  }

  // Updates the display with text
  function display(t){
    t = t.toString();
    var display = document.getElementById('__wc_display');
    if (!display) {
      $('<div id="__wc_display"/>').appendTo('body');
      $("#__wc_display").dialog({
        autoOpen: false,
        bgiframe: false,
        height: 60,
        width: 80,
        modal: false,
        show: 'highlight',
        title: 'wc',
        close: onClose});
    }
    $('#__wc_display').html(getWcHtml(stats(t)));
    if (!__wc_closed) {
      __wc_refresh();
    }
  }

  function getWcHtml(stats) {
    var a = [];
    a.push('<div id="wcChars" class="');
    if (stats.chars < 140) {
      a.push('wcCharsLess140');
    } else {
      a.push('wcCharsMore140');
    }
    a.push('">');
    a.push(stats.chars);
    a.push('</div>');
    return a.join('');
  }

  function onClose() {
    __wc_closed = true;
  }

  /**
   * @returns statistics over the given text
   *    {text: the original text,
   *     chars: number of chars,
   *     words: number of words
   *    }
   */
  function stats(t) {
    var chars = t.length;
    var words = t.split(/(\S+)/g).length;
    return {text: t, chars: chars, words: words};
  }
  function addCss(fileName) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", fileName);
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  addCss(__wc_base + 's/jquery-ui-1.7.1.custom.css');
  addCss(__wc_base + 's/main.css');
  u();
  setInterval(u, 500);


})()

