// Accordion functionality
document.querySelectorAll('.glossary-term').forEach(term => {
    term.addEventListener('click', () => {
        const definition = term.nextElementSibling;
        const isActive = term.classList.contains('active');

        // Close all terms
        document.querySelectorAll('.glossary-term').forEach(t => {
            t.classList.remove('active');
            t.nextElementSibling.classList.remove('active');
        });

        // Toggle clicked term
        if (!isActive) {
            term.classList.add('active');
            definition.classList.add('active');
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const noResults = document.querySelector('.no-results');
const glossaryItems = document.querySelectorAll('.glossary-item');
const categorySections = document.querySelectorAll('.category-section');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let hasResults = false;

    glossaryItems.forEach(item => {
        const searchableContent = item.dataset.terms + ' ' + 
                               item.querySelector('.glossary-term').textContent.toLowerCase() + ' ' +
                               item.querySelector('.glossary-definition').textContent.toLowerCase();
        
        if (searchableContent.includes(searchTerm)) {
            item.style.display = '';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide no results message
    noResults.style.display = hasResults ? 'none' : 'block';

    // Show/hide category titles based on visible items
    categorySections.forEach(section => {
        const hasVisibleItems = Array.from(section.querySelectorAll('.glossary-item'))
            .some(item => item.style.display !== 'none');
        section.style.display = hasVisibleItems ? '' : 'none';
    });
});