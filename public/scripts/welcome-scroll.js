const updateScrollBackground = () => {
	const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0;
	document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
};

const header = document.getElementById('site-header');
let lastScrollY = window.scrollY;

const revealTargetGroups = [
	{ selector: '#hero-left, #hero-right', baseDelay: 0, step: 120 },
	{ selector: '#scroll-content h2, #scroll-content .project-feature-left', baseDelay: 40, step: 120 },
	{ selector: '#skills-section h2', baseDelay: 20, step: 0 },
	{ selector: '#skills-section .skill-card', baseDelay: 80, step: 55 }
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

window.addEventListener(
	'scroll',
	() => {
		updateScrollBackground();
		updateHeaderVisibility();
	},
	{ passive: true }
);
window.addEventListener('resize', updateScrollBackground);
