const itemsData = [
    { id: 1, name: "ドラゴン Lv.0", tags: ["evo_dragon_0"], image: "img/dragon0.jpg" },
    { id: 2, name: "ドラゴン Lv.1", tags: ["evo_dragon_1"], image: "img/dragon1.jpg" },
    { id: 3, name: "ドラゴン Lv.2", tags: ["evo_dragon_2"], image: "img/dragon2.jpg" },
    { id: 4, name: "フェニックス Lv.0", tags: ["evo_phoenix_0"], image: "img/phoenix0.jpg" },
    { id: 5, name: "フェニックス Lv.1", tags: ["evo_phoenix_1"], image: "img/phoenix1.jpg" },
    { id: 6, name: "フェニックス Lv.2", tags: ["evo_phoenix_2"], image: "img/phoenix2.jpg" },
    { id: 7, name: "ドラゴン Lv.1 (別バージョン)", tags: ["evo_dragon_1"], image: "img/dragon1_alt.jpg" }
];

const itemContainer = document.getElementById("item-container");
const relatedContainer = document.getElementById("related-container");

// アイテムを生成して表示
function renderItems() {
    itemContainer.innerHTML = "";
    itemsData.forEach(item => {
        const div = createItemElement(item);
        div.onclick = () => selectItem(item);
        itemContainer.appendChild(div);
    });
}

// アイテム要素を作成
function createItemElement(item) {
    const div = document.createElement("div");
    div.classList.add("item");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    const name = document.createElement("p");
    name.textContent = item.name;

    div.appendChild(img);
    div.appendChild(name);

    return div;
}

// アイテム選択時の処理
function selectItem(selectedItem) {
    itemContainer.innerHTML = "";
    relatedContainer.innerHTML = "";
    relatedContainer.style.display = "grid";

    // 選択アイテムを表示
    const selectedDiv = createItemElement(selectedItem);
    selectedDiv.classList.add("selected");
    itemContainer.appendChild(selectedDiv);

    // 関連アイテムを取得
    const relatedItems = getRelatedItems(selectedItem);

    // 関連アイテムを表示
    relatedItems.forEach(item => {
        const div = createItemElement(item);
        div.classList.add("related-item");
        div.onclick = () => selectItem(item);
        relatedContainer.appendChild(div);
    });
}

// 関連アイテムを取得
function getRelatedItems(selectedItem) {
    // evo_タグを取得
    const evoTag = selectedItem.tags.find(tag => tag.startsWith("evo_"));
    if (!evoTag) return [];

    // 進化名（例: "dragon"）を取得
    const evoBase = evoTag.split("_")[1];

    // 同じ進化名を持つアイテムを取得
    const related = itemsData.filter(item => 
        item.tags.some(tag => tag.startsWith(`evo_${evoBase}_`))
    );

    // レベルごとにidの小さいアイテムを代表として選択
    const uniqueRelated = {};
    related.forEach(item => {
        const level = parseInt(item.tags[0].split("_")[2], 10);
        if (!(level in uniqueRelated) || item.id < uniqueRelated[level].id) {
            uniqueRelated[level] = item;
        }
    });

    // 0 → 1 → 2 の順に並べて返す
    return [0, 1, 2].map(level => uniqueRelated[level]).filter(Boolean);
}

// 初期表示
renderItems();
