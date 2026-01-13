// Initializing Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Modal Controls
function openModal() {
    document.getElementById('flightModal').style.display = "block";
}

function closeModal() {
    document.getElementById('flightModal').style.display = "none";
}

// Live Flight Tracker Simulation
function trackFlight() {
    const id = document.getElementById('flightInput').value.toUpperCase();
    const output = document.getElementById('trackerOutput');
    
    if(!id) {
        output.innerHTML = `<p style="color: red;">Please enter a Flight ID.</p>`;
        return;
    }

    output.innerHTML = `<p style="color: var(--neon-blue)"><i class="fas fa-spinner fa-spin"></i> SCANNING SATELLITE NETWORK...</p>`;
    
    setTimeout(() => {
        if (id.startsWith('VA-X')) { // Futuristic / Interstellar flights
            output.innerHTML = `
                <div class="glass" style="margin-top: 20px; border-color: #4ade80">
                    <h4 style="color: #4ade80">CRAFT LOCATED: ${id}</h4>
                    <p>Quadrant: Alpha Centauri - Sector Gamma-7</p>
                    <p>Status: Hyperdrive Engaged - ETA Earth-Sol-3 in 45 Stellar Cycles</p>
                    <p>Current Velocity: Warp 3.2</p>
                </div>
            `;
        } else { // Terrestrial flights
            output.innerHTML = `
                <div class="glass" style="margin-top: 20px; border-color: #4ade80">
                    <h4 style="color: #4ade80">CRAFT LOCATED: ${id}</h4>
                    <p>Altitude: 38,000ft | Speed: Mach 0.85</p>
                    <p>Status: On Trajectory - Atmospheric Entry in 45m</p>
                    <p>Destination: New York, Earth</p>
                </div>
            `;
        }
    }, 2000);
}

// Tab Switching (Booking)
function switchTab(btn) {
    document.querySelectorAll('.booking-tabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
}

// Global Flight Path Visualizer (Simulated)
const flightPathOverlay = document.getElementById('flight-path-overlay');
if (flightPathOverlay) {
    function drawFlightPath(startLat, startLon, endLat, endLon) {
        const mapRect = flightPathOverlay.parentElement.getBoundingClientRect();
        const mapWidth = mapRect.width;
        const mapHeight = mapRect.height;

        // Simple mercator projection (approximation for display)
        const projectX = (lon) => (lon + 180) / 360 * mapWidth;
        const projectY = (lat) => (1 - Math.log(Math.tan(Math.PI / 4 + lat / 2 * Math.PI / 180)) / Math.PI) / 2 * mapHeight;

        const startX = projectX(startLon);
        const startY = projectY(startLat);
        const endX = projectX(endLon);
        const endY = projectY(endLat);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        path.setAttribute("width", mapWidth);
        path.setAttribute("height", mapHeight);
        path.style.position = 'absolute';
        path.style.top = '0';
        path.style.left = '0';

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
        line.setAttribute("stroke", var(--neon-blue));
        line.setAttribute("stroke-width", "2");
        line.setAttribute("stroke-dasharray", "5,5");
        line.style.animation = 'drawPath 3s forwards'; // CSS animation
        
        path.appendChild(line);
        flightPathOverlay.appendChild(path);

        // Add a pulsing dot for the plane
        const planeDot = document.createElement('div');
        planeDot.classList.add('plane-dot');
        planeDot.style.left = `${startX}px`;
        planeDot.style.top = `${startY}px`;
        flightPathOverlay.appendChild(planeDot);

        // Animate the plane dot along the path
        let animationProgress = 0;
        const animatePlane = () => {
            animationProgress += 0.01; // Speed of animation
            if (animationProgress > 1) animationProgress = 0; // Loop

            const currentX = startX + (endX - startX) * animationProgress;
            const currentY = startY + (endY - startY) * animationProgress;
            planeDot.style.left = `${currentX}px`;
            planeDot.style.top = `${currentY}px`;
            
            requestAnimationFrame(animatePlane);
        };
        requestAnimationFrame(animatePlane);
    }

    // Example flight paths (lat, lon)
    // Tokyo (35.68, 139.69) to New York (40.71, -74.00)
    // London (51.50, 0.12) to Sydney (-33.86, 151.20)
    // Paris (48.85, 2.35) to Rio de Janeiro (-22.90, -43.17)
    drawFlightPath(35.68, 139.69, 40.71, -74.00); 
    drawFlightPath(51.50, 0.12, -33.86, 151.20);
    drawFlightPath(48.85, 2.35, -22.90, -43.17);
}


// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
const testimonialTrack = document.querySelector('.testimonial-track');

function showTestimonial(index) {
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector('.next-test').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.querySelector('.prev-test').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});
