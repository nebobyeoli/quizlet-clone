function getTarget(targetSelector) {
    const target = typeof targetSelector == 'string' ? document.querySelector(targetSelector) : targetSelector;
    if (target == null) console.log(`target is null : ${targetSelector}`);
    return target; // = target == null ? null : target
}

function appendSVG(targetSelector, attributes = {}, path_ds = [], path_fills = [], path_strokes = []) {
    const target = getTarget(targetSelector);
    if (target == null) return null;

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.entries(attributes).map(attr => svg.setAttribute(attr[0], attr[1]));

    if (path_ds) path_ds.forEach((dss, i) => {

        let path = document.createElementNS(svg.namespaceURI, 'path');

        path.setAttribute('d', dss);

        if (path_fills[i]) path.setAttribute('fill', path_fills[i]);
        if (path_strokes[i]) path.setAttribute('stroke', path_strokes[i]);

        svg.appendChild(path);
    });

    target.appendChild(svg);
    return svg;
}

function appendElement(targetSelector, newTagType, attributes = {}) {
    const target = getTarget(targetSelector);
    if (target == null) return null;

    let el;
    if (newTagType.includes('ns:')) el = document.createElementNS('http://www.w3.org/2000/svg', newTagType.split('ns:')[1]);
    else el = document.createElement(newTagType);

    Object.entries(attributes).map(attr => el.setAttribute(attr[0], attr[1]));

    target.appendChild(el);
    return el;
}

function appendElementAsFirst(targetSelector, newTagType, attributes = {}) {
    const target = getTarget(targetSelector);
    if (target == null) return null;

    let el;
    if (newTagType.includes('ns:')) el = document.createElementNS('http://www.w3.org/2000/svg', newTagType.split('ns:')[1]);
    else el = document.createElement(newTagType);
    Object.entries(attributes).map(attr => el.setAttribute(attr[0], attr[1]));

    // note: outerHTML throws exceptions if parentNode of target doesn't exist
    target.innerHTML = el.outerHTML + target.innerHTML;
    return el;
}

function appendElementBefore(targetSelector, newTagType, attributes = {}) {
    const target = getTarget(targetSelector);
    if (target == null) return null;

    let parentNode = target.parentNode;

    let el = document.createElement(newTagType);
    Object.entries(attributes).map(attr => el.setAttribute(attr[0], attr[1]));

    parentNode.insertBefore(el, target);
    return el;
}

// Append .usericon span

