/**
 * @name rpGetFilters
 * @description get the filters applied to the page
 * @returns {string}
 */
function rpGetFilters(){
    return document.documentElement.style.filter;
}

/**
 * @name rpGetFilter
 * @description get a specific filter by its name
 * @param {string} filterName
 * @returns {string}
 */
function rpGetFilter(filterName){
    const filters = rpGetFilters();
    const filter = filters.split(' ');
    const filterValue = filter.find(f => f.includes(filterName));
    console.log(filterValue);
    return filterValue;
}

/**
 * @name rpGetFilterValue
 * @param {string} filterName 
 * @returns {string}
 */
function rpGetFilterValue(filterName){
    return rpGetFilter(filterName)?.split('(')[1].split('%')[0];
}

/**
 * @name rpGetFiltersWithout
 * @description get the filters applied to the page without a specific filter
 * @param {string} filterName
 * @returns {string}
 */
function rpGetFiltersWithout(filterName){
    const filters = rpGetFilters();
    const filter = filters.split(' ');
    const filterValue = filter.filter(f => !f.includes(filterName));
    return filterValue;
}

/**
 * @name rpSetFilter
 * @description set a filter to the page
 * @param {string} filterName 
 * @param {int} filterValue 
 * @returns {void}
 */
function rpSetFilter(filterName, filterValue){
    const filters = rpGetFiltersWithout(filterName);
    filters.push(filterName+'('+filterValue+'%)');
    document.documentElement.style.setProperty('filter', filters.join(' '), 'important');
}

/**
 * @name rpContrastFx
 * @description increase the contrast of the page
 * @returns {void}
 */
function rpContrastFx(){
    const filterValue = parseInt(rpGetFilterValue('contrast') ?? 100);
    if(filterValue >= 200){
        rpSetFilter('contrast', 100);
    }else{
        rpSetFilter('contrast', filterValue+25);
    }
}

/**
 * @name rpInvertFx
 * @description invert the colors of the page by applying the invert filter
 * @returns {void}
 */
function rpInvertFx(){
    const filterValue = parseInt(rpGetFilterValue('invert') ?? 0);
    if(filterValue >= 100){
        rpSetFilter('invert', 0);
    }else{
        const newValue = filterValue+25 == 50 ? 75 : filterValue+25;
        rpSetFilter('invert', newValue);
    }
}

/**
 * @name rpSepiaFx
 * @description apply the sepia filter to the page
 * @returns {void}
 */
function rpSepiaFx(){
    const filterValue = parseInt(rpGetFilterValue('sepia') ?? 0);
    console.log(filterValue);
    if(filterValue >= 100){
        rpSetFilter('sepia', 0);
    }else{
        rpSetFilter('sepia', filterValue+25);
    }
}

/**
 * @name rpResetFx
 * @description reset the filters applied to the page
 * @returns {void}
 */
function rpResetFx(){
    rpSetFilter('contrast', 100);
    rpSetFilter('invert', 0);
    rpSetFilter('sepia', 0);
    rpSetScale(1);
    rpSetTransformOrigin(0, 0);
}

/**
 * @name rpCloseButton
 * @description close the options card
 * @returns {void}
 */
function rpCloseButton(){
    document.getElementById('rp-action-card').style.setProperty('display', 'none', 'important');
}

/**
 * @name rpSetTransformOrigin
 * @description set the transform origin of the page
 * @param {int} x
 * @param {int} y
 * @returns {void}
 */
function rpSetTransformOrigin(x, y){
    document.body.style.transformOrigin = x + 'px ' + y + 'px';
}

/**
 * @name rpSetScale
 * @description set the scale transform of the page
 * @param {float} scale
 * @returns {void}
 */
function rpSetScale(scale){
    document.body.style.transform = 'scale('+scale+')';
}
 
/**
 * @name rpScaleInTransform
 * @description scale in the page by applying the scale transform
 * @returns {void}
 */
function rpScaleInTransform(){
    const bodyStyle = document.body.style;
    const transform = bodyStyle.transform;
    if(transform == ''){
        rpSetScale(1.25);
        rpSetTransformOrigin(0, 0);
        window.addEventListener('mousemove', rpTransformOriginController);
    }else{
        const scale = transform.split('(')[1].replace(')', '');
        if(scale < 2){
            rpSetScale(parseFloat(scale)+0.25);
        }else{
            rpSetScale(1);
        }
    }
}

/**
 * @name rpScaleOutTransform
 * @description scale out the page by applying the scale transform
 * @returns {void}
 */
function rpScaleOutTransform(){
    const bodyStyle = document.body.style;
    const transform = bodyStyle.transform;
    if(transform == ''){
        rpSetScale(0.75);
        rpSetTransformOrigin(0, 0);
        window.addEventListener('mousemove', rpTransformOriginController);
    }else{
        const scale = transform.split('(')[1].replace(')', '');
        if(scale > 0.5){
            rpSetScale(parseFloat(scale)-0.25);
        }else{
            rpSetScale(1);
        }
    }
}

/**
 * @name rpTransformOriginController
 * @description controller for the transform origin
 * @param {MouseEvent} event
 * @returns {void}
 */
function rpTransformOriginController(event){
    if(event.ctrlKey){
        const transformOrigins = document.body.style.transformOrigin.split(' ');
        const currentXOrigin = parseInt(transformOrigins[0].replace('px', ''));
        const currentYOrigin = parseInt(transformOrigins[1].replace('px', ''));
        if(event.clientX < 300){
            rpSetTransformOrigin(currentXOrigin - 10, currentYOrigin);
        }
        if(event.clientY < 300){
            rpSetTransformOrigin(currentXOrigin, currentYOrigin - 10);
        }
        if(event.clientX > window.innerWidth - 300){
            rpSetTransformOrigin(currentXOrigin + 10, currentYOrigin);
        }
        if(event.clientY > window.innerHeight - 300){
            rpSetTransformOrigin(currentXOrigin, currentYOrigin + 10);
        }
    }
}