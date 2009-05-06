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
    if (!t || t == '') {
      $('input[type=text], textarea', d).each(function (i) {
        var s;
        try {
          s = $(this).getSelection().text;
          if (s != '') {
            t = s;
          }
        } catch(e){error(e)}
      });
    }
    return t;
  };
  // Function: finds selected text in document d and frames and subframes of d
  // @return the selected text or null
  function g(d){
    var t;
    try{t = f(d);}catch(e){error(e)};
    if (!t || t == '') {
      $('frame, iframe', d).each(function (i) {
        t = g(this.contentDocument);
      });
    }
    return t;
  };

  function u() {
    if (!jQuery) return; // jQuery isn't ready yet.
    var t = g(document);
    display(t);
  }

  // Updates the display with text
  function display(t){
    var display = document.getElementById('__wc_display');
    if (!display) {
      $('<div id="__wc_display"/>').appendTo('body');
      $("#__wc_display").dialog({
        autoOpen: false,
        bgiframe: false,
        height: 80,
        width: 100,
        modal: false,
        show: 'highlight',
        title: 'Count',
        close: onClose});
    }
    if (!t) return;
    var s = stats(t.toString());
    if (s.chars == 0) {
      return;
    }
    $('#__wc_display').html(getWcHtml(s));
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

  function error(m) {
    if (window.console && window.console.error) {
      window.console.error(m);
    }
  }

  addCss(__wc_base + 's/jquery-ui-1.7.1.custom.css');
  addCss(__wc_base + 's/main.css');
  u();
  setInterval(u, 500);
})()

