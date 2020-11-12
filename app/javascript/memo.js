function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    // new FormData(document.getElementById("form"));
    //index.htmlに記述されているフォームに入力されたの値を取得
    const formData = new FormData(document.getElementById("form"));
    //XMLHttpRequestオブジェクト生成
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      //200以外のHTTPステータスが返却された場合は何もしない
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      //itemレスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      //list「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      //content メモの入力フォームをリセットするため取得
      const formText = document.getElementById("content");
      //描画するためHTMLをHTMLに代入
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        //listに対して直後に描画HTMLを挿入
      list.insertAdjacentHTML("afterend", HTML);
      //入力フォームに空を上書きさせリセットのようにみせかける
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);