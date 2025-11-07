---
title: "Events"
type: landing

sections:
  - block: markdown
    content:
      title: ""
      text: |
        <div id="event-buttons" style="display: flex; justify-content: space-between; align-items: center; margin: 1.5em 0;">
          <button id="btn-previous" class="btn btn-outline-secondary" onclick="showSection('previous')">← Previous</button>
          <button id="btn-upcoming" class="btn btn-primary" onclick="showSection('upcoming')">Upcoming →</button>
        </div>

        <script>
        function showSection(id) {
          document.querySelectorAll('section[id^="upcoming"], section[id^="previous"]').forEach(el => el.style.display = 'none');
          const target = document.querySelector('section#' + id);
          if (target) target.style.display = 'block';

          const btnUp = document.getElementById('btn-upcoming');
          const btnPrev = document.getElementById('btn-previous');
          
          btnUp.classList.remove('active');
          btnPrev.classList.remove('active');

          if (id === 'upcoming') {
            btnUp.classList.add('active');
          } else {
            btnPrev.classList.add('active');
          }
        }

        document.addEventListener('DOMContentLoaded', () => {
          document.querySelector('section#previous')?.style && (document.querySelector('section#previous').style.display = 'none');
          document.querySelector('section#upcoming')?.style && (document.querySelector('section#upcoming').style.display = 'block');
          document.getElementById('btn-upcoming')?.classList.add('active');
        });
        </script>

        <style>
        #event-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.5em 0 0.3em 0;
        }

        #event-buttons button {
          min-width: 160px;
          font-size: 1.1rem;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          border: 2px solid #520c8c;
          background: transparent;
          color: #520c8c;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        #event-buttons button:hover {
          background: rgba(82, 12, 140, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(82, 12, 140, 0.2);
        }

        #event-buttons button.active {
          background: #520c8c;
          color: white;
          box-shadow: 0 4px 12px rgba(82, 12, 140, 0.3);
        }

        @media (max-width: 600px) {
          #event-buttons {
            flex-direction: column;
            gap: 10px;
          }
        }

        section#upcoming, section#previous {
          background: transparent !important;
          box-shadow: none !important;
        }
        </style>
    design:
      columns: '1'
      spacing:
        padding: ['0', '0', '0', '0'] 

  # Upcoming events block
  - block: collection
    id: upcoming
    content:
      title: "Upcoming Events"
      filters:
        folders:
          - event
        exclude_past: true
      sort_by: date
      sort_ascending: true
      count: 0
    design:
      view: compact
      spacing:
        padding: ['0.5em', '0', '20px', '0']

  # Previous events block
  - block: collection
    id: previous
    content:
      title: "Previous Events"
      filters:
        folders:
          - event
        exclude_future: true
      sort_by: date
      sort_ascending: false
      count: 0
    design:
      view: compact
      spacing:
        padding: ['0.5em', '0', '20px', '0'] 
---
