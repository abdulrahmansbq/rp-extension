if(document.getElementById('contrastCss')){
    const element = document.getElementById('contrastCss');
    const contrastValue = element.getAttribute('contrast-value');
    element.remove();
    if(contrastValue !== '200'){
        const style = document.createElement('style');
        style.id = 'contrastCss';
        const newContrastValue = parseInt(contrastValue) + 25;
        style.setAttribute('contrast-value', newContrastValue)
        style.innerHTML = 'body { filter: contrast('+newContrastValue+'%); }';
        document.head.appendChild(style);
    }
}else{
    const style = document.createElement('style');
    style.id = 'contrastCss';
    const contrastValue = 100;
    style.setAttribute('contrast-value', contrastValue)
    style.innerHTML = 'body { filter: contrast('+contrastValue+'%); }';
    document.head.appendChild(style);
}