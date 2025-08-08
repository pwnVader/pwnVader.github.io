// Terminal estilo 90s para portfolio ciberseguridad
(function(){
  const output = document.getElementById('output');
  const cmdInput = document.getElementById('cmd');
  const boot = document.getElementById('bootScreen');
  const yearEl = document.getElementById('year');
  const toggleBtn = document.getElementById('toggleMode');
  const backTerminalBtn = document.getElementById('backTerminal');
  const visualSection = document.getElementById('visualMode');
  yearEl.textContent = new Date().getFullYear();

  const state = {
    history: [],
    historyIndex: -1,
    user: 'visitor',
    location: '~',
    booted: false,
  };

  const commands = {};
  const register = (name, fn, desc) => { commands[name] = { fn, desc }; };

  function print(html, cls='') {
    const div = document.createElement('div');
    div.className = 'entry ' + cls;
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function printCommand(c) { print(`${escapeHtml(promptLabel())} ${escapeHtml(c)}`, 'command'); }

  function promptLabel(){ return `${state.user}@portfolio:${state.location}$`; }
  document.getElementById('promptLabel').textContent = promptLabel();

  function escapeHtml(str){ return str.replace(/[&<>\"']/g, c=>({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }

  function help() {
    const list = Object.keys(commands).sort().map(k => `<tr><td>${k}</td><td>${commands[k].desc}</td></tr>`).join('');
    print(`<div class='section-title'>Comandos disponibles</div><table>${list}</table>`);
  }

  register('help', help, 'Lista los comandos.');
  register('clear', () => { output.innerHTML=''; }, 'Limpia la pantalla.');
  register('about', () => {
  print(`<div class='section-title'>Sobre mí</div>
<p>Ingeniero en Sistemas Computacionales (último año) enfocado en infraestructura, soporte técnico y automatización. Experiencia práctica en entornos Windows/Linux, redes y análisis de tráfico. Especializado en seguridad ofensiva (pentesting).</p>`);
  }, 'Resumen profesional.');

  register('skills', () => {
    print(`<div class='section-title'>Habilidades</div>
<div class='skills-groups'>
  <div><strong>Sistemas & Soporte:</strong><br>
    <span class='badge'>Windows</span><span class='badge'>Linux</span><span class='badge'>VirtualBox</span><span class='badge'>VMware</span><span class='badge'>RDP</span><span class='badge'>PuTTY</span><span class='badge'>Office</span><span class='badge'>Excel (Intermedio)</span>
  </div>
  <div><strong>Redes:</strong><br>
    <span class='badge'>TCP/IP</span><span class='badge'>DHCP</span><span class='badge'>NAT</span><span class='badge'>VLANs</span><span class='badge'>DNS</span><span class='badge'>ARP</span><span class='badge'>Ethernet</span><span class='badge'>Routing/Switch Básico</span>
  </div>
  <div><strong>Ciberseguridad:</strong><br>
    <span class='badge'>Nmap</span><span class='badge'>Metasploit</span><span class='badge'>Burp Suite</span><span class='badge'>Wireshark</span><span class='badge'>Hashcat</span><span class='badge'>Hydra</span><span class='badge'>John</span><span class='badge'>Sqlmap</span><span class='badge'>iptables</span><span class='badge'>Active Directory (Labs)</span><span class='badge'>Splunk (Básico)</span><span class='badge'>Incident Response (Bases)</span>
  </div>
  <div><strong>Programación & Scripting:</strong><br>
    <span class='badge'>Python</span><span class='badge'>Bash</span><span class='badge'>PowerShell</span><span class='badge'>Java</span><span class='badge'>SQL</span>
  </div>
  <div><strong>Herramientas & Versionado:</strong><br>
    <span class='badge'>Git</span><span class='badge'>GitHub</span><span class='badge'>GitHub Pages</span><span class='badge'>Markdown</span><span class='badge'>Docker</span><span class='badge'>VS Code</span><span class='badge'>PyCharm</span>
  </div>
  <div><strong>Aprendiendo:</strong><br>
    <span class='badge'>AWS</span><span class='badge'>SOC</span><span class='badge'>Blue Team</span><span class='badge'>AD Hardening</span>
  </div>
</div>`);
  }, 'Lista de habilidades (categorizadas).');

  register('projects', () => {
    const items = [
      { title:'TryHackMe Top 1% (Rank 13,963)', type:'Achievement', desc:'100+ labs completados; percentil superior en plataforma de entrenamiento práctico.', link:'https://tryhackme.com/r/p/pwnVader', badge:'Profile' },
      { title:'DorkSniper', type:'Live', desc:'Genera Google Dorks categorizados para OSINT y bug bounty recon.', link:'https://pwnvader.github.io/DorkSniper/', badge:'Live' },
      { title:'BruteShield', type:'Live', desc:'Calcula tiempo estimado de crack y genera passphrases legibles.', link:'https://pwnvader.github.io/BruteShield/', badge:'Live' },
      { title:'DarkScan', type:'Repo', desc:'Wrapper de Nmap: fingerprint de servicios y export a Markdown.', link:'https://github.com/pwnVader/DarkScan', badge:'Repo' },
      { title:'Lab Raspberry Pi Offensive', type:'Lab', desc:'Laboratorio portátil de hacking con Raspberry Pi: servicios vulnerables, pruebas de explotación y automatización.', badge:'Lab' },
      { title:'Intercepción Tráfico Red Abierta (Alfa AWUS036ACH)', type:'Research', desc:'Captura y análisis de peticiones inseguras en Wi‑Fi abierto para evidenciar riesgos y malas prácticas.', badge:'Análisis' },
      { title:'Marca Personal LinkedIn', type:'Brand', desc:'Post técnicos (ciberseguridad, herramientas, buenas prácticas) y crecimiento de engagement.', link:'https://www.linkedin.com/in/jesuspromero/details/featured/', badge:'LinkedIn' },
      { title:'Content Creation', type:'+27k', desc:'Videos y posts simplificando hacking (TikTok + Medium).', link:'https://www.tiktok.com/@pwnvader', badge:'+27k' },
      { title:'Writeups Repo', type:'Repo', desc:'Walkthroughs HTB & THM centralizados para estudio.', link:'https://github.com/pwnVader/writeups', badge:'Repo' },
      { title:'pwn-cards', type:'Repo', desc:'Cheat sheets de ciberseguridad de consulta rápida.', link:'https://github.com/pwnVader/pwn-cards', badge:'Repo' }
    ];
    const html = items.map(i=>`<div class='card'><h4>${i.title}</h4><p>${i.desc}</p><div class='tags'>${ i.link ? `<a class='link' href='${i.link}' target='_blank' rel='noopener'>${i.badge} ↗</a>` : `<span class='badge'>${i.badge}</span>` }</div></div>`).join('');
    print(`<div class='section-title'>Proyectos & Logros</div><div class='grid-projects'>${html}</div>`);
  }, 'Proyectos y logros ordenados.');

  // Libros (Lecturas Técnicas)
  const booksData = [
    // Leyendo
    { title:'PowerShell for Sysadmins', author:'Adam Bertram', status:'Leyendo', topic:'Automation', takeaway:'Scripts y gestión remota orientados a operaciones.' },
    { title:'Black Hat Python (2nd Ed.)', author:'Justin Seitz & Tim Arnold', status:'Leyendo', topic:'Pentesting', takeaway:'Automatización ofensiva con Python.' },
    { title:'Automate the Boring Stuff with Python (2nd Ed.)', author:'Al Sweigart', status:'Leyendo', topic:'Python', takeaway:'Flujos de automatización base y manipulación de archivos.' },
    { title:'"Black Hat Bash" (Pendiente aclarar título exacto)', author:'(Posible: Bash Scripting for Hackers – OccupyTheWeb)', status:'Leyendo', topic:'Scripting', takeaway:'Profundizar en scripting ofensivo Bash.' },
    // Leídos
    { title:'Linux Basics for Hackers (2nd Ed.)', author:'OccupyTheWeb', status:'Leído', topic:'Linux', takeaway:'Base práctica de Linux para hacking.' },
    { title:'The Linux Command Line (2nd Ed.)', author:'William Shotts', status:'Leído', topic:'Linux', takeaway:'Profundización en CLI y scripting shell.' },
    { title:'Python Crash Course (3rd Ed.)', author:'Eric Matthes', status:'Leído', topic:'Python', takeaway:'Fundamentos Python + proyectos iniciales.' }
  ];

  function renderBooks(list){
    return list.map(b=>{
      const badge = `<span class='badge' data-status='${b.status}'>${b.status}</span>`;
      return `<div class='book-item'><h4>${b.title}</h4><p class='meta'>${b.author} · <span class='topic'>${b.topic}</span> ${badge}</p><p class='takeaway'>${b.takeaway}</p></div>`;
    }).join('');
  }

  register('books', (arg) => {
    let filtered = booksData;
    if(arg){
      const q = arg.toLowerCase();
      filtered = booksData.filter(b => [b.title,b.author,b.status,b.topic].some(v=>v.toLowerCase().includes(q)));
    }
    print(`<div class='section-title'>Lecturas Técnicas</div>${renderBooks(filtered) || 'Sin coincidencias.'}<div class='hint'>Filtro opcional: books leyendo | books linux | books python</div>`);
  }, 'Lista libros (books [filtro]).');

  register('exp', () => {
    print(`<div class='section-title'>Timeline 2025</div>
<div class='timeline'>
  <div class='timeline-item'>
    <h4>Ago 2025 · Preparación CPTS (HTB Academy)</h4>
    <span>En progreso</span>
    <p>Profundizando en escenarios avanzados de pentesting y preparación de laboratorio para el examen CPTS.</p>
  </div>
  <div class='timeline-item'>
    <h4>Jun 2025 · eJPTv2 Obtenida</h4>
    <span>Certificación</span>
    <p>Validación práctica de fundamentos de pentesting: enumeración, explotación inicial y post-explotación básica.</p>
  </div>
  <div class='timeline-item'>
    <h4>May 2025 · Top 1% TryHackMe</h4>
    <span>Logro</span>
    <p>Escalé al percentil superior resolviendo laboratorios enfocados en redes, web, enumeración y privesc.</p>
  </div>
  <div class='timeline-item'>
    <h4>Ene 2025 · CEH-PC (CertiProf)</h4>
    <span>Certificación</span>
    <p>Fundamentos metodológicos de ethical hacking y fases del ciclo de intrusión.</p>
  </div>
  <div class='timeline-item'>
    <h4>Ene 2025 · Inicio Ruta Ciberseguridad</h4>
    <span>Hito inicial</span>
    <p>Comienzo de estudio formal: bases de redes, Linux, scripting, laboratorios en TryHackMe y HTB.</p>
  </div>
</div>`);
  }, 'Línea de tiempo de hitos 2025.');

  register('contact', () => {
    const mail = 'contacto.broadways405@passmail.net';
    print(`<div class='section-title'>Contacto</div>
<ul>
  <li>Email: <a class='link' href='mailto:${mail}'>${mail}</a></li>
  <li>LinkedIn: <a class='link' href='https://www.linkedin.com/in/jesuspromero/' target='_blank' rel='noopener'>linkedin/in/jesuspromero</a></li>
  <li>GitHub: <a class='link' href='https://github.com/pwnVader' target='_blank' rel='noopener'>github.com/pwnVader</a></li>
  <li>Beacons (todas mis redes): <a class='link' href='https://beacons.ai/pwnvader' target='_blank' rel='noopener'>beacons.ai/pwnvader</a></li>
</ul>`);
  }, 'Datos de contacto.');

  register('cv', () => {
    print(`Descarga CV (PDF): <a class='link' href='cv.pdf' download>cv.pdf</a>`);
  }, 'Muestra enlace a CV.');

  register('social', () => {
    print(`<div class='section-title'>Redes</div>
<ul>
  <li><a class='link' href='https://github.com/tuusuario' target='_blank'>GitHub</a></li>
  <li><a class='link' href='https://www.linkedin.com/in/tuusuario' target='_blank'>LinkedIn</a></li>
  <li><a class='link' href='https://x.com/tuusuario' target='_blank'>X/Twitter</a></li>
</ul>`);
  }, 'Lista redes sociales.');

  register('theme', (arg) => {
    const a = arg?.trim();
    if(!a){ print('Uso: theme dark|light|matrix'); return; }
    document.body.dataset.theme = a;
    print(`Tema cambiado a ${a}`);
  }, 'Cambia el tema (experimental).');

  register('whoami', () => { print('Usuario: ' + state.user); }, 'Muestra usuario.');

  // Cambiar a modo visual
  function activateVisual(){
    document.body.dataset.mode = 'visual';
    toggleBtn.setAttribute('aria-pressed','true');
    toggleBtn.textContent = 'Modo Terminal';
    backTerminalBtn.setAttribute('aria-pressed','false');
  }
  function activateTerminal(){
    document.body.dataset.mode = 'terminal';
    toggleBtn.setAttribute('aria-pressed','false');
    toggleBtn.textContent = 'Modo Visual';
    backTerminalBtn.setAttribute('aria-pressed','false');
  }
  toggleBtn?.addEventListener('click', ()=>{
    if(document.body.dataset.mode === 'visual') activateTerminal(); else activateVisual();
  });
  backTerminalBtn?.addEventListener('click', activateTerminal);
  // default terminal
  document.body.dataset.mode = 'terminal';

  register('visual', ()=>{ activateVisual(); print('Modo visual activado.'); }, 'Cambia a modo visual.');
  register('terminal', ()=>{ activateTerminal(); print('Modo terminal activado.'); }, 'Regresa a modo terminal.');

  register('banner', () => {
    // Nuevo ASCII art proporcionado por el usuario
    print('<pre class="ascii">\n' +
      ' ██▓███   █     █░███▄    █ ██▒   █▓ ▄▄▄      ▓█████▄ ▓█████  ██▀███  \n' +
      '▓██░  ██▒▓█░ █ ░█░██ ▀█   █▓██░   █▒▒████▄    ▒██▀ ██▌▓█   ▀ ▓██ ▒ ██▒\n' +
      '▓██░ ██▓▒▒█░ █ ░█▓██  ▀█ ██▒▓██  █▒░▒██  ▀█▄  ░██   █▌▒███   ▓██ ░▄█ ▒\n' +
      '▒██▄█▓▒ ▒░█░ █ ░█▓██▒  ▐▌██▒ ▒██ █░░░██▄▄▄▄██ ░▓█▄   ▌▒▓█  ▄ ▒██▀▀█▄  \n' +
      '▒██▒ ░  ░░░██▒██▓▒██░   ▓██░  ▒▀█░   ▓█   ▓██▒░▒████▓ ░▒████▒░██▓ ▒██▒\n' +
      '▒▓▒░ ░  ░░ ▓░▒ ▒ ░ ▒░   ▒ ▒   ░ ▐░   ▒▒   ▓▒█░ ▒▒▓  ▒ ░░ ▒░ ░░ ▒▓ ░▒▓░\n' +
      '░▒ ░       ▒ ░ ░ ░ ░░   ░ ▒░  ░ ░░    ▒   ▒▒ ░ ░ ▒  ▒  ░ ░  ░  ░▒ ░ ▒░\n' +
      '░░         ░   ░    ░   ░ ░     ░░    ░   ▒    ░ ░  ░    ░     ░░   ░ \n' +
      '             ░            ░      ░        ░  ░   ░       ░  ░   ░     \n' +
      '                                ░              ░                      \n' +
      '</pre>');
  }, 'Muestra banner.');

  register('matrix', (arg) => {
    const a = (arg||'').trim().toLowerCase();
    if(a === 'status'){ print(`Matrix: ${matrixActive ? 'ON' : 'OFF'}`); return; }
    if(a === 'force'){ if(!matrixActive){ toggleMatrix({force:true}); print('Matrix FORZADO ON'); } else print('Ya activo.'); return; }
    if(a === 'overlay'){ if(matrixActive) toggleMatrix(); toggleMatrix({force:true, overlay:true}); print('Matrix Overlay ON'); return; }
    if(a === 'on'){ if(!matrixActive){ toggleMatrix({}); print('Matrix ON'); } else print('Ya activo.'); return; }
    if(a === 'off'){ if(matrixActive){ toggleMatrix(); print('Matrix OFF'); } else print('Ya apagado.'); return; }
    toggleMatrix({});
    print(`Matrix ${matrixActive ? 'ON' : 'OFF'} (usa: matrix on | off | force | overlay | status)`);
  }, 'Control efecto matrix (on|off/force/overlay/status).');

  // (Removido efecto code rain; se mantiene solo matrix)

  function unknown(cmd){
    print(`Comando no encontrado: ${escapeHtml(cmd)}. Escribe 'help' para ayuda.`,'error');
  }

  function run(raw){
    const line = raw.trim();
    if(!line) return; // no empty
    const [name, ...rest] = line.split(' ');
    const arg = rest.join(' ');
    const c = commands[name];
    printCommand(line);
    if(c){
      try { c.fn(arg); } catch(e){ print('Error: '+e.message); }
    } else unknown(name);
  }

  function onKey(e){
    if(e.key === 'Enter'){
      const value = cmdInput.value;
      state.history.push(value);
      state.historyIndex = state.history.length;
      run(value);
      cmdInput.value='';
    } else if(e.key === 'ArrowUp'){
      if(state.historyIndex>0){ state.historyIndex--; cmdInput.value = state.history[state.historyIndex]; setTimeout(()=>cmdInput.setSelectionRange(cmdInput.value.length,cmdInput.value.length),0); }
      e.preventDefault();
    } else if(e.key === 'ArrowDown'){
      if(state.historyIndex < state.history.length-1){ state.historyIndex++; cmdInput.value = state.history[state.historyIndex]; } else { state.historyIndex = state.history.length; cmdInput.value=''; }
      e.preventDefault();
    } else if(e.key === 'c' && e.ctrlKey){
      printCommand('^C');
      cmdInput.value='';
    }
  }

  cmdInput.addEventListener('keydown', onKey);
  window.addEventListener('click', () => cmdInput.focus());

  function finishBoot(){
    boot.remove();
    state.booted = true;
    print(`Escribe 'help' para listar comandos.\n`);
    cmdInput.focus();
    commands['banner'].fn();
  // activar matrix por defecto
  toggleMatrix();
  }
  setTimeout(finishBoot, 1800);

  // Matrix effect robusto (móvil + overlay opcional)
  let matrixActive = false; let matrixCanvas; let matrixCtx; let matrixAnim; let lastFrame = 0; let matrixFallback; let matrixOverlay = false;
  function toggleMatrix(opts={}){
    const { force=false, overlay=false } = opts;
    if(matrixActive){ cancelAnimationFrame(matrixAnim); clearInterval(matrixFallback); matrixCanvas?.remove(); matrixActive=false; matrixOverlay=false; return; }
    if(!force && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ print('Preferencia reduced-motion. Usa: matrix force'); return; }
    matrixActive = true; matrixOverlay = overlay;
    matrixCanvas = document.createElement('canvas');
    Object.assign(matrixCanvas.style, { position:'fixed', inset:'0', zIndex: overlay ? '999' : '0', opacity: overlay ? '0.35' : '0.25', pointerEvents:'none', mixBlendMode: overlay ? 'screen' : 'normal' });
    matrixCanvas.setAttribute('aria-hidden','true');
    if(overlay){ document.body.appendChild(matrixCanvas); } else { document.body.prepend(matrixCanvas); }
    matrixCtx = matrixCanvas.getContext('2d', { alpha:true });
    let fontSize = (window.innerWidth < 560 ? 11 : 15);
    let columns = 0; let drops = [];
    const resize = () => {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      columns = Math.floor(matrixCanvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', resize, { passive:true });
    resize();
    function frame(ts){
      if(typeof ts !== 'number') ts = performance.now();
      if(ts - lastFrame < 55){ matrixAnim = requestAnimationFrame(frame); return; }
      lastFrame = ts;
      matrixCtx.fillStyle = matrixOverlay ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.07)';
      matrixCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);
      matrixCtx.font = fontSize + 'px monospace';
      for(let i=0;i<drops.length;i++){
        const ch = String.fromCharCode(0x30A0 + Math.random()*96);
        const x = i*fontSize; const y = drops[i]*fontSize;
        matrixCtx.fillStyle = '#0b400b';
        matrixCtx.fillText(ch, x, y);
        matrixCtx.fillStyle = '#19ff19';
        matrixCtx.fillText(ch, x, y - fontSize*0.9);
        if(drops[i]*fontSize > matrixCanvas.height && Math.random() > 0.955) drops[i]=0;
        drops[i]++;
      }
      matrixAnim = requestAnimationFrame(frame);
    }
    matrixAnim = requestAnimationFrame(frame);
    clearInterval(matrixFallback);
    matrixFallback = setInterval(()=>{ if(!matrixActive){ clearInterval(matrixFallback); } }, 4000);
  }
})();
