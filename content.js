window.onload = () => {
	const config = { childList: true, subtree: true };
	observer.observe(document.body, config);
};

const observer = new MutationObserver((mutations, observer) => {
	const otif = document.getElementById('core-menu-3')
	const root = document.getElementById('root');

	let navbar = null;
	let page = null;
	if (otif) {
		navbar = otif.children[0]
		page = document.getElementById('root');
	} else if (root) {
		navbar = root.children[0];
		page = root.children[1];
	}

	if (otif || root) {
		if (navbar && page && !navbar.children[1].className.includes('skeleton')) {
			console.log('INSTALLED COLLAPSIBLE NAVBAR')

			const toggleButton = createToggleButton(navbar, page)

			document.body.appendChild(toggleButton);

			toggleButton.style.transition = 'left 0.3s ease'
			navbar.style.transition = 'transform 0.3s ease';
			page.style.transition = 'margin-left 0.3s ease';

			observer.disconnect();
		}
	}
});

const createToggleButton = (navbar, page) => {
	const toggleButton = document.createElement('button');
	toggleButton.innerHTML = '←';
	toggleButton.style.position = 'fixed';
	toggleButton.style.top = '50%';
	toggleButton.style.left = '200px';
	toggleButton.style.transform = 'translateY(-50%)';
	toggleButton.style.cursor = 'pointer';
	toggleButton.style.zIndex = '1000';
	toggleButton.style.padding = '10px';
	toggleButton.style.border = '2px solid white';
	toggleButton.style.backgroundColor = '#193a54'
	toggleButton.style.color = 'white';
	toggleButton.style.borderRadius = '50%';
	toggleButton.style.width = '40px';
	toggleButton.style.height = '40px';
	toggleButton.style.display = 'flex';
	toggleButton.style.alignItems = 'center';
	toggleButton.style.justifyContent = 'center';

	let isNavbarVisible = true;

	toggleButton.addEventListener('click', () => {
		if (isNavbarVisible) {
			navbar.style.transform = 'translateX(-100%)';
			toggleButton.innerHTML = '→';
			toggleButton.style.left = '0';
			page.style.marginLeft = '0px';
		} else {
			navbar.style.transform = 'translateX(0)';
			toggleButton.innerHTML = '←';
			toggleButton.style.left = '200px';
			page.style.marginLeft = '232px';
		}
		isNavbarVisible = !isNavbarVisible;
	});

	return toggleButton;
}