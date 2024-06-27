import PageLink from "@/components/page_link";

const stamps: (string | null)[] = [];

export default async function View() {
    stamps.length = 0;
    for (let i = 0; i < 9; i++) {
        if (Math.random() > 0.5)
            stamps.push((9 - i).toString());
        else
            stamps.push(null);
    }
    return (
        <main className="flex flex-col items-center justify-center gap-3 p-5 fullscreen max-w-screen-md m-auto">
            <PageLink href="/" text="回主頁" />
            <div className="container">
                <h1 className="text-center">
                    以下為你目前蒐集到的集章：
                </h1>
            </div>
            <div className="container">
                <div className="grid grid-rows-3 grid-cols-3 aspect-square">
                    { stamps.map((key, idx) => 
                        key == null ? 
                            <img key={idx} className="h-full w-auto" src={`/view_test/black.jpg`} />
                            :
                            <img key={idx} className="h-full w-auto" src={`/view_test/${key}.png`} />
                    )}
                </div>
            </div>
        </main>
    );
}