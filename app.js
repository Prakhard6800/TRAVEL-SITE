const destinations = [
    {
        name: 'Jaipur',
        region: 'Rajasthan, India',
        days: '3–4 days',
        price: '₹12k',
        tag: 'Heritage',
        img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85',
        description: 'A city of rose walls, lively courtyards, and slow afternoons shaped by craft, history, and warm hospitality.',
        bestFor: 'Culture lovers & design-led stays',
        highlights: ['Amber Fort sunrise walk', 'Handblock textile markets', 'Old-city rooftop dining'],
        itinerary: ['Day 1: Arrive and ease into a heritage haveli stay.', 'Day 2: Visit Amber Fort, local bazaars, and a sunset rooftop dinner.', 'Day 3: Explore palace courtyards and a slow morning coffee walk.']
    },
    {
        name: 'Goa',
        region: 'West Coast, India',
        days: '4–5 days',
        price: '₹15k',
        tag: 'Coastal',
        img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85',
        description: 'Golden beaches, beach shacks, and easygoing itineraries built for sun, salt, and unhurried evenings.',
        bestFor: 'Beach breaks & easy escapes',
        highlights: ['Sunrise at Morjim', 'Fresh seafood by the coast', 'A slow beach-hopping route'],
        itinerary: ['Day 1: Settle into a beachside stay and do a sunset walk.', 'Day 2: Explore hidden coves and a relaxed café afternoon.', 'Day 3: Add a lazy pool day and sunset music by the shore.']
    },
    {
        name: 'Meghalaya',
        region: 'Northeast, India',
        days: '5–7 days',
        price: '₹18k',
        tag: 'Wild & green',
        img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85',
        description: 'A misty mountain escape where waterfalls, local food, and scenic drives create slow, memorable days.',
        bestFor: 'Nature lovers & road-trippers',
        highlights: ['Cloud-kissed viewpoints', 'Cafés and local cuisine', 'Rainforest trails and waterfalls'],
        itinerary: ['Day 1: Scenic arrival and a guided village walk.', 'Day 2: Waterfall loop and mountain café stops.', 'Day 3: Explore viewpoints, local food, and a quiet evening in the hills.']
    },
    {
        name: 'Kerala',
        region: 'South India',
        days: '5–6 days',
        price: '₹16k',
        tag: 'Slow travel',
        img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85',
        description: 'Backwaters, spice trails, and gentle mornings designed for a slower rhythm and meaningful stays.',
        bestFor: 'Slow travel & wellness escapes',
        highlights: ['Backwater houseboat stay', 'Herbal spa rituals', 'Coconut groves and village roads'],
        itinerary: ['Day 1: Check in and settle into a serene riverfront property.', 'Day 2: Backwaters cruise and a local cooking experience.', 'Day 3: Explore tea estates and a quiet evening by the water.']
    }
];

const testimonials = [
    { name: 'Rhea', quote: 'The curation felt personal, not generic. Every stay matched the mood we wanted.', rating: '★★★★★' },
    { name: 'Aman', quote: 'The itinerary planning made our trip feel effortless, especially in Kerala.', rating: '★★★★★' },
    { name: 'Tara', quote: 'Beautiful balance of local experiences and gorgeous stays. Easily the best trip planning we’ve done.', rating: '★★★★★' }
];

let saved = JSON.parse(localStorage.getItem('vvSaved') || '[]');
const app = document.querySelector('#app');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

const toast = (t) => {
    let x = document.querySelector('.toast') || Object.assign(document.body.appendChild(document.createElement('div')), { className: 'toast' });
    x.textContent = t;
    x.classList.add('show');
    setTimeout(() => x.classList.remove('show'), 1800);
};

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

function getCurrentPageKey(hash = location.hash.slice(1)) {
    const current = hash || 'home';
    if (current.startsWith('details:')) return 'explore';
    if (current === 'booking') return 'planner';
    return current;
}

