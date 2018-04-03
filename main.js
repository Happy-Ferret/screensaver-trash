/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

'use strict';

const { classes: Cc, interfaces: Ci, results: Cr, utils: Cu } = Components;
const { console } = Cu.import('resource://gre/modules/Console.jsm', {});
const { Runtime } = Cu.import('resource://qbrt/modules/Runtime.jsm', {});
const { Services } = Cu.import('resource://gre/modules/Services.jsm', {});

const WINDOW_URL = 'chrome://app/content/index.html';

const WINDOW_FEATURES = [
  'dialog=no',
  'all',
].join(',');

// On startup, activate ourselves, since starting up from Node doesn't do this.
// TODO: do this by default for all apps started via Node.
if (Services.appinfo.OS === 'Darwin') {
  Cc['@mozilla.org/widget/macdocksupport;1'].getService(Ci.nsIMacDockSupport).activateApplication(true);
}

const window = Services.ww.openWindow(null, WINDOW_URL, '_blank', WINDOW_FEATURES, null);
Runtime.openDevTools(window);
dump('main.js loaded!');

window.addEventListener('keypress', (event) => {
  window.close();
});

window.fullScreen = true;