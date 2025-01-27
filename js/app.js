let allAttendees = [];

// Below is how I would use API to dynamically display attendees, but my API is not functioning.

//async function fetchAndDisplayAttendees() {
//  try {
//    const response = await fetch("https://gist.githubusercontent.com/alison-ah/24c1706e6b1f896a971580608b312b2e/raw/f4e9e325aecc94f59c421264a8209145f6e68ed9/sample_data.json");
//    allAttendees = await response.json();
//    filterAndDisplayAttendees();
//  } catch (error) {
//    console.error('Error fetching attendee data:', error);
//  }
//}

// Currently hard coding data to display attendees
function fetchAndDisplayAttendees() {
    allAttendees = [
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "James",
            "last_name": "Hamilton",
            "school_year": "College '92"
        },
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "Jennifer",
            "last_name": "Smith",
            "school_year": "College '72, Law '86"
        },
        {
            "registered": "No",
            "incognito": "Yes",
            "first_name": "William",
            "last_name": "Clark",
            "school_year": "College '86"
        },
        {
            "registered": "No",
            "incognito": "No",
            "first_name": "George",
            "last_name": "Thomas",
            "school_year": "Law '86"
        },
        {
            "registered": "Yes",
            "incognito": "Yes",
            "first_name": "Dmitri",
            "last_name": "Park",
            "school_year": "College '09"
        },
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "Mohammed",
            "last_name": "Suzuki",
            "school_year": "College '00"
        },
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "Ming",
            "last_name": "Davis",
            "school_year": "College '04"
        },
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "Olivia",
            "last_name": "Liu",
            "school_year": "College '24"
        },
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "James",
            "last_name": "Liu",
            "school_year": "College '23"
        },
        {
            "registered": "No",
            "incognito": "Yes",
            "first_name": "Michael",
            "last_name": "Li",
            "school_year": "Law '08, College '16"
        },
        {
            "registered": "No",
            "incognito": "No",
            "first_name": "Linda",
            "last_name": "Martinez",
            "school_year": "Law '72"
        },
        {
            "registered": "Yes",
            "incognito": "Yes",
            "first_name": "Karen",
            "last_name": "Anderson",
            "school_year": "Law '85"
        },
        {
            "registered": "Yes",
            "incognito": "No",
            "first_name": "Mei",
            "last_name": "Rodriguez",
            "school_year": "College '07"
        },
        {
            "registered": "Yes",
            "incognito": "Yes",
            "first_name": "Ivan",
            "last_name": "Gonzalez",
            "school_year": "Law '05"
        }
    ].map(attendee => ({
      ...attendee,
      registered: attendee.registered === "Yes",
      incognito: attendee.incognito === "Yes"
    }));
    filterAndDisplayAttendees();
  }
  
// Filter function
function filterAndDisplayAttendees() {
  const nameFilter = document.getElementById('by-name').value.toLowerCase();
  const collegeChecked = document.getElementById('college').checked;
  const lawChecked = document.getElementById('law').checked;
  const registeredChecked = document.getElementById('registered').checked;
  const notRegisteredChecked = document.getElementById('not-registered').checked;

  const filteredAttendees = allAttendees.filter(attendee => {
    if (attendee.incognito) return false;

    const nameMatch = `${attendee.first_name} ${attendee.last_name}`.toLowerCase().includes(nameFilter);
    
    const schoolMatch = (!collegeChecked && !lawChecked) || 
      (collegeChecked && attendee.school_year.toLowerCase().includes('college')) ||
      (lawChecked && attendee.school_year.toLowerCase().includes('law'));
    
    const registrationMatch = (!registeredChecked && !notRegisteredChecked) ||
      (registeredChecked && attendee.registered) ||
      (notRegisteredChecked && !attendee.registered);

    return nameMatch && schoolMatch && registrationMatch;
  });

  const attendeesContainer = document.querySelector('.attendees');
  attendeesContainer.innerHTML = '';

  filteredAttendees.forEach(attendee => {
    const attendeeElement = document.createElement('div');
    attendeeElement.className = 'attendee';
    
    attendeeElement.innerHTML = `
      <h4>${attendee.school_year}</h4>
      <h2>${attendee.first_name} ${attendee.last_name}</h2>
      <h3>${attendee.registered ? 'Registered' : 'Not Registered'}</h3>
    `;
    
    attendeesContainer.appendChild(attendeeElement);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayAttendees();
  
  // Add event listeners for filters
  document.getElementById('by-name').addEventListener('input', filterAndDisplayAttendees);
  document.getElementById('college').addEventListener('change', filterAndDisplayAttendees);
  document.getElementById('law').addEventListener('change', filterAndDisplayAttendees);
  document.getElementById('registered').addEventListener('change', filterAndDisplayAttendees);
  document.getElementById('not-registered').addEventListener('change', filterAndDisplayAttendees);
});