function card(d) {
    const is = saved.includes(d.name);
    return `
        <article class="card">
            <div class="card-media">
                <img src="${d.img}" alt="${d.name}">
                <span class="tag">${d.tag}</span>
                <button class="heart ${is ? 'saved' : ''}" onclick="toggleSave('${d.name}')">${is ? '♥' : '♡'}</button>
            </div>
            <div class="card-info">
                <div>
                    <h3>${d.name}</h3>
                    <div class="meta">${d.region}</div>
                </div>
                <div class="price">${d.days}<strong>from ${d.price}</strong></div>
            </div>
            <div class="card-actions">
                <button class="btn small" data-detail="${d.name}">View details</button>
            </div>
        </article>
    `;
}

function layout(content) {
    app.innerHTML = `<div class="page">${content}</div><div class="toast"></div>`;
    window.scrollTo(0, 0);
    const activeKey = getCurrentPageKey();
    document.querySelectorAll('nav button').forEach(b => b.classList.toggle('active', b.dataset.page === activeKey));
}

function home() {
    layout(`
        <section class="hero">
            <div>
                <div class="eyebrow">Travel, thoughtfully</div>
                <h1>Go where you feel <em>most alive.</em></h1>
                <p class="lead">A slower, more personal way to discover beautiful places. Curated destinations, meaningful stays, and itineraries made around how you actually like to travel.</p>
                <div class="hero-actions">
                    <button class="btn" data-page="explore">Explore destinations <span>→</span></button>
                    <button class="btn light" data-page="booking">Plan a trip</button>
                </div>
                <div class="stat-band">
                    <div><strong>40+</strong><span>Curated escapes</span></div>
                    <div><strong>4.9/5</strong><span>Guest rating</span></div>
                    <div><strong>2k+</strong><span>Happy travelers</span></div>
                </div>
            </div>
            <div class="hero-img"></div>
        </section>

        <section class="feature-strip">
            <article>
                <span class="feature-icon">✦</span>
                <h3>Thoughtful planning</h3>
                <p>Trips shaped around your pace, style, and favorite kind of experience.</p>
            </article>
            <article>
                <span class="feature-icon">◎</span>
                <h3>Local-first stays</h3>
                <p>Stay in unforgettable spaces with character, comfort, and atmosphere.</p>
            </article>
            <article>
                <span class="feature-icon">⟡</span>
                <h3>Slow travel energy</h3>
                <p>Beautiful itineraries built for presence, not rushing from one checkmark to another.</p>
            </article>
        </section>
        <hr class="rule">
        <section>
            <div class="section-head">
                <div>
                    <div class="eyebrow">A few places to begin</div>
                    <h2>Made for your kind of trip.</h2>
                </div>
                <button class="btn light" data-page="explore">View all</button>
            </div>
            <div class="cards">${destinations.slice(0, 4).map(card).join('')}</div>
        </section>

        <section class="testimonial-section">
            <div class="section-head compact">
                <div>
                    <div class="eyebrow">Traveller notes</div>
                    <h2>Why people keep coming back.</h2>
                </div>
            </div>
            <div class="testimonial-grid">
                ${testimonials.map(t => `
                    <article class="testimonial-card">
                        <div class="rating">${t.rating}</div>
                        <p>“${t.quote}”</p>
                        <strong>${t.name}</strong>
                    </article>
                `).join('')}
            </div>
        </section>
    `);
}

function explore() {
    layout(`
        <div class="eyebrow">Explore the world</div>
        <h1 class="page-title">Places worth <em>wandering.</em></h1>
        <p class="lead">Find destinations by mood, pace, and the kind of memories you want to make.</p>
        <div style="display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-top:45px">
            <input class="search" id="search" placeholder="Search destinations…">
            <div class="filters" style="margin:0">
                <button class="chip active" data-filter="All">All places</button>
                <button class="chip" data-filter="Heritage">Heritage</button>
                <button class="chip" data-filter="Coastal">Coastal</button>
                <button class="chip" data-filter="Wild & green">Wild & green</button>
                <button class="chip" data-filter="Slow travel">Slow travel</button>
            </div>
        </div>
        <hr class="rule">
        <div class="cards" id="destinationCards">${destinations.map(card).join('')}</div>
    `);
    bindExplore();
}

