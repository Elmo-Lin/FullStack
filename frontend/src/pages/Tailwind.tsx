export default function Taildwind() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      {/* 1. Header 區塊:Spacing + Typography */}
      <header className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Tailwind CSS
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tailwind 常用工具
        </p>
      </header>

      {/* 2. 主要內容區塊 */}
      <main className="p-6 md:p-8 lg:p-12">
        {/* 2.1 Container + Width/Max-Width */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 2.1 Sizing 範例:固定高度 + 最大寬度 */}
          <section className="w-full h-40 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              固定高度 10rem(h-40), 寬度撐滿父容器
            </span>
          </section>

          {/* 2.2 Spacing 範例:Margin、Padding */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Spacing
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-100 rounded-lg">
                Padding:p-4(1rem)
              </div>
              <div className="m-4 bg-indigo-200 rounded-lg">
                Margin:m-4(1rem)
              </div>
              <div className="px-8 py-2 bg-indigo-300 rounded-lg">
                Padding X / Y:px-8(2rem)、py-2(0.5rem)
              </div>
            </div>
          </section>

          {/* 2.3 Typography 範例:文字大小、行高、顏色 */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Typography
            </h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              這是一段普通段落文字，使用 <code>text-base</code>(1rem)和 <code>leading-relaxed</code>(1.625 行高)。在深色模式下會套用灰色 300。
            </p>
            <p className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">
              這是一段稍大的標題文字，使用 <code>text-lg</code>(約 1.125rem)。
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              這是一段小字，使用 <code>text-sm</code>(0.875rem)和灰 500。
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              你也可以直接用<span className="font-bold"> font-bold、text-red-500</span> 來改變字重與顏色。
            </p>
          </section>

          {/* 2.4 Background & Border 範例 */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Background & Border
            </h2>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg">
                漸層背景:<code>bg-gradient-to-r from-green-400 to-blue-500</code>
              </div>
              <div className="p-6 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                圓形(完全圓角):<code>rounded-full</code>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg">
                虛線邊框:<code>border-2 border-dashed</code>
              </div>
            </div>
          </section>

          {/* 2.5 Effects 範例:陰影、透明度、圓形裁切 */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Effects
            </h2>
            <div className="flex flex-wrap gap-6">
              {/* 陰影 */}
              <div className="w-32 h-32 bg-white dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-center">
                <span className="text-gray-800 dark:text-gray-100">shadow-lg</span>
              </div>
              {/* 透明度 */}
              <div className="w-32 h-32 bg-red-500 opacity-50 rounded-md flex items-center justify-center">
                <span className="text-white">opacity-50</span>
              </div>
              {/* 圓形裁切 */}
              <img
                src="https://via.placeholder.com/150"
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          </section>

          {/* 2.6 States 範例:Hover、Focus、Active */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              States
            </h2>
            <div className="flex flex-wrap gap-4">
              {/* Hover */}
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                Hover
              </button>
              {/* Focus */}
              <input
                type="text"
                placeholder="Focus"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Active */}
              <button className="px-4 py-2 bg-green-500 text-white rounded active:scale-95 transition-transform duration-150">
                Active 縮小
              </button>
              {/* Disabled */}
              <button className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed opacity-60" disabled>
                Disabled
              </button>
            </div>
          </section>

          {/* 2.7 Transition & Animation 範例 */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Transition & Animation
            </h2>
            <div className="flex flex-wrap gap-6 items-center">
              {/* 簡易過渡:文字顏色變化 */}
              <div className="p-4 bg-gray-200 dark:bg-gray-600 rounded transition-colors duration-500 hover:bg-gray-300 dark:hover:bg-gray-500">
                Hover 變色(transition-colors)
              </div>
              {/* 旋轉動畫:需在 tailwind.config.js 增加 keyframes & animation */}
              <div className="p-4 bg-purple-400 text-white rounded-md animate-spin-slow">
                旋轉中…
              </div>
              {/* 簡易顏色閃爍:同樣需要在 Tailwind 設定 keyframes */}
              <div className="p-4 bg-yellow-400 text-black rounded-md animate-ping">
                Ping 動畫
              </div>
            </div>
          </section>

          {/* 2.8 Responsive 範例:不同尺寸切版 */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Responsive
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-tr from-pink-300 to-pink-500 text-white h-28 flex items-center justify-center rounded">
                col-1 / sm:col-2 / lg:col-3
              </div>
              <div className="bg-gradient-to-tr from-green-300 to-green-500 text-white h-28 flex items-center justify-center rounded">
                col-1 / sm:col-2 / lg:col-3
              </div>
              <div className="bg-gradient-to-tr from-blue-300 to-blue-500 text-white h-28 flex items-center justify-center rounded">
                col-1 / sm:col-2 / lg:col-3
              </div>
            </div>
          </section>

          {/* 2.9 Dark Mode 切換範例 */}
          <section className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Dark Mode
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              全域最外層有套 <code>dark:bg-gray-800</code>，再透過
              <code>dark:</code> 前綴控制深色樣式。
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded"
              onClick={() => {
                // 在實際 App 中，你可以用 state 來控制 <html> 或 <body> 是否帶 class="dark"
                if (document.documentElement.classList.contains('dark')) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              }}
            >
              切換深淺模式
            </button>
          </section>
        </div>
      </main>

      {/* 3. Footer(示範簡單 Flex 排版 + 文本顏色) */}
      <footer className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Elmo Lin. All rights reserved.
          </p>
          <nav className="mt-2 sm:mt-0 space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">隱私政策</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">服務條款</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
