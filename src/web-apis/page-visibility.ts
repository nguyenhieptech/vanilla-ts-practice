// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

// Concepts and usage
// When the user minimizes the window or switches to another tab, the API sends a visibilitychange event to let
// listeners know the state of the page has changed. You can detect the event and perform some actions or behave differently.
// For example, if your web app is playing a video, it can pause the video when the user puts the tab into the background,
// and resume playback when the user returns to the tab. The user doesn't lose their place in the video, the video's soundtrack doesn't
// interfere with audio in the new foreground tab, and the user doesn't miss any of the video in the meantime.