function bindExplore() {
    let current = 'All';
    let q = '';
    const render = () => {
        const out = destinations.filter(d => (current === 'All' || d.tag === current) && d.name.toLowerCase().includes(q.toLowerCase()));
        document.querySelector('#destinationCards').innerHTML = out.length ? out.map(card).join('') : '<p class="lead">No destinations found.</p>';
    };
    const searchInput = document.querySelector('#search');
    // prepare suggestions container
    if (searchInput) {
        const parent = searchInput.parentElement;
        parent.style.position = parent.style.position || 'relative';
        let sugg = parent.querySelector('.suggestions');
        if (!sugg) { sugg = document.createElement('div'); sugg.className = 'suggestions'; parent.appendChild(sugg); }

        let selIndex = -1;
        const updateSuggestions = (val) => {
            q = val; render();
            const matches = destinations.filter(d => d.name.toLowerCase().includes(q.toLowerCase())).slice(0,6);
            if (!matches.length) { sugg.style.display = 'none'; return; }
            sugg.style.display = 'block';
            sugg.innerHTML = matches.map(m => `<button type="button" data-name="${m.name}">${m.name} <span style="color:var(--muted);">— ${m.region}</span></button>`).join('');
            selIndex = -1;
            sugg.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>{ searchInput.value = b.dataset.name; q = b.dataset.name; sugg.style.display='none'; render(); }));
        };

        searchInput.addEventListener('input', e => updateSuggestions(e.target.value));
        searchInput.addEventListener('keydown', e => {
            const items = sugg.querySelectorAll('button');
            if (!items.length) return;
            if (e.key === 'ArrowDown') { e.preventDefault(); selIndex = Math.min(selIndex+1, items.length-1); items.forEach(x=>x.classList.remove('active')); items[selIndex].classList.add('active'); items[selIndex].focus(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); selIndex = Math.max(selIndex-1, 0); items.forEach(x=>x.classList.remove('active')); items[selIndex].classList.add('active'); items[selIndex].focus(); }
            else if (e.key === 'Enter') { if (selIndex >=0 && items[selIndex]) { searchInput.value = items[selIndex].dataset.name; q = searchInput.value; sugg.style.display='none'; render(); } }
            else if (e.key === 'Escape') { sugg.style.display='none'; }
        });
        document.addEventListener('click', (ev) => { if (!parent.contains(ev.target)) sugg.style.display='none'; });
    }
    document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => {
        current = b.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('active', x === b));
        render();
    });
}

function planner() {
    layout(`
        <div class="planner">
            <section>
                <div class="eyebrow">Your next escape</div>
                <h1 class="page-title">Plan a trip that feels <em>like you.</em></h1>
                <p class="lead">Tell us a little about your trip and we'll shape a simple starting itinerary.</p>
                <div class="result" id="plannerResult">
                    <div class="eyebrow">Suggested starting point</div>
                    <h3>Kerala</h3>
                    <p class="lead">5–6 days · from ₹16k · nature, food & slow travel.</p>
                </div>
            </section>
            <section class="form-panel">
                <div class="eyebrow">Trip details</div>
                <h2>Let's make a plan.</h2>
                <div class="field">
                    <label>Destination</label>
                    <select id="dest">
                        <option>Kerala</option>
                        <option>Goa</option>
                        <option>Jaipur</option>
                        <option>Meghalaya</option>
                    </select>
                </div>
                <div class="field">
                    <label>Travel style</label>
                    <div class="checkrow">
                        <label><input type="checkbox" checked> Nature</label>
                        <label><input type="checkbox"> Food</label>
                        <label><input type="checkbox"> Culture</label>
                        <label><input type="checkbox"> Adventure</label>
                    </div>
                </div>
                <div class="field">
                    <label>Days</label>
                    <input id="days" type="number" min="2" value="5">
                </div>
                <button class="btn" id="makePlan">Create itinerary →</button>
            </section>
        </div>
    `);

    document.querySelector('#makePlan').onclick = () => {
        const d = destinations.find(x => x.name === document.querySelector('#dest').value);
        document.querySelector('#plannerResult').innerHTML = `
            <div class="eyebrow">Your draft itinerary</div>
            <h3>${d.name}</h3>
            <p class="lead">${document.querySelector('#days').value} days · ${d.region}. Start with a relaxed first day, local food, one signature experience, and a free afternoon.</p>
            <button class="btn" onclick="saveTrip('${d.name}')">Save this trip →</button>
        `;
        toast('Itinerary created');
    };
}

