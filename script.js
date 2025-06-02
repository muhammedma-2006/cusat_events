// Event storage
        let events = [
            {
                id: 1,
                title: "Annual Tech Symposium",
                date: "2025-06-15",
                time: "09:00",
                location: "Main Auditorium",
                category: "technical",
                description: "A comprehensive technical symposium featuring industry experts and innovative projects."
            },
            {
                id: 2,
                title: "Cultural Night 2025",
                date: "2025-06-20",
                time: "18:00",
                location: "Open Grounds",
                category: "cultural",
                description: "An evening of music, dance, and cultural performances by students."
            },
            {
                id: 3,
                title: "Career Fair",
                date: "2025-06-25",
                time: "10:00",
                location: "Conference Hall",
                category: "academic",
                description: "Meet with top recruiters and explore career opportunities."
            }
        ];

        let filteredEvents = [...events];

        // DOM Elements
        const eventsGrid = document.getElementById('eventsGrid');
        const eventModal = document.getElementById('eventModal');
        const eventForm = document.getElementById('eventForm');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const dateFilter = document.getElementById('dateFilter');
        const locationFilter = document.getElementById('locationFilter');

        // Generate random gradient for event posters
        function getRandomGradient() {
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            ];
            return gradients[Math.floor(Math.random() * gradients.length)];
        }

        // Format date for display
        function formatDate(dateStr) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateStr).toLocaleDateString('en-US', options);
        }

        // Format time for display
        function formatTime(timeStr) {
            const [hours, minutes] = timeStr.split(':');
            const hour12 = hours % 12 || 12;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            return `${hour12}:${minutes} ${ampm}`;
        }

        // Render events
        function renderEvents() {
            if (filteredEvents.length === 0) {
                eventsGrid.innerHTML = `
                    <div class="no-events">
                        <div class="no-events-icon">📅</div>
                        <h3>No events found</h3>
                        <p>Try adjusting your filters or add a new event!</p>
                    </div>
                `;
                return;
            }

            eventsGrid.innerHTML = filteredEvents.map(event => `
                <div class="event-card" onclick="viewEvent(${event.id})">
                    <div class="event-poster" style="background: ${getRandomGradient()}">
                        <div class="event-poster-content">
                            <div>📅 Event Poster</div>
                        </div>
                    </div>
                    <div class="event-details">
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-meta">
                            <span>📅 ${formatDate(event.date)}</span>
                            <span>🕐 ${formatTime(event.time)}</span>
                            <span>📍 ${event.location}</span>
                            <span style="text-transform: capitalize;">🏷️ ${event.category}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter events
        function filterEvents() {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const date = dateFilter.value;
            const location = locationFilter.value.toLowerCase();

            filteredEvents = events.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                    event.description.toLowerCase().includes(searchTerm);
                const matchesCategory = !category || event.category === category;
                const matchesDate = !date || event.date === date;
                const matchesLocation = !location || event.location.toLowerCase().includes(location);

                return matchesSearch && matchesCategory && matchesDate && matchesLocation;
            });

            renderEvents();
        }

        // Clear filters
        function clearFilters() {
            searchInput.value = '';
            categoryFilter.value = '';
            dateFilter.value = '';
            locationFilter.value = '';
            filteredEvents = [...events];
            renderEvents();
        }

        // Open modal
        function openModal() {
            eventModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close modal
        function closeModal() {
            eventModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            eventForm.reset();
        }

        // View event details
        function viewEvent(eventId) {
            const event = events.find(e => e.id === eventId);
            if (event) {
                alert(`Event: ${event.title}\nDate: ${formatDate(event.date)} at ${formatTime(event.time)}\nLocation: ${event.location}\nDescription: ${event.description || 'No description provided'}`);
            }
        }

        // Add new event
        function addEvent(eventData) {
            const newEvent = {
                id: Date.now(),
                ...eventData
            };
            events.unshift(newEvent);
            filterEvents();
            closeModal();
            
            // Show success message
            setTimeout(() => {
                alert('Event added successfully! 🎉');
            }, 300);
        }

        // Event listeners
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const eventData = {
                title: document.getElementById('eventTitle').value,
                date: document.getElementById('eventDate').value,
                time: document.getElementById('eventTime').value,
                location: document.getElementById('eventLocation').value,
                category: document.getElementById('eventCategory').value,
                description: document.getElementById('eventDescription').value
            };
            
            addEvent(eventData);
        });

        // Filter event listeners
        searchInput.addEventListener('input', filterEvents);
        categoryFilter.addEventListener('change', filterEvents);
        dateFilter.addEventListener('change', filterEvents);
        locationFilter.addEventListener('input', filterEvents);

        // Close modal when clicking outside
        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && eventModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Initial render
        renderEvents();