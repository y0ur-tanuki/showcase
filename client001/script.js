const img_lst = {
    "0" : {
        "title" : "Hibiscus rosa-sinensis",
        "content" : "This variety is recognized for its large, showy petals that feature a vibrant color spectrum, ranging from deep violet to soft lavender. It often has a distinct, darker center (throat) and a prominent central stamen.",
        "currency" : "$",
        "cost" : "16.99",
        "img" : "images/img1.png",
        "bg" : "#9f7ba5"
        },
    "1" : {
        "title" : "Alyogyne huegelii",
        "content" : "It features vibrant lilac-blue to periwinkle petals that are often more translucent and crinkled than typical hibiscus petals. The center usually has a prominent, deep-purple \"eye\" with a long yellow staminal column.",
        "currency" : "$",
        "cost" : "6.00",
        "img" : "images/img2.png",
        "bg" : "#a3d8f4"
        },
    "2" : {
        "title" : "Chrysanthemum morifolium",
        "content" : "These are the focal points of the bouquet. Their appearance is defined by dense, multi-layered \"pom-pom\" style heads composed of hundreds of tiny, overlapping ray florets. In this dried state, they have a muted, dusty-rose hue with visible crinkling on the petals.",
        "currency" : "$",
        "cost" : "3.50",
        "img" : "images/img3.png",
        "bg" : "#ffc8bb"
        },
    "3" : {
        "title" : "Hippeastrum",
        "content" : "Once a herald of bold, trumpet-like vibrance, this Amaryllis now rests in a state of elegant decay. Its petals, once succulent and bright crimson, have folded into paper-thin whispers of deep plum and parched violet. The graceful, arching stems are now amber and brittle, holding the weight of memory in their curves. It is a portrait of lingering beauty—where the bloom has traded its scent for a timeless, sculpted silhouette of quiet resilience.",
        "currency" : "",
        "cost" : "Priceless Gem",
        "img" : "images/img4.png",
        "bg" : "#643f4d"
    },
};

function construct_page(num) {
    const len = Object.keys(img_lst).length;
    const curr = img_lst[num.toString()];

    if (!window.next_img) {
        window.next_img = num;
    }

    console.log(window.next_img)

    const nxtt = img_lst[((num + 1) % len).toString()];
    console.log(nxtt)
    document.querySelector("div.main").innerHTML = `<div class="panel below" style="background-color: ${curr["bg"]};">
            <div class="left block">
                <div class="title ignore">${curr["title"]}</div>
                <div class="content ignore">
                    ${curr["content"]}
                </div>
                <div class="price ignore" data-currency="${curr["currency"]}">${curr["cost"]}</div>
            </div>
            <div class="empty"></div>
        </div>
        <div class="panel above" style="background-color: ${curr["bg"]};">
            <div class="left block">
                <div class="title ignore">${curr["title"]}</div>
                <div class="content ignore">
                    ${curr["content"]}
                </div>
                <div class="price ignore" data-currency="${curr["currency"]}">${curr["cost"]}</div>
            </div>
            <div class="empty"></div>
        </div>
        <div class="right">
            <figure class="active">
                <img src="${curr["img"]}">
                <div class="panel-2 block">
                    <div class="title-2">${curr["title"]}</div>
                    <div class="price ignore" data-currency="${curr["currency"]}">${curr["cost"]}</div>
                </div>
            </figure>
            <figure class="next">
                <img src="${nxtt["img"]}">
                <div class="panel-2 block">
                    <div class="title-2">${nxtt["title"]}</div>
                    <div class="price ignore" data-currency="${nxtt["currency"]}">${curr["cost"]}</div>
                </div>
            </figure>
        </div>`;

    window.time_id = setInterval(change, 5000);

    document.title = curr["title"];

    console.log("done........");
}

function change() {
    window.next_img = (parseInt(window.next_img) + 1) % Object.keys(img_lst).length;
    const nxtt = img_lst[(window.next_img).toString()];
    const nxtt2 = img_lst[((parseInt(window.next_img) + 1) % Object.keys(img_lst).length).toString()];
    console.log(nxtt);
    console.log(nxtt2);
    document.querySelectorAll("figure.prev").forEach(el => el.remove());
    document.querySelectorAll("div.panel.below").forEach(el => el.remove());

    const htmlString = `<div class="panel above" style="background-color: ${nxtt["bg"]};">
        <div class="left block">
            <div class="title ignore">${nxtt["title"]}</div>
            <div class="content ignore">
                ${nxtt["content"]}
            </div>
            <div class="price ignore" data-currency="${nxtt["currency"]}">${nxtt["cost"]}</div>
        </div>
        <div class="empty"></div>
    </div>`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const htmlImg = `<figure class="way-next">
                <img src="${nxtt2["img"]}">
                <div class="panel-2 block">
                    <div class="title-2">${nxtt2["title"]}</div>
                    <div class="price ignore" data-currency="${nxtt2["currency"]}">${nxtt2["cost"]}</div>
                </div>
            </figure>`;

    const html = parser.parseFromString(htmlImg, 'text/html');

    const img_div = document.querySelector("div.right");
    const curr = img_div.querySelector("figure.active");
    const next = img_div.querySelector("figure.next");
    console.log(next);

    document.querySelector("div.panel.above").classList.replace("above", "below");

    const new_div = document.querySelector("div.main").insertAdjacentElement("beforeend", doc.body.firstChild);
    const way_next = img_div.insertAdjacentElement("beforeend", html.body.firstChild);
    curr.classList.replace("active", "prev");
    next.classList.replace("next", "active");
    void way_next.offsetHeight;
    way_next.classList.replace("way-next", "next");
    document.title = nxtt["title"];
}

function debug() {
    clearInterval(window.time_id);
    [].forEach.call(document.querySelectorAll('*'), function(a) {
    a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});

}

window.addEventListener('load', function() {
    document.querySelectorAll("div.main noscript").forEach(el => el.remove());
    construct_page(0);
});