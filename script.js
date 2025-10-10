// Frontend logic for New Life RP panel (demo)
document.addEventListener('DOMContentLoaded', ()=>{
  // tabs
  document.querySelectorAll('.tabs li').forEach(li=>{
    li.addEventListener('click', ()=>{
      document.querySelectorAll('.tabs li').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      li.classList.add('active');
      document.getElementById(li.dataset.tab).classList.add('active');
    });
  });

  // load sample data (from data.json) or API
  loadBanList();
  loadTopRich();

  // register handler
  const regForm = document.getElementById('registerForm');
  regForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = new FormData(regForm);
    const data = {username: form.get('username'), password: form.get('password')};
    // try API endpoint, otherwise use localStorage (demo)
    try {
      const res = await fetch('/api/register.php', {method:'POST', body: JSON.stringify(data), headers:{'Content-Type':'application/json'}});
      const j = await res.json();
      showMsg('registerMsg', j.message || 'تم الإنشاء');
    } catch(e){
      // demo: store locally
      const users = JSON.parse(localStorage.getItem('nlrp_users')||'[]');
      users.push(data);
      localStorage.setItem('nlrp_users', JSON.stringify(users));
      showMsg('registerMsg','تم إنشاء حساب (وهمي)');
    }
  });

  // complaint form
  document.getElementById('complaintForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {from: fd.get('from'), against: fd.get('against'), details: fd.get('details')};
    try {
      await fetch('/api/complaint.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      showMsg('complaintMsg','تم ارسال الشكوى');
    } catch(e){
      showMsg('complaintMsg','تم حفظ الشكوى محليًا (تجريبي)');
      const c = JSON.parse(localStorage.getItem('nlrp_complaints')||'[]');
      c.push(body);
      localStorage.setItem('nlrp_complaints', JSON.stringify(c));
    }
  });

  // tools (mock)
  document.getElementById('restartServer').addEventListener('click', ()=>{
    showMsg('toolsMsg','أمر إعادة التشغيل (محاكاة): تم تنفيذه');
  });
  document.getElementById('announce').addEventListener('click', ()=>{
    const text = document.getElementById('announceText').value.trim();
    if(!text) return showMsg('toolsMsg','اكتب نص الاعلان');
    showMsg('toolsMsg','تم إرسال الاعلان (محاكاة): '+text);
  });
});

function showMsg(elId, msg){
  const el = document.getElementById(elId);
  if(!el) return;
  el.innerHTML = '<div style="padding:8px;background:rgba(0,0,0,0.5);border-radius:8px;margin-top:8px">'+msg+'</div>';
}

// load ban list (from api or fallback data.json)
async function loadBanList(){
  try {
    const res = await fetch('/api/banlist.php');
    const j = await res.json();
    populateBanTable(j);
  } catch(e){
    // fallback to local data.json
    const res = await fetch('data.json');
    const j = await res.json();
    populateBanTable(j.banlist || []);
  }
}

function populateBanTable(items){
  const tbody = document.querySelector('#banTable tbody');
  tbody.innerHTML = '';
  items.forEach(i=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.player}</td><td>${i.reason}</td><td>${i.by}</td><td>${i.date}</td>`;
    tbody.appendChild(tr);
  });
}

async function loadTopRich(){
  try {
    const res = await fetch('/api/toprich.php');
    const j = await res.json();
    populateRichTable(j);
  } catch(e){
    const res = await fetch('data.json');
    const j = await res.json();
    populateRichTable(j.toprich || []);
  }
}

function populateRichTable(items){
  const tbody = document.querySelector('#richTable tbody');
  tbody.innerHTML = '';
  items.forEach((i, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${idx+1}</td><td>${i.player}</td><td>${i.money}</td>`;
    tbody.appendChild(tr);
  });
}
