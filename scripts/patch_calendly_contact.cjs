const fs = require('fs');
const p = 'src/pages/contact.astro';
let s = fs.readFileSync(p, 'utf8');

// Find any inline script that loads Calendly widget.js
const re = /<script\s+is:inline>[\s\S]*?assets\.calendly\.com\/assets\/external\/widget\.js[\s\S]*?<\/script>/g;

// Replace with a guarded, idempotent loader (init inline widgets too)
const guarded = `<script is:inline>
(function(){
  function init(){ try { if (window.Calendly && typeof Calendly.initInlineWidgets==='function') Calendly.initInlineWidgets(); } catch(e){} }
  if (!document.querySelector('script[data-calendly-widget]') && !document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]')) {
    var s=document.createElement('script');
    s.src='https://assets.calendly.com/assets/external/widget.js';
    s.async=true;
    s.setAttribute('data-calendly-widget','true');
    s.onload=init;
    document.head.appendChild(s);
  } else { init(); }
  var tries=0, t=setInterval(function(){
    if (window.Calendly && Calendly.initInlineWidgets){ init(); clearInterval(t); }
    if (++tries>30) clearInterval(t);
  }, 250);
})();
</script>`;

const replaced = s.replace(re, guarded);
if (replaced !== s) {
  fs.writeFileSync(p, replaced);
  console.log('Patched Calendly loader in', p);
} else {
  console.log('No matching script tag found, nothing changed.');
}
