export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Critical System Halt | IP Guardian</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { 
        font-family: 'Inter', system-ui, -apple-system, sans-serif; 
        background: #060816; 
        color: #FFFFFF; 
        display: grid; 
        place-items: center; 
        min-height: 100vh; 
        margin: 0; 
        padding: 2rem;
        overflow: hidden;
      }
      .grid-bg {
        position: fixed;
        inset: 0;
        background-image: linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        z-index: -1;
        opacity: 0.3;
      }
      .card { 
        max-width: 32rem; 
        width: 100%; 
        text-align: center; 
        padding: 3rem; 
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 40px;
        box-shadow: 0 0 50px rgba(0, 212, 255, 0.1);
      }
      .icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 2rem;
        background: linear-gradient(135deg, #00D4FF, #7C4DFF);
        border-radius: 20px;
        display: grid;
        place-items: center;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
      }
      h1 { 
        font-size: 2rem; 
        font-weight: 900; 
        margin: 0 0 1rem; 
        letter-spacing: -1px;
      }
      p { 
        color: #A0AEC0; 
        margin: 0 0 2.5rem; 
        line-height: 1.6;
        font-size: 1.1rem;
      }
      .actions { display: flex; gap: 1rem; justify-content: center; }
      a, button { 
        padding: 1rem 2rem; 
        border-radius: 16px; 
        font-weight: 700; 
        cursor: pointer; 
        text-decoration: none; 
        border: 1px solid transparent; 
        transition: all 0.3s ease;
        font-size: 0.95rem;
      }
      .primary { 
        background: linear-gradient(135deg, #00D4FF, #7C4DFF); 
        color: #060816; 
        box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
      }
      .primary:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0, 212, 255, 0.4); }
      .secondary { 
        background: rgba(255, 255, 255, 0.05); 
        color: #FFFFFF; 
        border-color: rgba(255, 255, 255, 0.1); 
      }
      .secondary:hover { background: rgba(255, 255, 255, 0.1); }
    </style>
  </head>
  <body>
    <div class="grid-bg"></div>
    <div class="card">
      <div class="icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </div>
      <h1>Signal Interrupted</h1>
      <p>Our intelligence array encountered a catastrophic synchronization error. The perimeter remains secure, but this module needs to be reloaded.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Re-synchronize</button>
        <a class="secondary" href="/">Return to Base</a>
      </div>
    </div>
  </body>
</html>`;
}

