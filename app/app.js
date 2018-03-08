
import notify from './services/notifier';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/scripts/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      // https://developer.mozilla.org/en-US/docs/Web/API/PushManager
      // https://developer.mozilla.org/es/docs/Web/API/PushManager/subscribe
      registration.pushManager.subscribe().then(
        function(push_subscription) {
          console.log('push_subscription', push_subscription);
          // The push subscription details needed by the application
          // server are now available, and can be sent to it using,
          // for example, an XMLHttpRequest.

          // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
          registration.showNotification('Hola caracola', {
            body: 'Using service worker',
            title: 'https://doomus.me/images/favicon.png',
          });
        }, function(error) {
          // During development it often helps to log errors to the
          // console. In a production environment it might make sense to
          // also report information about errors back to the
          // application server.
          console.log(error);
        }
      );
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

window.notifyMe = notify;

notify('Hola caracola', {
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  title: 'https://doomus.me/images/favicon.png',
});
