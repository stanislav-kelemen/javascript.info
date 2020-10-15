document.onmousedown = function(event) {
    let elem = event.target;
    if (!elem.classList.contains('draggable')) return;

    event.preventDefault();

    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    let scrollWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );

    let shiftX = event.pageX - getCoords(elem).left;
    let shiftY = event.pageY - getCoords(elem).top;


    onMouseMove(event);
    elem.style.position = 'absolute';

    elem.ondragstart = function () {
        return false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    function getCoords(element) {
        let box = element.getBoundingClientRect();

        return {
            left: box.left + pageXOffset,
            top: box.top + pageYOffset,
            right: box.right + pageXOffset,
            bottom: box.bottom + pageYOffset,
        }
    }

    function onMouseMove(event) {
        let elemLeft = event.pageX - shiftX;
        let elemTop = event.pageY - shiftY;


        if (elemLeft + elem.offsetWidth > scrollWidth) elemLeft = scrollWidth - elem.offsetWidth;
        if (elemLeft <= 0) elemLeft = 0;
        if (elemTop + elem.offsetHeight > scrollHeight) elemTop = scrollHeight - elem.offsetHeight;
        if (elemTop <= 0) elemTop = 0;
        

        let leftEdge = elemLeft - pageXOffset;
        if (leftEdge < 0) window.scrollBy(leftEdge, 0);
        let rightEdge = leftEdge + elem.offsetWidth;
        if (rightEdge > document.documentElement.clientWidth) window.scrollBy(rightEdge - document.documentElement.clientWidth, 0);

        let topEdge = elemTop - pageYOffset;
        if (topEdge < 0) window.scrollBy(0, topEdge);
        let bottomEdge = topEdge + elem.offsetHeight;
        if (bottomEdge > document.documentElement.clientHeight) window.scrollBy(0, bottomEdge - document.documentElement.clientHeight);

        elem.style.left = elemLeft + 'px';
        elem.style.top = elemTop + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseMove);
    }
}