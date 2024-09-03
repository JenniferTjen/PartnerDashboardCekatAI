import { io } from 'socket.io-client';

(function () {
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');

    // Inject the CSS
    const style = document.createElement('style');
    style.innerHTML = `
  .display-hidden {
    display: none;
  }
  #chat-widget-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    flex-direction: column;
    z-index: 50;
  }
  
  .incoming-bubble {
    align-self: flex-start;
  }

  .outgoing-bubble {
    align-self: flex-end;
    background-color: #2196F3; /* Set your outgoing message background color */
    color: white; /* Set your outgoing message text color */
  }

 #chat-popup {
  height: 70vh;
  max-height: 70vh;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0.3s linear;
  overflow: hidden;
  opacity: 0;
  transform: translateY(100%);
  visibility: hidden;
}

#chat-popup.visible {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

/* Styling for chat header */
#chat-header {
  border-bottom: 1px solid #ccc;
}

#chat-header h3 {
  font-size: 1.2rem;
}

#profile-image {
  border: 2px solid #fff;
}

/* Styling for chat messages */
#chat-messages {
  overflow-y: auto;
  padding: 10px;
}

/* Styling for chat input container */
#chat-input-container {
  border-top: 1px solid #ccc;
}

#chat-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  margin-right: 8px;
}

#upload-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
}

#chat-submit {
  background-color: #2196F3;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

/* Styling for chat bubble */
.incoming-bubble, .outgoing-bubble {
  max-width: 70%;
  word-wrap: break-word;
}

/* Styling for close button */
#close-popup {
  background: none;
}

/* Add hover effect for buttons */
#upload-button:hover, #chat-submit:hover, #close-popup:hover {
  background-color: #e0e0e0;
}

/* Add transition for hover effect */
#upload-button, #chat-submit, #close-popup {
  transition: background-color 0.3s ease;
}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px; /* Adjust the height as needed */
    color: #666; /* Adjust the color as needed */
    font-size: 14px; /* Adjust the font size as needed */
}

/* Add a loading animation (spinner) */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db; /* Adjust the color as needed */
    border-radius: 50%;
    width: 20px; /* Adjust the width as needed */
    height: 20px; /* Adjust the height as needed */
    animation: spin 1s linear infinite;
    margin-right: 8px; /* Adjust the margin as needed */
}
  
  @media (max-width: 768px) {
    #chat-popup {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
    }
  }
  `;

    document.head.appendChild(style);

    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    document.body.appendChild(chatWidgetContainer);

    // Inject the HTML
    chatWidgetContainer.innerHTML = `
    <div id="chat-bubble" class="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer text-3xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>
    <div id="chat-popup" class="absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
      <div id="chat-header" class="flex justify-between items-center p-4 bg-primary text-white rounded-t-md">
        <div class='flex flex-row items-center space-x-2'>
          <img id="profile-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"  alt="Profile Image" class="w-8 h-8 rounded-full mr-2">
          <h3 class="m-0 text-lg">Cekat.AI</h3>
        </div>
        <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div id="chat-messages" class="flex-1 p-4 overflow-y-auto"></div>
      <div id="chat-input-container" class="p-4 border-t border-gray-200">
        <div class="flex space-x-4 items-center">
          <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Type your message...">
          <button id="upload-button" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h3l-4-5-4 5h3z" />
            </svg>
          </button>
          <button id="chat-submit" class="bg-primary text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
        </div>
        <div class="flex text-center text-xs pt-4">
          <span class="flex-1">Powered by <a href="https://www.cekat.ai/" target="_blank" class="text-indigo-600">Cekat.AI</a></span>
        </div>
      </div>
    </div>
  `;

    const scriptTag = document.querySelector('script[data-access-key]');
    const access_key = scriptTag ? scriptTag.getAttribute('data-access-key') : null;

    if (!access_key) {
      console.log('Access key not found.');
      return;
    }
    console.log(access_key, '==acc')

    // Socket.IO logic
    const socket = io('http://localhost:8000', {
        withCredentials: true,
        auth: {
            serverOffset: 0,
        },
        query: {
            access_key: access_key,
        },
    });

    let savedSocketId;
    let conversationId;
    let contactId;
    let inboxData;
    let displayedMessageIds = new Set();

    socket.on('connect', () => {
        console.log('Socket connected successfully!');
        savedSocketId = localStorage.getItem('socket_id');

        if (!savedSocketId) {
            localStorage.setItem('socket_id', socket.id);
            savedSocketId = socket.id;
        }

        // Mengirimkan ID socket yang tersimpan ke server
        socket.emit('storeClientInfo', savedSocketId);
    });

    socket.on('inboxData', (data) => {
        inboxData = data;
        console.log(inboxData, '==inboxData')
        // Update the HTML with the received inboxData
        const chatPopup = document.getElementById('chat-popup');
        if (chatPopup) {
            const profileImage = chatPopup.querySelector('#profile-image'); // Change to '#profile-image'

            if (profileImage && inboxData?.image_url) {
                profileImage.src = inboxData?.image_url;
            }
            console.log(profileImage, '==');
        }
    });

    // Menerima conversation.id dari server
    socket.on('set-conversation', (convId, contact_id, inbox) => {
        conversationId = convId;
        contactId = contact_id;
        inboxData = inbox;

        const chatMessages = document.getElementById('chat-messages');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';

        // Add a loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        loadingIndicator.appendChild(spinner);

        // Add loading text
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Loading...';
        loadingIndicator.appendChild(loadingText);
        chatMessages.appendChild(loadingIndicator);

        socket.emit('request-history', conversationId);
    });

    socket.on('history', (messages) => {
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        messages.forEach((message) => {
            if (!displayedMessageIds.has(message.id)) {
                displayMessage(message);
                displayedMessageIds.add(message.id);
            }
        });
    });

    // listen event receive msg, kalo ada recv msg, msg akan ditampilkan di layar
    socket.on('receive-message', (message) => {
        displayMessage(message);
    });

    // Add event listeners
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatMessages = document.getElementById('chat-messages');
    const chatBubble = document.getElementById('chat-bubble');
    const chatPopup = document.getElementById('chat-popup');
    const closePopup = document.getElementById('close-popup');
    let selectedFile = null; // Variable to store the selected file

    // Add event listener for the upload button
    const uploadButton = document.getElementById('upload-button');

    uploadButton.addEventListener('click', function () {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Specify accepted file types (optional)

        // Add event listener for file selection
        fileInput.addEventListener('change', function (event) {
            selectedFile = event.target.files[0];

            // Handle the selected file
            if (selectedFile) {
                // Example: Display the selected image
                const imagePreview = document.createElement('img');
                imagePreview.src = URL.createObjectURL(selectedFile);
                imagePreview.alt = 'Selected image';
                imagePreview.style.maxWidth = '40px'; // Adjust the max width as needed
                imagePreview.style.borderRadius = '5px';

                // Create a container for the image preview
                const imageContainer = document.createElement('div');
                imageContainer.appendChild(imagePreview);

                // Append the image container next to the chat input
                chatInput.parentNode.insertBefore(imageContainer, chatInput.nextSibling);
            }
        });

        // Trigger the file input
        fileInput.click();
    });

    chatSubmit.addEventListener('click', function () {
        const message = chatInput.value.trim();

        // Check if there is a message or an attached file
        if (message || selectedFile) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.value = '';

            // Send the message and image data to the server
            if (selectedFile) {
                const mimetype = selectedFile?.type;
                const fileName = selectedFile?.name;
                const reader = new FileReader();
                reader.onloadend = function () {
                    const file = selectedFile;
                    const arrayBuffer = reader.result;
                    socket.emit('send-message', message, conversationId, contactId, file, mimetype, fileName, arrayBuffer);
                };
                reader.readAsArrayBuffer(selectedFile);
                selectedFile = null; // Reset the selected file

                const imageContainer = chatInput.nextSibling;
                if (imageContainer) {
                    imageContainer.remove();
                }
            } else {
                socket.emit('send-message', message, conversationId, contactId);
            }
        } else {
            // Handle case where both text and file inputs are empty
            alert('Please enter text or attach a file before sending a message.');
        }
    });

    chatInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            chatSubmit.click();
        }
    });

    chatBubble.addEventListener('click', function () {
        togglePopup();
    });

    closePopup.addEventListener('click', function () {
        togglePopup();
    });

    function togglePopup() {
        const chatPopup = document.getElementById('chat-popup');
        chatPopup.classList.toggle('visible');
        if (chatPopup.classList.contains('visible')) {
            document.getElementById('chat-input').focus();
        }
    }

    function onUserRequest(message) {
        // Handle user request here
        console.log('User request:', message);

        // Display user message
        const messageElement = document.createElement('div');
        messageElement.className = 'flex justify-end mb-3';
        messageElement.innerHTML = `
      <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        chatInput.value = '';

        // Reply to the user
        setTimeout(function () {
            reply('Hello! This is a sample reply.');
        }, 1000);
    }

    function reply(message) {
        const chatMessages = document.getElementById('chat-messages');
        const replyElement = document.createElement('div');
        replyElement.className = 'flex mb-3';
        replyElement.innerHTML = `
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
        chatMessages.appendChild(replyElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayMessage(message) {
        let messagesList = document.getElementById('chat-messages');
        let messageDiv = document.createElement('div');

        let bubbleClass = message.sent_by === contactId ? 'outgoing-bubble' : 'incoming-bubble';
        let flexClass = message.sent_by === contactId ? 'justify-end' : 'justify-start';

        if (message?.media_url && message?.media_type === 'image') {
            messageDiv.innerHTML = `
            <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] ${bubbleClass}">
                <img src="${message.media_url}" alt="Sent image" style="max-width: 200px; border-radius: 5px;">
                <p class="mt-2">${message.message}</p>
            </div>
        `;
        } else {
            messageDiv.innerHTML = `
            <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] ${bubbleClass}">
                ${message.message}
            </div>
        `;
        }

        messageDiv.className = `flex mb-3 ${flexClass}`;

        messagesList.appendChild(messageDiv);
        messagesList.scrollTop = messagesList.scrollHeight;
    }
})();
