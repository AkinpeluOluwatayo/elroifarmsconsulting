/**
 * El-Roi Farms Consulting - Main JavaScript Module
 * Handles navigation, interactive farm pathways, consultation form validation, 
 * WhatsApp link creation, FAQ accordion, and smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initFAQAccordion();
    initFarmPathways();
    initRetirementCTAs();
    initConsultationForm();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * FAQ Accordion Handler
 */
function initFAQAccordion() {
    const accordionButtons = document.querySelectorAll('.faq-accordion-btn');

    accordionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            // Close all other accordions for clean UX
            accordionButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherBtn.nextElementSibling) {
                        otherBtn.nextElementSibling.classList.add('hidden');
                    }
                    const otherIcon = otherBtn.querySelector('.faq-icon');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                content.classList.add('hidden');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                btn.setAttribute('aria-expanded', 'true');
                content.classList.remove('hidden');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/**
 * Farm Investment Pathway Selection -> Scroll & Pre-populate Form
 */
function initFarmPathways() {
    const pathwayCards = document.querySelectorAll('.pathway-card');
    const farmTypeSelect = document.getElementById('form-farm-type');
    const consultSection = document.getElementById('consultation');

    pathwayCards.forEach(card => {
        card.addEventListener('click', () => {
            const farmValue = card.dataset.farmType;
            if (farmValue && farmTypeSelect) {
                farmTypeSelect.value = farmValue;

                // Visual highlight on cards
                pathwayCards.forEach(c => c.classList.remove('active', 'border-amber-500', 'bg-amber-50/50'));
                card.classList.add('active', 'border-amber-500', 'bg-amber-50/50');

                // Smooth scroll to form
                if (consultSection) {
                    consultSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Retirement & Specific Investment Goal CTA Triggers
 */
function initRetirementCTAs() {
    const retirementBtns = document.querySelectorAll('.trigger-retirement-goal');
    const primaryGoalSelect = document.getElementById('form-primary-goal');
    const consultSection = document.getElementById('consultation');

    retirementBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const goalValue = btn.dataset.goalValue || "Build a retirement farm";
            if (primaryGoalSelect) {
                primaryGoalSelect.value = goalValue;
            }
            if (consultSection) {
                consultSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Form Validation and Dynamic WhatsApp Submission Generator
 */
function initConsultationForm() {
    const form = document.getElementById('farm-consultation-form');
    const formSuccessState = document.getElementById('form-success-state');
    const fallbackWaBtn = document.getElementById('fallback-whatsapp-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Form Values
        const name = document.getElementById('form-name')?.value.trim();
        const phone = document.getElementById('form-phone')?.value.trim();
        const email = document.getElementById('form-email')?.value.trim();
        const farmType = document.getElementById('form-farm-type')?.value;
        const goal = document.getElementById('form-primary-goal')?.value;
        const landStatus = document.getElementById('form-land-status')?.value;
        const location = document.getElementById('form-location')?.value.trim();
        const budget = document.getElementById('form-budget')?.value;
        const timeline = document.getElementById('form-timeline')?.value;
        const details = document.getElementById('form-details')?.value.trim();

        // Basic Validation
        if (!name || !phone || !farmType || !goal || !budget) {
            alert('Please fill in all required fields (Name, Phone Number, Farm Type, Primary Goal, and Budget).');
            return;
        }

        // Construct Clean Professional WhatsApp Message
        const rawMessage = 
`Hello El-Roi Farms Consulting,

I would like to request a farm investment consultation.

PERSONAL DETAILS
Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : ''}

PROJECT DETAILS
Farm Interest: ${farmType}
Primary Goal: ${goal}
Land Status: ${landStatus || 'Not specified'}
Intended Location: ${location || 'Not specified'}
Estimated Budget: ${budget}
Expected Start Timeline: ${timeline || 'Not specified'}

PROJECT DESCRIPTION / IDEAS:
${details || 'No additional details provided.'}

I would like to speak with a consultant about the next steps.

Thank you.`;

        // Safe URL Encoding
        const encodedMsg = encodeURIComponent(rawMessage);
        const whatsappNumber = "2348104883602"; // Internationalized format for 08104883602
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

        // Update Fallback Button Link
        if (fallbackWaBtn) {
            fallbackWaBtn.href = whatsappUrl;
        }

        // Show Success UI State
        if (formSuccessState) {
            form.classList.add('hidden');
            formSuccessState.classList.remove('hidden');
        }

        // Attempt automatic redirect after short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1200);
    });
}