function detailPage(name) {
    const destination = destinations.find(d => d.name === name) || destinations[0];
    const savedState = saved.includes(destination.name);

    layout(`
        <section class="detail-header">
            <div class="detail-hero">
                <img src="${destination.img}" alt="${destination.name}">
            </div>
            <div class="detail-copy">
                <div class="eyebrow">${destination.tag}</div>
                <h1 class="page-title">${destination.name}</h1>
                <div class="meta">${destination.region}</div>
                <p class="lead">${destination.description}</p>
                <div class="detail-stats">
                    <div><strong>${destination.days}</strong><span>Duration</span></div>
                    <div><strong>${destination.price}</strong><span>From</span></div>
                    <div><strong>4.8</strong><span>Guest rating</span></div>
                </div>
                <div class="detail-actions">
                    <button class="btn" data-page="booking">Book this trip →</button>
                    <button class="btn light" onclick="toggleSave('${destination.name}')">${savedState ? 'Saved trip' : 'Save trip'}</button>
                </div>
            </div>
        </section>

        <section class="detail-grid">
            <article class="info-panel">
                <div class="eyebrow">Why you'll love it</div>
                <ul class="feature-list">
                    ${destination.highlights.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </article>

            <article class="info-panel">
                <div class="eyebrow">Sample itinerary</div>
                <ol class="itinerary-list">
                    ${destination.itinerary.map(item => `<li>${item}</li>`).join('')}
                </ol>
            </article>
        </section>

        <section class="booking-panel">
            <div class="eyebrow">Plan your stay</div>
            <h2>Tell us when you want to go.</h2>
            <form id="destinationBookingForm" class="booking-form">
                <div class="field">
                    <label>Destination</label>
                    <input name="tripName" value="${destination.name}" readonly>
                </div>
                <div class="field two-up">
                    <div>
                        <label>Travel dates</label>
                        <input type="date" name="dates">
                    </div>
                    <div>
                        <label>Travelers</label>
                        <input type="number" name="travelers" min="1" value="2">
                    </div>
                </div>
                <div class="field">
                    <label>Trip style</label>
                    <select name="style">
                        <option>Nature</option>
                        <option>Food</option>
                        <option>Culture</option>
                        <option>Adventure</option>
                        <option>Relaxed</option>
                    </select>
                </div>
                <div class="field">
                    <label>Notes</label>
                    <textarea name="notes" rows="4" placeholder="Tell us what kind of stay you want."></textarea>
                </div>
                <button class="btn" type="submit">Request this trip</button>
            </form>
        </section>
    `);

    const bookingForm = document.querySelector('#destinationBookingForm');
    bookingForm?.addEventListener('submit', e => {
        e.preventDefault();
        toast(`Your ${destination.name} trip request is ready.`);
        bookingForm.reset();
        bookingForm.tripName.value = destination.name;
    });
}

