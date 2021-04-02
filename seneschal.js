class Graph {
    constructor (title, positions) {
        this.title = title;
        this.positions = positions;
    }
    getEarliestStart () {
        let m = Infinity;
        for (var i = 0; i < this.positions.length; i++) {
            m = Math.min(m, this.positions[i].holders[0].start);
        }
        return m;
    }
    getLatestEnd () {
        let M = -Infinity;
        for (var i = 0; i < this.positions.length; i++) {
            M = Math.max(M, this.positions[i].holders[this.positions[i].holders.length - 1].end);
        }
        return M;
    }
}

class Position {
    constructor (title, holders, color) {
        this.title = title;
        this.holders = holders;
        this.color = color;
    }
}

class Holder {
    constructor (name, start, end, colors) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.colors = colors;
    }
    getLength () {
        return this.end - this.start;
    }
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

function setToolTipLeft (element) {
    let toolTip = element.childNodes[0];
    let elementWidth = $(element).width();
    let toolTipWidth = $(toolTip).width();
    let toolTipPadding = parseFloat($(toolTip).css("paddingLeft")) + parseFloat($(toolTip).css("paddingRight"));
    toolTipWidth += toolTipPadding;
    let percent = (toolTipWidth / elementWidth) * 100;
    let leftPercent = 50 - (percent / 2);
    let string = leftPercent + "%";
    toolTip.style.left = string;
}

function initRow (position, graphParent, start, end, maxStretch, colorDict, styleElement) {
    let row = document.createElement("DIV");
    row.classList.add("SNrow");
    graphParent.appendChild(row);
    var reign, toolTip, hoverColor, cssText;
    for (var i = 0; i < position.holders.length; i++) {
        reign = document.createElement("DIV");
        reign.classList.add("SNholder");
        toolTip = document.createElement("SPAN");
        toolTip.classList.add("SNtoolTip");
        toolTip.innerHTML = position.holders[i].name;
        reign.appendChild(toolTip);
        row.appendChild(reign);
        reign.style.backgroundColor = position.holders[i].colors[0];
        
        hoverColor = position.holders[i].colors[1];
        if (!colorDict.hasOwnProperty(hoverColor)) {
            colorDict[hoverColor] = colorDict["len"];
            colorDict["len"]++;
            cssText = ".SNhoverColor" + colorDict[hoverColor] + ":hover { background-color : " + hoverColor + " !important; }";
            styleElement.appendChild(document.createTextNode(cssText));
        }
        reign.classList.add("SNhoverColor" + colorDict[hoverColor]);

        if (i == 0) {
            reign.style.marginLeft = ((position.holders[i].start - start) / maxStretch) * 100 + "%";
        }
        reign.style.width = (position.holders[i].getLength() / maxStretch) * 100 + "%";
        setToolTipLeft(reign, toolTip);
    }
}

function initGraph (graph) {
    styleElement = document.createElement("STYLE");
    styleElement.classList.add("SNstyleElement");
    $("body")[0].appendChild(styleElement);
    let positions = graph.positions;
    let graphParent = document.createElement("DIV");
    graphParent.classList.add("SNgraphParent");
    $("body")[0].appendChild(graphParent);
    let start = graph.getEarliestStart();
    let end = graph.getLatestEnd();
    let maxStretch = end - start;
    var colorDict = {"len" : 0};
    for (var i = 0; i < positions.length; i++) {
        initRow(positions[i], graphParent, start, end, maxStretch, colorDict, styleElement);
    }
}