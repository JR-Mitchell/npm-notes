function text_div(text: string) {
    //Creates a div with text TEXT inside
    const div = document.createElement('div');
    div.innerText = text;

    return div;
}

document.body.appendChild(text_div("Hello World!"));
