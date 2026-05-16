const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
function animateRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a,button,.app-card,.team-card,.tech-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='20px'; cursor.style.height='20px'; ring.style.width='50px'; ring.style.height='50px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
});

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if(navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  if(backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

function toggleMenu(){
  const menu = document.getElementById('mobileMenu');
  const ham = document.getElementById('hamburger');
  if(menu) menu.classList.toggle('open');
  if(ham) ham.classList.toggle('open');
}
function closeMenu(){
  const menu = document.getElementById('mobileMenu');
  const ham = document.getElementById('hamburger');
  if(menu) menu.classList.remove('open');
  if(ham) ham.classList.remove('open');
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if(current >= target){ el.textContent = target; clearInterval(timer); }
        else { el.textContent = Math.floor(current); }
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

async function submitForm(){
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const msg = document.getElementById('fmessage').value.trim();
  if(!name || !email || !msg){
    alert('Please fill in your name, email, and message.');
    return;
  }

  const button = document.getElementById('sendButton');
  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    const response = await fetch('https://formsubmit.co/ajax/iarsoftofficial@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, _subject: subject || 'Website Contact', message: msg, _captcha: false })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || 'Unable to send message right now.');
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  } catch(err) {
    alert(err.message || 'Unable to send message right now.');
  } finally {
    button.disabled = false;
    button.textContent = 'Send Message \u2192';
  }
}
