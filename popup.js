// Listen for the click event on the toggle button
document.getElementById('toggleButton').addEventListener('click', async () => {
    // Get the current mode from storage
    const currentMode = await chrome.storage.local.get('tabMode');
  
    // Toggle the mode (queue -> stack, stack -> queue)
    const newMode = currentMode.tabMode === 'stack' ? 'queue' : 'stack';
  
    // Update storage with the new mode
    await chrome.storage.local.set({ tabMode: newMode });
  
    // Update the button text
    document.getElementById('toggleButton').innerText =
      newMode === 'stack' ? 'Switch to Queue Mode' : 'Switch to Stack Mode';
  
    // Optionally, send a message to the background to update the behavior
    chrome.runtime.sendMessage({ action: 'updateMode', mode: newMode });
  });
  