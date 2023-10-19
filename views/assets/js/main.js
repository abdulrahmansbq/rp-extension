/**
 * @name main.js
 * @description main script for the extension
 * @version 1.0
 */

/**
 * @name rpAddOptionsCard
 * @description add the options card to the page
 * @returns {void}
 */
function rpAddOptionsCard(){
    if(document.getElementById('rp-action-card') == null){
        rpCreateOptionsCard();
        document.getElementById('rpContrastFx').addEventListener('click', rpContrastFx);
        document.getElementById('rpInvertFx').addEventListener('click', rpInvertFx);
        document.getElementById('rpSepiaFx').addEventListener('click', rpSepiaFx);
        document.getElementById('rpCloseButton').addEventListener('click', rpCloseButton);
        document.getElementById('rpResetFx').addEventListener('click', rpResetFx);
        document.getElementById('rpZoomIn').addEventListener('click', rpScaleInTransform);
        document.getElementById('rpZoomOut').addEventListener('click', rpScaleOutTransform);
    }else{
        document.getElementById('rp-action-card').style.display = 'block';
    }
}

/**
 * @name rpCreateOptionsCard
 * @description create the options card
 * @returns {void}
 */
function rpCreateOptionsCard(){
    let card = document.createElement('div');
    card.classList.add('rp-action-card');
    card.id = 'rp-action-card';
    card.innerHTML = `
    <div class="firstLineButtons">
        <button class="rp-action-button" id="rpContrastFx">
            <img src="https://img.icons8.com/ios/50/25808/contrast.png"/>
        </button>
        <button class="rp-action-button" id="rpResetFx">
            <img src="https://img.icons8.com/ios/50/000000/refresh--v1.png"/>
        </button>
    </div>
    <div class="secondLineButtons">
        <button class="rp-action-button" id="rpSepiaFx">
            <img src="https://img.icons8.com/ios/50/25961/smooth-background-color"/>
        </button>
        <button class="rp-action-button" id="rpCloseButton">
            <img src="https://img.icons8.com/ios/50/101857/xbox-x"/>
        </button>
        <button class="rp-action-button" id="rpInvertFx">
            <img src="https://img.icons8.com/ios/50/5481/invert-selection"/>
        </button>
    </div>
    <div class="lastLineButtons">
        <button class="rp-action-button" id="rpZoomIn">
            <img src="https://img.icons8.com/ios/50/715/zoom-in"/>
        </button>
        <button class="rp-action-button" id="rpZoomOut">
            <img src="https://img.icons8.com/ios/50/717/zoom-out"/>
        </button>
    </div>
    `;
    document.documentElement.appendChild(card);
}

rpAddOptionsCard();