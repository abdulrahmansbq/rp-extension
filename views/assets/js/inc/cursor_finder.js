/**
 * @name cursor_finder.js
 * @description apply the cursor finder effect to the page
 * @version 1.0
 */
if(document.getElementById('cursorCss')){
    document.getElementById('cursorCss').remove();
}else{
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'cursorCss';
    overlayDiv.classList.add('find-cursor');
    overlayDiv.classList.add('mouse-cursor-gradient-tracking');
    document.documentElement.appendChild(overlayDiv);

    overlayDiv.addEventListener('mousemove', e => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    overlayDiv.style.setProperty('--x', x + 'px');
    overlayDiv.style.setProperty('--y', y + 'px');
    });
}