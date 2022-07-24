<!-- __layout automatically wraps around every component inside of /routes -->

<!-- HTML Markup -->
<slot />

<!-- Global Styles -->
<style global>
  :root {
    --shadow-color: 286deg 36% 56%;
    --shadow-elevation-low: 0px 0.5px 0.7px hsl(var(--shadow-color) / 0.15),
      0px 1px 1.3px -0.5px hsl(var(--shadow-color) / 0.28),
      0px 2.2px 2.9px -1.1px hsl(var(--shadow-color) / 0.4);
    --shadow-elevation-medium: 0px 0.5px 0.7px hsl(var(--shadow-color) / 0.16),
      0px 2.3px 3.1px -0.4px hsl(var(--shadow-color) / 0.26),
      0px 5px 6.7px -0.7px hsl(var(--shadow-color) / 0.36),
      0px 10.9px 14.6px -1.1px hsl(var(--shadow-color) / 0.46);
    --shadow-elevation-high: 0px 0.5px 0.7px hsl(var(--shadow-color) / 0.15),
      0px 4.6px 6.1px -0.2px hsl(var(--shadow-color) / 0.19),
      0px 8.2px 10.9px -0.3px hsl(var(--shadow-color) / 0.24),
      0px 12.5px 16.7px -0.5px hsl(var(--shadow-color) / 0.29),
      -0.1px 18.3px 24.4px -0.6px hsl(var(--shadow-color) / 0.33),
      -0.1px 26.6px 35.5px -0.8px hsl(var(--shadow-color) / 0.38),
      -0.1px 38.3px 51.1px -0.9px hsl(var(--shadow-color) / 0.42),
      -0.2px 54.4px 72.6px -1.1px hsl(var(--shadow-color) / 0.47);
  }

  html {
    font-family: 'Zodiak', 'Helvetica', serif;
    font-weight: 420;
  }
  body {
    margin: 0 0rem;
    background: #fcfcfc;
  }
  main {
    position: relative;
  }
  pre {
    font-size: 7em;
  }

  .tick text {
    font-size: 12.8px;
    font-family: 'Zodiak', 'Helvetica', serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 0;
    font-weight: 500;
  }
</style>
