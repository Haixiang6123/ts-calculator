{
    function createButton(text: string, className: string, container: HTMLElement) {
        let button: HTMLButtonElement = document.createElement('button')
        button.textContent = text
        if (className) {
            button.className = className
        }
        container.appendChild(button)
    }

    let container: HTMLDivElement = document.createElement('div')
    container.classList.add('cal')
    document.body.appendChild(container)

    let output: HTMLDivElement = document.createElement('div')
    let span: HTMLSpanElement = document.createElement('span')
    output.classList.add('cal-output')
    span.textContent = '1000'
    output.appendChild(span)
    container.appendChild(output)

    let keys: Array<Array<string>> = [
        ['Clear', '÷'],
        ['7', '8', '9', 'x'], 
        ['4', '5', '6', '-'], 
        ['1', '2', '3', '+'],
        ['0', '.', '='],
    ]

    keys.forEach((textList: Array<string>) => {
        let div: HTMLDivElement = document.createElement('div')
        div.classList.add('row')
        textList.forEach((text: string) => {
            createButton(text, `cal-button cal-${text}`, div)
        })
        container.appendChild(div)
    })
}