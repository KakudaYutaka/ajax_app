function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    post.addEventListener("click", () => {
      //post.setAttribute("data-load", "true");が一度読み込まれたら下記のif文が処理されリターンで止まる
      if (post.getAttribute("data-load") != null) {
        return null;
      }
      post.setAttribute("data-load", "true");
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      // コントローラーからレスポンスがあった場合の処理　エラーが出た場合は何もせず戻る
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        // 既読かどうか判断し情報を切り替える処理
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
//
setInterval(check, 1000);