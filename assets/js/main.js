document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a.nav-link[href^="#"], .btn[href^="#"], .navbar-brand[href^="#"]');

    for (let link of smoothScrollLinks) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll position for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight - 10);

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Collapse mobile navbar on click
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show') && navbarToggler) {
                    navbarToggler.click();
                }
            }
        });
    }

    // Portfolio Slider logic
    const slider = document.getElementById('portfolio-slider');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');

    if (slider && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const slideItem = slider.querySelector('.portfolio-slide-item');
            if(slideItem) {
                // Return width of one item + gap (gap is approx 24px for gap-4)
                return slideItem.offsetWidth + 24; 
            }
            return 300;
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
    // Diamond Testimonial Logic
    const diamondItems = document.querySelectorAll('.diamond-item');
    const diamondName = document.getElementById('diamond-name');
    const diamondRole = document.getElementById('diamond-role');
    const diamondQuote = document.getElementById('diamond-quote');
    // Use existing data or specific ones for diamond
    const diamondTestData = [
        {
            name: "Sarah D Silva",
            role: "UX/UI Designer",
            quote: "\"Service was outstanding and efficient. They worked carefully with our schedule and showed great respect for our property. Ideal for families, small businesses, or anyone needing reliable electrical work.\""
        },
        {
            name: "Jane Doe",
            role: "Marketing Head",
            quote: "\"Highly professional and creative team. They transformed our ideas into stunning visual designs that truly represent our brand. Their attention to detail is remarkable!\""
        },
        {
            name: "Michael Chen",
            role: "Tech Entrepreneur",
            quote: "\"The speed and accuracy of their printing services are exceptional. We needed business cards and brochures on very short notice, and they delivered perfect results ahead of schedule.\""
        },
        {
            name: "Emily Watson",
            role: "Event Planner",
            quote: "\"Reliable, friendly, and expert service. They handled all our event branding with ease, from large banners to small stickers. Everything looked cohesive and top-tier.\""
        }
    ];

    let currentDiamondIndex = 0;

    const updateDiamondContent = (index) => {
        const data = diamondTestData[index];
        const contentBox = document.getElementById('diamond-testimonial-content');
        
        contentBox.style.opacity = '0';
        contentBox.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            diamondName.textContent = data.name;
            diamondRole.textContent = data.role;
            diamondQuote.textContent = data.quote;
            
            contentBox.style.opacity = '1';
            contentBox.style.transform = 'translateX(0)';
            
            diamondItems.forEach((item, i) => {
                if(i == index) item.classList.add('active');
                else item.classList.remove('active');
            });
        }, 300);
    };

    diamondItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = this.getAttribute('data-diamond-index');
            currentDiamondIndex = parseInt(index);
            updateDiamondContent(currentDiamondIndex);
        });
    });
});
