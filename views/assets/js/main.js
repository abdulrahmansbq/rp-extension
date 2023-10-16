if(document.getElementById('contrastCss')){
    document.getElementById('contrastCss').remove();
}else{
    const style = document.createElement('style');
    style.id = 'contrastCss';
    style.innerHTML = 'body { filter: contrast(150%); }';
    document.head.appendChild(style);
}