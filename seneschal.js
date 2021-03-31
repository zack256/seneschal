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
    constructor (name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
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

function initRow (position, graphParent, start, end, maxStretch) {
    let row = document.createElement("DIV");
    row.classList.add("SNrow");
    graphParent.appendChild(row);
    var reign;
    for (var i = 0; i < position.holders.length; i++) {
        reign = document.createElement("DIV");
        reign.classList.add("SNholder");
        row.appendChild(reign);
        reign.style.backgroundColor = position.color;
        reign.innerHTML = position.holders[i].name;

        if (i == 0) {
            reign.style.marginLeft = ((position.holders[i].start - start) / maxStretch) * 100 + "%";
        }
        reign.style.width = (position.holders[i].getLength() / maxStretch) * 100 + "%";
    }
}

function initGraph (graph) {
    let positions = graph.positions;
    let graphParent = document.createElement("DIV");
    graphParent.classList.add("SNgraphParent");
    $("body")[0].appendChild(graphParent);
    let start = graph.getEarliestStart();
    let end = graph.getLatestEnd();
    let maxStretch = end - start;
    for (var i = 0; i < positions.length; i++) {
        initRow(positions[i], graphParent, start, end, maxStretch);
    }
}

//initGraph(g);