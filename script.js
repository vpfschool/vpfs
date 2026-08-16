/* ==========================================================================
   Bachpan Play School - Richi Village, Jollang Vanilla JavaScript
   Features: Preloader, Sticky Nav, Mobile Menu, Number Counters, Gallery, Accordion, Modals
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Hide Preloader
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => { preloader.style.display = "none"; }, 500);
        }, 600);
    }

    // 2. Sticky Navbar & Back-to-Top Toggle
    const header = document.getElementById("header");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
            if (backToTopBtn) backToTopBtn.style.display = "flex";
        } else {
            header.classList.remove("scrolled");
            if (backToTopBtn) backToTopBtn.style.display = "none";
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 3. Mobile Hamburger Navigation & Dropdown Toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navDropdowns = document.querySelectorAll(".nav-dropdown");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        // Close nav on click for standard links
        document.querySelectorAll(".nav-link:not(.nav-dropdown > .nav-link)").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });

        // Toggle dropdown on mobile
        navDropdowns.forEach(dropdown => {
            const link = dropdown.querySelector(".nav-link");
            link.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle("active");
                }
            });
        });
    }

    // 4. Animated Number Counters
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const isFloat = target % 1 !== 0;
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = isFloat ? count.toFixed(1) : Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    window.addEventListener("scroll", () => {
        const heroTrustSection = document.querySelector(".hero-trust");
        if (heroTrustSection) {
            const sectionPos = heroTrustSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;
            if (sectionPos < screenPos && !hasCounted) {
                hasCounted = true;
                runCounters();
            }
        }
    });

    // 5. Gallery Filters & Lightbox
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (filterBtns && galleryItems) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                galleryItems.forEach(item => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    if (galleryItems && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                const caption = item.querySelector(".gallery-hover span").innerText;
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                if (lightboxCaption) lightboxCaption.innerText = caption;
            });
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    // 6. Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial-card");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    let currentSlide = 0;

    const showSlide = (index) => {
        testimonials.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    };

    if (prevBtn && nextBtn && testimonials.length > 0) {
        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
    }

    // 7. FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                faqItems.forEach(f => f.classList.remove("active"));
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    }

    // 8. Modals (Announcement & Downloads)
    const openAnnouncement1Modal = document.getElementById("openAnnouncement1Modal");
    const announcement1Modal = document.getElementById("announcement1Modal");
    const closeAnnouncement1Modal = document.getElementById("closeAnnouncement1Modal");

    const openAnnouncement2Modal = document.getElementById("openAnnouncement2Modal");
    const announcement2Modal = document.getElementById("announcement2Modal");
    const closeAnnouncement2Modal = document.getElementById("closeAnnouncement2Modal");

    const openDownloadsModal = document.getElementById("openDownloadsModal");
    const downloadsModal = document.getElementById("downloadsModal");
    const closeDownloadsModal = document.getElementById("closeDownloadsModal");

    // Helper to close nav menu when opening modal on mobile
    const closeMobileNav = () => {
        if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    };

    if (openAnnouncement1Modal && announcement1Modal) {
        openAnnouncement1Modal.addEventListener("click", (e) => {
            e.preventDefault();
            announcement1Modal.style.display = "flex";
            closeMobileNav();
        });
    }

    if (closeAnnouncement1Modal && announcement1Modal) {
        closeAnnouncement1Modal.addEventListener("click", () => {
            announcement1Modal.style.display = "none";
        });
    }

    if (openAnnouncement2Modal && announcement2Modal) {
        openAnnouncement2Modal.addEventListener("click", (e) => {
            e.preventDefault();
            announcement2Modal.style.display = "flex";
            closeMobileNav();
        });
    }

    if (closeAnnouncement2Modal && announcement2Modal) {
        closeAnnouncement2Modal.addEventListener("click", () => {
            announcement2Modal.style.display = "none";
        });
    }

    if (openDownloadsModal && downloadsModal) {
        openDownloadsModal.addEventListener("click", (e) => {
            e.preventDefault();
            downloadsModal.style.display = "flex";
            closeMobileNav();
        });
    }

    if (closeDownloadsModal && downloadsModal) {
        closeDownloadsModal.addEventListener("click", () => {
            downloadsModal.style.display = "none";
        });
    }

    // Close modals on outside click
    window.addEventListener("click", (e) => {
        if (e.target === announcement1Modal) {
            announcement1Modal.style.display = "none";
        }
        if (e.target === announcement2Modal) {
            announcement2Modal.style.display = "none";
        }
        if (e.target === downloadsModal) {
            downloadsModal.style.display = "none";
        }
    });

    // Forced File Downloads
    const forceDownload = (e, fileName, fileUrl) => {
        e.preventDefault();
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadAdmitFormBtn = document.getElementById("downloadAdmitFormBtn");
    if(downloadAdmitFormBtn) {
        downloadAdmitFormBtn.addEventListener("click", (e) => {
            forceDownload(e, "Admission_Form.pdf", "assets/notice-board/download-AdmissionForm.pdf");
        });
    }

    const downloadProspectusBtn = document.getElementById("downloadProspectusBtn");
    if(downloadProspectusBtn) {
        downloadProspectusBtn.addEventListener("click", (e) => {
             forceDownload(e, "School_Prospectus.pdf", "assets/notice-board/download-School-Prospectus.pdf");
        });
    }

    const downloadAnn1Btn = document.getElementById("downloadAnn1Btn");
    if(downloadAnn1Btn) {
        downloadAnn1Btn.addEventListener("click", (e) => {
             forceDownload(e, "Announcement_1.pdf", "assets/notice-board/announcement-1.pdf");
        });
    }

    const downloadAnn2Btn = document.getElementById("downloadAnn2Btn");
    if(downloadAnn2Btn) {
        downloadAnn2Btn.addEventListener("click", (e) => {
             forceDownload(e, "Announcement_2.pdf", "assets/notice-board/announcement-2.pdf");
        });
    }


    // 9. Form Submissions
    
    // Helper function to convert uploaded files to Base64 strings
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve(null);
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({
                name: file.name,
                mimeType: file.type,
                data: reader.result.split(',')[1] // Extract raw base64 data
            });
            reader.onerror = error => reject(error);
        });
    };

    const admissionForm = document.getElementById("admissionForm");
    const primaryPhone = document.getElementById("primaryPhone");
    const whatsappNumber = document.getElementById("whatsappNumber");
    const sameAsPrimary = document.getElementById("sameAsPrimary");

    const gender = document.getElementById("gender");
    const hostelRequired = document.getElementById("hostelRequired");
    const hostelTypeGroup = document.getElementById("hostelTypeGroup");
    const hostelType = document.getElementById("hostelType");

    if (admissionForm) {
        // WhatsApp Same as Primary Logic
        sameAsPrimary.addEventListener("change", (e) => {
            if (e.target.checked) {
                whatsappNumber.value = primaryPhone.value;
                whatsappNumber.setAttribute("readonly", true);
                whatsappNumber.style.backgroundColor = "#f5f5f5";
            } else {
                whatsappNumber.value = "";
                whatsappNumber.removeAttribute("readonly");
                whatsappNumber.style.backgroundColor = "";
            }
        });

        primaryPhone.addEventListener("input", () => {
            if (sameAsPrimary.checked) {
                whatsappNumber.value = primaryPhone.value;
            }
        });

        // Conditional Hostel Type Logic Based on Gender
        const updateHostelOptions = () => {
            if (hostelRequired.value === "Yes") {
                hostelTypeGroup.style.display = "block";
                const selectedGender = gender.value;
                
                if (selectedGender === "Male") {
                    hostelType.innerHTML = '<option value="Boys Hostel" selected>Boys Hostel</option>';
                } else if (selectedGender === "Female") {
                    hostelType.innerHTML = '<option value="Girls Hostel" selected>Girls Hostel</option>';
                } else {
                    hostelType.innerHTML = '<option value="">Please Select Gender First</option>';
                }
            } else {
                hostelTypeGroup.style.display = "none";
                hostelType.innerHTML = '';
            }
        };

        hostelRequired.addEventListener("change", updateHostelOptions);
        gender.addEventListener("change", updateHostelOptions);

        // Form Submission & Google Apps Script API Logic
        admissionForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById("submitAdmissionBtn");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

            try {
                // Get files
                const photoFile = document.getElementById("photoUpload").files[0];
                const birthCertFile = document.getElementById("birthCertUpload").files[0];

                // Convert files to Base64
                const photoData = await fileToBase64(photoFile);
                const birthCertData = await fileToBase64(birthCertFile);

                const studentName = document.getElementById("studentName").value.trim();
                const applyingClass = document.getElementById("applyingClass").value;

                // Construct payload matching the Spreadsheet Layout
                const formData = {
                    studentName: studentName,
                    dob: document.getElementById("dob").value,
                    gender: gender.value,
                    bloodGroup: document.getElementById("bloodGroup").value,
                    applyingClass: applyingClass,
                    fatherName: document.getElementById("fatherName").value.trim(),
                    motherName: document.getElementById("motherName").value.trim(),
                    primaryPhone: primaryPhone.value,
                    whatsappNumber: whatsappNumber.value,
                    emailAddress: document.getElementById("emailAddress").value,
                    permanentAddress: document.getElementById("permanentAddress").value.trim(),
                    hostelRequired: hostelRequired.value,
                    hostelType: hostelRequired.value === "Yes" ? hostelType.value : "N/A",
                    
                    // Pass files with structured renaming logic for Apps Script
                    photoFile: photoData ? {
                        ...photoData,
                        customName: `${studentName.replace(/\s+/g, '_')}_Photo`
                    } : null,
                    birthCertFile: birthCertData ? {
                        ...birthCertData,
                        customName: `${studentName.replace(/\s+/g, '_')}_BirthCert`
                    } : null
                };

                // NOTE: Replace this string with your deployed Google Apps Script Web App URL
             const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYs-zXJ4HbBjbK_Gtrfl3VPU-AO76dtMIuwj2PKOE016rWLaRcaN-8f7lFH4mvKkI/exec";          
                // Send data to Apps Script backend
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8",
                    }
                });

                // Assuming Apps Script returns a success status
                if (response.ok) {
                    admissionForm.style.display = "none";
                    document.getElementById("successMessage").style.display = "block";
                    admissionForm.reset();
                    window.scrollTo({ top: document.getElementById("admission").offsetTop - 50, behavior: 'smooth' });
                } else {
                    throw new Error("Network response was not ok.");
                }

            } catch (error) {
                console.error("Submission Error:", error);
                alert("An error occurred while uploading your application. Please try again later.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for reaching out to VP Foundation School! We will call you back shortly.");
            contactForm.reset();
        });
    }
});