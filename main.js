{
    function createButton(text, className, container) {
        var button = document.createElement('button');
        button.textContent = text;
        if (className) {
            button.className = className;
        }
        container.appendChild(button);
    }
    var container_1 = document.createElement('div');
    container_1.classList.add('cal');
    document.body.appendChild(container_1);
    var output = document.createElement('div');
    var span = document.createElement('span');
    output.classList.add('cal-output');
    span.textContent = '1000';
    output.appendChild(span);
    container_1.appendChild(output);
    var keys = [
        ['Clear', '÷'],
        ['7', '8', '9', 'x'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '='],
    ];
    keys.forEach(function (textList) {
        var div = document.createElement('div');
        div.classList.add('row');
        textList.forEach(function (text) {
            createButton(text, "cal-button cal-" + text, div);
        });
        container_1.appendChild(div);
    });
}
