const express = require('express');

const extractPath = require('./extract-path');

(async function () {
    
    // const svg = await extractPath('./450-CG-001 cloudconvert 2.svg');
    const svg = await extractPath('./iconmonstr-linkedin-3.svg');
    
    console.log('SVG');
    console.log(svg);
    
})();

APP.listen(3030, () => console.log('listening on 3030'))
