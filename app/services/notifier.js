
function _grantPermission (callback) {
  if( Notification.permission === 'granted' ) callback();
  else if (Notification.permission !== 'denied') Notification.requestPermission(callback);
  else throw new Error('_grantPermission error' + Notification.permission);
}

export default function notify (title, options, callback) {
  _grantPermission(function () {
    new Notification(title, options || {});
    if( typeof callback === 'function' ) callback();
  });
}
