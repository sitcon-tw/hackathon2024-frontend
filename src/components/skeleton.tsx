export default function Skeleton() {
    return (
      <main id="login" className="fullscreen flex justify-center items-center flex-col max-w-96 m-auto">
        <div className="flex w-96 flex-col gap-4">
          <div className="skeleton h-32 w-full" />
          <div className="skeleton h-8 w-full" />
          <div className="skeleton h-4 w-32 m-auto" />
        </div>
      </main>
    );
}