const updateScrollBackground = () => {
	const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0;
	document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
};

updateScrollBackground();
window.addEventListener('scroll', updateScrollBackground, { passive: true });
window.addEventListener('resize', updateScrollBackground);
