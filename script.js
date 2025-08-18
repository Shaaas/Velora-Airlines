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
