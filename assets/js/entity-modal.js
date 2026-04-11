function openEntityModal(element) {
    const entityData = element.getAttribute('data-entity');
    const entity = JSON.parse(entityData);

    window.lastFocusedEntityButton = element;
    const modal = document.getElementById('entityModal');
    const modalContent = modal.querySelector('.modal-content');
    const name = document.getElementById('modalName');
    const desc = document.getElementById('modalDescription');
    const logo = document.getElementById('modalLogo');
    const joined = document.getElementById('modalJoined');
    const joinedItem = document.getElementById('modalJoinedItem');
    const team = document.getElementById('modalTeam');
    const teamItem = document.getElementById('modalTeamItem');
    const modalMeta = document.getElementById('modalMetaArea');
    const link = document.getElementById('modalSiteLink');
    const socials = document.getElementById('modalSocials');
    const entityType = element.getAttribute('data-entity-type') || 'member';

    const baseUrl = document.documentElement.getAttribute('data-baseurl') || '/';
    const iconsBase = baseUrl.replace(/\/$/, '') + '/assets/svg/';

    name.textContent = entity.name || 'Unknown';
    desc.innerHTML = window.sanitizeHTML(entity.description || 'No description available.');

    logo.hidden = true;
    logo.onload = () => logo.hidden = false;
    logo.src = window.getCurrentLogo(element);
    logo.alt = `${entity.name || 'Entity'} logo`;

    const logoUrl = window.getCurrentLogo(element);
    const modalLeft = modal.querySelector('.modal-left');
    if (logoUrl) {
        const safeLogoUrl = logoUrl.replace(/["\\]/g, '\\$&');
        modalLeft.style.setProperty('--logo-url', `url("${safeLogoUrl}")`);
    } else {
        modalLeft.style.removeProperty('--logo-url');
    }

    const hasJoined = Boolean(entity.joined);
    const hasTeam = Boolean(entity.team && entity.team.length);

    if (hasJoined) {
        joinedItem.style.display = '';
        joined.textContent = entity.joined;
    } else {
        joinedItem.style.display = 'none';
        joined.textContent = 'N/A';
    }

    if (hasTeam) {
        teamItem.style.display = '';
        team.textContent = '';
        entity.team.forEach(t => {
            const container = document.createElement('div');
            container.className = 'team-member';

            const icon = document.createElement('div');
            icon.className = 'team-member-icon';
            container.appendChild(icon);

            const span = document.createElement('span');
            span.className = 'team-tag';
            span.textContent = t.name;
            container.appendChild(span);

            team.appendChild(container);
        });
    } else {
        teamItem.style.display = 'none';
        team.textContent = '';
    }

    if (hasJoined || hasTeam) {
        modalMeta.style.display = '';
        modal.querySelector('.modal-header-grid')?.classList.remove('no-meta');
    } else {
        modalMeta.style.display = 'none';
        modal.querySelector('.modal-header-grid')?.classList.add('no-meta');
    }

    const getSafeUrl = (value, { allowRelative = false } = {}) => {
        if (!value) return null;
        try {
           const url = new URL(value, window.location.origin);
            const allowedProtocols = new Set(['http:', 'https:']);
            if (!allowedProtocols.has(url.protocol)) return null;
            if (!allowRelative && url.origin === window.location.origin && !/^https?:/i.test(value)) {
                return null;
            }
            return url;
        } catch {
            return null;
        }
    };

    if (entity.link) {
        const url = getSafeUrl(entity.link, { allowRelative: true });
        if (url) {
            url.searchParams.set('utm_source', 'irwa-website');
            link.href = url.toString();
        } else {
            link.removeAttribute('href');
            link.style.display = 'none';
        }
        if (url) {
            link.style.display = 'inline-flex';
        }
    } else {
        link.removeAttribute('href');
        link.style.display = 'none';
    }

    socials.textContent = '';
    const addSocial = (href, type) => {
        const url = getSafeUrl(href);
        if (!url) return;
        const a = document.createElement('a');
        a.href = url.toString();
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', type);

        const img = document.createElement('img');
        const iconName = type.toLowerCase() === 'game' ? 'roblox' : type.toLowerCase();
        img.src = `${iconsBase}${iconName}.svg`;
        img.alt = type;
        img.className = 'social-icon';
        img.width = 24;
        img.height = 24;

        img.onerror = function () {
            const textFallback = document.createElement('span');
            textFallback.textContent = type;
            textFallback.className = 'social-text-fallback';
            this.replaceWith(textFallback);
        };

        a.appendChild(img);
        socials.appendChild(a);
    };

    addSocial(entity.game_link || '', 'Game');
    addSocial(entity.discord, 'Discord');
    addSocial(entity.twitter, 'Twitter');
    addSocial(entity.kofi, 'Kofi');

    modal.classList.add('active');
    modalContent.focus();
    document.addEventListener('keydown', trapEntityModalFocus);
}

function closeEntityModal() {
    const modal = document.getElementById('entityModal');
    modal.classList.remove('active');

    let transitionFinished = false;
    const cleanup = () => {
        if (transitionFinished) return;
        transitionFinished = true;
        document.removeEventListener('keydown', trapEntityModalFocus);
        if (window.lastFocusedEntityButton) window.lastFocusedEntityButton.focus();
        modal.removeEventListener('transitionend', cleanup);
        modal.removeEventListener('animationend', cleanup);
    };

    modal.addEventListener('transitionend', cleanup);
    modal.addEventListener('animationend', cleanup);
    setTimeout(cleanup, 400);
}

function trapEntityModalFocus(e) {
    const modal = document.getElementById('entityModal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeEntityModal();
        return;
    }

    if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    }
}

window.openEntityModal = openEntityModal;
window.closeEntityModal = closeEntityModal;
