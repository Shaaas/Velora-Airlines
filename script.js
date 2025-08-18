// Smooth scroll to flight section
function scrollToFlight() {
  document.getElementById('flight-section').scrollIntoView({behavior:'smooth'});
}

// Tab switcher
function switchTab(tab){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
}

// Flight form submission -> modal
document.getElementById('flightForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('flightModal').style.display='flex';
});

// Close modal
function closeModal(){
  document.getElementById('flightModal').style.display='none';
}

// Destination click
function showCity(city){
  alert(`Welcome to ${city}! ✨`);
}

/* IN-FLIGHT CAROUSEL */
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let index = 0;

nextBtn.addEventListener('click', ()=>{
  index = (index+1)%items.length;
  track.style.transform = `translateX(-${index * (items[0].offsetWidth + 16)}px)`;
});
prevBtn.addEventListener('click', ()=>{
  index = (index-1+items.length)%items.length;
  track.style.transform = `translateX(-${index * (items[0].offsetWidth + 16)}px)`;
});

/* SPECIAL OFFERS SCROLLING (mouse drag) */
const slider = document.querySelector('.offers-slider');
let isDown = false, startX, scrollLeft;
slider.addEventListener('mousedown', e=>{
  isDown=true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', ()=>{isDown=false; slider.classList.remove('active');});
slider.addEventListener('mouseup', ()=>{isDown=false; slider.classList.remove('active');});
slider.addEventListener('mousemove', e=>{
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX)*2;
  slider.scrollLeft = scrollLeft - walk;
});

