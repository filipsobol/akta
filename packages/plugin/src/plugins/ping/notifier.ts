if (import.meta.hot) {
  let timer;
  let attached = false;
  const root = document.documentElement;
  const defaultColor = '#34D399';

  if (!attached) {
    const ping = `
      <style>
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        :root {
          --ping-bg-color: ${ defaultColor };
          --ping-display: none;
        }
      </style>

      <div style="
        width: 0.9rem;
        height: 0.9rem;
        display: flex;
        margin-top: -.25rem;
        margin-right: -.25rem;
        right: 15px;
        bottom: 15px;
        position: fixed;
        display: var(--ping-display);
      ">
        <span style="
          opacity: .75;
          background-color: #FBBF24;
          border-radius: 9999px;
          animation: ping 1s cubic-bezier(0,0,.2,1) infinite;
          width: 100%;
          height: 100%;
          display: inline-flex;
          position: absolute;
        ">
        </span>

        <span style="
          background-color: #FBBF24;
          border-radius: 9999px;
          width: 0.9rem;
          height: 0.9rem;
          display: inline-flex;
          position: relative;
        ">
        </span>
      </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = ping.trim();
    document.body.append(template.content);
    attached = true;
  }

  import.meta.hot.on('notify', () => {
    if (timer) {
      clearTimeout(timer);
    }

    root.style.setProperty('--ping-display', 'inline-flex');

    timer = setTimeout(
      () => root.style.removeProperty('--ping-display'),
      1500
    );
  });
}