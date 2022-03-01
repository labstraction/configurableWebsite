function initWebsite(){
    loadSettings();
    loadPages();
}


function loadSettings(){
    fetch("./assets/settings/setting.json")
    .then(res => res.json())
    .then(configureWebsite);
}

function configureWebsite(setting){
    setDocumentTitle(setting.title);
    setTheme(setting.theme);
    setHeaderTitle(setting.title);
    setHeaderBackground(setting.headerImage);
    setFooterLinks(setting.footerLinks);
}

function setDocumentTitle(title) {
    document.title = title;
}

function setTheme(theme) {
    const styleLink = document.getElementById('style');
    styleLink.setAttribute('href', (theme + ".css"))
}

function setHeaderTitle(title){
    const headerTitle = document.getElementById('main-title');
    headerTitle.innerHTML = "";
    const node = document.createTextNode(title);
    headerTitle.appendChild(node);
}

function setHeaderBackground(imageUrl){
    const header = document.getElementById('header');
    header.style.backgroundImage = 'url("' + imageUrl + '")';
}

function setFooterLinks(linkArray){
    const footer = document.getElementById('footer');
    for (const link of linkArray) {
        const a = document.createElement('a');
        a.href = link.url;
        const node = document.createTextNode(link.text);
        a.appendChild(node);
        footer.appendChild(a);
    }
}

function loadPages() {
    fetch("./assets/settings/pages_new.json")
    .then(res => res.json())
    .then(configurePages);
}

function configurePages(pageSetting) {
    setNavMenu(pageSetting)


    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    let id = params.get('id');
    if(!id){
        id = "p1"
    }
    const page = pageSetting.filter(p => p.id === id)[0];
    createPage(page);
}

function createPage(page){
    const container = document.getElementById('page-container');
    for (const element of page.content) {
        const htmlElement = createHtmlElement(element);
        container.appendChild(htmlElement);
    }
}



function setNavMenu(pageSetting){
    const navMenu = document.getElementById('nav-menu');
    for (const page of pageSetting) {
        const a = document.createElement('a');
        const node = document.createTextNode(page.name);
        a.appendChild(node);
        // const baseUrl = window.location.toString().split("=")[0];
        // const url = baseUrl + "=" + page.id;
        const url = "/?id=" + page.id;
        console.log(url);
        a.href = url;
        navMenu.appendChild(a);
    }

}

function createHtmlElement(elementSetting){
    switch (elementSetting.tag) {
        case "h2":
            return createH2(elementSetting)
        case "p":
            return createP(elementSetting)
        case "img":
            return createIMG(elementSetting)
        case "div":
            return createDIV(elementSetting)
        default:
            break;
    }
}

function createH2(elementSetting){
    const h2 = document.createElement("h2");
    const node = document.createTextNode(elementSetting.text);
    h2.appendChild(node);
    return h2;
}

function createP(elementSetting){
    const p = document.createElement("p");
    const node = document.createTextNode(elementSetting.text);
    p.appendChild(node);
    return p;
}

function createIMG(elementSetting){
    const img = document.createElement("img");
    img.src = elementSetting.url;
    return img;
}

function createDIV(elementSetting){
    const div = document.createElement("div");
    for (const element of elementSetting.children) {
        const htmlElement = createHtmlElement(element);
        div.appendChild(htmlElement);
    }
    return div
}