function bookingPage() {
    layout(`
        <div class="booking-hero">
            <div class="eyebrow">Book a trip</div>
            <h1 class="page-title">Start planning your <em>next escape.</em></h1>
            <p class="lead">Share a few details and we’ll shape a trip that fits your pace, budget, and travel mood.</p>
        </div>

        <section class="booking-panel full-width">
            <form id="bookingForm" class="booking-form">
                <div class="field two-up">
                    <div>
                        <label>Destination</label>
                        <select name="destination">
                            ${destinations.map(d => `<option>${d.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label>Travelers</label>
                        <input type="number" name="travelers" min="1" value="2">
                        
                    </div>
                </div>
                <div class="field two-up">
                    <div>
                        <label>Preferred dates</label>
                        <input type="date" name="dates">
                    </div>
                    <div>
                        <label>Budget</label>
                        <select name="budget">
                            <option>₹10k–15k</option>
                            <option>₹15k–20k</option>
                            <option>₹20k–30k</option>
                            <option>₹30k+</option>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <label>Travel style</label>
                    <div class="checkrow">
                        <label><input type="checkbox" checked> Nature</label>
                        <label><input type="checkbox"> Food</label>
                        <label><input type="checkbox"> Culture</label>
                        <label><input type="checkbox"> Adventure</label>
                    </div>
                </div>
                <div class="field">
                    <label>Notes</label>
                    <textarea name="notes" rows="5" placeholder="Tell us what kind of trip you want to create."></textarea>
                </div>
                <button class="btn" type="submit">Send booking request</button>
            </form>
        </section>
    `);

    document.querySelector('#bookingForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const destination = form.destination.value;
        const travelers = form.travelers.value;
        const dates = form.dates.value;
        const budget = form.budget.value;
        const notes = form.notes.value;
        _bookingDraft = { destination, travelers, dates, budget, notes };
        // populate summary
        const summary = document.querySelector('#bookingSummary');
        if (summary) summary.innerHTML = `
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Travelers:</strong> ${travelers}</p>
            <p><strong>Dates:</strong> ${dates || 'Flexible'}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Notes:</strong> ${notes ? escapeHtml(notes) : '—'}</p>
        `;
        showBookingConfirmModal();
    });
}

function savedPage() {
    const items = destinations.filter(d => saved.includes(d.name));
    layout(`
        <div class="eyebrow">Your collection</div>
        <h1 class="page-title">Trips worth <em>keeping.</em></h1>
        <p class="lead">The places you've saved, and the ones you're still dreaming about.</p>
        <hr class="rule">
        <div class="saved-controls">
            <label><input id="selectAllSaved" type="checkbox"> Select all</label>
            <button class="btn" id="removeSelectedBtn">Remove selected</button>
            <button class="btn light" id="shareSelectedBtn">Share selected</button>
            <div class="count" style="margin-left:auto">${items.length} saved</div>
        </div>
        ${items.length ? '<div id="savedList">' + items.map(d => `
            <article class="saved-card">
                <img src="${d.img}" alt="${d.name}">
                <div>
                    <label><input type="checkbox" class="saved-checkbox" data-name="${d.name}"> <span class="eyebrow">Saved destination</span></label>
                    <h3>${d.name}</h3>
                    <div class="meta">${d.region} · ${d.days} · from ${d.price}</div><br>
                    <button class="btn" data-detail="${d.name}">Open itinerary →</button>
                    <button class="btn light" style="margin-left:10px" data-remove="${d.name}">Remove</button>
                </div>
            </article>
        `).join('') + '</div>' : '<p class="lead">Nothing saved yet. Explore a destination and tap the heart to keep it here.</p>'}
    `);

    // wire saved list actions
    const selectAll = document.querySelector('#selectAllSaved');
    const removeBtn = document.querySelector('#removeSelectedBtn');
    const shareBtn = document.querySelector('#shareSelectedBtn');

    selectAll?.addEventListener('change', (e) => {
        document.querySelectorAll('.saved-checkbox').forEach(cb => cb.checked = e.target.checked);
    });

    removeBtn?.addEventListener('click', () => {
        const toRemove = Array.from(document.querySelectorAll('.saved-checkbox:checked')).map(cb => cb.dataset.name);
        if (!toRemove.length) return toast('No items selected');
        toRemove.forEach(n => { saved = saved.filter(x => x !== n); });
        localStorage.setItem('vvSaved', JSON.stringify(saved));
        toast(`Removed ${toRemove.length} trips`);
        savedPage();
    });

    shareBtn?.addEventListener('click', async () => {
        const selected = Array.from(document.querySelectorAll('.saved-checkbox:checked')).map(cb => cb.dataset.name);
        if (!selected.length) return toast('No items selected');
        const text = 'Saved trips: ' + selected.join(', ');
        try { await navigator.clipboard.writeText(text); toast('Copied selected trips to clipboard'); }
        catch (e) { toast('Unable to copy'); }
    });

    // remove single
    document.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
        const name = b.dataset.remove;
        toggleSave(name);
    }));
}

function community() {
    layout(`
        <div class="eyebrow">Travel together</div>
        <h1 class="page-title">Stories from the <em>road.</em></h1>
        <p class="lead">A small community of curious travellers sharing routes, rituals, and places that deserve a little more time.</p>
        <hr class="rule">
        <div class="community-grid">
            <article class="community-card"><div class="eyebrow">Field note · Himachal</div><h3>Four quiet days in the mountains.</h3><p class="meta">A slow route through pine forests, village cafés and long mornings.</p></article>
            <article class="community-card"><div class="eyebrow">Food diary · Kerala</div><h3>Eating your way along the backwaters.</h3><p class="meta">Five meals, three boats, and a very good reason to stay another night.</p></article>
            <article class="community-card"><div class="eyebrow">Guide · Jaipur</div><h3>Beyond the famous pink façades.</h3><p class="meta">Craft markets, courtyard breakfasts and a calmer side of the city.</p></article>
            <article class="community-card"><div class="eyebrow">Weekend · Goa</div><h3>Coastal mornings, no checklist.</h3><p class="meta">A simple rhythm: swim, eat, read, repeat.</p></article>
        </div>
    `);
}
// --- user / auth helpers ---
function getUser() {
    try {
        return JSON.parse(localStorage.getItem('vvUser') || 'null');
    } catch (e) {
        return null;
    }
}

function refreshProfileAvatar() {
    const u = getUser();
    const btn = document.querySelector('#profileBtn');
    if (!btn) return;
    if (u && u.name) {
        const parts = u.name.split(' ').filter(Boolean);
        const initials = (parts[0] ? parts[0][0] : '') + (parts[1] ? parts[1][0] : '');
        btn.textContent = (initials || u.name[0] || 'G').toUpperCase();
    } else {
        btn.textContent = 'AS';
    }
}

function loginPage() {
    layout(`
        <div style="max-width:520px;margin:40px auto">
            <div class="eyebrow">Sign in</div>
            <h1 class="page-title">Welcome back</h1>
            <p class="lead">Sign in to view your profile, saved trips, and personalise recommendations.</p>
            <form id="loginForm" class="booking-form" style="margin-top:20px">
                <div class="field"><label>Name</label><input id="loginName" required></div>
                <div class="field"><label>Email</label><input id="loginEmail" type="email" required></div>
                <button class="btn" type="submit">Sign in</button>
            </form>
        </div>
    `);

    const form = document.querySelector('#loginForm');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.querySelector('#loginName').value.trim();
        const email = document.querySelector('#loginEmail').value.trim();
        if (!name) return toast('Please enter your name');
        const id = 'user-' + Math.random().toString(36).slice(2, 9);
        const user = { id, name, email };
        localStorage.setItem('vvUser', JSON.stringify(user));
        refreshProfileAvatar();
        toast('Signed in');
        location.hash = 'profile';
    });
}

function logout() {
    localStorage.removeItem('vvUser');
    refreshProfileAvatar();
    toast('Signed out');
    location.hash = 'home';
}

// --- profile page (shows user details if signed in) ---
function profile() {
    const u = getUser();
    if (!u) {
        layout(`
            <div style="max-width:520px;margin:40px auto;text-align:center">
                <div class="eyebrow">Not signed in</div>
                <h1 class="page-title">Welcome</h1>
                <p class="lead">Sign in to save trips, view your profile, and get personalised suggestions.</p>
                <div style="margin-top:22px">
                    <button class="btn" data-page="login">Sign in</button>
                    <button class="btn light" data-page="home" style="margin-left:10px">Continue as guest</button>
                </div>
            </div>
        `);
        return;
    }

    layout(`
        <div class="profile-top">
            <div class="profile-avatar">${(u.name || 'G').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()}</div>
            <div>
                <div class="eyebrow">Your travel personality</div>
                <h1>${u.name}</h1>
                <div class="meta">${u.email || ''}</div>
                <div class="meta">User ID: ${u.id}</div>
            </div>
            <div style="margin-left:auto;display:flex;gap:10px;align-items:center">
                <button id="editProfileBtn" class="btn">Edit profile</button>
                <button class="btn light" onclick="logout()">Sign out</button>
            </div>
        </div>
        <hr class="rule">
        <section class="preferences">
            <div class="eyebrow">Your preferences</div>
            <div class="filters"><span class="chip">Nature</span><span class="chip">Food</span><span class="chip">Solo</span></div>
            <button class="btn light" data-page="planner">Plan something personal →</button>
        </section>
    `);

    // wire edit profile button
    const editBtn = document.querySelector('#editProfileBtn');
    if (editBtn) editBtn.addEventListener('click', () => showProfileEditModal());
}

function saveTrip(name) {
    if (!saved.includes(name)) {
        saved.push(name);
        localStorage.setItem('vvSaved', JSON.stringify(saved));
        toast(`${name} saved`);
    } else {
        toast(`${name} is already saved`);
    }
}

function toggleSave(name) {
    saved = saved.includes(name) ? saved.filter(x => x !== name) : [...saved, name];
    localStorage.setItem('vvSaved', JSON.stringify(saved));
    toast(saved.includes(name) ? `${name} saved` : `${name} removed`);
    if (location.hash === '#saved') savedPage();
    else if (location.hash === '#explore') explore();
    else if (location.hash.startsWith('#details:')) detailPage(decodeURIComponent(location.hash.replace('#details:', '')));
    else home();
}

function route() {
    const hash = location.hash.slice(1) || 'home';
    if (hash.startsWith('details:')) {
        const d = decodeURIComponent(hash.replace('details:', ''));
        return detailPage(d);
    }

    const pages = { home, explore, planner, booking: bookingPage, saved: savedPage, community, profile, login: loginPage };
    (pages[hash] || home)();
}

document.addEventListener('click', e => {
    const pageButton = e.target.closest('[data-page]');
    if (pageButton) {
        e.preventDefault();
        location.hash = pageButton.dataset.page;
        return;
    }

    const detailButton = e.target.closest('[data-detail]');
    if (detailButton) {
        e.preventDefault();
        const destinationName = detailButton.dataset.detail;
        location.hash = `details:${encodeURIComponent(destinationName)}`;
    }
});

const profileBtn = document.querySelector('#profileBtn');
if (profileBtn) {
    profileBtn.onclick = () => {
        if (getUser()) location.hash = 'profile';
        else showLoginModal();
    };
}

const themeToggle = document.querySelector('#themeToggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('vvTheme') || 'light';
    document.body.classList.toggle('dark', savedTheme === 'dark');
    themeToggle.textContent = savedTheme === 'dark' ? '☀' : '☾';

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        const nextTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('vvTheme', nextTheme);
        themeToggle.textContent = isDark ? '☀' : '☾';
    });
}

// ensure avatar reflects signed-in state
refreshProfileAvatar();
// Modal / focus-trap utilities shared by all modals
let _trappedModal = null;
let _previousFocus = null;

function focusableElements(container = document) {
    return Array.from(container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
}

function trapFocus(modal) {
    releaseFocus();
    _trappedModal = modal;
    _previousFocus = document.activeElement;
    const focusables = focusableElements(modal);
    if (focusables.length) focusables[0].focus();

    modal.addEventListener('keydown', _trapHandler);

    function _trapHandler(e) {
        if (e.key !== 'Tab') return;
        const list = focusableElements(modal);
        if (!list.length) return;
        const idx = list.indexOf(document.activeElement);
        if (e.shiftKey && idx === 0) { e.preventDefault(); list[list.length - 1].focus(); }
        else if (!e.shiftKey && idx === list.length - 1) { e.preventDefault(); list[0].focus(); }
    }
    // store handler so we can remove later
    modal._trapHandler = _trapHandler;
}

function releaseFocus() {
    if (!_trappedModal) return;
    try { _trappedModal.removeEventListener('keydown', _trappedModal._trapHandler); } catch (e) {}
    if (_previousFocus && typeof _previousFocus.focus === 'function') _previousFocus.focus();
    _trappedModal = null; _previousFocus = null;
}

function showModal(id) {
    const m = document.querySelector('#' + id);
    if (!m) return;
    m.classList.add('show');
    m.setAttribute('aria-hidden', 'false');
    trapFocus(m);
}

function hideModal(id) {
    const m = document.querySelector('#' + id);
    if (!m) return;
    m.classList.remove('show');
    m.setAttribute('aria-hidden', 'true');
    releaseFocus();
}

function showLoginModal() { showModal('loginModal'); }
function hideLoginModal() { hideModal('loginModal'); }

function showProfileEditModal() {
    const u = getUser();
    document.querySelector('#editName').value = u?.name || '';
    document.querySelector('#editEmail').value = u?.email || '';
    showModal('profileEditModal');
}

function hideProfileEditModal() { hideModal('profileEditModal'); }

function showBookingConfirmModal() { showModal('bookingConfirmModal'); }
function hideBookingConfirmModal() { hideModal('bookingConfirmModal'); }

// close modals on backdrop/close clicks
document.addEventListener('click', (e) => {
    const action = e.target.dataset && e.target.dataset.action;
    if (action === 'close') {
        // find the ancestor modal and close it
        const modal = e.target.closest('.modal');
        if (modal && modal.id) hideModal(modal.id);
    }
    if (e.target.matches('.modal-close')) {
        const modal = e.target.closest('.modal'); if (modal && modal.id) hideModal(modal.id);
    }
});

// Escape closes any open modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && _trappedModal) {
        const modal = _trappedModal;
        const id = modal.id; if (id) hideModal(id);
    }
});

// login form handler
const modalForm = document.querySelector('#modalLoginForm');
if (modalForm) {
    modalForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = (document.querySelector('#modalLoginName')?.value || '').trim();
        const email = (document.querySelector('#modalLoginEmail')?.value || '').trim();
        if (!name) return toast('Please enter your name');
        const id = 'user-' + Math.random().toString(36).slice(2, 9);
        const user = { id, name, email };
        localStorage.setItem('vvUser', JSON.stringify(user));
        refreshProfileAvatar();
        hideLoginModal();
        toast('Signed in');
        location.hash = 'profile';
    });
}

// profile edit form
const profileEditForm = document.querySelector('#profileEditForm');
if (profileEditForm) {
    profileEditForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = (document.querySelector('#editName')?.value || '').trim();
        const email = (document.querySelector('#editEmail')?.value || '').trim();
        if (!name) return toast('Please enter your name');
        const u = getUser() || { id: 'user-' + Math.random().toString(36).slice(2, 9) };
        u.name = name; u.email = email;
        localStorage.setItem('vvUser', JSON.stringify(u));
        refreshProfileAvatar();
        hideProfileEditModal();
        toast('Profile updated');
        if (location.hash === 'profile' || location.hash === '#profile') profile();
    });
}

// booking confirmation flow state
let _bookingDraft = null;

// booking confirm button handler
const confirmBookingBtn = document.querySelector('#confirmBookingBtn');
if (confirmBookingBtn) confirmBookingBtn.addEventListener('click', () => {
    if (!_bookingDraft) return hideBookingConfirmModal();
    // send booking (client-side simulation)
    toast(`${_bookingDraft.destination} booking request sent.`);
    // reset form if present
    const form = document.querySelector('#bookingForm');
    if (form) form.reset();
    _bookingDraft = null;
    hideBookingConfirmModal();
});

window.addEventListener('hashchange', route);
window.addEventListener('hashchange', () => {
    if (header && header.classList.contains('open')) header.classList.remove('open');
});
route();

if (menuToggle && header) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        header.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-header') && header.classList.contains('open')) header.classList.remove('open');
    });
}
