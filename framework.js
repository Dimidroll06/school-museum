function defineTag(tag, callback){
    document.body.querySelectorAll(tag).forEach((elem) => {
        var attributes = {};
        for (var att, i = 0, atts = elem.attributes, n = atts.length; i < n; i++){ attributes[atts[i].nodeName] = atts[i].nodeValue }

        var newElem = callback(attributes, elem);
        elem.replaceWith(newElem);
    });
};

defineTag('photo', ({ name, deskription, size })=>{
    var element = document.createElement('div');
    element.id = "image";

    element.style.textAlign = "center";
    if(size) element.style.width = size;

    element.innerHTML = 
    `
        <img src="./images/${name}" style="width: 100%" ></img>
        ${deskription?
        `<p class="ff2 fs4">${deskription}</p>`
        :""}
    `;

    return element;
});

defineTag('header', ({ title, subtitle })=>{
    var element = document.createElement('div');
    element.id = "header";

    element.style.textAlign = 'center';
    element.style.margin = "18pt";

    element.innerHTML = 
    `
        <h1 class="ff1 fs1">${title??"Имя Фамилия Отчество"}</h1>
        ${subtitle?
            `<h2 class="ff2 fs2">${subtitle}</h2>`
            :""
        }
    `;

    return element;
});

defineTag('text', (attributes, elem)=>{
    var element = document.createElement('span');
    element.id = "text";

    element.style.margin = '10px';

    element.innerHTML = 
    `
        <p class="ff2 fs3">${ elem.innerHTML }</p>
    `;

    return element;
});

defineTag('blocks', ({nowrap, gap, dock, direcion}, elem)=>{
    var element = document.createElement('div');
    element.id = "blocks";

    element.style.display = "flex";
    element.style.width = "100%";
    element.style.marginTop = "15px";
    element.style.flexDirection = direcion ?? "row";
    element.style.justifyContent = dock ?? "space-around";
    element.style.alignContent = "stretch";
    element.style.alignItems = "stretch";
    element.style.gap = gap ?? "5%";
    console.log(dock)
    if(typeof nowrap === "undefined") element.classList.add('relativeFlex');

    element.innerHTML = elem.innerHTML;

    return element;
})
