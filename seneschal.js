class Position {
    constructor (title, holders, color) {
        this.title = title;
        this.holders = holders;
        this.color = color;
    }
}

function getStart (holders) {
    return holders[0][1];
}
function getEnd (holders) {
    return holders[holders.length - 1][2];
}
function getMarginTotal (row) {
    let marginLeft = parseFloat($(row).children().eq(0).css("marginLeft"));
    let marginRight = parseFloat($(row).children().eq(0).css("marginRight"));
    let marginTotal = row.childElementCount * (marginLeft + marginRight);
    return marginTotal;
}
function getPaddingTotal (row) {
    let paddingLeft = parseFloat($(row).children().eq(0).css("paddingLeft"));
    let paddingRight = parseFloat($(row).children().eq(0).css("paddingRight"));
    let paddingTotal = row.childElementCount * (paddingLeft + paddingRight);
    return paddingTotal;
}

function initRow (position, graphParent) {
    let row = document.createElement("DIV");
    row.classList.add("SNrow");
    graphParent.appendChild(row);
    var reign;
    let start = getStart(position.holders);
    let end = getEnd(position.holders);
    let stretch = end - start;
    var widthDecimal, widthString;
    for (var i = 0; i < position.holders.length; i++) {
        reign = document.createElement("DIV");
        reign.classList.add("SNreign");
        row.appendChild(reign);
        reign.style.backgroundColor = position.color;
        reign.innerHTML = position.holders[i][0];
    }

    let marginTotal = getMarginTotal(row);
    let paddingTotal = getPaddingTotal(row);
    let reigns = row.childNodes;

    for (var i = 0; i < position.holders.length; i++) {
        reign = reigns[i];
        widthDecimal = (position.holders[i][2] - position.holders[i][1]) / stretch;
        widthString = "calc((100% - " + (marginTotal + paddingTotal) + "px) * (" + widthDecimal * 100 + " / 100.0))";
        reign.style.width = widthString;
    }
}

function initGraph (positions) {
    let graphParent = document.createElement("DIV");
    graphParent.classList.add("SNgraphParent");
    $("body")[0].appendChild(graphParent);
    for (var i = 0; i < positions.length; i++) {
        initRow(positions[i], graphParent);
    }
}

initGraph([pos1, pos2, pos3]);