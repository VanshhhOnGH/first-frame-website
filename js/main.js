
document.addEventListener('DOMContentLoaded', () => {
  // Navbar Scroll Listener
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      hamburger.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close mobile menu on click link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '☰';
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-link[href*="#${sectionId}"]`);
      
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // Video Modal Feature
  const modalOverlay = document.getElementById('videoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const closeModalBtn = document.getElementById('closeModal');

  
  const portfolioData = {
    'cosmetic': {
      title: 'UGC Cosmetic Skincare Ad',
      brand: 'Lumene Glow',
      stats: '2.3M+ Views | 8.7% CTR | 3.1x ROAS',
      type: 'AI UGC Avatar + Voice',
      videoSrc: 'assets/faceproduct.mp4'
    },
    'perfume': {
      title: 'Cinematic Luxury Perfume Commercial',
      brand: 'Aura Noir',
      stats: '1.8M+ Views | 7.2% CTR | 2.6x ROAS',
      type: '3D Hyper-realistic Motion',
      videoSrc: 'assets/vaseline.mp4'
    },
    'supplement': {
      title: 'High-Energy UGC Supplement Ad',
      brand: 'AlphaFit Nutrition',
      stats: '3.1M+ Views | 9.3% CTR | 4.2x ROAS',
      type: 'Scroll-stopping Hook + UGC',
      videoSrc: 'assets/protein.mp4'
    },
    'sneaker': {
      title: 'Cinematic Athletic Sneaker Commercial',
      brand: 'Apex Runner',
      stats: '2.7M+ Views | 8.1% CTR | 3.6x ROAS',
      type: 'Water Particle Simulation',
      videoSrc: 'assets/shoes.mp4'
    },
    'skincare': {
      title: 'UGC Serum Testimonial Ad',
      brand: 'Radiance Botanicals',
      stats: '1.6M+ Views | 6.9% CTR | 2.4x ROAS',
      type: 'AI Voiceover & Multilingual',
      videoSrc: 'assets/serum.mp4'
    }
  };

  // Currency
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const priceData = {
    INR: {
      starter: { original: '₹3,500', offer: '₹2,999' },
      growth: { original: '₹7,500', offer: '₹6,999' },
      cinematic: { original: '₹15,000', offer: '₹9,999' }
    },
    USD: {
      starter: { original: '$45', offer: '$39' },
      growth: { original: '$95', offer: '$89' },
      cinematic: { original: '$195', offer: '$129' }
    }
  };

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const curr = btn.dataset.currency;
      const prices = priceData[curr];

      document.querySelectorAll('.pricing-card[data-plan]').forEach(card => {
        const plan = card.dataset.plan;
        if (prices[plan]) {
          const origEl = card.querySelector('[data-price-original]');
          const offerEl = card.querySelector('[data-price-offer]');
          if (origEl) origEl.textContent = prices[plan].original;
          if (offerEl) offerEl.textContent = prices[plan].offer;
        }
      });
    });
  });

  document.querySelectorAll('.portfolio-card').forEach(card => {
    const playTarget = card.querySelector('.portfolio-thumb');
    if (!playTarget) return;

    playTarget.addEventListener('click', () => {
      const projectKey = card.dataset.project;
      const data = portfolioData[projectKey] || {
        title: 'FIRST FRAME AI Video Ad Showcase',
        brand: 'Client Work',
        stats: '1.5M+ Views | 7.5% CTR',
        type: 'AI Video Ad',
        videoSrc: ''
      };

      if (modalTitle && modalOverlay && modalBodyContent) {
        modalTitle.textContent = `${data.title} (${data.brand})`;
        
       
        if (data.videoSrc && data.videoSrc.includes('youtube.com')) {
          modalBodyContent.innerHTML = `
            <div style="aspect-ratio: 16/9; width: 100%;">
              <iframe width="100%" height="100%" src="${data.videoSrc}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="border-radius: var(--radius-sm);"></iframe>
            </div>
          `;
        } 
        // If videoSrc is a local video file (mp4 / webm)
        else if (data.videoSrc && (data.videoSrc.endsWith('.mp4') || data.videoSrc.endsWith('.webm'))) {
          modalBodyContent.innerHTML = `
            <video controls autoplay style="width:100%; max-height: 480px; border-radius: var(--radius-sm); background:#000;">
              <source src="${data.videoSrc}" type="video/mp4">
              Your browser does not support video playback.
            </video>
          `;
        } 
        // Default simulated fallback if no video file uploaded yet
        else {
          modalBodyContent.innerHTML = `
            <div class="video-sim-box">
              <div style="font-size:3rem; color:var(--accent-gold); transform:scale(1.2);">▶</div>
              <h4 style="font-size:1.1rem; color:#fff;">Playing Demo AI Video Ad</h4>
              <p style="font-size:0.85rem; color:var(--accent-gold); font-weight:700;">${data.type}</p>
              <span style="font-size:0.8rem; color:var(--text-muted); background:rgba(255,255,255,0.08); padding:4px 14px; border-radius:100px;">
                📊 Performance: ${data.stats}
              </span>
            </div>
          `;
        }

        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      if (modalBodyContent) modalBodyContent.innerHTML = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        if (modalBodyContent) modalBodyContent.innerHTML = '';
      }
    });
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending to Gmail...';

      const formData = new FormData(contactForm);
      const dataObj = Object.fromEntries(formData.entries());

      fetch('https://formsubmit.co/ajax/firstframeoff@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.style.background = '#22c55e';
        submitBtn.style.color = '#ffffff';
        submitBtn.innerHTML = '✓ Message Sent Successfully!<br><span style="font-size:0.75rem; opacity:0.9; font-weight:600; display:inline-block; margin-top:2px;">Sent to firstframeoff@gmail.com</span>';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.innerHTML = originalText;
        }, 6000);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        // Fallback: standard HTML form submission
        contactForm.submit();
      });
    });
  }
});
