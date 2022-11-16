'use strict';
var MidtransNew3ds = function() {
  /**
   * @param {!Object} data
   * @return {?}
   */
  function stringify(data) {
    /** @type {string} */
    var valstr = "?";
    /** @type {function(string): string} */
    var encode = encodeURIComponent;
    var i;
    for (i in data) {
      if (data.hasOwnProperty(i)) {
        /** @type {string} */
        valstr = valstr + (encode(i) + "=" + encode(data[i]) + "&");
      }
    }
    return valstr;
  }
  /**
   * @param {string} src
   * @return {undefined}
   */
  function addJsonpScriptToDom(src) {
    /** @type {!Element} */
    var embedscript = document.createElement("script");
    /** @type {string} */
    embedscript.src = src;
    document.getElementsByTagName("head")[0].appendChild(embedscript);
  }
  /**
   * @param {string} message
   * @param {string} e
   * @return {undefined}
   */
  function build(message, e) {
    /** @type {(Element|null)} */
    var a = document.getElementById("midtrans-script");
    if ("" === message) {
      if (a.getAttribute("data-environment")) {
        s = m[a.getAttribute("data-environment").toLowerCase()] + e;
      }
    } else {
      /** @type {string} */
      s = message;
    }
    if (!s) {
      s = m.production + e;
      console.log("Environment on `data-environment` is not found, set to production");
    }
  }
  /**
   * @param {string} val
   * @return {undefined}
   */
  function d(val) {
    /** @type {(Element|null)} */
    var bar_node = document.getElementById("midtrans-script");
    if (!("" !== (placeholder = "" === val ? bar_node.getAttribute("data-client-key") : val) && null !== placeholder)) {
      console.log('Please add `data-client-key` attribute in the script tag <script id="midtrans-script" type="text/javascript" src="...midtrans-new-3ds.min.js" data-client-key="CLIENT-KEY">\x3c/script>');
    }
  }
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function errorHandler(e) {
    var searcher_name = e.origin || e.originalEvent.origin;
    if (e.data && e.data.status_code && e.data.status_message && searcher_name && searcher_name.match(/https?:\/\/[\w\.]+(veritrans|midtrans)\./)) {
      MidtransNew3ds.callback(e.data);
    }
  }
  const m = {
    production : "https://api.midtrans.com",
    sandbox : "https://api.sandbox.midtrans.com",
    staging : "https://api.stg.veritrans.co.id"
  };
  var opts = {};
  var options = {};
  var input = {};
  /** @type {string} */
  var s = "";
  /** @type {string} */
  var placeholder = "";
  return {
    version : "1.2",
    clientKey : "",
    url : "",
    callback : function(data) {
      if (data && "200" == data.status_code) {
        if (opts.onSuccess) {
          opts.onSuccess(data);
        }
      } else {
        if (data && "201" == data.status_code) {
          if (opts.onPending) {
            opts.onPending(data);
          }
        } else {
          if (opts.onFailure) {
            opts.onFailure(data);
          }
        }
      }
    },
    authenticate : function(e, f) {
      if (window.addEventListener) {
        window.addEventListener("message", errorHandler, false);
      } else {
        window.attachEvent("onmessage", errorHandler);
      }
      /** @type {!Object} */
      opts = f;
      if (f.performAuthentication) {
        f.performAuthentication(e);
      }
    },
    getCardToken : function(cardData, cvc) {
      /** @type {!Object} */
      opts = cvc;
      /** @type {string} */
      (options = cardData).callback = "MidtransNew3ds.callback";
      build(MidtransNew3ds.url, "/v2/token");
      d(MidtransNew3ds.clientKey);
      options.client_key = placeholder;
      addJsonpScriptToDom(s + stringify(options));
    },
    redirect : function(method, params) {
      /** @type {string} */
      url = method;
      queryParams = {};
      /** @type {string} */
      queryParams.callback_type = "form";
      if (params.callbackUrl) {
        queryParams.callback_url = params.callbackUrl;
      }
      url = url + stringify(queryParams);
      location.href = url;
    },
    registerCard : function(cardData, successCallback) {
      /** @type {!Object} */
      opts = successCallback;
      /** @type {string} */
      (input = cardData).callback = "MidtransNew3ds.callback";
      build(MidtransNew3ds.url, "/v2/card/register");
      d(MidtransNew3ds.clientKey);
      input.client_key = placeholder;
      addJsonpScriptToDom(s + stringify(input));
    }
  };
}();
