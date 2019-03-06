{
    class Calculator {
        public span: HTMLSpanElement
        private output: HTMLDivElement
        private container: HTMLDivElement

        public n1: number
        public n2: number
        public operator: string

        public keys: Array<Array<string>> = [
            ['Clear', '÷'],
            ['7', '8', '9', 'x'], 
            ['4', '5', '6', '-'], 
            ['1', '2', '3', '+'],
            ['0', '.', '='],
        ]

        constructor() {
            this.createSpan()
            this.createOutput()
            this.createContainer()
            this.bindEvents()

            this.createButtons()
        }

        createButton(text: string, className: string, container: HTMLElement) {
            let button: HTMLButtonElement = document.createElement('button')
            button.textContent = text
            if (className) {
                button.className = className
            }
            container.appendChild(button)

            return button
        }

        createSpan() {
            let span: HTMLSpanElement = document.createElement('span')
            span.textContent = '0'

            this.span = span
        }

        createOutput() {
            let output: HTMLDivElement = document.createElement('div')
            output.classList.add('cal-output')
            output.appendChild(this.span)

            this.output = output
        }

        createContainer() {
            let container: HTMLDivElement = document.createElement('div')
            container.classList.add('cal')
            container.appendChild(this.output)
            document.body.appendChild(container)

            this.container = container
        }

        createButtons() {
            this.keys.forEach((textList: Array<string>) => {
                let div: HTMLDivElement = document.createElement('div')
                div.classList.add('row')
                textList.forEach((text: string) => {
                    this.createButton(text, `cal-button cal-${text}`, div)
                })
                this.container.appendChild(div)
            })
        }

        bindEvents() {
            this.container.addEventListener('click', (event) => {
                // Check target type
                if (!(event.target instanceof HTMLButtonElement)) {
                    return
                }

                this.calc(event)
            })
        }

        calc(event) {
            let text: string = event.target.textContent
            if ('0123456789'.indexOf(text) >= 0) {
                // Check operator
                if (this.operator) {
                    // Update n2
                    if (this.n2) {
                        this.n2 = parseInt(this.n2.toString() + text)
                    }
                    else {
                        this.n2 = parseInt(text)
                    }
                    this.span.textContent = this.n2.toString()
                }
                else {
                    // Update n1
                    if (this.n1) {
                        this.n1 = parseInt(this.n1.toString() + text)
                    }
                    else {
                        this.n1 = parseInt(text)
                    }
                    this.span.textContent = this.n1.toString()
                }
            }
            else if ('+-x÷'.indexOf(text) >= 0) {
                // Update Operator
                this.operator = text
            }
            else if ('='.indexOf(text) >= 0) {
                // Update result
                let result
                if (this.operator === '+') {
                    result = this.n1 + this.n2
                }
                else if (this.operator === '-') {
                    result = this.n1 - this.n2
                }
                else if (this.operator === '÷') {
                    result = this.n1 / this.n2
                }
                else if (this.operator === 'x') {
                    result = this.n1 * this.n2
                }
                this.span.textContent = result.toString()
            }
        }
    }

    new Calculator()
}