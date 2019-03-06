{
    var Calculator = /** @class */ (function () {
        function Calculator() {
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
        Calculator.prototype.calc = function (event) {
            var text = event.target.textContent;
            if ('0123456789'.indexOf(text) >= 0) {
                // Check operator
                if (this.operator) {
                    // Update n2
                    if (this.n2) {
                        this.n2 = parseInt(this.n2.toString() + text);
                    }
                    else {
                        this.n2 = parseInt(text);
                    }
                    this.span.textContent = this.n2.toString();
                }
                else {
                    // Update n1
                    if (this.n1) {
                        this.n1 = parseInt(this.n1.toString() + text);
                    }
                    else {
                        this.n1 = parseInt(text);
                    }
                    this.span.textContent = this.n1.toString();
                }
            }
            else if ('+-x÷'.indexOf(text) >= 0) {
                // Update Operator
                this.operator = text;
            }
            else if ('='.indexOf(text) >= 0) {
                // Update result
                var result = void 0;
                if (this.operator === '+') {
                    result = this.n1 + this.n2;
                }
                else if (this.operator === '-') {
                    result = this.n1 - this.n2;
                }
                else if (this.operator === '÷') {
                    result = this.n1 / this.n2;
                }
                else if (this.operator === 'x') {
                    result = this.n1 * this.n2;
                }
                this.span.textContent = result.toString();
            }
        };
        return Calculator;
    }());
    new Calculator();
}