try
{
    appendSVG('span#quizlet', {
        height: '1.6rem',
        viewBox: '0 0 214 54.9'
    }, [
        'M23.5 53.6C9.9 53.6 1.2 42.9 1.4 28.2c.2-13 9.7-24.8 24.7-25C40.5 3 48.4 17.1 47.5 28.7c-.5 6.5-3.2 13-7.1 17.1 2.5 2.7 5.4 5 9.2 6.9.5.2 1.7.6 1.7.9 0 1.4-2.9 2.2-4.5 2.2-3.6 0-9.2-2.8-11.5-5.1-3.5 1.9-7.6 2.9-11.8 2.9zm2.8-43.8C16.2 9.5 8.1 17.3 7.8 27.7c-.4 10.6 6.2 20.6 17 19.6 2.2-.2 4.4-1.1 6.2-2.3-.5-1.3-2-3.7-2.3-5.2-.4-1.3.3-5.4 1.2-5.5 1.9-.4 5.4 5.1 6.4 6.3 2.8-2.6 5.1-7.5 5.3-11.8.6-8.7-5-18.8-15.3-19zM63.6 34.6c0 6.2.3 11.7 5.5 12.3 1.8.2 3.7-.3 5.2-1 .4-.1 1.6-.7 2.7-1l1-.3V22.1c-1.4-.9-2.5-2.2-2.8-3.9-.2-.8-.1-2.8.8-2.8.5 0 1.3.2 1.9.4 1.4.5 3.9 1.6 5.2 2.5.9.7 1.3 1.6 1.3 3.1v25.4c0 1.3.4 2.8.9 3.7.6 1.4 1.3 2.6.7 3.1-.5.5-3.2 0-4.3-.6-1.3-.7-2.2-1.6-2.8-2.5-.2-.4-.4-.7-.5-1.1l-1 .9c-2.1 2-5.4 3.7-8.9 3.7-6.9 0-11.3-4.8-11.5-15.6 0-4.4.6-11.1-.8-15.6-.4-1.2-1.6-3.1-.7-3.9.7-.5 3.6.3 4.4.9 3.1 1.9 3.8 6.4 3.8 10.8v4zM96.1 23.9c0-.6-.1-.7-.4-.7-1-.3-2.7-.7-3.4-1-1-.4-1.8-1.6-1.8-2.5 0-.7 1.5-1.3 2.2-1.5 2.5-.8 4.4-1.2 6.8-1.1 2.4 0 2.8 2.2 2.8 3V43c0 4.8-2.1 12.1-4.2 12.1-1.7 0-2-8.5-2-12V23.9zM93.8 11c-1.6-1.7.4-5.4 2.5-5.4 2.3 0 5.4 1.6 5.4 3.4 0 1.7-1.5 4-3.3 4.2-1.1.1-3.4-.8-4.6-2.2zM108.9 48.1c5.4-8 11.4-17.1 15.3-23.5-2.1.2-8.8 1.2-11.3 1.2-2.2 0-5.4-2.9-5.3-4.9.1-.8 2.8-.5 3.8-.5 5.8 0 14.2-.5 18.3-1 .6-.1 1.2-.1 1.6-.1 1.4.4 3.7 2.4 3.6 3.6-.1.8-1.6 1-2.2 1.3-3.7 6-14.2 20.4-17.2 24.4 6.7-.3 11-.5 15.6-.9 1.9-.1 4.5-.4 4.5.5 0 1.6-3.2 5.3-5.9 5.3h-18.1c-1.2 0-2.1-.1-2.9-1-.6-.6-1.5-2.2-1.7-3.1-.2-.8.4-1.2 1.3-1.2h.6zM142.5 8.7c-.4-.3-6-3.9-6-6.3 0-.4 1.6-1.6 2.5-1.5 2.4.1 6.6 2.1 8.7 3.5 1.9 1.3 2.2 3.3 2.2 5.7v16.2c0 4.5 0 9.1-.4 13.8-.3 4.5-2.7 13.1-5.1 14.2-1.8 0-3.2-2.8-3.1-3.7.8-4.6 1.1-5.4 1.1-16.6V8.7zM157.7 34.6c1.2-9.2 8-15.3 17.3-14.8 8 .6 10.5 8.2 10.9 10.7 1 .8 1.8 2.4 1.8 2.9-.1.7-1.2 1.3-3.1 1.7-2.9.6-15.5 1.9-19.7 1.6-.4 3.8.4 10.3 7.2 10.5 2.2.2 5.2-.5 6.2-.9 3.8-1.3 5.2-2.4 5.9-1.6.6.6.1 3-2.9 5.4-3 2.2-6.8 2.8-9.5 2.8-10.3-.2-15.2-9.9-14.1-18.3zm14.1-10c-3.7.6-5.9 4.7-6.5 7.8 5.4-.8 9.6-1.5 14.1-2.1-.6-2.9-3.6-6.5-7.6-5.7zM196.5 17.4c0-3.1-.1-4.5-1.6-6.4-.5-.7-.2-2.8.6-3.4 1.6-.8 7 3.1 7.6 4.4.4.5.7 1.1.7 1.7-.4 1.8-.4 2.9-.4 4.7v1.7c2.2-.3 4.5-.7 6.7-1 1.1-.2 3.3.5 3.4 1.2 0 1.5-2.1 4.2-3.6 4.2-1.4 0-2.8.1-4.2.2l-2.3.2v9.8c0 6.9-.1 15.1 5.8 15.1 1.3 0 3.7-.6 3.7.4 0 .7-1.3 3.2-4.8 3.6-3.8.5-7.5-1.1-9.2-3.6-2.4-3.4-2.4-7.9-2.4-15.1v-9.4c-1.3.1-2.8.1-4.3.1-1.2 0-4.2-1.3-4.2-2.9.1-.6.5-1.4.8-1.5.9 0 1.9-.1 2.9-.1l4.8-.5v-3.4z'
    ]);

    appendElementAsFirst('div.ribbon-top div.profile', 'span', { class: 'va usericon' });

    document.querySelectorAll('div.panel-center div.cardset-creator').forEach(target => {
        appendElementAsFirst(target, 'span', { class: 'va usericon' });
    });

    // Use user icon placeholder image
    document.querySelectorAll('.usericon').forEach(target => {
        target.innerHTML = `<img style='width: 100%; border-radius: 50%;' src='./resources/profile_placeholder.png'>`;
    });
}

catch (err) {
    console.error(err);
}
