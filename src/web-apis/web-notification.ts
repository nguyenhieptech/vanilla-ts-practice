import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

app!.innerHTML = `
  <h1 class="flex justify-center items-center mt-20 bg-neutral-700">
    Web Notifications API
  </h1>
`;

// Web Notifications API
// https://youtu.be/EEhohSp0if4
// https://gist.github.com/prof3ssorSt3v3/9a16ad86c10f543159cecf5ad17e83f4
// https://developer.mozilla.org/en-US/docs/Web/API/notification

async function checkNotificationPermission() {
  // Notification objects have a close() method. SOME browser automatically close them.
  // Notification Events - click, error, close, show
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      handleNotify();
    } else {
      try {
        const result = await Notification.requestPermission();
        console.log(result); // 'granted' or 'denied'
        handleNotify();
      } catch (err) {
        console.log(err);
      }
    }
  }
}

function handleNotify() {
  const title = 'The Title';
  const t = Date.now() + 120000; // 2 mins in the future
  const options: NotificationOptions = {
    body: 'Hello from JavaScript!',
    data: { prop1: 123, prop2: 'Steve' },
    lang: 'en-CA',
    // icon: './img/calendar-lg.png',
    timestamp: t, // works on android
    vibrate: [100, 200, 100],
  };
  const notification = new Notification(title, options);

  notification.addEventListener('show', function (event: Event) {
    console.log('SHOW', (event.currentTarget as Notification).data);
  });
  notification.addEventListener('close', function (event: Event) {
    console.log('CLOSE', (event.currentTarget as Notification).body);
  });

  // close notification after 3 seconds
  setTimeout(notification.close.bind(notification), 3000);
}

checkNotificationPermission();
