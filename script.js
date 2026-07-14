/* =========================================================
   PRIYA BEAUTY PARLOUR — SCRIPT.JS
   Vanilla JavaScript only. No frameworks / libraries.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------------------
     1. LOADING SCREEN
     Hides once the page has fully loaded (or after a short
     fallback delay so it never gets stuck).
  ------------------------------------------------------- */
  var loader = document.getElementById('loader');
  function hideLoader() {
    if (loader) loader.classList.add('hide');
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, 400); });
  setTimeout(hideLoader, 2500); // fallback safety net

  /* -------------------------------------------------------
     1B. REVEAL-ON-SCROLL SETUP (declared early on purpose —
     onScroll() below calls revealOnScroll() immediately, so
     this must exist before that first call happens).
  ------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .fade-up');

  function revealOnScroll() {
    var winBottom = window.scrollY + window.innerHeight;
    revealEls.forEach(function (el) {
      if (el.classList.contains('in-view')) return;
      var top = el.getBoundingClientRect().top + window.scrollY;
      if (winBottom > top + 60) el.classList.add('in-view');
    });
  }

  /* -------------------------------------------------------
     1C. NAV LINKS + SECTIONS (also needed before onScroll's
     first call, since onScroll triggers updateActiveNav).
  ------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var currentId = sections.length ? sections[0].id : '';

    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });

    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', match);
    });
  }

  /* -------------------------------------------------------
     2. STICKY HEADER + SCROLL PROGRESS BAR
  ------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  var progressBar = document.getElementById('scrollProgress');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (header) header.classList.toggle('scrolled', scrollTop > 30);
    if (progressBar) progressBar.style.width = progress + '%';
    if (backToTop) backToTop.classList.toggle('show', scrollTop > 500);

    updateActiveNav();
    revealOnScroll();
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------
     3. MOBILE HAMBURGER MENU
  ------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mainNav = document.getElementById('mainNav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu after a nav link is tapped
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------------------------------------------
     6. BUTTON RIPPLE EFFECT
  ------------------------------------------------------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-span';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* -------------------------------------------------------
     7. SERVICES DATA + RENDER + FILTER
  ------------------------------------------------------- */
  var services = [
    { name: 'Hair Cut & Styling', cat: 'hair', price: '₹399', img: '3992861', desc: 'Precision cuts styled to suit your face shape & lifestyle.' },
    { name: 'Hair Spa', cat: 'hair', price: '₹899', img: '5368632', desc: 'Deep nourishing spa treatment for damaged, dry hair.' },
    { name: 'Hair Colouring', cat: 'hair', price: '₹1,499', img: '3993320', desc: 'Global & highlight colour using ammonia-free formulas.' },
    { name: 'Hair Smoothening', cat: 'hair', price: '₹2,999', img: '8834124', desc: 'Frizz-free, silky smooth hair that lasts for months.' },
    { name: 'Hair Treatment', cat: 'hair', price: '₹1,199', img: '18459625', desc: 'Targeted therapy for hair fall, dandruff & breakage.' },
    { name: 'Hair Styling', cat: 'hair', price: '₹599', img: '3992865', desc: 'Blow-dry, curls or updos for any occasion.' },
    { name: 'Facial', cat: 'skin', price: '₹799', img: '34930126', desc: 'Rejuvenating facials tailored to your skin type.' },
    { name: 'Cleanup', cat: 'skin', price: '₹499', img: '33607393', desc: 'Quick refresh to deep-clean pores and brighten skin.' },
    { name: 'Bleach', cat: 'skin', price: '₹399', img: '6546374', desc: 'Gentle bleaching for an even, radiant skin tone.' },
    { name: 'Threading', cat: 'skin', price: '₹49', img: '33580450', desc: 'Neat, precise eyebrow & face threading.' },
    { name: 'Waxing', cat: 'skin', price: '₹599', img: '29692114', desc: 'Smooth, long-lasting hair removal with premium wax.' },
    { name: 'Detan', cat: 'skin', price: '₹699', img: '5178007', desc: 'Remove tan and restore your natural glow instantly.' },
    { name: 'Body Polishing', cat: 'skin', price: '₹1,999', img: '22364774', desc: 'Full-body exfoliation for soft, glowing skin.' },
    { name: 'Skin Treatment', cat: 'skin', price: '₹1,599', img: '7755169', desc: 'Advanced solutions for acne, pigmentation & dullness.' },
    { name: 'Bridal Makeup', cat: 'makeup', price: '₹15,999', img: '30809480', desc: 'HD bridal makeup crafted to make your day unforgettable.' },
    { name: 'Party Makeup', cat: 'makeup', price: '₹2,499', img: '20309789', desc: 'Glam looks for parties, events and celebrations.' },
    { name: 'Engagement Makeup', cat: 'makeup', price: '₹6,999', img: '17125530', desc: 'Soft glam looks designed for your engagement story.' },
    { name: 'Reception Makeup', cat: 'makeup', price: '₹8,999', img: '29368877', desc: 'Long-lasting glam for your reception evening.' },
    { name: 'Groom Makeover', cat: 'makeup', price: '₹3,999', img: '30494305', desc: 'Grooming, skin prep & styling for the groom-to-be.' },
    { name: 'Kids Haircut', cat: 'hair', price: '₹299', img: '7951974', desc: 'Gentle, fun haircuts for our youngest clients.' },
    { name: 'Nail Art', cat: 'nails', price: '₹899', img: '3997385', desc: 'Custom nail art designs by our in-house nail artists.' },
    { name: 'Manicure', cat: 'nails', price: '₹599', img: '11876088', desc: 'Classic manicure for clean, healthy, soft hands.' },
    { name: 'Pedicure', cat: 'nails', price: '₹699', img: '5484947', desc: 'Relaxing pedicure to pamper and refresh tired feet.' },
    { name: 'Head Massage', cat: 'nails', price: '₹399', img: '13336910', desc: 'Stress-relieving massage to relax scalp & mind.' }
  ];

  // Builds a reliable, free-to-use Pexels CDN image URL from a photo ID
  function pexelsUrl(id, width) {
    return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (width || 600);
  }

  var serviceGrid = document.getElementById('serviceGrid');

  function renderServices(filter) {
    if (!serviceGrid) return;
    serviceGrid.innerHTML = '';
    services
      .filter(function (s) { return filter === 'all' || s.cat === filter; })
      .forEach(function (s) {
        var card = document.createElement('div');
        card.className = 'service-card reveal';
        card.innerHTML =
          '<div class="service-img"><img src="' + pexelsUrl(s.img, 500) + '" alt="' + s.name + ' at Priya Beauty Parlour" loading="lazy" width="400" height="300"></div>' +
          '<div class="service-body">' +
            '<h3>' + s.name + '</h3>' +
            '<p>' + s.desc + '</p>' +
            '<div class="service-menu-line"><span>Starting at</span><span class="dots"></span><span class="service-price">' + s.price + '</span></div>' +
            '<a href="#appointment" class="service-book">Book Now</a>' +
          '</div>';
        serviceGrid.appendChild(card);
      });
    // re-arm reveal animation + observe new nodes
    revealEls = document.querySelectorAll('.reveal, .fade-up');
    revealOnScroll();
  }
  renderServices('all');

  document.querySelectorAll('#serviceFilters .filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#serviceFilters .filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderServices(btn.dataset.filter);
    });
  });

  /* -------------------------------------------------------
     8. GALLERY DATA + RENDER + FILTER + LIGHTBOX
  ------------------------------------------------------- */
  var galleryImages = [
    { seed: '29368881', cat: 'bridal', caption: 'Bridal look — full HD makeup', tall: true },
    { seed: '8834124', cat: 'hair', caption: 'Salon styling station' },
    { seed: '13336910', cat: 'makeup', caption: 'Party glam makeup' },
    { seed: '33607393', cat: 'skin', caption: 'Post-facial glow' },
    { seed: '11742214', cat: 'before-after', caption: 'Bridal maang-tikka detailing' },
    { seed: '3993320', cat: 'hair', caption: 'Hair colour transformation' },
    { seed: '14847827', cat: 'bridal', caption: 'Bridal draping & jewellery' },
    { seed: '19021379', cat: 'makeup', caption: 'Engagement soft-glam' },
    { seed: '22364774', cat: 'skin', caption: 'Body polishing results', tall: true },
    { seed: '20695691', cat: 'before-after', caption: 'Bridal glow-up finish' },
    { seed: '33867518', cat: 'hair', caption: 'Inside our styling studio' },
    { seed: '36519701', cat: 'bridal', caption: 'Reception look' }
  ];

  var galleryGrid = document.getElementById('galleryGrid');
  var currentGalleryList = galleryImages.slice();

  function renderGallery(filter) {
    if (!galleryGrid) return;
    currentGalleryList = galleryImages.filter(function (g) { return filter === 'all' || g.cat === filter; });
    galleryGrid.innerHTML = '';
    currentGalleryList.forEach(function (g, i) {
      var item = document.createElement('div');
      item.className = 'gallery-item reveal' + (g.tall ? ' tall' : '');
      item.dataset.index = i;
      item.innerHTML =
        '<img src="' + pexelsUrl(g.seed, 500) + '" alt="' + g.caption + '" loading="lazy">' +
        '<div class="gallery-overlay"><span>' + g.caption + '</span></div>';
      item.addEventListener('click', function () { openLightbox(i); });
      galleryGrid.appendChild(item);
    });
    revealEls = document.querySelectorAll('.reveal, .fade-up');
    revealOnScroll();
  }
  renderGallery('all');

  document.querySelectorAll('#galleryFilters .filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#galleryFilters .filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function updateLightbox() {
    var g = currentGalleryList[lightboxIndex];
    if (!g) return;
    lightboxImg.src = pexelsUrl(g.seed, 1000);
    lightboxImg.alt = g.caption;
    lightboxCaption.textContent = g.caption;
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext').addEventListener('click', function () {
    lightboxIndex = (lightboxIndex + 1) % currentGalleryList.length;
    updateLightbox();
  });
  document.getElementById('lightboxPrev').addEventListener('click', function () {
    lightboxIndex = (lightboxIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateLightbox();
  });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
  });

  /* -------------------------------------------------------
     9. TESTIMONIAL SLIDER
  ------------------------------------------------------- */
  var testimonials = [
    { name: 'Sanya Kapoor', role: 'Bride, 2025', img: '34381970', rating: 5, quote: 'Priya made my bridal look absolutely flawless. The team was patient, professional and so talented!' },
    { name: 'Meera Joshi', role: 'Regular Client', img: '18809829', rating: 5, quote: 'The hair spa here is unmatched. My hair has never felt this healthy. Highly recommend the Gold package.' },
    { name: 'Ayesha Khan', role: 'Working Professional', img: '5131547', rating: 5, quote: 'Clean, hygienic and so relaxing. The staff genuinely cares about getting the look right.' },
    { name: 'Rhea Malhotra', role: 'Engagement Client', img: '29646269', rating: 4, quote: 'Beautiful engagement makeup that lasted the entire event. Booking online was super easy too.' },
    { name: 'Pooja Nair', role: 'Monthly Member', img: '29852895', rating: 5, quote: 'From facials to pedicures, every visit feels premium without being overpriced. My go-to salon now.' }
  ];

  // Renders a crisp inline-SVG star rating (filled vs outline) instead of unicode glyphs
  function starIcon(filled) {
    return '<svg class="star-icon" viewBox="0 0 20 20" aria-hidden="true"><use href="#icon-star-' + (filled ? 'filled' : 'outline') + '"/></svg>';
  }
  function starRow(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) html += starIcon(i <= rating);
    return html;
  }

  var track = document.getElementById('testimonialTrack');
  var dotsWrap = document.getElementById('testimonialDots');
  var tIndex = 0;

  function renderTestimonials() {
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    testimonials.forEach(function (t, i) {
      var slide = document.createElement('div');
      slide.className = 'testimonial-slide';
      slide.style.display = i === 0 ? 'block' : 'none';
      slide.innerHTML =
        '<img src="' + pexelsUrl(t.img, 200) + '" alt="' + t.name + '" loading="lazy">' +
        '<div class="stars">' + starRow(t.rating) + '</div>' +
        '<p class="quote">"' + t.quote + '"</p>' +
        '<h4>' + t.name + '</h4><span>' + t.role + '</span>';
      track.appendChild(slide);

      var dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { showTestimonial(i); });
      dotsWrap.appendChild(dot);
    });
  }
  function showTestimonial(i) {
    var slides = track.querySelectorAll('.testimonial-slide');
    var dots = dotsWrap.querySelectorAll('span');
    slides.forEach(function (s, idx) { s.style.display = idx === i ? 'block' : 'none'; });
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
    tIndex = i;
  }
  document.getElementById('testimonialNext').addEventListener('click', function () {
    showTestimonial((tIndex + 1) % testimonials.length);
  });
  document.getElementById('testimonialPrev').addEventListener('click', function () {
    showTestimonial((tIndex - 1 + testimonials.length) % testimonials.length);
  });
  renderTestimonials();

  // auto-advance every 6s
  setInterval(function () { showTestimonial((tIndex + 1) % testimonials.length); }, 6000);

  /* -------------------------------------------------------
     10. COUNTER ANIMATION (triggers when in view)
  ------------------------------------------------------- */
  var counters = document.querySelectorAll('.counter');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    var section = document.getElementById('experience');
    if (!section) return;
    var top = section.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.75) return;

    countersAnimated = true;
    counters.forEach(function (counter) {
      var target = parseInt(counter.dataset.target, 10);
      var current = 0;
      var duration = 1600;
      var stepTime = 16;
      var steps = duration / stepTime;
      var increment = target / steps;

      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString('en-IN');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString('en-IN');
        }
      }, stepTime);
    });
  }
  document.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  /* -------------------------------------------------------
     11. FAQ ACCORDION
  ------------------------------------------------------- */
  var faqs = [
    { q: 'Do I need to book an appointment in advance?', a: 'Walk-ins are welcome, but we recommend booking at least a day in advance to guarantee your preferred time slot and stylist.' },
    { q: 'What hygiene measures does Priya follow?', a: 'We use single-use tools where possible, sanitise every station between clients, and follow medical-grade sterilisation for all reusable equipment.' },
    { q: 'Do you offer trial sessions for bridal makeup?', a: 'Yes, we strongly recommend a bridal trial 2–3 weeks before your wedding date so we can perfect your look together.' },
    { q: 'Can I reschedule or cancel my appointment?', a: 'Absolutely — just call or WhatsApp us at least 3 hours before your slot and we will happily reschedule at no extra cost.' },
    { q: 'Do you have products for sensitive skin?', a: 'Yes, our therapists use dermatologically-tested, fragrance-light product lines suited for sensitive skin on request.' },
    { q: 'Is parking available at the studio?', a: 'Yes, dedicated parking is available right outside the studio entrance for all our clients.' }
  ];

  var faqList = document.getElementById('faqList');
  faqs.forEach(function (f) {
    var item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML =
      '<button class="faq-question"><span>' + f.q + '</span><span class="plus"><svg class="icon"><use href="#icon-plus"/></svg></span></button>' +
      '<div class="faq-answer"><p>' + f.a + '</p></div>';
    faqList.appendChild(item);
  });

  faqList.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-question');
    if (!btn) return;
    var item = btn.parentElement;
    var answer = item.querySelector('.faq-answer');
    var isOpen = item.classList.contains('open');

    // close all others (single-open accordion)
    faqList.querySelectorAll('.faq-item').forEach(function (el) {
      el.classList.remove('open');
      el.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });

  /* -------------------------------------------------------
     12. APPOINTMENT FORM VALIDATION + SUBMISSION
  ------------------------------------------------------- */
  var form = document.getElementById('appointmentForm');
  var formSuccess = document.getElementById('formSuccess');

  function setError(fieldId, message) {
    var errEl = document.getElementById('err-' + fieldId);
    var field = document.getElementById(fieldId);
    if (errEl) errEl.textContent = message || '';
    if (field) field.closest('.form-group').classList.toggle('invalid', !!message);
  }

  function validateForm() {
    var valid = true;

    var fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 3) { setError('fullName', 'Please enter your full name.'); valid = false; }
    else { setError('fullName', ''); }

    var mobile = document.getElementById('mobile').value.trim();
    if (!/^[6-9]\d{9}$/.test(mobile)) { setError('mobile', 'Enter a valid 10-digit mobile number.'); valid = false; }
    else { setError('mobile', ''); }

    var email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Enter a valid email address.'); valid = false; }
    else { setError('email', ''); }

    var service = document.getElementById('service').value;
    if (!service) { setError('service', 'Please select a service.'); valid = false; }
    else { setError('service', ''); }

    var date = document.getElementById('date').value;
    if (!date) { setError('date', 'Please choose a preferred date.'); valid = false; }
    else {
      var chosen = new Date(date + 'T00:00:00');
      var today = new Date(); today.setHours(0, 0, 0, 0);
      if (chosen < today) { setError('date', 'Date cannot be in the past.'); valid = false; }
      else { setError('date', ''); }
    }

    var time = document.getElementById('time').value;
    if (!time) { setError('time', 'Please choose a preferred time.'); valid = false; }
    else { setError('time', ''); }

    return valid;
  }

  if (form) {
    // set min date to today
    var dateInput = document.getElementById('date');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      var payload = {
        name: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('mobile').value.trim(),
        email: document.getElementById('email').value.trim(),
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value.trim()
      };

      /* ---------------------------------------------------
         SEND TO EMAIL — plug your email service here.
         Recommended: a form backend such as Formspree,
         EmailJS or your own server endpoint. Example using
         a generic fetch POST (replace YOUR_ENDPOINT_URL):

         fetch('YOUR_ENDPOINT_URL', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(payload)
         });
      --------------------------------------------------- */
      console.log('Appointment request submitted:', payload);

      // Save a copy locally so the person can see/track it from the bell icon
      // (auto-deletes itself after 10 days — see section 14 below)
      saveAppointmentToStorage({
        name: payload.name,
        service: payload.service,
        date: payload.date,
        time: payload.time
      });
      renderNotifPanel();

      formSuccess.classList.add('show');
      form.reset();
      if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

      setTimeout(function () { formSuccess.classList.remove('show'); }, 6000);
    });
  }

  /* -------------------------------------------------------
     14. SAVED APPOINTMENT REQUESTS (localStorage, 10-day auto-expiry)
     Stored only in this browser (not sent anywhere). Every entry
     carries a submittedAt timestamp; entries older than 10 days
     are silently dropped the next time the page loads or the
     panel is rendered — no server or backend involved.
  ------------------------------------------------------- */
  var NOTIF_STORAGE_KEY = 'priya_saved_appointments';
  var NOTIF_MAX_AGE_DAYS = 10;
  var NOTIF_MAX_AGE_MS = NOTIF_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

  function loadSavedAppointments() {
    var raw;
    try { raw = localStorage.getItem(NOTIF_STORAGE_KEY); } catch (e) { return []; }
    if (!raw) return [];

    var list;
    try { list = JSON.parse(raw); } catch (e) { list = []; }
    if (!Array.isArray(list)) list = [];

    var now = Date.now();
    // Drop anything older than 10 days — this is the "auto-delete" step
    var fresh = list.filter(function (entry) { return (now - entry.submittedAt) < NOTIF_MAX_AGE_MS; });

    if (fresh.length !== list.length) {
      try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(fresh)); } catch (e) { /* storage unavailable */ }
    }
    // Newest first
    fresh.sort(function (a, b) { return b.submittedAt - a.submittedAt; });
    return fresh;
  }

  function saveAppointmentToStorage(entry) {
    var list = loadSavedAppointments();
    entry.id = 'req_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    entry.submittedAt = Date.now();
    list.unshift(entry);
    try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
  }

  function deleteSavedAppointment(id) {
    var list = loadSavedAppointments().filter(function (e) { return e.id !== id; });
    try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
    renderNotifPanel();
  }

  var notifBtn = document.getElementById('notifBtn');
  var notifPanel = document.getElementById('notifPanel');
  var notifBadge = document.getElementById('notifBadge');
  var notifList = document.getElementById('notifList');

  function daysLeftLabel(submittedAt) {
    var msLeft = NOTIF_MAX_AGE_MS - (Date.now() - submittedAt);
    var daysLeft = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
    if (daysLeft <= 0) return 'Expiring today';
    if (daysLeft === 1) return 'Expires tomorrow';
    return 'Auto-deletes in ' + daysLeft + ' days';
  }

  function renderNotifPanel() {
    if (!notifList) return;
    var list = loadSavedAppointments();

    if (notifBadge) {
      if (list.length > 0) {
        notifBadge.textContent = list.length > 9 ? '9+' : String(list.length);
        notifBadge.hidden = false;
      } else {
        notifBadge.hidden = true;
      }
    }

    if (list.length === 0) {
      notifList.innerHTML =
        '<div class="notif-empty">' +
          '<svg class="icon"><use href="#icon-inbox-empty"/></svg>' +
          '<p>No saved requests yet.<br>Book an appointment to see it here.</p>' +
        '</div>';
      return;
    }

    notifList.innerHTML = list.map(function (entry) {
      return (
        '<div class="notif-item" data-id="' + entry.id + '">' +
          '<div class="notif-item-icon"><svg class="icon"><use href="#icon-calendar"/></svg></div>' +
          '<div class="notif-item-body">' +
            '<h5>' + entry.name + '</h5>' +
            '<p>' + entry.service + ' · ' + entry.date + (entry.time ? ' at ' + entry.time : '') + '</p>' +
            '<span class="notif-item-expiry">' + daysLeftLabel(entry.submittedAt) + '</span>' +
          '</div>' +
          '<button class="notif-item-delete" aria-label="Remove this saved request" data-delete-id="' + entry.id + '">' +
            '<svg class="icon"><use href="#icon-trash"/></svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');
  }
  renderNotifPanel();

  if (notifList) {
    notifList.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-delete-id]');
      if (!btn) return;
      deleteSavedAppointment(btn.dataset.deleteId);
    });
  }

  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = notifPanel.classList.toggle('open');
      notifBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) renderNotifPanel();
    });
    document.addEventListener('click', function (e) {
      if (!notifPanel.classList.contains('open')) return;
      if (notifPanel.contains(e.target) || notifBtn.contains(e.target)) return;
      notifPanel.classList.remove('open');
      notifBtn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        notifPanel.classList.remove('open');
        notifBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -------------------------------------------------------
     13. FOOTER — CURRENT YEAR
  ------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
