{
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = null;
            this.keys = [
                ['Clear', '÷'],
                ['7', '8', '9', 'x'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['0', '.', '='],
            ];
            this.createSpan();
            this.createOutput();
            this.createContainer();
            this.bindEvents();
            this.createButtons();
        }
        Calculator.prototype.createButton = function (text, className, container) {
            var button = document.createElement('button');
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
            return button;
        };
        Calculator.prototype.createSpan = function () {
            var span = document.createElement('span');
            span.textContent = '0';
            this.span = span;
        };
        Calculator.prototype.createOutput = function () {
            var output = document.createElement('div');
            output.classList.add('cal-output');
            output.appendChild(this.span);
            this.output = output;
        };
        Calculator.prototype.createContainer = function () {
            var container = document.createElement('div');
            container.classList.add('cal');
            container.appendChild(this.output);
            document.body.appendChild(container);
            this.container = container;
        };
        Calculator.prototype.createButtons = function () {
            var _this = this;
            this.keys.forEach(function (textList) {
                var div = document.createElement('div');
                div.classList.add('row');
                textList.forEach(function (text) {
                    _this.createButton(text, "cal-button cal-" + text, div);
                });
                _this.container.appendChild(div);
            });
        };
        Calculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener('click', function (event) {
                // Check target type
                if (!(event.target instanceof HTMLButtonElement)) {
                    return;
                }
                _this.calc(event);
            });
        };
        Calculator.prototype.updateNumber = function (text) {
            // Check operator
            if (this.operator) {
                // Update n2
                this.n2 = (this.n2 ? this.n2.toString() : '') + text;
                this.span.textContent = this.n2.toString();
            }
            else {
                // Update n1
                this.n1 = (this.n1 ? this.n1.toString() : '') + text;
                this.span.textContent = this.n1.toString();
            }
        };
        Calculator.prototype.updateResult = function () {
            var result;
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
            if (this.operator === '+') {
                result = n1 + n2;
            }
            else if (this.operator === '-') {
                result = n1 - n2;
            }
            else if (this.operator === '÷') {
                result = n1 / n2;
            }
            else if (this.operator === 'x') {
                result = n1 * n2;
            }
            result = result.toPrecision(3).replace(/0+$/g, '').replace(/0+e/g, '');
            this.span.textContent = result;
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = result;
        };
        Calculator.prototype.updateOperator = function (text) {
            if (this.n1 === null) {
                this.n1 = this.result;
            }
            // Update Operator
            this.operator = text;
        };
        Calculator.prototype.calc = function (event) {
            var text = event.target.textContent;
            if ('0123456789.'.indexOf(text) >= 0) {
                this.updateNumber(text);
            }
            else if ('+-x÷'.indexOf(text) >= 0) {
                this.updateOperator(text);
            }
            else if ('='.indexOf(text) >= 0) {
                // Update result
                this.updateResult();
            }
            else if (text === 'Clear') {
                this.n1 = null;
                this.n2 = null;
                this.operator = null;
                this.result = null;
                this.span.textContent = '0';
            }
        };
        return Calculator;
    }());
    new Calculator();
}
