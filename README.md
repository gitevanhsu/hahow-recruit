# Hahow Frontend Engineer 徵才小專案

## 啟動專案

1. **clone project**

   `$ git clone https://github.com/gitevanhsu/hahow-recruit.git`

2. **進入資料夾**

   `$ cd hahow-recruit`

3. **安裝 dependencies**

   `$ npm install` or `$ yarn`

4. **啟動專案**

   `$ npm run dev` or `$ yarn dev`

5. **開啟專案**

   打開瀏覽器，前往 http://localhost:5173/

## 功能

1. **顯示全部 hero** ![heroList](https://i.imgur.com/969Hvte.png)
   進到頁面後會顯示全部的 hero，當滑鼠移到 hero card 的時候，卡片會微微向上移動，提示使用者滑鼠移到的卡片，並且顯示 hero 的當前能力值。

2. **顯示 hero profile** ![heroProfile](https://i.imgur.com/igMkvZ1.png)
   點擊 hero card 後會進入到 hero profile 頁面，下面會顯示 hero profile 資料，並且用戶可以修改調整各項數值。
   當前所在的 hero card 也會顯示動態邊框提示使用者當前 hero。

3. **錯誤提醒**![notice](https://i.imgur.com/i3ndhLB.png)
   當使用者操作錯誤或成功儲存 hero profile 時會跳出 modal 提醒用戶。
   modal 可以點擊旁邊灰色處關閉，或是 1 秒後自動關閉。

3. **拖拉調整卡片位置** 

   https://user-images.githubusercontent.com/92194495/213650806-23bdf2df-82a1-40f4-b5b0-1ddd1d7582df.mov
   
   使用者可以透過拖拉的方式挑整卡片位置。

## Web 架構

![web snapshot](https://i.imgur.com/pcltmpx.png)

網站主要分為上下兩個部分，上面顯示 hero list，當滑鼠移上去時會顯示 hero 的能力值。

點擊 hero 卡片會進入到 hero profile 的頁面，上面卡片內容不變。
且點擊的 hero 卡片會出現邊框並上移，提醒使用者當前的 hero。

下面則會顯示 hero 的各項能力值，可透過 + / - 按鈕調整 hero 各項能力數值。

當點數重新分配完成後，點擊儲存將會更新畫面以及 server 端的 hero 能力值。

## 專案架構

**開發框架 & 語言**

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

**打包工具**

- [Vite](https://vitejs.dev/)

**Web Router**

- [React Router](https://reactrouter.com/en/main)

**CSS Style**

- [Emotion](https://emotion.sh/docs/introduction)
- [emotion-reset](https://www.npmjs.com/package/emotion-reset)

**其他**

- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)

## 框架技術選擇說明

- **打包工具 - vite**

  Vite 是一個新的前端打包工具，跟過去 create-react-app 使用的 Webpack 相比，打包速度更快，可以提昇在開發時的效率。

  Webpack 每次打包或是資料有變動時，都會把所有的檔案重新打包、編譯，導致在啟動跟開發時速度較慢。

  Vite 則是按照需求編譯，而且開發時只會重新編譯有變動的地方，透過動態更新、載入的方式提高打包的效率。

  為了提升開發效率，因此選擇 Vite 作為本次專案的打包工具。

- **開發語言 - TypeScript**

  TypeScript 是基於 JavaScript 所延伸出來的一種超集合的程式語言，讓 JavaScript 能夠像 Java、C# 一樣有強型別的概念。

  TypeScript 可以幫助在開發時提早發現錯誤，JavaScript 往往會在 runtime 才報錯相比，TypeScript 在編譯階段發現型別有誤就會報錯。

  TypeScript 在型別定義上較為清楚，可以提昇程式碼的閱讀性。

  為了確保程式碼的可讀性以及變數型別，所以使用 TypeScript 作為開發語言。

- **Router - React Router**

  React 主要為開發 SAP 的 Library，所以只有一份 HTML 檔案，本身並不具備路徑的功能，當使用者在不同畫面按下重新整理都會回復到最初的頁面，並不會紀錄頁面的不同，也不會出現瀏覽紀錄。

  但是透過 React Router 可以讓 React 具有路徑的變化，並且儲存瀏覽紀錄，保有原本 SPA 的使用者體驗之下也具備了路徑的功能。

  目前 React Router 為最主流的 react 路徑解決方案，且近期有更新針對路徑的寫法有所不同，本次開發也是嘗試使用較為新的寫法。

- **CSS Style - Emotion & emotion-reset**

  Emotion 跟 Styled components 為目前主流的 CSS in JS 的套件。
  主打 component base 的寫法，每一個標籤就是一個獨立的 component 可以接受 props 來動態更新 CSS 的內容，而且會產生亂數的 class name 避免 CSS 污染或互相干擾的問題。

  Emotion 跟 Styled components 相比，在大多數的寫法不變的情況下，package 更小，載入的速度較快，

  目前在 npm 的下載量兩者差不多，所以選擇 package 較小的 emotion 作為本次開發的選擇。

  emotion-reset 則是協助做 CSS reset 的工具。
  為了避免 css 在不同瀏覽器會出現不同的效果，開發時候會透 CSS rest 來做的處理。

- **ESLint-config-airbnb**

  為了確保程式碼的品質以及一致性，本次開發使用了 ESLint 協助檢查 code 的內容。

  目前最為嚴謹的 ESLint 是 airbnb 的開發規範，所以本次開發使用的是 airbnb 規則的 ESLint 協助檢查。

- **React-beautiful-dnd**

  react-beautiful-dnd 是一個 DND 的套件，可以讓使用者拖動畫面上的元素，並提供不同的 API 讓開發者可以針對開始拖動、結束拖動等不同時間點，執行不同的 function。

  目前 react 的 DND 套件主要有兩個為主流 react-beautiful-dnd 跟 react-dnd，react-dnd 雖然有 DND 的功能，但是主要針對不同區域的卡片做拖拉修改內容。

  這次的專案我希望實現的是在同一個區域內卡片的交換跟移動，所以選擇 react-beautiful-dnd 作為開發的選擇，而且 react-beautiful-dnd 也有預設的移動動畫，使用者體驗上較好。

## 寫註解的原則，以及寫註解的狀況

開發時會透過清楚的變數命名以及簡潔的程式碼，讓瀏覽的人可以快速理解這一段程式碼的作用。

如果一段程式碼包含較為複雜的邏輯時才會寫上註解，註解內容通常是簡單描述下列程式碼的功能作用為何。

## 專案中遇到的困難、問題，以及解決的方法

網站的架構分成上下兩個相鄰的元件，彼此的資料是分開的沒有共用，在開發預覽功能時有遇到一個問題，當 hero 的 profile 更新時上面的預覽數值並不會同步更新，因為資料是沒有共通的。

之後使用 context 解決資料供通性的問題，當使用者修改 profile 的資料並按下儲存時，會同步更新 context 的資料以及送出 request 同時修改 server 的資料，這樣就可以解決上下的資料同步的問題。
