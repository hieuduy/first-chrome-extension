'use strict';

var mainPageURL = 'http://127.0.0.1:8989',
  processPageURL = mainPageURL.concat('/#/process-management?awaiting=S'),
  timeoutURL = mainPageURL.concat('/api/processes/specifications/timeoutConfig'),
  countingURL = mainPageURL.concat('/api/processes/specifications/countByFilter'),
  filter = JSON.stringify({ status: 'incomplete' }),
  dataType = 'json',
  interval = 1; // 1 minutes

var successCallback = function(res) {
  $('#error-message').removeClass('show');
  $('#success-message').removeClass('hide');

  if (res) {
    chrome.browserAction.setBadgeText({text: res + ''});
    chrome.browserAction.setBadgeBackgroundColor({color: 'green'});
  }
};

var errorCallback = function() {
  $('#error-message').addClass('show');
  $('#success-message').addClass('hide');
  chrome.browserAction.setBadgeText({text: '!'});
  chrome.browserAction.setBadgeBackgroundColor({color: 'orange'});
};

function getAwaitingAssignments() {
  $.ajax({
    type: "POST",
    url: countingURL,
    data: filter,
    success: successCallback,
    error: errorCallback,
    dataType: dataType,
    contentType: 'application/json'
  });
}

function doAction(timeout) {
  $('#page-url').val(mainPageURL);
  $('#request-timeout').val(timeout);

  timeout = timeout * 60 * 1000;
  getAwaitingAssignments();
  setInterval(function() { getAwaitingAssignments(); }, timeout);
}

function getTimeoutConfig() {
  if (!interval || parseInt(interval) === 0) {
    $.ajax({
      type: "GET",
      url: timeoutURL,
      success: function(res) {
        doAction(res);
      }
    });
  } else {
    doAction(interval);
  }
}

function getInternalConfig() {
  chrome.storage.sync.get(['dmPageURL', 'dmPageTimeout'], function(config) {
    interval = config.dmPageTimeout;
    mainPageURL = config.dmPageURL ? config.dmPageURL : mainPageURL;
    processPageURL = mainPageURL.concat('/#/process-management?awaiting=S');
    timeoutURL = mainPageURL.concat('/api/processes/specifications/timeoutConfig');
    countingURL = mainPageURL.concat('/api/processes/specifications/countByFilter');
    $('a#success-message').attr('href', processPageURL);

    getTimeoutConfig();
  });
}

function addURLValidation() {
  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });

  $( "#dm-setting-form" ).validate({
    rules: {
      pageUrl: {
        required: true,
        url: true
      }
    }
  });
}

function save() {
  var configObj = {
    'dmPageURL': $('input#page-url').val(),
    'dmPageTimeout': $('input#request-timeout').val()
  };
  chrome.storage.sync.set(configObj);

  getInternalConfig();
}

function clear() {
  $('input#page-url').val('');
  $('input#request-timeout').val('');
}

$(document).ajaxError((e, jqxhr, settings) => {
  if (jqxhr.responseText) {
    try {
      const response = JSON.parse(jqxhr.responseText);
      console.error(response.message);
    } catch (e) {
      console.error(e);
    }
  } else if (jqxhr.status === 0 && jqxhr.readyState === 0) {
    errorCallback();
  }
});

$(document).ready(function() {
  $('#save-btn').click(function() {
    save();
  });

  $('#clear-btn').click(function() {
    clear();
  });

  getInternalConfig();
});