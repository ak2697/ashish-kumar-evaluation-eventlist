document.addEventListener('DOMContentLoaded', async () => {
    const eventList = document.getElementById('eventList');
    const addEventBtn = document.getElementById('addEventBtn');
    const eventNameInput = document.getElementById('eventName');
    const eventStartDateInput = document.getElementById('eventStartDate');
    const eventEndDateInput = document.getElementById('eventEndDate');
    
    let editingEventId = null;

    // Fetch and display events
    const fetchEvents = async () => {
        const res = await fetch('http://localhost:3000/events');
        const events = await res.json();
        // Clear existing eventList
        while (eventList.firstChild) {
            eventList.removeChild(eventList.firstChild);
        }
        events.forEach(event => {
            const row = document.createElement('tr');
            
            // Name column
            const nameCell = document.createElement('td');
            nameCell.textContent = event.name;
            row.appendChild(nameCell);
            
            // Start Date column
            const startDateCell = document.createElement('td');
            startDateCell.textContent = event.startDate;
            row.appendChild(startDateCell);
            
            // End Date column
            const endDateCell = document.createElement('td');
            endDateCell.textContent = event.endDate;
            row.appendChild(endDateCell);
            
            // Action buttons column
            const actionCell = document.createElement('td');
            actionCell.setAttribute('class','actions-container');
            
            // Edit Button
            const editBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            editBtn.setAttribute('class', 'edit-btn');
            editBtn.setAttribute('data-id', event.id);
            editBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            editBtn.setAttribute('viewBox', '0 0 24 24');
            editBtn.setAttribute('aria-hidden', 'true');
            editBtn.classList.add('svg-icon-edit');

            const pathEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEdit.setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
            
            editBtn.appendChild(pathEdit);
            actionCell.appendChild(editBtn);
            
            // Delete Button
            const deleteBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            deleteBtn.setAttribute('class', 'delete-btn');
            deleteBtn.setAttribute('data-id', event.id);
            deleteBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            deleteBtn.setAttribute('viewBox', '0 0 24 24');
            deleteBtn.setAttribute('aria-hidden', 'true');
            deleteBtn.classList.add('svg-icon-delete');

            const pathDelete = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathDelete.setAttribute('d', 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z');
            
            deleteBtn.appendChild(pathDelete);
            actionCell.appendChild(deleteBtn);
            
            row.appendChild(actionCell);
            eventList.appendChild(row);
        });
    };

    // Show form for adding new event
    addEventBtn.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        
        // Name input column
        const nameInputCell = document.createElement('td');
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', 'newEventName');
        nameInput.setAttribute('placeholder', 'Event Name');
        nameInputCell.appendChild(nameInput);
        newRow.appendChild(nameInputCell);
        
        // Start Date input column
        const startDateInputCell = document.createElement('td');
        const startDateInput = document.createElement('input');
        startDateInput.setAttribute('type', 'date');
        startDateInput.setAttribute('id', 'newEventStartDate');
        startDateInputCell.appendChild(startDateInput);
        newRow.appendChild(startDateInputCell);
        
        // End Date input column
        const endDateInputCell = document.createElement('td');
        const endDateInput = document.createElement('input');
        endDateInput.setAttribute('type', 'date');
        endDateInput.setAttribute('id', 'newEventEndDate');
        endDateInputCell.appendChild(endDateInput);
        newRow.appendChild(endDateInputCell);
        
        // Action buttons column
        const actionCell = document.createElement('td');
        
        // Save Button
        const saveBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        saveBtn.setAttribute('class', 'save-new-btn');
        saveBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        saveBtn.setAttribute('viewBox', '0 0 24 24');
        saveBtn.classList.add('svg-icon-save');

        const pathSave = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathSave.setAttribute('d', 'M12 6V18M18 12H6');
        pathSave.setAttribute("stroke", "#FFFFFF");
        pathSave.setAttribute("stroke-width", "4");
        pathSave.setAttribute("stroke-linecap", "round");
        pathSave.setAttribute("stroke-linejoin", "round");
        
        saveBtn.appendChild(pathSave);
        actionCell.appendChild(saveBtn);
        
        // Cancel Button
        const cancelBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        cancelBtn.setAttribute('class', 'cancel-new-btn');
        cancelBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        cancelBtn.setAttribute('viewBox', '0 0 32 32');
        cancelBtn.classList.add('svg-icon-cancel');

        const pathCancel = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathCancel.setAttribute('d', 'M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z');
        
        cancelBtn.appendChild(pathCancel);
        actionCell.appendChild(cancelBtn);
        
        newRow.appendChild(actionCell);
        
        eventList.appendChild(newRow);
    });

    // Handle saving new event
    eventList.addEventListener('click', async (e) => {
        if (e.target.closest('.save-new-btn')) {
            const newRow = e.target.closest('tr');
            const newEventName = newRow.querySelector('#newEventName').value;
            const newEventStartDate = newRow.querySelector('#newEventStartDate').value;
            const newEventEndDate = newRow.querySelector('#newEventEndDate').value;

            if (newEventName.trim() === '' || newEventStartDate === '' || newEventEndDate === '') {
                alert('Please fill in all fields.');
                return;
            }

            const newEvent = {
                name: newEventName,
                startDate: newEventStartDate,
                endDate: newEventEndDate,
            };

            await fetch('http://localhost:3000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            fetchEvents();
        }
    });

    // Handle canceling new event
    eventList.addEventListener('click', (e) => {
        if (e.target.closest('.cancel-new-btn')) {
            const newRow = e.target.closest('tr');
            newRow.remove();
        }
    });

    // Handle inline edit
    eventList.addEventListener('click', (e) => {
        if (e.target.closest('.edit-btn')) {
            const eventId = e.target.closest('.edit-btn').getAttribute('data-id');
            const row = e.target.closest('tr');
            const cells = row.querySelectorAll('td');

            // Name input column
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('value', cells[0].textContent);
            nameInput.setAttribute('class', 'edit-event-name');
            cells[0].textContent = '';
            cells[0].appendChild(nameInput);

            // Start Date input column
            const startDateInput = document.createElement('input');
            startDateInput.setAttribute('type', 'date');
            startDateInput.setAttribute('value', cells[1].textContent);
            startDateInput.setAttribute('class', 'edit-event-start');
            cells[1].textContent = '';
            cells[1].appendChild(startDateInput);

            // End Date input column
            const endDateInput = document.createElement('input');
            endDateInput.setAttribute('type', 'date');
            endDateInput.setAttribute('value', cells[2].textContent);
            endDateInput.setAttribute('class', 'edit-event-end');
            cells[2].textContent = '';
            cells[2].appendChild(endDateInput);

            // Save and Cancel buttons
            cells[3].textContent = '';
            const saveBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            saveBtn.setAttribute('class', 'save-edit-btn');
            saveBtn.setAttribute('data-id', eventId);
            saveBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            saveBtn.setAttribute('viewBox', '0 0 24 24');
            saveBtn.classList.add('svg-icon-save');

            const pathSave = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathSave.setAttribute('d', 'M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z');
            
            saveBtn.appendChild(pathSave);
            cells[3].appendChild(saveBtn);

            const cancelBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            cancelBtn.setAttribute('class', 'cancel-edit-btn');
            cancelBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            cancelBtn.setAttribute('viewBox', '0 0 32 32');
            cancelBtn.classList.add('svg-icon-cancel');

            const pathCancel = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathCancel.setAttribute('d', 'M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z');
            
            cancelBtn.appendChild(pathCancel);
            cells[3].appendChild(cancelBtn);
        }
    });

    // Handle saving edited event
    eventList.addEventListener('click', async (e) => {
        if (e.target.closest('.save-edit-btn')) {
            const row = e.target.closest('tr');
            const eventId = e.target.closest('.save-edit-btn').getAttribute('data-id');
            const editedEvent = {
                name: row.querySelector('.edit-event-name').value,
                startDate: row.querySelector('.edit-event-start').value,
                endDate: row.querySelector('.edit-event-end').value,
            };
    
            // Check if any field is blank
            if (editedEvent.name.trim() === '' || editedEvent.startDate === '' || editedEvent.endDate === '') {
                alert('Please fill in all fields.');
                return;
            }
    
            // Proceed with API call if all fields are filled
            await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedEvent),
            });
    
            fetchEvents(); // Refresh the event list
        }
    });
    

    // Handle canceling edited event
    eventList.addEventListener('click', (e) => {
        if (e.target.closest('.cancel-edit-btn')) {
            fetchEvents();
        }
    });

    // Handle delete event
    eventList.addEventListener('click', async (e) => {
        if (e.target.closest('.delete-btn')) {
            const eventId = e.target.closest('.delete-btn').getAttribute('data-id');
            await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'DELETE',
            });
            fetchEvents();
        }
    });

    // Initial fetch of events
    await fetchEvents();
});
