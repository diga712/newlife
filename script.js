// نسخ IP
document.getElementById('copyBtn').addEventListener('click', () => {
  const ip = document.getElementById('server-ip');
  try {
    navigator.clipboard.writeText(ip.value).then(()=>showToast('تم نسخ IP السيرفر'));
  } catch(e) {
    ip.select ? ip.select() : null;
    document.execCommand && document.execCommand('copy');
    showToast('تم نسخ IP السيرفر');
  }
});

// سنة في الفوتر
document.getElementById('year').textContent = new Date().getFullYear();

// محاكاة فحص حالة السيرفر
function checkServerStatus() {
  // لو عندك API حقيقي، استبدل هذا الجزء بطلب fetch إلى API
  const online = Math.random() > 0.6;
  const el = document.getElementById('serverStatus');
  if (online) {
    el.classList.remove('offline');
    el.classList.add('online');
    el.textContent = 'متصل';
  } else {
    el.classList.remove('online');
    el.classList.add('offline');
    el.textContent = 'غير متصل';
  }
}

checkServerStatus();
setInterval(checkServerStatus, 20000);

function showToast(msg) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.75)', color: 'white', padding: '10px 14px', borderRadius: '10px', zIndex: 9999
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2200);
}
