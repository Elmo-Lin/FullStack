import { useState, useEffect } from "react";

interface CardProps {
    title: string,
    imgUrl: string,
    url: string,
    onClick: () => void;
}

function Card({ title, imgUrl, url, onClick }: CardProps) {

  const handleLearnMore = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 hover:scale-105">
      <img className="w-full h-48 object-cover" src={imgUrl} alt={title} />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">{title}</h2>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleLearnMore}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

interface DataItem {
    title: string,
    imgUrl: string,
    url: string;
}


export default function Notion() {
    const [dark, setDark] = useState<boolean>(false);

    const data: DataItem[] = [
        { title: "React", imgUrl: "https://picsum.photos/seed/vue/400/200", url: "https://dull-cod-5d1.notion.site/React-fea646c3dd7d4c05b94f6e6f543aec6a"},
        { title: "Java", imgUrl: "https://picsum.photos/seed/tailwind/400/200", url: "https://dull-cod-5d1.notion.site/Java-1b9aa5a3d01e80e9afecfa9a9a2b4e15" },
        { title: "Kubernetes", imgUrl: "https://picsum.photos/seed/vercel/400/200", url: "https://dull-cod-5d1.notion.site/Kubernetes-1beaa5a3d01e8044937dcb0cc73fda4e" },
        { title: "Airflow", imgUrl: "https://picsum.photos/seed/redux/400/200", url: "https://dull-cod-5d1.notion.site/Airflow-1d0aa5a3d01e80f1abb8c9713b04c581" },
        { title: "Git", imgUrl: "https://picsum.photos/seed/performance/400/200", url: "https://dull-cod-5d1.notion.site/Git-d23be49280ab4553a1f7c1029133c38f" },
        { title: "Linux", imgUrl: "https://picsum.photos/seed/accessibility/400/200", url: "https://dull-cod-5d1.notion.site/Linux-1e9aa5a3d01e80238789f6d603ce766b" },
    ];

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="flex  mb-6">
                <button
                className="px-3 py-1 border border-gray-800 bg-white text-gray-800 rounded focus:outline-none focus:ring focus:ring-gray-400 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-200"
                onClick={() => setDark(prev => !prev)}
                >
                Switch to {dark ? "Light" : "Dark"} mode
                </button>
            </div>
            <div className="flex items-center justify-center">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, i) => (
                <Card
                key={i}
                title={item.title}
                imgUrl={item.imgUrl}
                url={item.url}
                onClick={() => alert(item.title)}
                />
            ))}
            </div>
        </div>
    </div>
    );
}