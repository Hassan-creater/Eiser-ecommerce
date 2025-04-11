document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart-form').forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const addButton = form.querySelector('.add-to-cart-button');
  
        // Store original button HTML
        const originalHTML = addButton.innerHTML; // Use innerHTML instead of textContent
        addButton.disabled = true;
        addButton.innerHTML = 'Adding...'; // Changed to innerHTML to match reset
  
        try {
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString()
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          const cartUpdate = await fetch('/cart.js');
          const cartData = await cartUpdate.json();
  
          // Fix 1: Use querySelectorAll and handle null case
          const cartCounters = document.querySelectorAll('#cart-count');
         
            cartCounters.forEach(span => {
              span.textContent = cartData.item_count;
            });
          
  
        } catch (error) {
          console.error('Add to cart failed:', error);
          alert(`Could not add item: ${error.message}`);
        } finally {
          addButton.disabled = false;
          addButton.innerHTML = originalHTML; // Reset to stored HTML
        }
      });
    });
  });