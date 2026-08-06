const LEARNING = [
  {
    name: "Three.js",
    progress: 20,
    desc: "このポートフォリオサイトのヒーロー演出をきっかけに学習中。シーン・カメラ・レンダラーの基礎を習得中。",
  },
  {
    name: "WebGL",
    progress: 15,
    desc: "Three.jsが内部で使うWebGLの仕組みについて学習中。",
  },
  {
    name: "React Three Fiber",
    progress: 10,
    desc: "Reactの宣言的パターンで3Dシーンを扱うための学習を開始。",
  },
];

export function CurrentlyLearning() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="mb-8 lg:mb-12">
          <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
            In Progress
          </div>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Currently Learning
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {LEARNING.map(({ name, progress, desc }) => (
            <div key={name} className="border border-border bg-card p-5 md:p-7">
              <div className="mb-4 flex items-center justify-between md:mb-5">
                <h3 className="font-heading text-sm font-bold md:text-base">
                  {name}
                </h3>
                <span className="font-heading text-xs font-semibold text-accent">
                  {progress}%
                </span>
              </div>
              <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5 md:mb-5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
