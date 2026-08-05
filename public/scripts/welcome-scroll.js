const updateScrollBackground = () => {
	const scrollMax = document.documentElement.scrollHeight - window.innerHeight; // Finds out the max scroll value for the page
	const progress = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0; // Progress is computed as a value between 0 and 1, clamped to the range [0, 1]
	document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
};

const header = document.getElementById('site-header');
let lastScrollY = window.scrollY;

const revealTargetGroups = [
	{ selector: '#hero-left, #hero-right', baseDelay: 0, step: 120 },
	{ selector: '#projects h2, #projects .project-feature-left', baseDelay: 40, step: 120 },
	{ selector: '#skills h2', baseDelay: 20, step: 0 },
	{ selector: '#skills .skill-card', baseDelay: 80, step: 55 }
];

const setupScrollReveal = () => {
	const revealTargets = [];

	revealTargetGroups.forEach(({ selector, baseDelay, step }) => {
		document.querySelectorAll(selector).forEach((element, index) => {
			element.classList.add('reveal-on-scroll');
			element.style.setProperty('--reveal-delay', `${baseDelay + index * step}ms`);
			revealTargets.push(element);
		});
	});

	if (revealTargets.length === 0) {
		return;
	}

	if (!('IntersectionObserver' in window)) {
		revealTargets.forEach((element) => element.classList.add('is-visible'));
		return;
	}

	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				entry.target.classList.toggle('is-visible', entry.isIntersecting);
			});
		},
		{
			threshold: 0.16,
			rootMargin: '0px 0px -10% 0px'
		}
	);

	revealTargets.forEach((element) => {
		revealObserver.observe(element);
	});
};

const setupProjectModals = () => {
	const modals = Array.from(document.querySelectorAll('.project-modal'));
	if (modals.length === 0) {
		return;
	}

	const closeAllModals = () => {
		const openModals = modals.filter((modal) => modal.classList.contains('is-open'));

		modals.forEach((modal) => {
			modal.classList.remove('is-open');
			modal.setAttribute('aria-hidden', 'true');
		});
		document.body.classList.remove('modal-open');

		openModals.forEach((modal) => {
			modal.querySelectorAll('iframe').forEach((iframe) => {
				const videoSrc = iframe.getAttribute('src');
				if (videoSrc) {
					iframe.setAttribute('src', videoSrc);
				}
			});
		});
	};

	const openModal = (modalId) => {
		const modal = document.getElementById(modalId);
		if (!modal) {
			return;
		}

		closeAllModals();
		modal.classList.add('is-open');
		modal.setAttribute('aria-hidden', 'false');
		document.body.classList.add('modal-open');

		const closeButton = modal.querySelector('[data-close-modal]');
		if (closeButton) {
			closeButton.focus();
		}
	};

	document.querySelectorAll('[data-open-lilypad]').forEach((trigger) => {
		trigger.addEventListener('click', (event) => {
			event.preventDefault();
			openModal('lilypad-modal');
		});
	});

	document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
		trigger.addEventListener('click', (event) => {
			event.preventDefault();
			openModal(trigger.getAttribute('data-open-modal'));
		});
	});

	modals.forEach((modal) => {
		const closeButton = modal.querySelector('[data-close-modal]');
		if (closeButton) {
			closeButton.addEventListener('click', closeAllModals);
		}

		modal.addEventListener('click', (event) => {
			if (event.target === modal) {
				closeAllModals();
			}
		});
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			const hasOpenModal = modals.some((modal) => modal.classList.contains('is-open'));
			if (hasOpenModal) {
				closeAllModals();
			}
		}
	});
};

const setupPostitBoardDrag = () => {
	const board = document.querySelector('.postit-board');
	if (!board) {
		return;
	}

	const notes = Array.from(board.querySelectorAll('[data-draggable-note]'));
	if (notes.length === 0) {
		return;
	}

	let activeNote = null;
	let pointerId = null;
	let offsetX = 0;
	let offsetY = 0;
	let zIndexCounter = 10;

	const getBounds = () => board.getBoundingClientRect();

	const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

	const handlePointerMove = (event) => {
		if (!activeNote || event.pointerId !== pointerId) {
			return;
		}

		const boardRect = getBounds();
		const noteRect = activeNote.getBoundingClientRect();
		const maxX = boardRect.width - noteRect.width;
		const maxY = boardRect.height - noteRect.height;

		const nextLeft = clamp(event.clientX - boardRect.left - offsetX, 0, Math.max(0, maxX));
		const nextTop = clamp(event.clientY - boardRect.top - offsetY, 0, Math.max(0, maxY));

		activeNote.style.left = `${nextLeft}px`;
		activeNote.style.top = `${nextTop}px`;
	};

	const stopDrag = (event) => {
		if (!activeNote || event.pointerId !== pointerId) {
			return;
		}

		activeNote.releasePointerCapture(pointerId);
		activeNote.dataset.dragging = 'false';
		activeNote = null;
		pointerId = null;
	};

	notes.forEach((note) => {
		note.dataset.dragging = 'false';
		note.addEventListener('pointerdown', (event) => {
			const handle = event.target.closest('.postit-note__handle');
			if (!handle) {
				return;
			}

			event.preventDefault();
			const boardRect = getBounds();
			const noteRect = note.getBoundingClientRect();

			activeNote = note;
			pointerId = event.pointerId;
			offsetX = event.clientX - noteRect.left;
			offsetY = event.clientY - noteRect.top;
			note.style.left = `${noteRect.left - boardRect.left}px`;
			note.style.top = `${noteRect.top - boardRect.top}px`;
			note.style.zIndex = String(++zIndexCounter);
			note.dataset.dragging = 'true';
			note.setPointerCapture(pointerId);
		});

		note.addEventListener('pointermove', handlePointerMove);
		note.addEventListener('pointerup', stopDrag);
		note.addEventListener('pointercancel', stopDrag);
	});
};

const updateHeaderVisibility = () => {
	if (!header) {
		return;
	}

	const currentScrollY = window.scrollY;
	const delta = currentScrollY - lastScrollY;

	if (currentScrollY <= 8) {
		header.classList.remove('is-hidden');
		lastScrollY = currentScrollY;
		return;
	}

	if (delta > 6 && currentScrollY > 80) {
		header.classList.add('is-hidden');
	} else if (delta < -6) {
		header.classList.remove('is-hidden');
	}

	lastScrollY = currentScrollY;
};

updateScrollBackground();
updateHeaderVisibility();
setupScrollReveal();
setupProjectModals();
setupPostitBoardDrag();

window.addEventListener(
	'scroll',
	() => {
		updateScrollBackground();
		updateHeaderVisibility();
	},
	{ passive: true }
);
window.addEventListener('resize', updateScrollBackground);
