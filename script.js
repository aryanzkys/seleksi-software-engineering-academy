function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function(event) {
    const modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

let currentTestimonialIndex = 0;

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials[currentTestimonialIndex].classList.remove('active'); 
    currentTestimonialIndex = (currentTestimonialIndex + direction + testimonials.length) % testimonials.length;
    testimonials[currentTestimonialIndex].classList.add('active'); 
}

function submitTestimonial(event) {
    event.preventDefault(); 

    const name = document.getElementById('customerName').value;
    const message = document.getElementById('reviewMessage').value;
    const rating = document.getElementById('rating').value;

    const newTestimonial = document.createElement('div');
    newTestimonial.classList.add('testimonial');
    newTestimonial.innerHTML = `<p>"${message}"</p><p><strong>- ${name}</strong> | Rating: ${'★'.repeat(rating) + '☆'.repeat(5 - rating)}</p>`;

    const slider = document.querySelector('.testimonial-slider');
    slider.appendChild(newTestimonial);

    document.getElementById('testimonialForm').reset();

    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => testimonial.classList.remove('active')); 
    newTestimonial.classList.add('active'); 
}
function submitSubscription(event) {
    event.preventDefault(); 

    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const planSelection = document.getElementById('planSelection').value;

    const planPrices = {
        diet: 30000,   
        protein: 40000, 
        royal: 60000    
    };

    const mealTypes = [];
    if (document.getElementById('breakfast').checked) mealTypes.push('Breakfast');
    if (document.getElementById('lunch').checked) mealTypes.push('Lunch');
    if (document.getElementById('dinner').checked) mealTypes.push('Dinner');

    const deliveryDays = [];
    if (document.getElementById('monday').checked) deliveryDays.push('Monday');
    if (document.getElementById('tuesday').checked) deliveryDays.push('Tuesday');
    if (document.getElementById('wednesday').checked) deliveryDays.push('Wednesday');
    if (document.getElementById('thursday').checked) deliveryDays.push('Thursday');
    if (document.getElementById('friday').checked) deliveryDays.push('Friday');
    if (document.getElementById('saturday').checked) deliveryDays.push('Saturday');
    if (document.getElementById('sunday').checked) deliveryDays.push('Sunday');

    const allergies = document.getElementById('allergies').value;

    const planPrice = planPrices[planSelection]; 
    const numberOfMealTypes = mealTypes.length; 
    const numberOfDeliveryDays = deliveryDays.length; 

    const totalPrice = planPrice * numberOfMealTypes * numberOfDeliveryDays * 4.3;

    console.log('Subscription Details:');
    console.log('Name:', fullName);
    console.log('Phone Number:', phoneNumber);
    console.log('Plan Selection:', planSelection);
    console.log('Meal Types:', mealTypes);
    console.log('Delivery Days:', deliveryDays);
    console.log('Allergies:', allergies);
    console.log('Total Price: Rp' + totalPrice.toFixed(2)); 

    
    document.getElementById('subscriptionForm').reset();
}
        function checkToken() {
            const token = localStorage.getItem('authToken');
            return token; 
        }
         if (window.location.pathname.includes('subscription.html')) {
            const token = checkToken(); 

            if (!token) { 
                alert('Anda harus login untuk mengakses halaman ini!');
                window.location.href = 'index.html'; 
            } else {
                
            }
        }
        if (logoutButton) { 
            logoutButton.addEventListener('click', () => {
                clearLoginStatus(); 
                alert('Anda telah logout.');
                window.location.href = 'index.html'; 
            });
        }
        
               