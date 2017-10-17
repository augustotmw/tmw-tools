
/**
 * @function pxem
 * @param {number} px Value in pixels
 * @param {number} base Value of base font size in pixels to calculate
 * @description Conversion from px to em unit
 * @example pxem(12) || pxem(12,16)
 * @returns {number} Value in "em"
 */

function pxem(px,base){
    base = base||16;
    var em = (px/base);
    console.log(px+"px = "+em+"em");
    return em;
}

/**
 * @function ptpx
 * @param {number} pt Value in pixels
 * @description Conversion from pt to px unit
 * @example ptpx(12)
 * @returns {number} Value in "px"
 */
function ptpx(pt) {
    var px = pt * 96 / 72;
    console.log(pt+"pt = "+px+"px");
    return px;
}

/**
 * @function ptpxem
 * @param {number} pt Value in pixels
 * @param {number} base Value of base font size in pixels to calculate
 * @description Conversion from pt to em unit
 * @example ptem(12) || ptem(12,16)
 * @returns {number} Value in "em"
 */

function ptem(pt,base) {
    base = base||16;
    return ((pt * 96 / 72)/base);
}

