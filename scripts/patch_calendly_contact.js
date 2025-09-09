const fs = require('fs');
const p = 'src/pages/contact.astro';
let s = fs.readFileSync(p, 'utf8');

// Replace any inline <script is:inline> block that loads Calendly widget.js
// with a guarded, idempotent loader that also initializes inline widgets.
const re = /<script\s+is:inline>[\s\S]*?assets\.calendly\.com\/assets\/external\/widget\.js[\s\S]*?<\/script>/g;

const guarded = `<script is:inline>
(function(){
  function init(){ try { if (window.Calendly && typeof Calendly.initInlineWidgets==='function') Calendly.initInlineWidgets(); } catch(e){} }
  if (!document.querySelector('script[data-calendly-widget]')) {
    var s=document.createElement('script');
    s.src='https://assets.calendly.com/assets/external/widget.js';
    s.async=true;
    s.setAttribute('data-calendly-widget','true');
    s.onload=init;
    document.head.appendChild(s);
  } else {
    // If already loaded (e.g., via floating button), still attempt init
    init();
  }
  // belt-and-suspenders: retry a few times if Calendly is still booting
  var tries=0, t=setInterval(function(){
    if (window.Calendly && Calendly.initInlineWidgets){ init(); clearInterval(t); }
    if (++tries>30) clearInterval(t);
  }, 250);
})();
</script>`;

const replaced = s.replace(re, guarded);
if (replaced === s) {
  console.log('No matching script tag found to replace. Nothing changed.');
} else {
  fs.writeFileSync(p, replaced);
  console.log('Patched Calendly loader in src/pages/contact.astro');
}
