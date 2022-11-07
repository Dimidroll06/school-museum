class Framework{
	constructor(){
		this.mainFont = "ff1";
		this.secondFont = "ff2";
		this.titleFont = "ff3";
		this.subtitleFont = "ff4";
	}
	
	defineTag(tag, callback){
		document.body.querySelectorAll(tag).forEach((elem) => {
			var attributes = {};
			for (var att, i = 0, atts = elem.attributes, n = atts.length; i < n; i++){ attributes[atts[i].nodeName] = atts[i].nodeValue }

			var newElem = callback(attributes, elem);
			elem.replaceWith(newElem);
		});
	}
} 

const framework = new Framework();

framework.defineTag('photo', ({ name, deskription, size })=>{
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

framework.defineTag('header', ({ title, subtitle, titlefont, subtitlefont })=>{
    var element = document.createElement('div');
    element.id = "header";

    element.style.textAlign = 'center';
    element.style.margin = "18pt";

    element.innerHTML = 
    `
        <h1 class="${titlefont ?? framework.titleFont } fs1">${title??"Имя Фамилия Отчество"}</h1>
        ${subtitle?
            `<h2 class="${subtitlefont ?? framework.subtitleFont } fs2">${subtitle}</h2>`
            :""
        }
    `;

    return element;
});

framework.defineTag('text', ({iscomment}, elem)=>{
    var element = document.createElement('span');
    element.id = "text";

    element.style.margin = '10px';

	console.log(iscomment)
    element.innerHTML = 
    `
        <p class="
		${typeof iscomment!=='undefined'?
			framework.secondFont:
			framework.mainFont}
		fs3">${ elem.innerHTML }</p>
    `;

    return element;
});

framework.defineTag('blocks', ({nowrap, gap, dock, direcion}, elem)=>{
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
    
    if(typeof nowrap === "undefined") element.classList.add('relativeFlex');

    element.innerHTML = elem.innerHTML;

    return element;
})
