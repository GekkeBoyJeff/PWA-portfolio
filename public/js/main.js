// This code checks if the browser supports service workers and registers it when the page loads. 
// The service worker will be contained in the sw.js file, which we'll create in the next step.

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          return registration.update();
        });
    });
  }