{
    class Calculator {
        public span: HTMLSpanElement
        private output: HTMLDivElement
        private container: HTMLDivElement

        public n1: string = null
        public n2: string = null
        public operator: string = null
        public result: string = null

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

        bindEvents(): void {
            this.container.addEventListener('click', (event) => {
                // Check target type
                if (!(event.target instanceof HTMLButtonElement)) {
                    return
                }

                this.calc(event)
            })
        }

        updateNumber(text: string): void {
            // Check operator
            if (this.operator) {
                // Update n2
                this.n2 = (this.n2 ? this.n2.toString() : '') + text
                this.span.textContent = this.n2.toString()
            }
            else {
                // Update n1
                this.n1 = (this.n1 ? this.n1.toString() : '') + text
                this.span.textContent = this.n1.toString()
            }
        }

        updateResult(): void {
            let result 
            let n1: number = parseFloat(this.n1)
            let n2: number = parseFloat(this.n2)
            if (this.operator === '+') {
                result = n1 + n2
            }
            else if (this.operator === '-') {
                result = n1 - n2
            }
            else if (this.operator === '÷') {
                result = n1 / n2
            }
            else if (this.operator === 'x') {
                result = n1 * n2
            }
            result = result.toPrecision(3).replace(/0+$/g, '').replace(/0+e/g, '')
            this.span.textContent = result
            this.n1 = null
            this.n2 = null
            this.operator = null
            this.result = result
        }

        updateOperator(text) {
            if (this.n1 === null) {
                this.n1 = this.result
            }
            // Update Operator
            this.operator = text
        }

        calc(event): void {
            let text: string = event.target.textContent
            if ('0123456789.'.indexOf(text) >= 0) {
                this.updateNumber(text)
            }
            else if ('+-x÷'.indexOf(text) >= 0) {
                this.updateOperator(text)
            }
            else if ('='.indexOf(text) >= 0) {
                // Update result
                this.updateResult()
            }
            else if (text === 'Clear') {
                this.n1 = null
                this.n2 = null
                this.operator = null
                this.result = null
                this.span.textContent = '0'
            }
        }
    }

    new Calculator()
}